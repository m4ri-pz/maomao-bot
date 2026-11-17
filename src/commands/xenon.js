import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { canArchitect } from '../core/safety.js';
import { fetchXenonTemplate, xenonPreview } from '../services/xenon.js';
import { characterProfile } from '../personality/character-profile.js';

export const data = new SlashCommandBuilder().setName('importar-template').setDescription('Analisa um template público do Xenon antes de aplicar.').addStringOption((option) => option.setName('template').setDescription('Código ou link xenon.bot/templates/...').setRequired(true));
export async function execute(interaction) {
  if (!canArchitect(interaction.member)) return interaction.reply({ content: 'Apenas a equipe autorizada pode importar templates.', ephemeral: true });
  await interaction.deferReply({ ephemeral: true });
  try {
    const template = await fetchXenonTemplate(interaction.options.getString('template'));
    const count = xenonPreview(template);
    const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle(`Análise Xenon · ${template.name}`).setURL(template.sourceUrl).setDescription('O template foi lido da página pública. As permissões detalhadas não foram consideradas importadas; o Architect aplicará uma política conservadora e não apagará itens existentes.').addFields({ name: 'Estrutura', value: `${count.roles} cargos\n${count.categories} categorias\n${count.textChannels} canais de texto\n${count.voiceChannels} canais de voz`, inline: true }, { name: 'Fonte', value: `[Abrir template](${template.sourceUrl})\nCódigo: \`${template.sourceCode}\`` }, { name: 'Modo', value: 'Adicionar itens ausentes · simulação antes da aplicação' });
    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(`xenon:apply:${template.sourceCode}`).setLabel('Aplicar modo seguro').setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId('panel:home').setLabel('Cancelar').setStyle(ButtonStyle.Secondary));
    return interaction.editReply({ embeds: [embed], components: [row] });
  } catch (error) { return interaction.editReply({ content: `Não consegui analisar o template: ${error.message}`, embeds: [], components: [] }); }
}
