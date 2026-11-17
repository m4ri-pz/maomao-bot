import { createPlayer, RPG_CLASSES, playerText } from './domain/player.js';
import { readPlayer, writePlayer } from './storage.js';
export async function getPlayer(guildId, userId) { return createPlayer(await readPlayer(guildId, userId)); }
export async function act(guildId, userId, action) {
  const player = await getPlayer(guildId, userId);
  if (action.startsWith('class:')) player.class = RPG_CLASSES[action.split(':')[1]] || player.class;
  if (action === 'explore') { const gain = Math.floor(Math.random() * 16) + 10; player.xp += gain; player.gold += Math.floor(gain / 3); player.reputation += 1; player.quest.progress = Math.min(player.quest.goal, player.quest.progress + 1); if (player.xp >= player.level * 100) { player.xp -= player.level * 100; player.level += 1; player.hp = 100; } }
  if (action === 'rest') player.hp = 100;
  if (action === 'quest' && player.quest.progress >= player.quest.goal) { player.gold += 50; player.reputation += 3; player.inventory.push('Selo do Palácio'); player.quest = { name: 'Novo caso', progress: 0, goal: 3 }; }
  return writePlayer(guildId, userId, player);
}
export { playerText };
