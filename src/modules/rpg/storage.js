import path from 'node:path';
import { env } from '../../config/env.js';
import { readJson, updateJson } from '../../store/json-store.js';

const file = path.join(env.dataDir, 'rpg.json');

export async function readPlayer(guildId, userId) {
  const all = await readJson(file, {});
  return all[guildId]?.[userId] || null;
}

export async function writePlayer(guildId, userId, player) {
  await updateJson(file, {}, (all) => ({ ...all, [guildId]: { ...(all[guildId] || {}), [userId]: player } }));
  return player;
}

export async function updatePlayer(guildId, userId, updater) {
  let result;
  await updateJson(file, {}, async (all) => {
    const current = all[guildId]?.[userId] || null;
    result = await updater(current);
    return { ...all, [guildId]: { ...(all[guildId] || {}), [userId]: result } };
  });
  return result;
}
