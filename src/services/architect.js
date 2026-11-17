import { ChannelType, PermissionsBitField } from 'discord.js';
import { buildPlan, getBlueprint } from '../core/blueprints.js';
import { permissionBits } from '../core/safety.js';

export function previewTemplate(templateId) {
  const blueprint = getBlueprint(templateId);
  return { blueprint, plan: buildPlan(blueprint) };
}

export async function applyTemplate(guild, templateId, logger) {
  const { plan } = previewTemplate(templateId);
  const createdRoles = new Map();
  for (const role of plan.roles) {
    let current = guild.roles.cache.find((item) => item.name === role.name);
    if (!current) current = await guild.roles.create({ name: role.name, color: role.color, permissions: new PermissionsBitField(permissionBits(role.permissions)), reason: 'Discord Architect: aplicar template' });
    createdRoles.set(role.name, current);
  }
  for (const category of plan.categories) {
    let parent = guild.channels.cache.find((channel) => channel.type === ChannelType.GuildCategory && channel.name === category.name);
    if (!parent) parent = await guild.channels.create({ name: category.name, type: ChannelType.GuildCategory, reason: 'Discord Architect: criar categoria' });
    for (const channel of category.channels) {
      const type = channel.type === 'voice' ? ChannelType.GuildVoice : ChannelType.GuildText;
      const exists = guild.channels.cache.find((item) => item.parentId === parent.id && item.name === channel.name);
      if (!exists) await guild.channels.create({ name: channel.name, type, parent: parent.id, reason: 'Discord Architect: aplicar template' });
    }
  }
  logger.info({ guildId: guild.id, templateId }, 'Template aplicado');
  return { ...previewTemplate(templateId), applied: true };
}
