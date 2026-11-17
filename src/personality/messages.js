import { characterProfile } from './character-profile.js';
export const personality = {
  name: () => characterProfile.name,
  panelTitle: (area, name = characterProfile.name) => `${name} · ${area}`,
  safe: (text) => `✦ ${text}`,
  error: (text) => `A análise encontrou um obstáculo. ${text}`,
  preview: 'Primeiro examinamos o plano. Depois você decide se ele merece ser aplicado.',
  noDestructiveActions: 'Nenhum cargo, canal ou mensagem existente será apagado automaticamente.',
  cancel: 'Tudo bem. A operação foi arquivada sem alterações.',
  saved: 'Registro atualizado. A mudança foi guardada, mas ainda não foi aplicada ao servidor.',
  footer: characterProfile.signature
};
