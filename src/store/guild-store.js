import fs from 'node:fs/promises';
import path from 'node:path';

const dataDir = process.env.DATA_DIR || './data';
const file = path.join(dataDir, 'guilds.json');
const defaults = { template: 'maomao-palace', personality: { name: 'Maomao', tone: 'curiosa, precisa, analítica, reservada e com humor seco' }, dryRun: true, automations: { welcome: false, auditLog: false }, tickets: { categoryName: '╭・ATENDIMENTO', panelTitle: 'Câmara de Atendimento' } };

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
  const current = all[guildId] ?? {};
  return { ...defaults, ...current, personality: { ...defaults.personality, ...(current.personality ?? {}) }, automations: { ...defaults.automations, ...(current.automations ?? {}) }, tickets: { ...defaults.tickets, ...(current.tickets ?? {}) } };
}
export async function updateGuildConfig(guildId, patch) {
  const all = await readAll();
  const current = all[guildId] ?? {};
  all[guildId] = { ...defaults, ...current, ...patch, personality: { ...defaults.personality, ...(current.personality ?? {}), ...(patch.personality ?? {}) }, automations: { ...defaults.automations, ...(current.automations ?? {}), ...(patch.automations ?? {}) }, tickets: { ...defaults.tickets, ...(current.tickets ?? {}), ...(patch.tickets ?? {}) } };
  await writeAll(all);
  return all[guildId];
}
