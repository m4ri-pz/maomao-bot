import { ChannelType, PermissionsBitField } from 'discord.js';
import { buildPlan, getBlueprint } from '../core/blueprints.js';
import { permissionBits } from '../core/safety.js';
import { starterEmbed } from '../core/starter-messages.js';

export function previewTemplate(templateId) { const blueprint = getBlueprint(templateId); return { blueprint, plan: buildPlan(blueprint) }; }

async function setRoleOrder(guild, roles, roleMap, logger) {
  const positions = roles.map((role, index) => ({ role: roleMap.get(role.name), position: roles.length - index })).filter((entry) => entry.role && entry.role.id !== guild.roles.everyone.id);
  try { if (positions.length) await guild.roles.setPositions(positions, { reason: 'Maomao: organizar hierarquia da base oficial' }); }
  catch (error) { logger.info({ guildId: guild.id, error: error.message }, 'Hierarquia preservada porque o cargo do bot não permite mover todos os cargos'); }
}

async function configurePermissions(guild, parent, category, blueprint, roleMap) {
  const everyone = guild.roles.everyone;
  const staffRoles = (blueprint.staffRoles || []).map((name) => roleMap.get(name)).filter(Boolean);
  if (category.staffOnly) {
    await parent.permissionOverwrites.edit(everyone, { ViewChannel: false });
    for (const role of staffRoles) await parent.permissionOverwrites.edit(role, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true, Connect: true, Speak: true });
  }
  for (const channel of category.channels) {
    if (!channel.readOnly) continue;
    const target = guild.channels.cache.find((item) => item.parentId === parent.id && item.name === channel.name);
    if (!target) continue;
    await target.permissionOverwrites.edit(everyone, { ViewChannel: true, SendMessages: false, ReadMessageHistory: true });
    for (const role of staffRoles) await target.permissionOverwrites.edit(role, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true });
  }
}

export async function applyTemplate(guild, templateId, logger) {
  const { blueprint, plan } = previewTemplate(templateId);
  const roleMap = new Map();
  for (const role of plan.roles) {
    let current = guild.roles.cache.find((item) => item.name === role.name);
    if (!current) current = await guild.roles.create({ name: role.name, color: role.color, hoist: role.hoist ?? false, permissions: new PermissionsBitField(permissionBits(role.permissions)), reason: `Maomao: criar cargo do template ${templateId}` });
    else if (current.editable) await current.edit({ color: role.color, hoist: role.hoist ?? false, permissions: new PermissionsBitField(permissionBits(role.permissions)), reason: `Maomao: configurar cargo do template ${templateId}` });
    roleMap.set(role.name, current);
  }
  await setRoleOrder(guild, plan.roles, roleMap, logger);
  for (const category of plan.categories) {
    let parent = guild.channels.cache.find((channel) => channel.type === ChannelType.GuildCategory && channel.name === category.name);
    if (!parent) parent = await guild.channels.create({ name: category.name, type: ChannelType.GuildCategory, reason: `Maomao: criar categoria do template ${templateId}` });
    for (const channel of category.channels) {
      const type = channel.type === 'voice' ? ChannelType.GuildVoice : ChannelType.GuildText;
      let target = guild.channels.cache.find((item) => item.parentId === parent.id && item.name === channel.name);
      if (!target) target = await guild.channels.create({ name: channel.name, type, parent: parent.id, ...(type === ChannelType.GuildText && channel.topic ? { topic: channel.topic } : {}), reason: `Maomao: criar canal do template ${templateId}` });
      else if (target.isTextBased() && channel.topic && target.editable) await target.setTopic(channel.topic, 'Maomao: configurar descrição do canal oficial');
      if (target.isTextBased() && channel.starter && target.sendable) await seedChannel(target, channel.starter, guild.client.user?.id);
    }
    await configurePermissions(guild, parent, category, blueprint, roleMap);
  }
  logger.info({ guildId: guild.id, templateId, roles: plan.roles.length, channels: plan.channels.length }, 'Template aplicado com permissões');
  return { blueprint, plan, applied: true };
}

async function seedChannel(channel, starter, botId) {
  const recent = await channel.messages.fetch({ limit: 30 }).catch(() => null);
  if (recent?.some((message) => message.author.id === botId && message.embeds.some((embed) => embed.footer?.text?.includes('Palácio das Ervas')))) return;
  const visual = starterEmbed(starter); await channel.send({ embeds: [visual.embed], files: visual.files });
}
