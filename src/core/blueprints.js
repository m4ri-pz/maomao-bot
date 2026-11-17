const blueprints = {
  'maomao-palace': {
    id: 'maomao-palace',
    name: 'Palácio das Ervas · Template oficial',
    description: 'Estrutura oficial do bot para investigação, botânica, laboratório, mistérios e vida no palácio.',
    staffRoles: ['Regente do Palácio', 'Curandeiro-chefe', 'Investigador'],
    roles: [
      { name: 'Regente do Palácio', color: 0x7f1d1d, permissions: ['ManageGuild', 'ManageRoles', 'ManageChannels'] },
      { name: 'Curandeiro-chefe', color: 0x15803d, permissions: ['ManageMessages', 'ManageThreads'] },
      { name: 'Investigador', color: 0x2563eb, permissions: ['ManageMessages', 'ViewChannel', 'SendMessages', 'ReadMessageHistory'] },
      { name: 'Apoiador do Palácio', color: 0xd97706, permissions: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] },
      { name: 'Visitante', color: 0x94a3b8, permissions: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] },
      { name: 'Bot', color: 0x64748b, permissions: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] }
    ],
    categories: [
      { name: 'PORTÃO DO PALÁCIO', channels: [{ name: 'boas-vindas', type: 'text', readOnly: true }, { name: 'regras-do-palácio', type: 'text', readOnly: true }, { name: 'anúncios', type: 'text', readOnly: true }, { name: 'escolha-seu-cargo', type: 'text' }] },
      { name: 'CASA DAS ERVAS', channels: [{ name: 'laboratório-de-ervas', type: 'text' }, { name: 'biblioteca-de-casos', type: 'text' }, { name: 'ingredientes-e-receitas', type: 'text' }, { name: 'sala-de-estudos', type: 'voice' }] },
      { name: 'INVESTIGAÇÕES', channels: [{ name: 'casos-abertos', type: 'text' }, { name: 'pistas-e-teorias', type: 'text' }, { name: 'relatórios-de-caso', type: 'text' }, { name: 'sala-de-consulta', type: 'voice' }] },
      { name: 'PÁTIO DA COMUNIDADE', channels: [{ name: 'conversas', type: 'text' }, { name: 'memes-e-artes', type: 'text' }, { name: 'apresentações', type: 'text' }, { name: 'salão-principal', type: 'voice' }] },
      { name: 'ATENDIMENTO', channels: [{ name: 'central-de-ajuda', type: 'text' }, { name: 'sugestões', type: 'text' }, { name: 'denúncias', type: 'text' }] },
      { name: 'ÁREA RESTRITA', channels: [{ name: 'registros-da-equipe', type: 'text' }, { name: 'sala-da-equipe', type: 'voice' }], staffOnly: true }
    ]
  }
};

export function listBlueprints() { return Object.keys(blueprints); }
export function getBlueprint(id) { const blueprint = blueprints[id]; if (!blueprint) throw new Error(`Template desconhecido: ${id}`); return structuredClone(blueprint); }
export function buildPlan(blueprint) { return { roles: blueprint.roles, categories: blueprint.categories, channels: blueprint.categories.flatMap((category) => category.channels.map((channel) => ({ ...channel, category: category.name, staffOnly: category.staffOnly ?? false }))) }; }
