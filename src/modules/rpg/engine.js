import { createPlayer, RPG_CLASSES, playerText } from './domain/player.js';
import { readPlayer, writePlayer } from './storage.js';
import { locations } from './content/locations.js';
import { cases } from './content/cases.js';
import { recipes } from './content/recipes.js';

export async function getPlayer(guildId, userId) { return createPlayer(await readPlayer(guildId, userId)); }
function addXp(player, amount) { player.xp += amount; while (player.xp >= player.level * 100) { player.xp -= player.level * 100; player.level += 1; player.hp = 100; } }
function addIngredient(player, ingredient) { if (!player.ingredients.includes(ingredient)) player.ingredients.push(ingredient); }
function startCase(player, id) { const item = cases.find((entry) => entry.id === id); if (item && !player.casebook.includes(id)) { player.activeCase = id; player.discoveredClues = []; } }
function inspectClue(player, caseId, clueId) { const item = cases.find((entry) => entry.id === caseId); const clue = item?.clues.find((entry) => entry.id === clueId); if (!item || !clue || player.activeCase !== caseId || player.discoveredClues.includes(clueId)) return; player.discoveredClues.push(clueId); player.stats.investigations += 1; addXp(player, 18); player.reputation += 2; if (player.discoveredClues.length >= item.clues.length) { player.casebook.push(item.id); player.activeCase = null; player.discoveredClues = []; player.gold += 50; player.inventory.push(item.reward); player.quest.progress = Math.min(player.quest.goal, player.quest.progress + 1); } }
function craft(player, id) { const recipe = recipes.find((entry) => entry.id === id); if (!recipe || player.alchemy.discovered.includes(recipe.id)) return; if (!recipe.cost.every((item) => player.ingredients.includes(item))) return; player.ingredients = player.ingredients.filter((item) => !recipe.cost.includes(item)); player.alchemy.discovered.push(recipe.id); player.inventory.push(recipe.result); player.stats.remedies += 1; player.reputation += 1; addXp(player, 14); }
export async function act(guildId, userId, action) {
  const player = await getPlayer(guildId, userId);
  if (action.startsWith('class:')) player.class = RPG_CLASSES[action.split(':')[1]] || player.class;
  if (action.startsWith('travel:')) { const location = locations.find((item) => item.id === action.split(':')[1]); if (location) { player.location = location.name; player.stats.explorations += 1; addXp(player, 8); addIngredient(player, location.finds[player.stats.explorations % location.finds.length]); player.quest.progress = Math.min(player.quest.goal, player.quest.progress + 1); } }
  if (action.startsWith('case:start:')) startCase(player, action.split(':')[2]);
  if (action.startsWith('clue:')) inspectClue(player, action.split(':')[1], action.split(':')[2]);
  if (action.startsWith('craft:')) craft(player, action.split(':')[1]);
  if (action === 'explore') { addXp(player, 12); player.gold += 5; player.reputation += 1; player.quest.progress = Math.min(player.quest.goal, player.quest.progress + 1); }
  if (action === 'rest') player.hp = 100;
  if (action === 'quest' && player.quest.progress >= player.quest.goal) { player.gold += 50; player.reputation += 3; player.inventory.push('Selo do Palácio'); player.quest = { name: 'Novo caso', progress: 0, goal: 3 }; }
  return writePlayer(guildId, userId, player);
}
export { playerText };
