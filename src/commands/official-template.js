import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { getBlueprint, buildPlan } from '../core/blueprints.js';
import { canManageServer, summarizePlan } from '../core/safety.js';
import { characterProfile } from '../personality/character-profile.js';

export const data = new SlashCommandBuilder().setName('template-oficial').setDescription('Examina o Palácio das Ervas antes de aplicá-lo.').setDMPermission(false);
export async function execute(interaction) {
  if (!canManageServer(interaction.member)) return interaction.reply({ content: 'Apenas a equipe autorizada pode examinar e aplicar a base oficial.', flags: 64 });
  const blueprint = getBlueprint('maomao-palace'); const plan = buildPlan(blueprint);
  const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle('✦ Palácio das Ervas · Base oficial').setDescription(`${blueprint.description}\n\nA Maomao preparou uma estrutura completa para quem prefere começar com ordem, identidade e espaço para crescer.`).addFields({ name: 'Plano de organização', value: summarizePlan(plan) }, { name: 'Cargos', value: plan.roles.map((role) => `• ${role.name}`).join('\n') }, { name: 'Áreas', value: plan.categories.map((category) => `• ${category.name}`).join('\n') }, { name: 'Proteção', value: 'Cargos, hierarquia, área reservada e canais de leitura serão configurados somente após sua confirmação.' });
  return interaction.reply({ embeds: [embed], components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('official:apply').setLabel('Confirmar organização').setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId('panel:cancel').setLabel('Arquivar análise').setStyle(ButtonStyle.Secondary))], flags: 64 });
}
