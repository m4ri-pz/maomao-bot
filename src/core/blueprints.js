const blueprints = {
  'maomao-palace': {
    id: 'maomao-palace',
    name: 'Palácio das Ervas · Base essencial',
    description: 'Uma estrutura enxuta para convivência, atendimento, investigação e RPG — somente o necessário para o Palácio respirar.',
    staffRoles: ['Regente do Palácio', 'Curandeiro-chefe', 'Investigador', 'Mestre de Atendimento'],
    roles: [
      { name: 'Regente do Palácio', color: 0xc89b55, permissions: ['ManageGuild', 'ManageRoles', 'ManageChannels'], hoist: true },
      { name: 'Curandeiro-chefe', color: 0x9c4b68, permissions: ['ManageMessages', 'ManageThreads'], hoist: true },
      { name: 'Investigador', color: 0x6d3bb8, permissions: ['ManageMessages', 'ViewChannel', 'SendMessages', 'ReadMessageHistory'], hoist: true },
      { name: 'Mestre de Atendimento', color: 0xa875e8, permissions: ['ManageMessages', 'ManageThreads', 'ViewChannel', 'SendMessages', 'ReadMessageHistory'], hoist: true },
      { name: 'Apoiador do Palácio', color: 0xc89b55, permissions: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] },
      { name: 'Visitante', color: 0xd8d3e2, permissions: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] },
      { name: 'Bot', color: 0x6d3bb8, permissions: ['ViewChannel', 'SendMessages', 'ReadMessageHistory', 'EmbedLinks', 'AttachFiles'] }
    ],
    categories: [
      { name: 'PORTÃO DO PALÁCIO', description: 'A entrada: boas-vindas, regras e avisos.', channels: [
        { name: 'boas-vindas', type: 'text', readOnly: true, topic: 'Entrada do Palácio das Ervas.', starter: 'welcome' },
        { name: 'regras', type: 'text', readOnly: true, topic: 'Regras de convivência do Palácio.', starter: 'rules' },
        { name: 'anúncios', type: 'text', readOnly: true, topic: 'Avisos oficiais da equipe.', starter: 'announcements' }
      ] },
      { name: 'CASA DAS ERVAS', description: 'Conversa sobre ervas, receitas e descobertas.', channels: [
        { name: 'laboratório', type: 'text', topic: 'Ingredientes, receitas e experimentos.' },
        { name: 'biblioteca', type: 'text', readOnly: true, topic: 'Arquivo de descobertas e casos encerrados.', starter: 'case-library' },
        { name: 'sala-de-estudos', type: 'voice', topic: 'Estudos e conversas tranquilas.' }
      ] },
      { name: 'INVESTIGAÇÕES', description: 'Casos ativos e registros importantes.', channels: [
        { name: 'casos', type: 'text', topic: 'Casos e mistérios em andamento.' },
        { name: 'relatórios', type: 'text', readOnly: true, topic: 'Casos encerrados e revisados.', starter: 'case-reports' },
        { name: 'sala-de-consulta', type: 'voice', topic: 'Reuniões de investigação.' }
      ] },
      { name: 'PÁTIO', description: 'O espaço leve para a comunidade.', channels: [
        { name: 'conversas', type: 'text', topic: 'Conversa livre da comunidade.' },
        { name: 'artes-e-momentos', type: 'text', topic: 'Artes, imagens e momentos divertidos.' },
        { name: 'salão-principal', type: 'voice', topic: 'Convivência do Palácio.' }
      ] },
      { name: 'RPG · REGISTROS', description: 'A porta de entrada do RPG interativo.', channels: [
        { name: 'painel-do-rpg', type: 'text', readOnly: true, topic: 'Painel interativo dos Registros do Palácio.', starter: 'rpg-panel' },
        { name: 'taverna', type: 'voice', topic: 'Conversa durante as aventuras.' }
      ] },
      { name: 'ATENDIMENTO', description: 'Ajuda em uma única porta privada.', channels: [
        { name: 'central-de-atendimento', type: 'text', readOnly: true, topic: 'Abra um atendimento pelo painel.', starter: 'tickets' }
      ] },
      { name: 'ÁREA RESTRITA', description: 'Registros internos da equipe.', staffOnly: true, channels: [
        { name: 'registros-da-equipe', type: 'text', topic: 'Logs e decisões internas.' },
        { name: 'sala-da-equipe', type: 'voice', topic: 'Reuniões privadas.' }
      ] }
    ]
  }
};

export const legacyTemplateChannels = Object.freeze([
  { category: 'PORTÃO DO PALÁCIO', name: 'regras-do-palácio', topic: 'Leia as regras antes de participar.' },
  { category: 'PORTÃO DO PALÁCIO', name: 'escolha-seu-cargo', topic: 'Escolha seus cargos e preferências pelos painéis da Maomao.' },
  { category: 'CASA DAS ERVAS', name: 'laboratório-de-ervas', topic: 'Experimentos, ingredientes e descobertas.' },
  { category: 'CASA DAS ERVAS', name: 'biblioteca-de-casos', topic: 'Arquivo de casos resolvidos.' },
  { category: 'CASA DAS ERVAS', name: 'ingredientes-e-receitas', topic: 'Receitas, alquimia e combinações.' },
  { category: 'INVESTIGAÇÕES', name: 'casos-abertos', topic: 'Casos ativos da comunidade.' },
  { category: 'INVESTIGAÇÕES', name: 'pistas-e-teorias', topic: 'Compartilhe pistas sem revelar tudo de uma vez.' },
  { category: 'INVESTIGAÇÕES', name: 'relatórios-de-caso', topic: 'Relatórios finalizados pela equipe.' },
  { category: 'PÁTIO DA COMUNIDADE', name: 'memes-e-artes', topic: 'Artes, imagens e momentos engraçados.' },
  { category: 'PÁTIO DA COMUNIDADE', name: 'apresentações', topic: 'Apresente-se para o Palácio.' },
  { category: 'RPG · REGISTROS DO PALÁCIO', name: 'casos-do-palácio', topic: 'Narrativas e casos disponíveis.' },
  { category: 'RPG · REGISTROS DO PALÁCIO', name: 'salão-de-eventos', topic: 'Eventos temporários e anúncios narrativos.' },
  { category: 'ATENDIMENTO', name: 'central-de-ajuda', topic: 'Abra um Ticket pelo painel de atendimento.' },
  { category: 'ATENDIMENTO', name: 'sugestões', topic: 'Sugestões para o Palácio.' },
  { category: 'ATENDIMENTO', name: 'denúncias', topic: 'Use Tickets para assuntos sensíveis.' }
]);

export function listBlueprints() { return Object.keys(blueprints); }
export function getBlueprint(id) { const blueprint = blueprints[id]; if (!blueprint) throw new Error(`Base desconhecida: ${id}`); return structuredClone(blueprint); }
export function buildPlan(blueprint) { return { roles: blueprint.roles, categories: blueprint.categories, channels: blueprint.categories.flatMap((category) => category.channels.map((channel) => ({ ...channel, category: category.name, staffOnly: category.staffOnly ?? false }))) }; }
