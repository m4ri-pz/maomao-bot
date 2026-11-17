import { act } from '../../services/rpg.js';
import { buttons, card } from '../../commands/rpg.js';

export function handles(id) { return ['rpg:explore', 'rpg:rest', 'rpg:inventory', 'rpg:quest'].includes(id) || id.startsWith('rpg:class:'); }
export async function handle(interaction) { const action = interaction.customId.replace('rpg:', ''); const player = await act(interaction.guildId, interaction.user.id, action); return interaction.update({ embeds: [card(player, interaction.user.username)], components: buttons(player) }); }
