const blueprints = {
  community: {
    id: 'community',
    name: 'Comunidade organizada',
    description: 'Estrutura equilibrada para comunidades gerais.',
    roles: [
      { name: 'Administrador', color: 0xe74c3c, permissions: ['Administrator'] },
      { name: 'Moderador', color: 0x3498db, permissions: ['ManageMessages', 'KickMembers', 'BanMembers', 'ManageChannels'] },
      { name: 'Apoiador', color: 0xf1c40f, permissions: ['ViewChannel'] },
      { name: 'Membro', color: 0x95a5a6, permissions: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] }
    ],
    categories: [
      { name: 'INFORMAÇÕES', channels: [{ name: 'boas-vindas', type: 'text' }, { name: 'regras', type: 'text' }, { name: 'anúncios', type: 'text' }] },
      { name: 'COMUNIDADE', channels: [{ name: 'geral', type: 'text' }, { name: 'mídia', type: 'text' }, { name: 'Sala principal', type: 'voice' }] },
      { name: 'EQUIPE', channels: [{ name: 'moderação', type: 'text' }, { name: 'Sala da equipe', type: 'voice' }], staffOnly: true }
    ]
  },
  study: {
    id: 'study',
    name: 'Estudos e foco',
    description: 'Canais para organização de estudos, dúvidas e sessões de foco.',
    roles: [
      { name: 'Professor', color: 0x8e44ad, permissions: ['ManageMessages'] },
      { name: 'Monitor', color: 0x2980b9, permissions: ['ManageMessages'] },
      { name: 'Estudante', color: 0x27ae60, permissions: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] }
    ],
    categories: [
      { name: 'COMECE AQUI', channels: [{ name: 'avisos', type: 'text' }, { name: 'calendário', type: 'text' }] },
      { name: 'ESTUDOS', channels: [{ name: 'dúvidas', type: 'text' }, { name: 'recursos', type: 'text' }, { name: 'sala de foco', type: 'voice' }] }
    ]
  },
  creator: {
    id: 'creator',
    name: 'Criador de conteúdo',
    description: 'Estrutura com anúncios, comunidade e bastidores.',
    roles: [
      { name: 'Dono', color: 0xe67e22, permissions: ['Administrator'] },
      { name: 'Equipe', color: 0x9b59b6, permissions: ['ManageMessages', 'ManageChannels'] },
      { name: 'VIP', color: 0xf1c40f, permissions: ['ViewChannel', 'SendMessages'] },
      { name: 'Comunidade', color: 0x95a5a6, permissions: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] }
    ],
    categories: [
      { name: 'OFICIAL', channels: [{ name: 'anúncios', type: 'text' }, { name: 'agenda', type: 'text' }] },
      { name: 'COMUNIDADE', channels: [{ name: 'chat', type: 'text' }, { name: 'clipes', type: 'text' }, { name: 'ao-vivo', type: 'voice' }] },
      { name: 'BASTIDORES', channels: [{ name: 'equipe', type: 'text' }], staffOnly: true }
    ]
  }
};

export function listBlueprints() { return Object.keys(blueprints); }
export function getBlueprint(id) {
  const blueprint = blueprints[id];
  if (!blueprint) throw new Error(`Template desconhecido: ${id}`);
  return structuredClone(blueprint);
}
export function buildPlan(blueprint) {
  return { roles: blueprint.roles, categories: blueprint.categories, channels: blueprint.categories.flatMap((category) => category.channels.map((channel) => ({ ...channel, category: category.name, staffOnly: category.staffOnly ?? false }))) };
}
