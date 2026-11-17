import fs from 'node:fs/promises';
import path from 'node:path';
const file = path.join(process.env.DATA_DIR || './data', 'rpg.json');
async function readAll() { try { return JSON.parse(await fs.readFile(file, 'utf8')); } catch { return {}; } }
async function writeAll(data) { await fs.mkdir(path.dirname(file), { recursive: true }); const temp = `${file}.tmp`; await fs.writeFile(temp, JSON.stringify(data, null, 2)); await fs.rename(temp, file); }
export async function readPlayer(guildId, userId) { const all = await readAll(); return all[guildId]?.[userId] || null; }
export async function writePlayer(guildId, userId, player) { const all = await readAll(); all[guildId] ||= {}; all[guildId][userId] = player; await writeAll(all); return player; }
