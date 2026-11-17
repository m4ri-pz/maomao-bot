import { maomaoTheme } from './theme.js';
export const visualAssets = Object.freeze(Object.fromEntries(Object.entries(maomaoTheme.assets).map(([id, path]) => [id, { id, path, alt: `Asset visual da Maomao: ${id}`, usage: id.includes('Panel') ? 'embed-panel' : 'branding' }])));
export function asset(id) { return visualAssets[id] ?? null; }
