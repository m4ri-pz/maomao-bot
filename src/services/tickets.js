import { ChannelType, PermissionFlagsBits } from 'discord.js';
import { getGuildConfig, updateGuildConfig } from '../store/guild-store.js';

export async function createTicket(interaction) {
  const config = await getGuildConfig(interaction.guildId);
  const existing = interaction.guild.channels.cache.find((channel) => channel.topic === `architect-ticket:${interaction.user.id}`);
  if (existing) return { channel: existing, created: false };
  const category = config.tickets?.categoryName || 'TICKETS';
  let parent = interaction.guild.channels.cache.find((channel) => channel.type === ChannelType.GuildCategory && channel.name === category);
  if (!parent) parent = await interaction.guild.channels.create({ name: category, type: ChannelType.GuildCategory, reason: 'Discord Architect: categoria de tickets' });
  const channel = await interaction.guild.channels.create({ name: `ticket-${interaction.user.username}`.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 90), type: ChannelType.GuildText, parent: parent.id, topic: `architect-ticket:${interaction.user.id}`, permissionOverwrites: [
    { id: interaction.guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] },
    { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] },
    { id: interaction.client.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels] }
  ], reason: 'Discord Architect: abrir ticket' });
  await channel.send({ content: `Olá, <@${interaction.user.id}>. A.U.R.A. abriu este atendimento. Explique o que você precisa e use o botão abaixo para fechar.`, components: [closeRow()] });
  await updateGuildConfig(interaction.guildId, { tickets: { ...(config.tickets || {}), categoryName: category, panelTitle: config.tickets?.panelTitle || 'Central de atendimento' } });
  return { channel, created: true };
}
export function closeRow() { return { type: 1, components: [{ type: 2, custom_id: 'ticket:close', label: 'Fechar ticket', style: 4 }] }; }
export async function closeTicket(interaction) {
  if (interaction.channel?.topic?.startsWith('architect-ticket:')) { await interaction.reply({ content: 'Ticket fechado. Este canal será removido em 3 segundos.', ephemeral: true }); setTimeout(() => interaction.channel.delete('Discord Architect: ticket fechado').catch(() => {}), 3000); return true; }
  return false;
}
