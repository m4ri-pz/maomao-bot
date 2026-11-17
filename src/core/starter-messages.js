import { EmbedBuilder } from 'discord.js';
import { characterProfile } from '../personality/character-profile.js';
import { applyImage } from '../branding/discord-assets.js';

const messages = {
  welcome: { title: 'Maomao · Bem-vindo ao Palácio das Ervas', description: 'Observe os detalhes, escolha seu caminho e explore uma comunidade construída para investigação, botânica, RPG e boa convivência.', fields: [{ name: 'Comece por aqui', value: 'Leia as regras, escolha seus cargos e abra o painel de configuração quando precisar.' }] },
  rules: { title: 'Regras do Palácio', description: 'Respeite as pessoas, mantenha cada assunto em seu canal e não publique conteúdo ilegal, perigoso ou sem autorização.', fields: [{ name: 'Regra da Maomao', value: 'Se algo parece confuso, explique antes de agir. A equipe pode orientar e registrar ocorrências.' }] },
  announcements: { title: 'Anúncios oficiais', description: 'Este canal recebe comunicados importantes da equipe e da Maomao.', fields: [{ name: 'Notificações', value: 'Ative o cargo de anúncios caso queira acompanhar novidades.' }] },
  'case-library': { title: 'Biblioteca de casos', description: 'Arquivo de investigações encerradas, pistas organizadas e descobertas da comunidade.', fields: [{ name: 'Como contribuir', value: 'Use casos-abertos para novas investigações e relatórios-de-caso para conclusões revisadas.' }] },
  'case-reports': { title: 'Relatórios de caso', description: 'Registros revisados pela equipe e pela Maomao.', fields: [{ name: 'Preservação', value: 'Este canal é somente leitura para manter o arquivo organizado.' }] },
  'rpg-panel': { title: 'Registros do Palácio · RPG', description: 'Abra `/rpg` para criar sua ficha e use os botões para explorar, investigar, cuidar da saúde e evoluir.', fields: [{ name: 'Tudo por interação', value: 'O RPG foi desenhado para funcionar com painéis, menus e escolhas narrativas.' }] },
  tickets: { title: 'Central de atendimento', description: 'Precisa de ajuda? Use o botão do painel de Tickets para abrir um canal privado com a equipe.', fields: [{ name: 'Privacidade', value: 'Cada pessoa possui um atendimento separado; não publique informações sensíveis em canais públicos.' }] }
};

export function starterEmbed(key) { const content = messages[key] || messages.welcome; const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle(content.title).setDescription(content.description).addFields(content.fields).setFooter({ text: 'Maomao · Palácio das Ervas' }); return applyImage(embed, key === 'rpg-panel' ? 'rpgPanel' : key === 'tickets' ? 'ticketPanel' : 'mainPanel'); }
