import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder().setName('status').setDescription('Mostra o estado e a latência da Maomao.').setDMPermission(false);
export async function execute(interaction) { return interaction.reply({ content: `Maomao está online. Latência: ${interaction.client.ws.ping}ms. Servidores: ${interaction.client.guilds.cache.size}.`, ephemeral: true }); }
