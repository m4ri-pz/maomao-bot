import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder().setName('status').setDescription('Consulta a saúde e a latência da Maomao.').setDMPermission(false);
export async function execute(interaction) { return interaction.reply({ content: `✦ Maomao está em observação ativa.\nLatência: ${interaction.client.ws.ping}ms\nServidores sob cuidado: ${interaction.client.guilds.cache.size}.`, ephemeral: true }); }
