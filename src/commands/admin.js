import { SlashCommandBuilder } from 'discord.js';
import { canManageServer } from '../core/safety.js';
import { homeView } from '../panels/home.js';

export const data = new SlashCommandBuilder().setName('painel-admin').setDescription('Abre o centro de ferramentas da Maomao.').setDMPermission(false);
export async function execute(interaction) {
  if (!canManageServer(interaction.member)) return interaction.reply({ content: 'Você não tem permissão para abrir o centro administrativo.', ephemeral: true });
  const view = await homeView(interaction.guildId);
  return interaction.reply({ content: 'Centro da Maomao aberto. Escolha uma área para revisar.', embeds: [view.embed], files: view.files, components: view.components, ephemeral: true });
}
