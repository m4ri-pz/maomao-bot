export const RPG_CLASSES = Object.freeze({ explorer: 'Cartógrafo', guardian: 'Guardião', scholar: 'Cronista', apothecary: 'Boticária' });
export const initialPlayer = Object.freeze({ class: null, level: 1, xp: 0, hp: 100, gold: 25, location: 'Pavilhão das Ervas', inventory: ['Caderno de observações'], ingredients: ['erva-doce', 'água limpa'], quest: { name: 'Primeiros registros', progress: 0, goal: 3 }, casebook: [], activeCase: null, discoveredClues: [], lastEvent: 'Seu caderno está em branco. Escolha uma função para começar os registros.', alchemy: { discovered: [], ingredients: [] }, experiments: [], reputation: 0, stats: { investigations: 0, explorations: 0, remedies: 0, experiments: 0 }, talents: { observation: 1, pharmacology: 1, deduction: 1, tolerance: 0 }, affinities: {} });

const integer = (value, fallback, min = 0, max = Number.MAX_SAFE_INTEGER) => { const number = Number(value); return Number.isFinite(number) ? Math.min(max, Math.max(min, Math.trunc(number))) : fallback; };
const strings = (value, fallback = []) => Array.isArray(value) ? [...new Set(value.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim()))] : [...fallback];

export function createPlayer(saved = {}) {
  const record = saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
  const level = integer(record.level, 1, 1, 999);
  const quest = record.quest && typeof record.quest === 'object' ? record.quest : {};
  const alchemy = record.alchemy && typeof record.alchemy === 'object' ? record.alchemy : {};
  const stats = record.stats && typeof record.stats === 'object' ? record.stats : {};
  const talents = record.talents && typeof record.talents === 'object' ? record.talents : {};
  const affinities = record.affinities && typeof record.affinities === 'object' && !Array.isArray(record.affinities) ? record.affinities : {};
  return {
    ...initialPlayer, ...record,
    class: typeof record.class === 'string' && Object.values(RPG_CLASSES).includes(record.class) ? record.class : null,
    level, xp: integer(record.xp, 0, 0, level * 10000), hp: integer(record.hp, 100, 0, 100), gold: integer(record.gold, 25, 0),
    location: typeof record.location === 'string' && record.location.trim() ? record.location : initialPlayer.location,
    quest: { ...initialPlayer.quest, ...quest, name: typeof quest.name === 'string' && quest.name.trim() ? quest.name : initialPlayer.quest.name, progress: integer(quest.progress, 0, 0), goal: integer(quest.goal, 3, 1, 999) },
    alchemy: { ...initialPlayer.alchemy, ...alchemy, discovered: strings(alchemy.discovered), ingredients: strings(alchemy.ingredients) },
    stats: { ...initialPlayer.stats, ...stats, investigations: integer(stats.investigations, 0), explorations: integer(stats.explorations, 0), remedies: integer(stats.remedies, 0), experiments: integer(stats.experiments, 0) },
    talents: { ...initialPlayer.talents, ...talents, observation: integer(talents.observation, 1, 0), pharmacology: integer(talents.pharmacology, 1, 0), deduction: integer(talents.deduction, 1, 0), tolerance: integer(talents.tolerance, 0, 0) },
    inventory: strings(record.inventory, initialPlayer.inventory), ingredients: strings(record.ingredients, initialPlayer.ingredients), casebook: strings(record.casebook), discoveredClues: strings(record.discoveredClues), experiments: strings(record.experiments),
    activeCase: typeof record.activeCase === 'string' && record.activeCase.trim() ? record.activeCase : null,
    lastEvent: typeof record.lastEvent === 'string' && record.lastEvent.trim() ? record.lastEvent : initialPlayer.lastEvent,
    reputation: integer(record.reputation, 0), affinities
  };
}
export function playerText(player) { return `Classe ${player.class || 'não escolhida'}\nNível ${player.level} · XP ${player.xp}/${player.level * 100}\nHP ${player.hp}/100 · Ouro ${player.gold}\nLocal: ${player.location}\nReputação: ${player.reputation}\nCasos resolvidos: ${player.casebook.length}\nExperimentos: ${player.stats.experiments}`; }
