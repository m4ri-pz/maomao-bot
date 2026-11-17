import path from 'node:path';
import { env } from '../config/env.js';
import { readJson, updateJson } from './json-store.js';

const file = path.join(env.dataDir, 'guilds.json');
const defaults = { template: 'maomao-palace', personality: { name: 'Maomao', tone: 'curiosa, precisa, analítica, reservada e com humor seco' }, dryRun: true, automations: { welcome: false, auditLog: false }, tickets: { categoryName: '╭・ATENDIMENTO', panelTitle: 'Câmara de Atendimento' } };

function merge(current = {}) {
  return { ...defaults, ...current, personality: { ...defaults.personality, ...(current.personality ?? {}) }, automations: { ...defaults.automations, ...(current.automations ?? {}) }, tickets: { ...defaults.tickets, ...(current.tickets ?? {}) } };
}

export async function getGuildConfig(guildId) {
  const all = await readJson(file, {});
  return merge(all[guildId]);
}

export async function updateGuildConfig(guildId, patch) {
  const all = await updateJson(file, {}, (current) => ({
    ...current,
    [guildId]: merge({ ...current[guildId], ...patch, personality: { ...(current[guildId]?.personality ?? {}), ...(patch.personality ?? {}) }, automations: { ...(current[guildId]?.automations ?? {}), ...(patch.automations ?? {}) }, tickets: { ...(current[guildId]?.tickets ?? {}), ...(patch.tickets ?? {}) } })
  }));
  return all[guildId];
}
