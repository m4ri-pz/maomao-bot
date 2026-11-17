import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { canManageServer } from '../core/safety.js';
import { getGuildConfig } from '../store/guild-store.js';
import { characterProfile } from '../personality/character-profile.js';
export const data = new SlashCommandBuilder().setName('painel-tickets').setDescription('Publica o painel de atendimento da Maomao.').setDMPermission(false);
export async function execute(interaction) {
  if (!canManageServer(interaction.member)) return interaction.reply({ content: 'Apenas a equipe autorizada pode publicar o painel.', ephemeral: true });
  const config = await getGuildConfig(interaction.guildId);
  const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle(config.tickets.panelTitle).setDescription('Precisa de ajuda? Abra um ticket privado e explique o caso. Quanto mais detalhes, menos tempo perdemos procurando a causa.').setFooter({ text: 'Maomao · atendimento organizado' });
  const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ticket:open').setLabel('Abrir ticket').setEmoji('🎫').setStyle(ButtonStyle.Primary));
  await interaction.channel.send({ embeds: [embed], components: [row] });
  return interaction.reply({ content: 'Painel publicado neste canal.', ephemeral: true });
}
