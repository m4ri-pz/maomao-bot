import { SlashCommandBuilder } from 'discord.js';
import { canArchitect } from '../core/safety.js';
export const data = new SlashCommandBuilder().setName('painel-admin').setDescription('Abre o centro de ferramentas administrativas.');
export async function execute(interaction) { if (!canArchitect(interaction.member)) return interaction.reply({ content: 'Você não tem permissão para abrir o centro administrativo.', ephemeral: true }); return interaction.reply({ content: 'Centro administrativo: use `/configuracao` para arquitetura, `/painel-tickets` para atendimento e `/rpg` para o módulo de jogo. Ferramentas destrutivas sempre terão confirmação.', ephemeral: true }); }
