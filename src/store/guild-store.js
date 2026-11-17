import fs from 'node:fs/promises';
import path from 'node:path';

const dataDir = process.env.DATA_DIR || './data';
const file = path.join(dataDir, 'guilds.json');
const defaults = { template: 'community', personality: { name: 'A.U.R.A.', tone: 'clara, prestativa e técnica' }, dryRun: true, automations: { welcome: false, auditLog: false } };

async function readAll() {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch { return {}; }
}
async function writeAll(data) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}
export async function getGuildConfig(guildId) {
  const all = await readAll();
  return { ...defaults, ...(all[guildId] ?? {}) };
}
export async function updateGuildConfig(guildId, patch) {
  const all = await readAll();
  all[guildId] = { ...defaults, ...(all[guildId] ?? {}), ...patch };
  await writeAll(all);
  return all[guildId];
}
