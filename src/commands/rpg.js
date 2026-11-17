import { SlashCommandBuilder } from 'discord.js';
import { getPlayer } from '../services/rpg.js';
import { dashboardView } from '../modules/rpg/ui/panels.js';
export const data = new SlashCommandBuilder().setName('rpg').setDescription('Abre os Registros interativos do Palácio.').setDMPermission(false);
export async function execute(interaction) { const player = await getPlayer(interaction.guildId, interaction.user.id); const view = dashboardView(player, interaction.user.username); return interaction.reply({ embeds: [view.embed], files: view.files, components: view.components }); }
