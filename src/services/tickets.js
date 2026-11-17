import { ChannelType, PermissionFlagsBits } from 'discord.js';
import { getGuildConfig, updateGuildConfig } from '../store/guild-store.js';

export async function createTicket(interaction) {
  const config = await getGuildConfig(interaction.guildId);
  const existing = interaction.guild.channels.cache.find((channel) => [`maomao-ticket:${interaction.user.id}`, `architect-ticket:${interaction.user.id}`].includes(channel.topic));
  if (existing) return { channel: existing, created: false };
  const category = config.tickets?.categoryName || 'ATENDIMENTO';
  let parent = interaction.guild.channels.cache.find((channel) => channel.type === ChannelType.GuildCategory && channel.name === category);
  if (!parent) parent = await interaction.guild.channels.create({ name: category, type: ChannelType.GuildCategory, reason: 'Maomao: criar categoria de atendimento' });
  const channel = await interaction.guild.channels.create({ name: `ticket-${interaction.user.username}`.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 90), type: ChannelType.GuildText, parent: parent.id, topic: `maomao-ticket:${interaction.user.id}`, permissionOverwrites: [
    { id: interaction.guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] },
    { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] },
    { id: interaction.client.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels] }
  ], reason: 'Maomao: abrir ticket privado' });
  await channel.send({ content: `Olá, <@${interaction.user.id}>. Maomao abriu este atendimento. Explique o que você precisa; quanto mais detalhes, menos tempo perdemos procurando a causa.`, components: [closeRow()] });
  await updateGuildConfig(interaction.guildId, { tickets: { ...(config.tickets || {}), categoryName: category, panelTitle: config.tickets?.panelTitle || 'Central de atendimento da Maomao' } });
  return { channel, created: true };
}
export function closeRow() { return { type: 1, components: [{ type: 2, custom_id: 'ticket:close', label: 'Fechar ticket', style: 4 }] }; }
export async function closeTicket(interaction) {
  if (interaction.channel?.topic && ['maomao-ticket:', 'architect-ticket:'].some((prefix) => interaction.channel.topic.startsWith(prefix))) { await interaction.reply({ content: 'Ticket fechado. Este canal será removido em 3 segundos.', ephemeral: true }); setTimeout(() => interaction.channel.delete('Maomao: ticket fechado').catch(() => {}), 3000); return true; }
  await interaction.reply({ content: 'Este canal não parece ser um Ticket da Maomao.', ephemeral: true });
  return false;
}
