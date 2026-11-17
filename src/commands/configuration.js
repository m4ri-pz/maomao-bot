import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { getGuildConfig } from '../store/guild-store.js';
import { canArchitect } from '../core/safety.js';

export const data = new SlashCommandBuilder().setName('configuracao').setDescription('Abre o painel visual do Discord Architect.');
export async function execute(interaction) {
  if (!canArchitect(interaction.member)) return interaction.reply({ content: 'Apenas administradores ou membros com Gerenciar Servidor podem abrir este painel.', ephemeral: true });
  const config = await getGuildConfig(interaction.guildId);
  const embed = new EmbedBuilder().setColor(0x5865f2).setTitle(`${config.personality.name} · Painel do servidor`).setDescription('Escolha uma área. O Architect sempre mostra uma simulação antes de aplicar alterações.').addFields({ name: 'Template atual', value: config.template, inline: true }, { name: 'Modo seguro', value: config.dryRun ? 'Simulação ligada' : 'Aplicação permitida', inline: true });
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('panel:template').setLabel('Templates').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('panel:roles').setLabel('Cargos').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('panel:channels').setLabel('Canais').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('panel:automation').setLabel('Automações').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('panel:personality').setLabel('Personalidade').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('panel:tickets').setLabel('Tickets').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('panel:rpg').setLabel('RPG').setStyle(ButtonStyle.Success)
  );
  return interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
}
