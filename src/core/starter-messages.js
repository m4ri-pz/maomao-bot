import { EmbedBuilder } from 'discord.js';
import { characterProfile } from '../personality/character-profile.js';
import { applyImage } from '../branding/discord-assets.js';

const messages = {
  welcome: { title: '✦ Bem-vindo ao Palácio', description: 'Entre, observe e encontre seu lugar.', fields: [{ name: 'Comece aqui', value: 'Leia `#regras` e explore com calma.' }] },
  rules: { title: '✦ Regras do Palácio', description: 'Respeito, bom senso e cada assunto em seu devido lugar.', fields: [{ name: 'Em caso de dúvida', value: 'Fale com a equipe pela Central de Atendimento.' }] },
  announcements: { title: '✦ Anúncios', description: 'Avisos importantes da equipe e da Maomao.', fields: [{ name: 'Acompanhe', value: 'Ative o cargo de avisos se quiser receber novidades.' }] },
  'case-library': { title: '✦ Biblioteca', description: 'Casos encerrados e descobertas preservadas.', fields: [{ name: 'Novo caso', value: 'Use `#casos` para iniciar uma investigação.' }] },
  'case-reports': { title: '✦ Relatórios', description: 'Registros finais das investigações.', fields: [{ name: 'Arquivo', value: 'Somente leitura para manter tudo intacto.' }] },
  'rpg-panel': { title: '✦ Registros do Palácio', description: 'Abra `/rpg` para explorar, investigar e preparar receitas.', fields: [{ name: 'Começar', value: 'Tudo acontece pelos botões e menus do painel.' }] },
  tickets: { title: '✦ Câmara de Atendimento', description: 'Precisa de ajuda? Escolha uma categoria no painel.', fields: [{ name: 'Discrição', value: 'O atendimento será privado.' }] }
};
export function starterEmbed(key) { const content = messages[key] || messages.welcome; const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle(content.title).setDescription(content.description).addFields(content.fields).setFooter({ text: characterProfile.signature }); return applyImage(embed, key === 'rpg-panel' ? 'rpgPanel' : key === 'tickets' ? 'ticketPanel' : 'mainPanel'); }
