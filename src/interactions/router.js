import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { getBlueprint, listBlueprints, buildPlan } from '../core/blueprints.js';
import { applyTemplate, previewTemplate } from '../services/architect.js';
import { canArchitect, summarizePlan } from '../core/safety.js';
import { getGuildConfig, updateGuildConfig } from '../store/guild-store.js';

function templateMenu() {
  return new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('template:select').setPlaceholder('Escolha um template').addOptions(listBlueprints().map((id) => { const b = getBlueprint(id); return { label: b.name, description: b.description.slice(0, 100), value: id }; })));
}
function backButton() { return new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('panel:home').setLabel('Voltar ao painel').setStyle(ButtonStyle.Secondary)); }

export async function handleInteraction(interaction, logger) {
  if (!interaction.isButton() && !interaction.isStringSelectMenu()) return false;
  if (!interaction.guild || !canArchitect(interaction.member)) return interaction.reply({ content: 'Você não tem permissão para usar este painel.', ephemeral: true });
  if (interaction.customId === 'panel:home') {
    const config = await getGuildConfig(interaction.guildId);
    return interaction.update({ content: `Painel reaberto. Template: **${config.template}**`, embeds: [], components: [templateMenu()] });
  }
  if (interaction.customId === 'panel:template') return interaction.update({ content: 'Escolha um template. A próxima tela será uma simulação.', embeds: [], components: [templateMenu(), backButton()] });
  if (interaction.customId === 'template:select') {
    const id = interaction.values[0]; const { blueprint, plan } = previewTemplate(id);
    const embed = new EmbedBuilder().setColor(0x57f287).setTitle(`Simulação · ${blueprint.name}`).setDescription(`${blueprint.description}\n\nNada foi alterado ainda.`).addFields({ name: 'Plano', value: summarizePlan(plan) }, { name: 'Cargos', value: plan.roles.map((r) => `• ${r.name}`).join('\n').slice(0, 1024) }, { name: 'Canais', value: plan.channels.map((c) => `• ${c.category} / ${c.name}`).join('\n').slice(0, 1024) });
    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(`template:save:${id}`).setLabel('Salvar como escolhido').setStyle(ButtonStyle.Primary), new ButtonBuilder().setCustomId(`template:apply:${id}`).setLabel('Aplicar arquitetura').setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId('panel:home').setLabel('Voltar').setStyle(ButtonStyle.Secondary));
    return interaction.update({ content: 'Revise o plano. Aplicar cria somente itens ausentes; não apaga canais nem cargos.', embeds: [embed], components: [row] });
  }
  if (interaction.customId.startsWith('template:save:')) {
    const id = interaction.customId.split(':')[2]; await updateGuildConfig(interaction.guildId, { template: id });
    return interaction.update({ content: `Template **${id}** salvo. A aplicação continua separada e exige outro clique.`, embeds: [], components: [backButton()] });
  }
  if (interaction.customId.startsWith('template:apply:')) {
    await interaction.deferUpdate();
    const id = interaction.customId.split(':')[2];
    await updateGuildConfig(interaction.guildId, { template: id });
    const result = await applyTemplate(interaction.guild, id, logger);
    return interaction.editReply({ content: `Arquitetura aplicada com segurança: ${summarizePlan(result.plan)}. Itens existentes foram preservados.`, embeds: [], components: [backButton()] });
  }
  if (interaction.customId === 'panel:roles') return interaction.update({ content: 'Painel de cargos em construção. A base de templates já define cargos e permissões; a próxima versão terá edição individual e prévia de hierarquia.', embeds: [], components: [backButton()] });
  if (interaction.customId === 'panel:channels') return interaction.update({ content: 'Painel de canais em construção. A aplicação já cria categorias e canais ausentes sem apagar sua estrutura.', embeds: [], components: [backButton()] });
  if (interaction.customId === 'panel:automation') return interaction.update({ content: 'Automações planejadas: boas-vindas, logs de auditoria, tickets, onboarding e lembretes. Cada uma terá botão de ativar/desativar e registro.', embeds: [], components: [backButton()] });
  if (interaction.customId === 'panel:personality') return interaction.update({ content: 'Personalidade atual: **A.U.R.A.**, uma arquiteta clara e técnica. A próxima etapa adicionará modal para nome, tom, saudação e regras de comportamento.', embeds: [], components: [backButton()] });
  return false;
}
