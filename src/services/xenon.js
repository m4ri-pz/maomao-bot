import * as cheerio from 'cheerio';
import { ChannelType, PermissionsBitField, PermissionFlagsBits } from 'discord.js';

const USER_AGENT = 'DiscordArchitect/0.1 (+https://github.com/m4ri-pz/discord-architect)';
const staffWords = /staff|admin|mod|suporte|equipe|dono|owner/i;

export function xenonUrl(input) {
  const value = String(input || '').trim();
  const match = value.match(/(?:xenon\.bot\/templates\/|discord\.new\/)?([A-Za-z0-9]{8,24})$/);
  if (!match) throw new Error('Use um código Xenon ou um link xenon.bot/templates/<código>.');
  return `https://xenon.bot/templates/${match[1]}`;
}

function clean(text) { return text.replace(/\s+/g, ' ').trim(); }
function contentAfterHeading($, heading) {
  const container = heading.parent();
  const records = [];
  container.find('p, li').each((_, node) => {
    const text = clean($(node).text());
    if (!text) return;
    if (node.name === 'p') records.push({ kind: 'category', name: text });
    else records.push({ kind: 'item', name: clean($(node).find('span.truncate').first().text()) || text, marker: clean($(node).find('[aria-hidden="true"]').first().text()) });
  });
  return records;
}

export async function fetchXenonTemplate(input) {
  const url = xenonUrl(input);
  const response = await fetch(url, { headers: { 'user-agent': USER_AGENT, accept: 'text/html' }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`O Xenon respondeu HTTP ${response.status}.`);
  const html = await response.text();
  if (html.length > 3_000_000) throw new Error('A página excedeu o limite de leitura segura.');
  const $ = cheerio.load(html);
  const title = clean($('h1').first().text()) || 'Template Xenon';
  const channelsHeading = $('h3').filter((_, el) => clean($(el).text()).toLowerCase() === 'channels').first();
  const rolesHeading = $('h3').filter((_, el) => clean($(el).text()).toLowerCase() === 'roles').first();
  if (!channelsHeading.length || !rolesHeading.length) throw new Error('Não encontrei a estrutura pública de canais e cargos nesta página Xenon.');

  const categories = []; let current;
  for (const record of contentAfterHeading($, channelsHeading)) {
    if (record.kind === 'category') { current = { name: record.name, channels: [] }; categories.push(current); }
    else { current ||= { name: 'GERAL', channels: [] }; if (!current.channels.some((channel) => channel.name === record.name)) current.channels.push({ name: record.name, type: record.marker === '♪' ? 'voice' : 'text' }); }
  }
  const roles = [];
  rolesHeading.parent().find('li').each((_, node) => {
    const name = clean($(node).find('span.truncate').first().text()) || clean($(node).text());
    const style = $(node).find('[style*="background"]').attr('style') || '';
    const color = style.match(/#[0-9a-f]{6}/i)?.[0] || '#65748C';
    if (name && !roles.some((role) => role.name === name)) roles.push({ name, color, permissions: [] });
  });
  return { source: 'Xenon', sourceUrl: url, sourceCode: url.split('/').pop(), name: title, roles, categories, permissionsImported: false, permissionNote: 'A página pública lista a estrutura, mas não expõe de forma confiável todas as sobrescritas. O Architect aplica uma política conservadora e mostra a prévia antes de alterar o servidor.' };
}

export function xenonPreview(template) {
  return { roles: template.roles.length, categories: template.categories.length, textChannels: template.categories.flatMap((c) => c.channels).filter((c) => c.type === 'text').length, voiceChannels: template.categories.flatMap((c) => c.channels).filter((c) => c.type === 'voice').length };
}

function rolePermissions(role) { return staffWords.test(role.name) ? [PermissionFlagsBits.ManageMessages] : [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]; }
export async function applyXenonTemplate(guild, template, logger) {
  const roleMap = new Map();
  for (const role of template.roles.slice(0, 200)) {
    let existing = guild.roles.cache.find((item) => item.name === role.name);
    if (!existing) existing = await guild.roles.create({ name: role.name, color: role.color, permissions: new PermissionsBitField(rolePermissions(role)), reason: 'Discord Architect: importar template público Xenon' });
    roleMap.set(role.name, existing);
  }
  for (const category of template.categories.slice(0, 100)) {
    let parent = guild.channels.cache.find((channel) => channel.type === ChannelType.GuildCategory && channel.name === category.name);
    if (!parent) parent = await guild.channels.create({ name: category.name.slice(0, 100), type: ChannelType.GuildCategory, reason: 'Discord Architect: importar categoria Xenon' });
    for (const item of category.channels.slice(0, 200)) {
      const type = item.type === 'voice' ? ChannelType.GuildVoice : ChannelType.GuildText;
      if (!guild.channels.cache.find((channel) => channel.parentId === parent.id && channel.name === item.name)) await guild.channels.create({ name: item.name.slice(0, 100), type, parent: parent.id, reason: 'Discord Architect: importar canal Xenon' });
    }
  }
  logger.info({ guildId: guild.id, sourceCode: template.sourceCode }, 'Template Xenon aplicado em modo adicionar');
  return xenonPreview(template);
}
