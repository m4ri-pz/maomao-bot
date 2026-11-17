import { closeTicket } from '../services/tickets.js';
import { canManageServer } from '../core/safety.js';
import { homeView } from '../panels/home.js';
import { open as openTicket, handles as handlesTickets, handle as handleTickets } from './handlers/tickets.js';
import { handles as handlesTemplate, handle as handleTemplate } from './handlers/template.js';
import { handles as handlesSettings, handle as handleSettings } from './handlers/settings.js';
import { handles as handlesRpg, handle as handleRpg } from './handlers/rpg.js';
import { handles as handlesAdmin, handle as handleAdmin } from './handlers/admin.js';

const domains = [
  { handles: handlesTemplate, handle: handleTemplate },
  { handles: handlesTickets, handle: handleTickets },
  { handles: handlesSettings, handle: handleSettings },
  { handles: handlesRpg, handle: handleRpg },
  { handles: handlesAdmin, handle: handleAdmin }
];

export async function handleInteraction(interaction, logger) {
  if (!interaction.isButton() && !interaction.isStringSelectMenu() && !interaction.isModalSubmit()) return false;
  if (interaction.customId === 'ticket:open' || interaction.customId === 'ticket:type') return interaction.customId === 'ticket:open' ? openTicket(interaction) : handleTickets(interaction);
  if (interaction.customId === 'ticket:close') return closeTicket(interaction);
  if (interaction.customId === 'panel:home') { const view = await homeView(interaction.guildId); return interaction.update({ content: '', embeds: [view.embed], files: view.files, components: view.components }); }
  if (interaction.customId === 'panel:cancel') return interaction.update({ content: 'Operação cancelada. Nenhuma alteração foi aplicada.', embeds: [], components: [] });
  if (!interaction.guild || !canManageServer(interaction.member)) return interaction.reply({ content: 'Você não tem permissão para usar este painel.', flags: 64 });
  const domain = domains.find((candidate) => candidate.handles(interaction.customId));
  if (domain) return domain.handle(interaction, logger);
  return false;
}
