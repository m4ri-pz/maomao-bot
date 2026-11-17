import { characterProfile } from './character-profile.js';
export const personality = {
  name: () => characterProfile.name,
  panelTitle: (area) => `${characterProfile.name} · ${area}`,
  safe: (text) => `✦ ${text}`,
  error: (text) => `Não consegui concluir esta etapa ainda. ${text}`,
  preview: 'Primeiro eu mostro o plano. Você decide quando aplicar.',
  noDestructiveActions: 'Nenhum canal ou cargo será apagado automaticamente nesta etapa.'
};
