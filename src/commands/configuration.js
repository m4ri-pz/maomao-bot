import { SlashCommandBuilder } from 'discord.js';
import { canManageServer } from '../core/safety.js';
import { homeView } from '../panels/home.js';

export const data = new SlashCommandBuilder().setName('configuracao').setDescription('Abre o painel visual da Maomao.').setDMPermission(false);
export async function execute(interaction) {
  if (!canManageServer(interaction.member)) return interaction.reply({ content: 'Apenas administradores ou membros com Gerenciar Servidor podem abrir este painel.', ephemeral: true });
  const view = await homeView(interaction.guildId);
  return interaction.reply({ embeds: [view.embed], components: view.components, ephemeral: true });
}
