import fs from 'node:fs/promises';
import path from 'node:path';
const file = path.join(process.env.DATA_DIR || './data', 'rpg.json');
const base = { level: 1, xp: 0, hp: 100, gold: 25, location: 'Vila Aurora', inventory: ['Mapa antigo'] };
async function all() { try { return JSON.parse(await fs.readFile(file, 'utf8')); } catch { return {}; } }
async function save(data) { await fs.mkdir(path.dirname(file), { recursive: true }); await fs.writeFile(file, JSON.stringify(data, null, 2)); }
export async function getPlayer(guildId, userId) { const data = await all(); return { ...base, ...(data[guildId]?.[userId] || {}) }; }
export async function act(guildId, userId, action) {
  const data = await all(); data[guildId] ||= {}; const player = { ...base, ...(data[guildId][userId] || {}) };
  if (action === 'explore') { const gain = Math.floor(Math.random() * 16) + 10; player.xp += gain; player.gold += Math.floor(gain / 3); if (player.xp >= player.level * 100) { player.xp -= player.level * 100; player.level += 1; player.hp = 100; } }
  if (action === 'rest') player.hp = 100;
  if (action === 'inventory') return player;
  data[guildId][userId] = player; await save(data); return player;
}
export function playerText(player) { return `Nível ${player.level} · XP ${player.xp}/${player.level * 100}\nHP ${player.hp}/100 · Ouro ${player.gold}\nLocal: ${player.location}\nInventário: ${player.inventory.join(', ')}`; }
