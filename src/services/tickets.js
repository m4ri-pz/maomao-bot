import { ChannelType, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { getGuildConfig, updateGuildConfig } from '../store/guild-store.js';
import { ticketType } from '../modules/tickets/ui/panel.js';
import { getBlueprint } from '../core/blueprints.js';
import { characterProfile } from '../personality/character-profile.js';

const locks = new Map();
const withUserLock = (key, task) => { const previous = locks.get(key) || Promise.resolve(); const current = previous.catch(() => {}).then(task); locks.set(key, current.finally(() => { if (locks.get(key) === current) locks.delete(key); })); return current; };

function staffOverwrites(guild) { return getBlueprint('maomao-palace').staffRoles.map((name) => guild.roles.cache.find((role) => role.name === name)).filter(Boolean).map((role) => ({ id: role.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] })); }

export async function createTicket(interaction, requestedType = 'support') {
  const config = await getGuildConfig(interaction.guildId); const type = ticketType(requestedType); const key = `${interaction.guildId}:${interaction.user.id}`;
  return withUserLock(key, async () => {
    const existing = interaction.guild.channels.cache.find((channel) => channel.type === ChannelType.GuildText && channel.topic?.endsWith(`:${interaction.user.id}`) && (channel.topic.startsWith('maomao-ticket:') || channel.topic.startsWith('architect-ticket:')));
    if (existing) return { channel: existing, created: false };
    const preferred = String(config.tickets?.categoryName || '').trim().slice(0, 100) || '╭・ATENDIMENTO';
    let parent = interaction.guild.channels.cache.find((channel) => channel.type === ChannelType.GuildCategory && channel.name === preferred) || interaction.guild.channels.cache.find((channel) => channel.type === ChannelType.GuildCategory && ['╭・ATENDIMENTO', 'ATENDIMENTO'].includes(channel.name));
    if (!parent) parent = await interaction.guild.channels.create({ name: preferred, type: ChannelType.GuildCategory, reason: 'Maomao: preparar Câmara de Atendimento' });
    const safeName = interaction.user.username.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 70) || 'visitante';
    const channel = await interaction.guild.channels.create({ name: `ticket-${type.id}-${safeName}`.slice(0, 100), type: ChannelType.GuildText, parent: parent.id, topic: `maomao-ticket:${type.id}:${interaction.user.id}`, permissionOverwrites: [{ id: interaction.guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] }, { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] }, { id: interaction.client.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ReadMessageHistory] }, ...staffOverwrites(interaction.guild)], reason: `Maomao: abrir atendimento de ${type.label}` });
    try {
      const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle(`✦ Atendimento · ${type.label}`).setDescription(`Olá, <@${interaction.user.id}>. A Maomao registrou seu caso como **${type.label}**. Explique o que aconteceu com calma e detalhes; uma boa análise começa por um relato preciso.`).setFooter({ text: 'Quando o assunto estiver resolvido, use o botão para encerrar o registro.' });
      await channel.send({ embeds: [embed], components: [closeRow()] });
      await updateGuildConfig(interaction.guildId, { tickets: { ...(config.tickets || {}), categoryName: parent.name, panelTitle: config.tickets?.panelTitle || 'Câmara de Atendimento' } });
      return { channel, created: true, type };
    } catch (error) { await channel.delete('Maomao: limpar Ticket que não pôde ser inicializado').catch(() => {}); throw error; }
  });
}

export function closeRow() { return { type: 1, components: [{ type: 2, custom_id: 'ticket:close', label: 'Encerrar registro', style: 4 }] }; }
export async function closeTicket(interaction) {
  const topic = interaction.channel?.topic || ''; const match = topic.match(/^(?:maomao|architect)-ticket:[^:]+:(\d+)$/); if (!match) return interaction.reply({ content: 'Este canal não parece ser um registro da Câmara de Atendimento.', flags: 64 });
  const requesterId = match[1]; const isRequester = interaction.user.id === requesterId; const isStaff = interaction.member?.permissions?.has(PermissionFlagsBits.ManageMessages) || interaction.member?.permissions?.has(PermissionFlagsBits.ManageChannels) || getBlueprint('maomao-palace').staffRoles.some((name) => interaction.member?.roles?.cache?.some((role) => role.name === name));
  if (!isRequester && !isStaff) return interaction.reply({ content: 'Somente a pessoa que abriu este registro ou a equipe de atendimento pode encerrá-lo.', flags: 64 });
  await interaction.reply({ content: 'O registro foi encerrado. Esta sala será arquivada em 3 segundos.', flags: 64 }); setTimeout(() => interaction.channel.delete('Maomao: arquivar atendimento').catch(() => {}), 3000); return true;
}
