import fs from 'node:fs/promises';
import path from 'node:path';
import { env } from '../../config/env.js';
const file = path.join(env.dataDir, 'provisioning-state.json');
async function read() { try { return JSON.parse(await fs.readFile(file, 'utf8')); } catch { return {}; } }
export async function getProvisioningState(guildId) { return (await read())[guildId] || null; }
export async function saveProvisioningState(guildId, patch) { const all = await read(); all[guildId] = { ...(all[guildId] || {}), ...patch, updatedAt: new Date().toISOString() }; await fs.mkdir(path.dirname(file), { recursive: true }); const temp = `${file}.tmp`; await fs.writeFile(temp, JSON.stringify(all, null, 2)); await fs.rename(temp, file); return all[guildId]; }
