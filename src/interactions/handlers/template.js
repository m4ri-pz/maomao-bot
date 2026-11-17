import { ActionRowBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { getBlueprint, listBlueprints } from '../../core/blueprints.js';
import { applyTemplate, previewTemplate } from '../../services/maomao-structure.js';
import { canManageStructure, summarizePlan } from '../../core/safety.js';
import { getGuildConfig, updateGuildConfig } from '../../store/guild-store.js';
import { characterProfile } from '../../personality/character-profile.js';
import { personality } from '../../personality/messages.js';
import { backRow, button, row } from '../ui.js';

function menu() { return new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('template:select').setPlaceholder('Escolha a base oficial').addOptions(listBlueprints().map((id) => { const blueprint = getBlueprint(id); return { label: blueprint.name, description: blueprint.description.slice(0, 100), value: id }; }))); }
export function handles(id) { return id === 'panel:template' || id === 'template:select' || id.startsWith('template:save:') || id.startsWith('template:apply:') || id === 'official:apply'; }
export async function handle(interaction, logger) {
  if (interaction.customId === 'panel:template') return interaction.update({ content: `✦ ${personality.preview}\n\nEsta é a base oficial do Palácio das Ervas:`, embeds: [], components: [menu(), backRow()] });
  if (interaction.customId === 'template:select') {
    const { blueprint, plan } = previewTemplate(interaction.values[0]);
    const embed = new EmbedBuilder().setColor(characterProfile.colors.success).setTitle(`Simulação · ${blueprint.name}`).setDescription(`${blueprint.description}\n\n${personality.noDestructiveActions}`).addFields({ name: 'Plano', value: summarizePlan(plan) }, { name: 'Cargos', value: plan.roles.map((role) => `• ${role.name}`).join('\n').slice(0, 1024) }, { name: 'Canais', value: plan.channels.map((channel) => `• ${channel.category} / ${channel.name}`).join('\n').slice(0, 1024) });
    return interaction.update({ content: 'Leia o registro com calma. A organização cria o que falta e preserva o que já foi construído.', embeds: [embed], components: [row(button(`template:save:${blueprint.id}`, 'Guardar escolha', ButtonStyle.Primary), button(`template:apply:${blueprint.id}`, 'Organizar Palácio', ButtonStyle.Success), button('panel:home', 'Voltar ao salão'))] });
  }
  if (interaction.customId.startsWith('template:save:')) { const id = interaction.customId.split(':')[2]; if (!listBlueprints().includes(id)) return interaction.reply({ content: 'Esta base expirou. Abra o catálogo oficial novamente.', flags: 64 }); await updateGuildConfig(interaction.guildId, { template: id }); return interaction.update({ content: '✦ Escolha guardada no registro deste servidor. A organização continua separada e só acontece após outra confirmação.', embeds: [], components: [backRow()] }); }
  if (interaction.customId.startsWith('template:apply:') || interaction.customId === 'official:apply') {
    if (!canManageStructure(interaction.member)) return interaction.reply({ content: 'Para organizar a estrutura, você precisa de Administrador ou de ManageGuild + ManageRoles + ManageChannels.', flags: 64 });
    await interaction.deferUpdate(); const id = interaction.customId === 'official:apply' ? 'maomao-palace' : interaction.customId.split(':')[2]; if (!listBlueprints().includes(id)) return interaction.editReply({ content: 'Esta base expirou. Abra o catálogo oficial novamente.', embeds: [], components: [backRow()] }); const result = await applyTemplate(interaction.guild, id, logger); await updateGuildConfig(interaction.guildId, { template: id }); return interaction.editReply({ content: `✦ Organização concluída: ${summarizePlan(result.plan)}. Cargos, hierarquia e permissões foram examinados sem apagar itens existentes.`, embeds: [], components: [backRow()] });
  }
}
