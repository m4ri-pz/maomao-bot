import { EmbedBuilder, ButtonStyle } from 'discord.js';
import { getBlueprint, buildPlan } from '../../core/blueprints.js';
import { previewTemplate, applyTemplate } from '../../services/maomao-structure.js';
import { backupGuild } from '../../modules/provisioning/backup.js';
import { characterProfile } from '../../personality/character-profile.js';
import { summarizePlan } from '../../core/safety.js';
import { adminView } from '../../modules/admin/ui/panel.js';
import { backRow, button, row } from '../ui.js';
export function handles(id) { return id === 'panel:admin' || id === 'admin:diagnose' || id === 'admin:backup' || id === 'admin:apply' || id === 'admin:apply:confirm'; }
export async function handle(interaction, logger) {
  const id = interaction.customId;
  if (id === 'panel:admin') { const view = adminView(); return interaction.update({ content: '', embeds: [view.embed], components: view.components }); }
  if (id === 'admin:diagnose') { const { blueprint, plan } = previewTemplate('maomao-palace'); const roleNames = new Set(interaction.guild.roles.cache.map((role) => role.name)); const channelNames = new Set(interaction.guild.channels.cache.map((channel) => channel.name)); const missingRoles = plan.roles.filter((role) => !roleNames.has(role.name)).map((role) => role.name); const missingChannels = plan.channels.filter((channel) => !channelNames.has(channel.name)).map((channel) => `${channel.category}/${channel.name}`); const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle('Diagnóstico · Palácio das Ervas').setDescription(`${blueprint.description}\n\nA Maomao compara a base oficial com o que já existe sem alterar nada.`).addFields({ name: 'Cargos ausentes', value: missingRoles.length ? missingRoles.join('\n') : 'Nenhum cargo planejado está ausente.' }, { name: 'Canais ausentes', value: missingChannels.length ? missingChannels.slice(0, 20).join('\n') : 'Nenhum canal planejado está ausente.' }, { name: 'Plano', value: summarizePlan(plan) }); return interaction.update({ embeds: [embed], components: [row(button('admin:apply', 'Revisar aplicação', ButtonStyle.Success)), backRow()] }); }
  if (id === 'admin:backup') { const backup = await backupGuild(interaction.guild, 'manual-admin-backup'); return interaction.update({ content: `Backup estrutural criado com segurança.\n\`${backup.file}\``, embeds: [], components: [backRow()] }); }
  if (id === 'admin:apply') { return interaction.update({ content: 'A aplicação será aditiva: cria o que falta, configura permissões oficiais e publica mensagens iniciais. Nada existente será apagado.', embeds: [], components: [row(button('admin:apply:confirm', 'Confirmar aplicação', ButtonStyle.Success), button('panel:admin', 'Cancelar'))] }); }
  if (id === 'admin:apply:confirm') { await interaction.deferUpdate(); const result = await applyTemplate(interaction.guild, 'maomao-palace', logger); return interaction.editReply({ content: `Base oficial aplicada: ${summarizePlan(result.plan)}.`, embeds: [], components: [backRow()] }); }
}
