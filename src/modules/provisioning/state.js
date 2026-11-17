import path from 'node:path';
import { env } from '../../config/env.js';
import { readJson, updateJson } from '../../store/json-store.js';

const file = path.join(env.dataDir, 'provisioning-state.json');
export async function getProvisioningState(guildId) { const all = await readJson(file, {}); return all[guildId] || null; }
export async function saveProvisioningState(guildId, patch) { let saved; await updateJson(file, {}, (all) => { saved = { ...(all[guildId] || {}), ...patch, updatedAt: new Date().toISOString() }; return { ...all, [guildId]: saved }; }); return saved; }
