const blueprints = {
  'maomao-palace': {
    id: 'maomao-palace', name: 'Palácio das Ervas · Base essencial', description: 'Uma base compacta, delicada e funcional para convivência, investigação, RPG e atendimento.', staffRoles: ['Regente do Palácio', 'Curandeiro-chefe', 'Investigador', 'Mestre de Atendimento'],
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
      { name: '╭・PORTÃO', legacyNames: ['PORTÃO DO PALÁCIO'], description: 'A entrada delicada do Palácio.', channels: [
        { name: 'boas-vindas', type: 'text', readOnly: true, topic: 'Entrada do Palácio das Ervas.', starter: 'welcome' },
        { name: 'regras', type: 'text', readOnly: true, topic: 'Regras de convivência do Palácio.', starter: 'rules', legacyNames: ['regras-do-palácio'] },
        { name: 'anúncios', type: 'text', readOnly: true, topic: 'Avisos oficiais da equipe.', starter: 'announcements' }
      ] },
      { name: '╭・PALÁCIO', legacyNames: ['CASA DAS ERVAS', 'PÁTIO DA COMUNIDADE'], description: 'Convivência, ervas e estudos.', channels: [
        { name: 'conversas', type: 'text', topic: 'Conversa livre da comunidade.', starter: 'conversas' },
        { name: 'laboratório', type: 'text', topic: 'Ingredientes, receitas e experimentos.', starter: 'laboratorio', legacyNames: ['laboratório-de-ervas'] },
        { name: 'biblioteca', type: 'text', readOnly: true, topic: 'Arquivo de descobertas e casos encerrados.', starter: 'case-library', legacyNames: ['biblioteca-de-casos'] },
        { name: 'sala-de-estudos', type: 'voice', topic: 'Estudos e conversas tranquilas.' },
        { name: 'artes-e-momentos', type: 'text', topic: 'Artes, imagens e momentos divertidos.', starter: 'artes', legacyNames: ['memes-e-artes'] },
        { name: 'salão-principal', type: 'voice', topic: 'Convivência do Palácio.' }
      ] },
      { name: '╭・AVENTURAS', legacyNames: ['INVESTIGAÇÕES', 'RPG · REGISTROS DO PALÁCIO'], description: 'Casos, registros e aventuras.', channels: [
        { name: 'painel-do-rpg', type: 'text', readOnly: true, topic: 'Painel interativo dos Registros do Palácio.', starter: 'rpg-panel' },
        { name: 'casos', type: 'text', topic: 'Casos e mistérios em andamento.', starter: 'casos', legacyNames: ['casos-abertos', 'casos-do-palácio'] },
        { name: 'relatórios', type: 'text', readOnly: true, topic: 'Casos encerrados e revisados.', starter: 'case-reports', legacyNames: ['relatórios-de-caso'] },
        { name: 'sala-de-consulta', type: 'voice', topic: 'Reuniões de investigação.' },
        { name: 'taverna', type: 'voice', topic: 'Conversa durante as aventuras.' }
      ] },
      { name: '╭・ATENDIMENTO', legacyNames: ['ATENDIMENTO'], description: 'Uma única porta para pedir ajuda.', channels: [
        { name: 'central-de-atendimento', type: 'text', readOnly: true, topic: 'Abra um atendimento pelo painel.', starter: 'tickets', legacyNames: ['central-de-ajuda'] }
      ] },
      { name: '╭・EQUIPE', legacyNames: ['ÁREA RESTRITA'], description: 'Registros internos da equipe.', staffOnly: true, channels: [
        { name: 'registros-da-equipe', type: 'text', topic: 'Logs e decisões internas.', starter: 'equipe' },
        { name: 'sala-da-equipe', type: 'voice', topic: 'Reuniões privadas.' }
      ] }
    ]
  }
};
export const legacyTemplateChannels = Object.freeze([
  { category: 'PORTÃO DO PALÁCIO', name: 'boas-vindas' }, { category: 'PORTÃO DO PALÁCIO', name: 'regras-do-palácio' }, { category: 'PORTÃO DO PALÁCIO', name: 'regras' }, { category: 'PORTÃO DO PALÁCIO', name: 'anúncios' }, { category: 'PORTÃO DO PALÁCIO', name: 'escolha-seu-cargo' }, { category: 'CASA DAS ERVAS', name: 'laboratório-de-ervas' }, { category: 'CASA DAS ERVAS', name: 'laboratório' }, { category: 'CASA DAS ERVAS', name: 'biblioteca-de-casos' }, { category: 'CASA DAS ERVAS', name: 'biblioteca' }, { category: 'CASA DAS ERVAS', name: 'ingredientes-e-receitas' }, { category: 'CASA DAS ERVAS', name: 'sala-de-estudos' }, { category: 'INVESTIGAÇÕES', name: 'casos-abertos' }, { category: 'INVESTIGAÇÕES', name: 'casos' }, { category: 'INVESTIGAÇÕES', name: 'pistas-e-teorias' }, { category: 'INVESTIGAÇÕES', name: 'relatórios-de-caso' }, { category: 'INVESTIGAÇÕES', name: 'relatórios' }, { category: 'INVESTIGAÇÕES', name: 'sala-de-consulta' }, { category: 'PÁTIO DA COMUNIDADE', name: 'conversas' }, { category: 'PÁTIO DA COMUNIDADE', name: 'memes-e-artes' }, { category: 'PÁTIO DA COMUNIDADE', name: 'artes-e-momentos' }, { category: 'PÁTIO DA COMUNIDADE', name: 'apresentações' }, { category: 'PÁTIO DA COMUNIDADE', name: 'salão-principal' }, { category: 'PÁTIO', name: 'conversas' }, { category: 'PÁTIO', name: 'artes-e-momentos' }, { category: 'PÁTIO', name: 'salão-principal' }, { category: 'RPG · REGISTROS DO PALÁCIO', name: 'painel-do-rpg' }, { category: 'RPG · REGISTROS DO PALÁCIO', name: 'casos-do-palácio' }, { category: 'RPG · REGISTROS DO PALÁCIO', name: 'salão-de-eventos' }, { category: 'RPG · REGISTROS DO PALÁCIO', name: 'taverna-do-palácio' }, { category: 'RPG · REGISTROS', name: 'painel-do-rpg' }, { category: 'RPG · REGISTROS', name: 'taverna' }, { category: 'ATENDIMENTO', name: 'central-de-ajuda' }, { category: 'ATENDIMENTO', name: 'central-de-atendimento' }, { category: 'ATENDIMENTO', name: 'sugestões' }, { category: 'ATENDIMENTO', name: 'denúncias' }, { category: 'ÁREA RESTRITA', name: 'registros-da-equipe' }, { category: 'ÁREA RESTRITA', name: 'sala-da-equipe' }
]);
export const legacyTemplateCategories = Object.freeze(['PORTÃO DO PALÁCIO', 'CASA DAS ERVAS', 'INVESTIGAÇÕES', 'PÁTIO DA COMUNIDADE', 'PÁTIO', 'RPG · REGISTROS DO PALÁCIO', 'RPG · REGISTROS', 'ATENDIMENTO', 'ÁREA RESTRITA']);
export function listBlueprints() { return Object.keys(blueprints); }
export function getBlueprint(id) { const blueprint = blueprints[id]; if (!blueprint) throw new Error(`Base desconhecida: ${id}`); return structuredClone(blueprint); }
export function buildPlan(blueprint) { return { roles: blueprint.roles, categories: blueprint.categories, channels: blueprint.categories.flatMap((category) => category.channels.map((channel) => ({ ...channel, category: category.name, staffOnly: category.staffOnly ?? false }))) }; }
