import { act, getPlayer } from '../../services/rpg.js';
import { dashboardView, detailView, screenView } from '../../modules/rpg/ui/panels.js';

export function handles(id) { return id === 'panel:rpg' || id === 'rpg:dashboard' || id.startsWith('rpg:screen:') || id.startsWith('rpg:class:') || id.startsWith('rpg:travel:') || id.startsWith('rpg:craft:') || id.startsWith('rpg:experiment:') || id.startsWith('rpg:case:start:') || id.startsWith('rpg:clue:') || ['rpg:rest', 'rpg:quest', 'rpg:explore'].includes(id) || ['rpg:location', 'rpg:case', 'rpg:recipe', 'rpg:experiment'].includes(id); }
export async function handle(interaction) {
  const id = interaction.customId;
  if (id === 'panel:rpg' || id === 'rpg:dashboard') { const view = dashboardView(await getPlayer(interaction.guildId, interaction.user.id), interaction.user.username); return interaction.update({ embeds: [view.embed], files: view.files, components: view.components }); }
  const player = await getPlayer(interaction.guildId, interaction.user.id);
  if (id.startsWith('rpg:screen:')) { const view = screenView(id.split(':')[2], player); return interaction.update({ embeds: [view.embed], files: view.files, components: view.components }); }
  if (['rpg:location', 'rpg:case', 'rpg:recipe', 'rpg:experiment'].includes(id)) { const kind = id.split(':')[1]; const view = detailView(kind, interaction.values[0], player); return interaction.update({ embeds: [view.embed], files: view.files, components: view.components }); }
  const action = id.replace('rpg:', ''); const updated = await act(interaction.guildId, interaction.user.id, action); const view = action.startsWith('case:start:') || action.startsWith('clue:') ? screenView('active-case', updated) : dashboardView(updated, interaction.user.username); return interaction.update({ embeds: [view.embed], files: view.files, components: view.components });
}
