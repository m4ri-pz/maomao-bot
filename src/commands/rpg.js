import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { getPlayer, playerText } from '../services/rpg.js';
import { characterProfile } from '../personality/character-profile.js';
export const data = new SlashCommandBuilder().setName('rpg').setDescription('Abre o RPG interativo do Palácio.').setDMPermission(false);
export async function execute(interaction) { const player = await getPlayer(interaction.guildId, interaction.user.id); return interaction.reply({ embeds: [card(player, interaction.user.username)], components: buttons(player) }); }
export function card(player, name) { return new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle(`Registros do Palácio · ${name}`).setDescription('Um RPG social controlado por painéis. Escolha uma função, investigue ocorrências e avance por missões.').addFields({ name: 'Ficha', value: playerText(player) }).setFooter({ text: 'Maomao · sua história começa com uma escolha' }); }
export function buttons(player) {
  if (!player.class) return [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('rpg:class:explorer').setLabel('Cartógrafo').setStyle(ButtonStyle.Primary), new ButtonBuilder().setCustomId('rpg:class:guardian').setLabel('Guardião').setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId('rpg:class:scholar').setLabel('Cronista').setStyle(ButtonStyle.Secondary))];
  return [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('rpg:explore').setLabel('Explorar').setStyle(ButtonStyle.Primary), new ButtonBuilder().setCustomId('rpg:rest').setLabel('Descansar').setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId('rpg:inventory').setLabel('Inventário').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('rpg:quest').setLabel('Concluir missão').setStyle(ButtonStyle.Primary))];
}
