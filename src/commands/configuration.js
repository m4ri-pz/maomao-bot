import { SlashCommandBuilder } from 'discord.js';
import { canManageServer } from '../core/safety.js';
import { homeView } from '../panels/home.js';

export const data = new SlashCommandBuilder().setName('configuracao').setDescription('Abre o Salão de Organização da Maomao.').setDMPermission(false);
export async function execute(interaction) {
  if (!canManageServer(interaction.member)) return interaction.reply({ content: 'Apenas a equipe responsável pelo servidor pode abrir o Salão de Organização.', flags: 64 });
  const view = await homeView(interaction.guildId);
  return interaction.reply({ embeds: [view.embed], files: view.files, components: view.components, flags: 64 });
}
