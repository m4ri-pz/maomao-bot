import fs from 'node:fs/promises';
import path from 'node:path';
const file = path.join(process.env.DATA_DIR || './data', 'rpg.json');
const base = { class: null, level: 1, xp: 0, hp: 100, gold: 25, location: 'Pavilhão das Ervas', inventory: ['Caderno de observações'], quest: { name: 'Primeiros registros', progress: 0, goal: 3 } };
async function all() { try { return JSON.parse(await fs.readFile(file, 'utf8')); } catch { return {}; } }
async function save(data) { await fs.mkdir(path.dirname(file), { recursive: true }); await fs.writeFile(file, JSON.stringify(data, null, 2)); }
export async function getPlayer(guildId, userId) { const data = await all(); return { ...base, ...(data[guildId]?.[userId] || {}), quest: { ...base.quest, ...(data[guildId]?.[userId]?.quest || {}) } }; }
export async function act(guildId, userId, action) {
  const data = await all(); data[guildId] ||= {}; const player = { ...base, ...(data[guildId][userId] || {}), quest: { ...base.quest, ...(data[guildId][userId]?.quest || {}) } };
  if (action.startsWith('class:')) player.class = { explorer: 'Cartógrafo', guardian: 'Guardião', scholar: 'Cronista' }[action.split(':')[1]] || player.class;
  if (action === 'explore') { const gain = Math.floor(Math.random() * 16) + 10; player.xp += gain; player.gold += Math.floor(gain / 3); player.quest.progress = Math.min(player.quest.goal, player.quest.progress + 1); if (player.xp >= player.level * 100) { player.xp -= player.level * 100; player.level += 1; player.hp = 100; } }
  if (action === 'rest') player.hp = 100;
  if (action === 'quest' && player.quest.progress >= player.quest.goal) { player.gold += 50; player.inventory.push('Selo do Palácio'); player.quest = { name: 'Novo caso', progress: 0, goal: 3 }; }
  data[guildId][userId] = player; await save(data); return player;
}
export function playerText(player) { return `Classe ${player.class || 'não escolhida'}\nNível ${player.level} · XP ${player.xp}/${player.level * 100}\nHP ${player.hp}/100 · Ouro ${player.gold}\nLocal: ${player.location}\nMissão: ${player.quest.name} (${player.quest.progress}/${player.quest.goal})\nInventário: ${player.inventory.join(', ')}`; }
