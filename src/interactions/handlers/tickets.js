import { EmbedBuilder, ButtonStyle, TextInputStyle } from 'discord.js';
import { getGuildConfig, updateGuildConfig } from '../../store/guild-store.js';
import { characterProfile } from '../../personality/character-profile.js';
import { createTicket } from '../../services/tickets.js';
import { ticketPanel } from '../../modules/tickets/ui/panel.js';
import { backRow, button, modal, row } from '../ui.js';
export function handles(id) { return id === 'panel:tickets' || id === 'ticket:type' || id === 'ticket:settings' || id === 'ticket:settings:save' || id === 'ticket:publish'; }
export async function handle(interaction) {
  const id = interaction.customId;
  if (id === 'panel:tickets') { const config = await getGuildConfig(interaction.guildId); const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle(`${config.personality.name} · Central de Tickets`).setDescription('Configure categorias, título e publicação do atendimento por um painel visual.').addFields({ name: 'Categoria', value: config.tickets.categoryName, inline: true }, { name: 'Título', value: config.tickets.panelTitle, inline: true }, { name: 'Tipos', value: 'Suporte · Denúncia · Sugestão · Parceria' }); return interaction.update({ content: '', embeds: [embed], components: [row(button('ticket:settings', 'Editar painel', ButtonStyle.Primary), button('ticket:publish', 'Publicar aqui', ButtonStyle.Success)), backRow()] }); }
  if (id === 'ticket:settings') { const config = await getGuildConfig(interaction.guildId); return interaction.showModal(modal('ticket:settings:save', 'Configurar central de Tickets', [{ id: 'categoryName', label: 'Nome da categoria', value: config.tickets.categoryName }, { id: 'panelTitle', label: 'Título do painel', value: config.tickets.panelTitle, style: TextInputStyle.Paragraph }])); }
  if (id === 'ticket:settings:save') { await updateGuildConfig(interaction.guildId, { tickets: { categoryName: interaction.fields.getTextInputValue('categoryName'), panelTitle: interaction.fields.getTextInputValue('panelTitle') } }); return interaction.reply({ content: 'Central de Tickets atualizada. Publique-a pelo painel quando quiser.', ephemeral: true }); }
  if (id === 'ticket:publish') { const config = await getGuildConfig(interaction.guildId); await interaction.channel.send(ticketPanel(config)); return interaction.update({ content: 'Central de Tickets publicada neste canal.', embeds: [], components: [backRow()] }); }
  if (id === 'ticket:type') { const result = await createTicket(interaction, interaction.values[0]); return interaction.reply({ content: result.created ? `Atendimento criado: ${result.channel}` : `Você já possui um atendimento aberto: ${result.channel}`, ephemeral: true }); }
}
export async function open(interaction) { const result = await createTicket(interaction, 'support'); return interaction.reply({ content: result.created ? `Atendimento criado: ${result.channel}` : `Você já possui um atendimento aberto: ${result.channel}`, ephemeral: true }); }
