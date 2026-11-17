import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { canManageServer } from '../core/safety.js';
import { characterProfile } from '../personality/character-profile.js';

export const data = new SlashCommandBuilder().setName('painel-admin').setDescription('Abre o centro de ferramentas da Maomao.').setDMPermission(false);
function button(id, label, style = ButtonStyle.Secondary) { return new ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style); }
export async function execute(interaction) {
  if (!canManageServer(interaction.member)) return interaction.reply({ content: 'Você não tem permissão para abrir o centro administrativo.', ephemeral: true });
  const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle('Maomao · Centro administrativo').setDescription('Hm. Vamos organizar sem fazer bagunça. Escolha uma área para revisar; alterações importantes aparecem em prévia antes da aplicação.').addFields({ name: 'Base', value: 'Palácio das Ervas · permissões seguras', inline: true }, { name: 'Proteção', value: 'Sem exclusões automáticas', inline: true }).setFooter({ text: 'Use /template-oficial para aplicar a base completa' });
  const components = [
    new ActionRowBuilder().addComponents(button('panel:template', 'Base oficial', ButtonStyle.Primary), button('panel:roles', 'Cargos'), button('panel:channels', 'Canais'), button('panel:automation', 'Automações', ButtonStyle.Success)),
    new ActionRowBuilder().addComponents(button('panel:tickets', 'Tickets', ButtonStyle.Primary), button('panel:personality', 'Identidade'), button('panel:help', 'Como usar'))
  ];
  return interaction.reply({ embeds: [embed], components, ephemeral: true });
}
