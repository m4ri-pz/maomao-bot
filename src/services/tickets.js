import { ChannelType, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { getGuildConfig, updateGuildConfig } from '../store/guild-store.js';
import { ticketType } from '../modules/tickets/ui/panel.js';
import { characterProfile } from '../personality/character-profile.js';
export async function createTicket(interaction, requestedType = 'support') {
  const config = await getGuildConfig(interaction.guildId); const type = ticketType(requestedType);
  const existing = interaction.guild.channels.cache.find((channel) => channel.topic?.endsWith(`:${interaction.user.id}`) && (channel.topic.startsWith('maomao-ticket:') || channel.topic.startsWith('architect-ticket:')));
  if (existing) return { channel: existing, created: false };
  const category = config.tickets?.categoryName || 'ATENDIMENTO'; let parent = interaction.guild.channels.cache.find((channel) => channel.type === ChannelType.GuildCategory && channel.name === category);
  if (!parent) parent = await interaction.guild.channels.create({ name: category, type: ChannelType.GuildCategory, reason: 'Maomao: preparar Câmara de Atendimento' });
  const safeName = interaction.user.username.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 70);
  const channel = await interaction.guild.channels.create({ name: `ticket-${type.id}-${safeName}`, type: ChannelType.GuildText, parent: parent.id, topic: `maomao-ticket:${type.id}:${interaction.user.id}`, permissionOverwrites: [{ id: interaction.guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] }, { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] }, { id: interaction.client.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels, PermissionFlagsBits.EmbedLinks] }], reason: `Maomao: abrir atendimento de ${type.label}` });
  const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle(`✦ Atendimento · ${type.label}`).setDescription(`Olá, <@${interaction.user.id}>. A Maomao registrou seu caso como **${type.label}**. Explique o que aconteceu com calma e detalhes; uma boa análise começa por um relato preciso.`).setFooter({ text: 'Quando o assunto estiver resolvido, use o botão para encerrar o registro.' });
  await channel.send({ embeds: [embed], components: [closeRow()] }); await updateGuildConfig(interaction.guildId, { tickets: { ...(config.tickets || {}), categoryName: category, panelTitle: config.tickets?.panelTitle || 'Câmara de Atendimento' } }); return { channel, created: true, type };
}
export function closeRow() { return { type: 1, components: [{ type: 2, custom_id: 'ticket:close', label: 'Encerrar registro', style: 4 }] }; }
export async function closeTicket(interaction) { if (interaction.channel?.topic && ['maomao-ticket:', 'architect-ticket:'].some((prefix) => interaction.channel.topic.startsWith(prefix))) { await interaction.reply({ content: 'O registro foi encerrado. Esta sala será arquivada em 3 segundos.', flags: 64 }); setTimeout(() => interaction.channel.delete('Maomao: arquivar atendimento').catch(() => {}), 3000); return true; } await interaction.reply({ content: 'Este canal não parece ser um registro da Câmara de Atendimento.', flags: 64 }); return false; }
