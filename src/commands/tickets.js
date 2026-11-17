import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { canArchitect } from '../core/safety.js';
export const data = new SlashCommandBuilder().setName('painel-tickets').setDescription('Publica o painel configurável de atendimento.');
export async function execute(interaction) {
  if (!canArchitect(interaction.member)) return interaction.reply({ content: 'Apenas a equipe autorizada pode publicar o painel.', ephemeral: true });
  const embed = new EmbedBuilder().setColor(0x5865f2).setTitle('Central de atendimento').setDescription('Precisa de ajuda? Abra um ticket privado e a equipe poderá atender você.');
  const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ticket:open').setLabel('Abrir ticket').setEmoji('🎫').setStyle(ButtonStyle.Primary));
  await interaction.channel.send({ embeds: [embed], components: [row] });
  return interaction.reply({ content: 'Painel publicado neste canal.', ephemeral: true });
}
