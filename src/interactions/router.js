import { closeTicket } from '../services/tickets.js';
import { canManageServer } from '../core/safety.js';
import { homeView } from '../panels/home.js';
import { open as openTicket, handles as handlesTickets, handle as handleTickets } from './handlers/tickets.js';
import { handles as handlesTemplate, handle as handleTemplate } from './handlers/template.js';
import { handles as handlesSettings, handle as handleSettings } from './handlers/settings.js';
import { handles as handlesRpg, handle as handleRpg } from './handlers/rpg.js';
import { handles as handlesAdmin, handle as handleAdmin } from './handlers/admin.js';

const domains = [
  { name: 'template', handles: handlesTemplate, handle: handleTemplate, admin: true },
  { name: 'tickets', handles: handlesTickets, handle: handleTickets, admin: true },
  { name: 'settings', handles: handlesSettings, handle: handleSettings, admin: true },
  { name: 'rpg', handles: handlesRpg, handle: handleRpg, admin: false },
  { name: 'admin', handles: handlesAdmin, handle: handleAdmin, admin: true }
];

async function acknowledgeUnknown(interaction) {
  const payload = { content: 'Este painel expirou ou já foi atualizado. Abra o comando novamente para continuar.', flags: 64 };
  if (interaction.deferred || interaction.replied) return interaction.editReply(payload).catch(() => {});
  return interaction.reply(payload).catch(() => {});
}

export async function handleInteraction(interaction, logger) {
  if (!interaction.isButton() && !interaction.isStringSelectMenu() && !interaction.isModalSubmit()) return false;
  if (!interaction.guild) return acknowledgeUnknown(interaction);
  if (interaction.customId === 'ticket:open') return openTicket(interaction);
  if (interaction.customId === 'ticket:type') return handleTickets(interaction);
  if (interaction.customId === 'ticket:close') return closeTicket(interaction);
  if (interaction.customId === 'panel:home' || interaction.customId === 'panel:cancel') {
    if (!canManageServer(interaction.member)) return interaction.reply({ content: 'Você não tem permissão para usar este painel.', flags: 64 });
    if (interaction.customId === 'panel:cancel') return interaction.update({ content: 'Operação cancelada. Nenhuma alteração foi aplicada.', embeds: [], components: [] });
    const view = await homeView(interaction.guildId);
    return interaction.update({ content: '', embeds: [view.embed], files: view.files, components: view.components });
  }
  const domain = domains.find((candidate) => candidate.handles(interaction.customId));
  if (!domain) return acknowledgeUnknown(interaction);
  if (domain.admin && !canManageServer(interaction.member)) return interaction.reply({ content: 'Você não tem permissão para usar este painel.', flags: 64 });
  return domain.handle(interaction, logger);
}
