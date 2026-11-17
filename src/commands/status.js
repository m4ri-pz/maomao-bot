import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder().setName('status').setDescription('Mostra o estado do Discord Architect.');
export async function execute(interaction) { return interaction.reply({ content: `Online. Latência: ${interaction.client.ws.ping}ms. Servidores: ${interaction.client.guilds.cache.size}.`, ephemeral: true }); }
