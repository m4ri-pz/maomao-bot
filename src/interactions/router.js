import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { getBlueprint, listBlueprints } from '../core/blueprints.js';
import { applyTemplate, previewTemplate } from '../services/maomao-structure.js';
import { canManageServer, summarizePlan } from '../core/safety.js';
import { getGuildConfig, updateGuildConfig } from '../store/guild-store.js';
import { createTicket, closeTicket } from '../services/tickets.js';
import { act } from '../services/rpg.js';
import { buttons as rpgButtons, card as rpgCard } from '../commands/rpg.js';
import { characterProfile } from '../personality/character-profile.js';
import { personality } from '../personality/messages.js';

function button(id, label, style = ButtonStyle.Secondary) { return new ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style); }
function templateMenu() { return new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('template:select').setPlaceholder('Escolha a base oficial').addOptions(listBlueprints().map((id) => { const b = getBlueprint(id); return { label: b.name, description: b.description.slice(0, 100), value: id }; }))); }
function backButton() { return new ActionRowBuilder().addComponents(button('panel:home', 'Voltar ao painel')); }
function modalInput(id, label, value, style = TextInputStyle.Short) { return new TextInputBuilder().setCustomId(id).setLabel(label).setStyle(style).setValue(value || '').setRequired(true); }

export async function handleInteraction(interaction, logger) {
  if (!interaction.isButton() && !interaction.isStringSelectMenu() && !interaction.isModalSubmit()) return false;

  if (interaction.customId === 'ticket:open') { const result = await createTicket(interaction); return interaction.reply({ content: result.created ? `Ticket criado: ${result.channel}` : `Você já possui um ticket aberto: ${result.channel}`, ephemeral: true }); }
  if (interaction.customId === 'ticket:close') return closeTicket(interaction);
  if (['rpg:explore', 'rpg:rest', 'rpg:inventory', 'rpg:quest'].includes(interaction.customId) || interaction.customId.startsWith('rpg:class:')) { const action = interaction.customId.replace('rpg:', ''); const player = await act(interaction.guildId, interaction.user.id, action); return interaction.update({ embeds: [rpgCard(player, interaction.user.username)], components: rpgButtons(player) }); }

  if (!interaction.guild || !canManageServer(interaction.member)) return interaction.reply({ content: 'Você não tem permissão para usar este painel.', ephemeral: true });

  if (interaction.customId === 'panel:home') { const config = await getGuildConfig(interaction.guildId); return interaction.update({ content: `${characterProfile.name} está pronta. Template atual: **${config.template}**`, embeds: [], components: [templateMenu()] }); }
  if (interaction.customId === 'panel:cancel') return interaction.update({ content: 'Operação cancelada. Nenhuma alteração foi aplicada.', embeds: [], components: [] });
  if (interaction.customId === 'panel:template') return interaction.update({ content: `${personality.preview} Esta é a base oficial da Maomao:`, embeds: [], components: [templateMenu(), backButton()] });
  if (interaction.customId === 'template:select') {
    const id = interaction.values[0]; const { blueprint, plan } = previewTemplate(id);
    const embed = new EmbedBuilder().setColor(characterProfile.colors.success).setTitle(`Simulação · ${blueprint.name}`).setDescription(`${blueprint.description}\n\n${personality.noDestructiveActions}`).addFields({ name: 'Plano', value: summarizePlan(plan) }, { name: 'Cargos', value: plan.roles.map((r) => `• ${r.name}`).join('\n').slice(0, 1024) }, { name: 'Canais', value: plan.channels.map((c) => `• ${c.category} / ${c.name}`).join('\n').slice(0, 1024) });
    return interaction.update({ content: 'Revise o plano. A aplicação cria somente itens ausentes.', embeds: [embed], components: [new ActionRowBuilder().addComponents(button(`template:save:${id}`, 'Salvar escolha', ButtonStyle.Primary), button(`template:apply:${id}`, 'Aplicar arquitetura', ButtonStyle.Success), button('panel:home', 'Voltar'))] });
  }
  if (interaction.customId.startsWith('template:save:')) { const id = interaction.customId.split(':')[2]; await updateGuildConfig(interaction.guildId, { template: id }); return interaction.update({ content: `Template **${id}** salvo. A aplicação continua separada e exige outro clique.`, embeds: [], components: [backButton()] }); }
  if (interaction.customId.startsWith('template:apply:')) { await interaction.deferUpdate(); const id = interaction.customId.split(':')[2]; await updateGuildConfig(interaction.guildId, { template: id }); const result = await applyTemplate(interaction.guild, id, logger); return interaction.editReply({ content: `Arquitetura aplicada com segurança: ${summarizePlan(result.plan)}. Itens existentes foram preservados.`, embeds: [], components: [backButton()] }); }
  if (interaction.customId === 'official:apply') { await interaction.deferUpdate(); const result = await applyTemplate(interaction.guild, 'maomao-palace', logger); await updateGuildConfig(interaction.guildId, { template: 'maomao-palace' }); return interaction.editReply({ content: `Template oficial aplicado: ${summarizePlan(result.plan)}. Cargos, hierarquia e permissões temáticas foram configurados; nada existente foi apagado.`, embeds: [], components: [backButton()] }); }

  if (interaction.customId === 'panel:roles') return interaction.update({ content: 'Painel de cargos: os templates já criam cargos com permissões explícitas. A próxima camada permitirá editar nome, cor, posição e permissões individualmente, sempre com prévia.', embeds: [], components: [backButton()] });
  if (interaction.customId === 'panel:channels') return interaction.update({ content: 'Painel de canais: a arquitetura cria categorias e canais ausentes sem apagar sua estrutura. A próxima camada permitirá editar visibilidade, limites e permissões por cargo.', embeds: [], components: [backButton()] });
  if (interaction.customId === 'panel:tickets') {
    const config = await getGuildConfig(interaction.guildId);
    const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle(personality.panelTitle('Central de Tickets')).setDescription('Configure o atendimento visualmente. O painel público pode ser publicado no canal atual.').addFields({ name: 'Categoria', value: config.tickets.categoryName, inline: true }, { name: 'Título', value: config.tickets.panelTitle, inline: true }, { name: 'Proteções', value: 'Canal privado · um ticket por usuário · botão de fechamento' });
    return interaction.update({ content: '', embeds: [embed], components: [new ActionRowBuilder().addComponents(button('ticket:settings', 'Editar painel', ButtonStyle.Primary), button('ticket:publish', 'Publicar aqui', ButtonStyle.Success)), backButton()] });
  }
  if (interaction.customId === 'ticket:settings') {
    const config = await getGuildConfig(interaction.guildId);
    const modal = new ModalBuilder().setCustomId('ticket:settings:save').setTitle('Configurar central de tickets');
    modal.addComponents(new ActionRowBuilder().addComponents(modalInput('categoryName', 'Nome da categoria', config.tickets.categoryName)), new ActionRowBuilder().addComponents(modalInput('panelTitle', 'Título do painel', config.tickets.panelTitle)));
    return interaction.showModal(modal);
  }
  if (interaction.customId === 'ticket:settings:save') {
    await updateGuildConfig(interaction.guildId, { tickets: { categoryName: interaction.fields.getTextInputValue('categoryName'), panelTitle: interaction.fields.getTextInputValue('panelTitle') } });
    return interaction.reply({ content: 'Configuração de Tickets salva. Abra `/configuracao` para publicar o painel quando quiser.', ephemeral: true });
  }
  if (interaction.customId === 'ticket:publish') {
    const config = await getGuildConfig(interaction.guildId);
    await interaction.channel.send({ embeds: [new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle(config.tickets.panelTitle).setDescription('Precisa de ajuda? Abra um ticket privado e explique o que aconteceu.')], components: [new ActionRowBuilder().addComponents(button('ticket:open', 'Abrir ticket', ButtonStyle.Primary))] });
    return interaction.update({ content: 'Painel de Tickets publicado neste canal.', embeds: [], components: [backButton()] });
  }

  if (interaction.customId === 'panel:personality') {
    const config = await getGuildConfig(interaction.guildId);
    const embed = new EmbedBuilder().setColor(characterProfile.colors.accent).setTitle(personality.panelTitle('Identidade')).setDescription(`${characterProfile.greeting}\n\n**Tom:** ${config.personality.tone}\n**Regra:** ${characterProfile.rule}`).setFooter({ text: 'Personagem original do projeto' });
    return interaction.update({ embeds: [embed], content: '', components: [new ActionRowBuilder().addComponents(button('personality:edit', 'Editar identidade', ButtonStyle.Primary)), backButton()] });
  }
  if (interaction.customId === 'personality:edit') {
    const config = await getGuildConfig(interaction.guildId); const modal = new ModalBuilder().setCustomId('personality:save').setTitle('Editar identidade do bot');
    modal.addComponents(new ActionRowBuilder().addComponents(modalInput('name', 'Nome exibido', config.personality.name)), new ActionRowBuilder().addComponents(modalInput('tone', 'Tom de voz', config.personality.tone)));
    return interaction.showModal(modal);
  }
  if (interaction.customId === 'personality:save') {
    await updateGuildConfig(interaction.guildId, { personality: { name: interaction.fields.getTextInputValue('name'), tone: interaction.fields.getTextInputValue('tone') } });
    return interaction.reply({ content: 'Identidade salva. Os próximos painéis usarão essa configuração.', ephemeral: true });
  }

  if (interaction.customId === 'panel:automation') return interaction.update({ content: 'Automações: cada módulo será ligado ou desligado individualmente, com logs e permissões mínimas.', embeds: [], components: [new ActionRowBuilder().addComponents(button('automation:welcome', 'Boas-vindas', ButtonStyle.Success), button('automation:auditLog', 'Logs', ButtonStyle.Secondary)), backButton()] });
  if (interaction.customId.startsWith('automation:')) { const key = interaction.customId.split(':')[1]; const config = await getGuildConfig(interaction.guildId); const value = !config.automations[key]; await updateGuildConfig(interaction.guildId, { automations: { [key]: value } }); return interaction.update({ content: `${key} ${value ? 'ativada' : 'desativada'}.`, embeds: [], components: [backButton()] }); }
  if (interaction.customId === 'panel:rpg') return interaction.update({ content: 'RPG interativo ativo com progressão, exploração, descanso e inventário. Próximas expansões: classes, missões, lojas, batalhas, mapas e eventos narrativos.', embeds: [], components: [new ActionRowBuilder().addComponents(button('rpg:open', 'Abrir painel RPG', ButtonStyle.Success)), backButton()] });
  if (interaction.customId === 'rpg:open') return interaction.reply({ content: 'Use `/rpg` para abrir seu painel de personagem.', ephemeral: true });
  if (interaction.customId === 'panel:admin') return interaction.update({ content: 'Centro administrativo: arquitetura, Tickets, automações e auditoria ficarão concentrados aqui. Ações destrutivas nunca serão executadas sem confirmação.', embeds: [], components: [backButton()] });
  if (interaction.customId === 'panel:help') return interaction.update({ content: '**Fluxo recomendado**\n1. Escolha um template.\n2. Revise a simulação.\n3. Aplique somente depois de conferir.\n4. Configure Tickets e publique o painel.\n5. Abra `/rpg` para testar o módulo social.', embeds: [], components: [backButton()] });
  return false;
}
