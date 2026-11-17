import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { getBlueprint, buildPlan } from '../core/blueprints.js';
import { canManageServer, summarizePlan } from '../core/safety.js';
import { characterProfile } from '../personality/character-profile.js';

export const data = new SlashCommandBuilder().setName('template-oficial').setDescription('Mostra a base oficial da Maomao para este servidor.').setDMPermission(false);
export async function execute(interaction) {
  if (!canManageServer(interaction.member)) return interaction.reply({ content: 'Apenas a equipe autorizada pode aplicar o template oficial.', ephemeral: true });
  const blueprint = getBlueprint('maomao-palace'); const plan = buildPlan(blueprint);
  const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle('Palácio das Ervas · Template oficial').setDescription(`${blueprint.description}\n\nMaomao organizou uma estrutura pronta para quem prefere começar sem montar tudo do zero.`).addFields({ name: 'Plano', value: summarizePlan(plan) }, { name: 'Cargos', value: plan.roles.map((role) => `• ${role.name}`).join('\n') }, { name: 'Áreas', value: plan.categories.map((category) => `• ${category.name}`).join('\n') }, { name: 'Permissões', value: 'Cargos, hierarquia, área restrita da equipe e canais de leitura serão configurados após a confirmação.' });
  return interaction.reply({ embeds: [embed], components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('official:apply').setLabel('Aplicar base oficial').setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId('panel:cancel').setLabel('Cancelar').setStyle(ButtonStyle.Secondary))], ephemeral: true });
}
