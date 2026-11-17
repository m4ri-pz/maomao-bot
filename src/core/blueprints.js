const blueprints = {
  'maomao-palace': {
    id: 'maomao-palace',
    name: 'Palácio das Ervas · Servidor oficial',
    description: 'Uma estrutura completa para comunidade, atendimento, investigação, botânica, RPG e eventos do palácio.',
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
      { name: 'PORTÃO DO PALÁCIO', description: 'Primeiros passos, regras e comunicados oficiais.', channels: [
        { name: 'boas-vindas', type: 'text', readOnly: true, topic: 'Recepção oficial do Palácio das Ervas.', starter: 'welcome' },
        { name: 'regras-do-palácio', type: 'text', readOnly: true, topic: 'Leia as regras antes de participar.', starter: 'rules' },
        { name: 'anúncios', type: 'text', readOnly: true, topic: 'Comunicados oficiais da Maomao.', starter: 'announcements' },
        { name: 'escolha-seu-cargo', type: 'text', topic: 'Escolha seus cargos e preferências pelos painéis da Maomao.' }
      ] },
      { name: 'CASA DAS ERVAS', description: 'Botânica, receitas, estudos e conversas sobre ingredientes.', channels: [
        { name: 'laboratório-de-ervas', type: 'text', topic: 'Experimentos, ingredientes e descobertas.' },
        { name: 'biblioteca-de-casos', type: 'text', readOnly: true, topic: 'Arquivo de casos resolvidos.', starter: 'case-library' },
        { name: 'ingredientes-e-receitas', type: 'text', topic: 'Receitas, alquimia e combinações.' },
        { name: 'sala-de-estudos', type: 'voice', topic: 'Sala de estudos do Palácio.' }
      ] },
      { name: 'INVESTIGAÇÕES', description: 'O centro narrativo para casos, pistas e relatórios.', channels: [
        { name: 'casos-abertos', type: 'text', topic: 'Casos ativos da comunidade.' },
        { name: 'pistas-e-teorias', type: 'text', topic: 'Compartilhe pistas sem revelar tudo de uma vez.' },
        { name: 'relatórios-de-caso', type: 'text', readOnly: true, topic: 'Relatórios finalizados pela equipe.', starter: 'case-reports' },
        { name: 'sala-de-consulta', type: 'voice', topic: 'Consultas e reuniões de investigação.' }
      ] },
      { name: 'PÁTIO DA COMUNIDADE', description: 'Convivência, artes, memes, apresentações e voz.', channels: [
        { name: 'conversas', type: 'text', topic: 'Conversa livre da comunidade.' },
        { name: 'memes-e-artes', type: 'text', topic: 'Artes, imagens e momentos engraçados.' },
        { name: 'apresentações', type: 'text', topic: 'Apresente-se para o Palácio.' },
        { name: 'salão-principal', type: 'voice', topic: 'Convivência da comunidade.' }
      ] },
      { name: 'RPG · REGISTROS DO PALÁCIO', description: 'Área interativa do RPG da Maomao.', channels: [
        { name: 'painel-do-rpg', type: 'text', readOnly: true, topic: 'Painel interativo do RPG. Use os botões da Maomao.', starter: 'rpg-panel' },
        { name: 'casos-do-palácio', type: 'text', topic: 'Narrativas e casos disponíveis.' },
        { name: 'salão-de-eventos', type: 'text', topic: 'Eventos temporários e anúncios narrativos.' },
        { name: 'taverna-do-palácio', type: 'voice', topic: 'Conversa durante as aventuras.' }
      ] },
      { name: 'ATENDIMENTO', description: 'Ajuda, sugestões e encaminhamento privado.', channels: [
        { name: 'central-de-ajuda', type: 'text', readOnly: true, topic: 'Abra um Ticket pelo painel de atendimento.', starter: 'tickets' },
        { name: 'sugestões', type: 'text', topic: 'Sugestões para o Palácio.' },
        { name: 'denúncias', type: 'text', topic: 'Use Tickets para assuntos sensíveis.' }
      ] },
      { name: 'ÁREA RESTRITA', description: 'Registros internos e coordenação da equipe.', staffOnly: true, channels: [
        { name: 'registros-da-equipe', type: 'text', topic: 'Logs e decisões internas da equipe.' },
        { name: 'sala-da-equipe', type: 'voice', topic: 'Reuniões privadas da equipe.' }
      ] }
    ]
  }
};

export function listBlueprints() { return Object.keys(blueprints); }
export function getBlueprint(id) { const blueprint = blueprints[id]; if (!blueprint) throw new Error(`Template desconhecido: ${id}`); return structuredClone(blueprint); }
export function buildPlan(blueprint) { return { roles: blueprint.roles, categories: blueprint.categories, channels: blueprint.categories.flatMap((category) => category.channels.map((channel) => ({ ...channel, category: category.name, staffOnly: category.staffOnly ?? false }))) }; }
