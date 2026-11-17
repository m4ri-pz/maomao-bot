import { ActionRowBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { getBlueprint, listBlueprints } from '../../core/blueprints.js';
import { applyTemplate, previewTemplate } from '../../services/maomao-structure.js';
import { summarizePlan } from '../../core/safety.js';
import { getGuildConfig, updateGuildConfig } from '../../store/guild-store.js';
import { characterProfile } from '../../personality/character-profile.js';
import { personality } from '../../personality/messages.js';
import { backRow, button, row } from '../ui.js';

function menu() { return new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('template:select').setPlaceholder('Escolha a base oficial').addOptions(listBlueprints().map((id) => { const blueprint = getBlueprint(id); return { label: blueprint.name, description: blueprint.description.slice(0, 100), value: id }; }))); }
export function handles(id) { return id === 'panel:template' || id === 'template:select' || id.startsWith('template:save:') || id.startsWith('template:apply:') || id === 'official:apply'; }
export async function handle(interaction, logger) {
  if (interaction.customId === 'panel:template') return interaction.update({ content: `${personality.preview} Esta é a base única da Maomao:`, embeds: [], components: [menu(), backRow()] });
  if (interaction.customId === 'template:select') {
    const { blueprint, plan } = previewTemplate(interaction.values[0]);
    const embed = new EmbedBuilder().setColor(characterProfile.colors.success).setTitle(`Simulação · ${blueprint.name}`).setDescription(`${blueprint.description}\n\n${personality.noDestructiveActions}`).addFields({ name: 'Plano', value: summarizePlan(plan) }, { name: 'Cargos', value: plan.roles.map((role) => `• ${role.name}`).join('\n').slice(0, 1024) }, { name: 'Canais', value: plan.channels.map((channel) => `• ${channel.category} / ${channel.name}`).join('\n').slice(0, 1024) });
    return interaction.update({ content: 'Revise a base oficial. A aplicação cria itens ausentes e configura permissões previstas.', embeds: [embed], components: [row(button(`template:save:${blueprint.id}`, 'Salvar base', ButtonStyle.Primary), button(`template:apply:${blueprint.id}`, 'Aplicar base', ButtonStyle.Success), button('panel:home', 'Voltar'))] });
  }
  if (interaction.customId.startsWith('template:save:')) { const id = interaction.customId.split(':')[2]; await updateGuildConfig(interaction.guildId, { template: id }); return interaction.update({ content: 'A base oficial foi salva para este servidor. A aplicação continua separada.', embeds: [], components: [backRow()] }); }
  if (interaction.customId.startsWith('template:apply:') || interaction.customId === 'official:apply') {
    await interaction.deferUpdate(); const id = interaction.customId === 'official:apply' ? 'maomao-palace' : interaction.customId.split(':')[2]; const result = await applyTemplate(interaction.guild, id, logger); await updateGuildConfig(interaction.guildId, { template: id }); return interaction.editReply({ content: `Base aplicada: ${summarizePlan(result.plan)}. Cargos, hierarquia e permissões foram processados sem apagar itens existentes.`, embeds: [], components: [backRow()] });
  }
}
