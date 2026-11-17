import { ChannelType, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { getGuildConfig, updateGuildConfig } from '../store/guild-store.js';
import { ticketType } from '../modules/tickets/ui/panel.js';
import { characterProfile } from '../personality/character-profile.js';

export async function createTicket(interaction, requestedType = 'support') {
  const config = await getGuildConfig(interaction.guildId); const type = ticketType(requestedType);
  const existing = interaction.guild.channels.cache.find((channel) => channel.topic?.endsWith(`:${interaction.user.id}`) && (channel.topic.startsWith('maomao-ticket:') || channel.topic.startsWith('architect-ticket:')));
  if (existing) return { channel: existing, created: false };
  const category = config.tickets?.categoryName || 'ATENDIMENTO';
  let parent = interaction.guild.channels.cache.find((channel) => channel.type === ChannelType.GuildCategory && channel.name === category);
  if (!parent) parent = await interaction.guild.channels.create({ name: category, type: ChannelType.GuildCategory, reason: 'Maomao: criar categoria de atendimento' });
  const safeName = interaction.user.username.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 70);
  const channel = await interaction.guild.channels.create({ name: `ticket-${type.id}-${safeName}`, type: ChannelType.GuildText, parent: parent.id, topic: `maomao-ticket:${type.id}:${interaction.user.id}`, permissionOverwrites: [{ id: interaction.guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] }, { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] }, { id: interaction.client.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels, PermissionFlagsBits.EmbedLinks] }], reason: `Maomao: abrir ticket de ${type.label}` });
  const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle(`Atendimento · ${type.label}`).setDescription(`Olá, <@${interaction.user.id}>. Maomao abriu este atendimento de **${type.label}**. Explique o que você precisa; quanto mais detalhes, menos tempo perdemos procurando a causa.`).setFooter({ text: 'Use o botão abaixo quando o atendimento terminar.' });
  await channel.send({ embeds: [embed], components: [closeRow()] });
  await updateGuildConfig(interaction.guildId, { tickets: { ...(config.tickets || {}), categoryName: category, panelTitle: config.tickets?.panelTitle || 'Central de atendimento da Maomao' } });
  return { channel, created: true, type };
}
export function closeRow() { return { type: 1, components: [{ type: 2, custom_id: 'ticket:close', label: 'Fechar atendimento', style: 4 }] }; }
export async function closeTicket(interaction) { if (interaction.channel?.topic && ['maomao-ticket:', 'architect-ticket:'].some((prefix) => interaction.channel.topic.startsWith(prefix))) { await interaction.reply({ content: 'Atendimento encerrado. Este canal será removido em 3 segundos.', ephemeral: true }); setTimeout(() => interaction.channel.delete('Maomao: atendimento encerrado').catch(() => {}), 3000); return true; } await interaction.reply({ content: 'Este canal não parece ser um atendimento da Maomao.', ephemeral: true }); return false; }
