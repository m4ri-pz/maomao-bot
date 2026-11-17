import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { getPlayer, playerText } from '../services/rpg.js';
export const data = new SlashCommandBuilder().setName('rpg').setDescription('Abre o painel do RPG interativo.');
export async function execute(interaction) { const player = await getPlayer(interaction.guildId, interaction.user.id); return interaction.reply({ embeds: [card(player, interaction.user.username)], components: [buttons()] }); }
export function card(player, name) { return new EmbedBuilder().setColor(0x9b59b6).setTitle(`Crônicas de Aurora · ${name}`).setDescription('Um RPG social controlado por painéis. Explore, descanse e evolua seu personagem.').addFields({ name: 'Status', value: playerText(player) }); }
export function buttons() { return new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('rpg:explore').setLabel('Explorar').setStyle(ButtonStyle.Primary), new ButtonBuilder().setCustomId('rpg:rest').setLabel('Descansar').setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId('rpg:inventory').setLabel('Inventário').setStyle(ButtonStyle.Secondary)); }
