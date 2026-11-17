import { SlashCommandBuilder } from 'discord.js';
import { canManageServer } from '../core/safety.js';
import { getGuildConfig } from '../store/guild-store.js';
import { ticketPanel } from '../modules/tickets/ui/panel.js';
export const data = new SlashCommandBuilder().setName('painel-tickets').setDescription('Publica o painel de atendimento da Maomao.').setDMPermission(false);
export async function execute(interaction) { if (!canManageServer(interaction.member)) return interaction.reply({ content: 'Apenas a equipe autorizada pode publicar o painel.', ephemeral: true }); const config = await getGuildConfig(interaction.guildId); await interaction.channel.send(ticketPanel(config)); return interaction.reply({ content: 'Painel de atendimento publicado neste canal.', ephemeral: true }); }
