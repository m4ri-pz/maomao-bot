import { SlashCommandBuilder } from 'discord.js';
import { canManageServer } from '../core/safety.js';
import { getGuildConfig } from '../store/guild-store.js';
import { ticketPanel } from '../modules/tickets/ui/panel.js';
export const data = new SlashCommandBuilder().setName('painel-tickets').setDescription('Publica a Câmara de Atendimento da Maomao.').setDMPermission(false);
export async function execute(interaction) { if (!canManageServer(interaction.member)) return interaction.reply({ content: 'Apenas a equipe autorizada pode abrir a Câmara de Atendimento.', ephemeral: true }); const config = await getGuildConfig(interaction.guildId); await interaction.channel.send(ticketPanel(config)); return interaction.reply({ content: 'A Câmara de Atendimento foi publicada neste salão.', ephemeral: true }); }
