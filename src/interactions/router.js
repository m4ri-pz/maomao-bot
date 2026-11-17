import { closeTicket } from '../services/tickets.js';
import { canManageServer } from '../core/safety.js';
import { characterProfile } from '../personality/character-profile.js';
import { homeView } from '../panels/home.js';
import { open as openTicket, handles as handlesTickets, handle as handleTickets } from './handlers/tickets.js';
import { handles as handlesTemplate, handle as handleTemplate } from './handlers/template.js';
import { handles as handlesSettings, handle as handleSettings } from './handlers/settings.js';
import { handles as handlesRpg, handle as handleRpg } from './handlers/rpg.js';

const domains = [
  { handles: handlesTemplate, handle: handleTemplate },
  { handles: handlesTickets, handle: handleTickets },
  { handles: handlesSettings, handle: handleSettings },
  { handles: handlesRpg, handle: handleRpg }
];

export async function handleInteraction(interaction, logger) {
  if (!interaction.isButton() && !interaction.isStringSelectMenu() && !interaction.isModalSubmit()) return false;
  if (interaction.customId === 'ticket:open') return openTicket(interaction);
  if (interaction.customId === 'ticket:close') return closeTicket(interaction);
  if (interaction.customId === 'panel:home') { const view = await homeView(interaction.guildId); return interaction.update({ content: '', embeds: [view.embed], files: view.files, components: view.components }); }
  if (interaction.customId === 'panel:cancel') return interaction.update({ content: 'Operação cancelada. Nenhuma alteração foi aplicada.', embeds: [], components: [] });
  if (!interaction.guild || !canManageServer(interaction.member)) return interaction.reply({ content: 'Você não tem permissão para usar este painel.', ephemeral: true });
  const domain = domains.find((candidate) => candidate.handles(interaction.customId));
  if (domain) return domain.handle(interaction, logger);
  if (interaction.customId === 'panel:admin') { const view = await homeView(interaction.guildId); return interaction.update({ content: `${characterProfile.name} abriu o centro administrativo.`, embeds: [view.embed], files: view.files, components: view.components }); }
  return false;
}
