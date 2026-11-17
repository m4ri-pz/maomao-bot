import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { getGuildConfig } from '../store/guild-store.js';
import { canManageServer } from '../core/safety.js';
import { characterProfile } from '../personality/character-profile.js';
import { personality } from '../personality/messages.js';

export const data = new SlashCommandBuilder().setName('configuracao').setDescription('Abre o painel visual da Maomao.').setDMPermission(false);

function button(id, label, style = ButtonStyle.Secondary) { return new ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style); }

export async function execute(interaction) {
  if (!canManageServer(interaction.member)) return interaction.reply({ content: 'Apenas administradores ou membros com Gerenciar Servidor podem abrir este painel.', ephemeral: true });
  const config = await getGuildConfig(interaction.guildId);
  const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle(personality.panelTitle('Painel de controle', config.personality.name)).setDescription(`${characterProfile.tagline}\n\n${personality.preview}`).addFields({ name: 'Template atual', value: config.template, inline: true }, { name: 'Modo seguro', value: config.dryRun ? 'Simulação ligada' : 'Aplicação permitida', inline: true }, { name: 'Módulos', value: 'Arquitetura · Tickets · RPG · Automações', inline: false }).setFooter({ text: `${config.personality.name} · ações importantes pedem confirmação` });
  const layout = [
    new ActionRowBuilder().addComponents(button('panel:template', 'Base oficial', ButtonStyle.Primary), button('panel:roles', 'Cargos'), button('panel:channels', 'Canais'), button('panel:tickets', 'Tickets', ButtonStyle.Primary), button('panel:automation', 'Automações', ButtonStyle.Success)),
    new ActionRowBuilder().addComponents(button('panel:rpg', 'RPG', ButtonStyle.Success), button('panel:personality', 'Identidade'), button('panel:admin', 'Administração'), button('panel:help', 'Como usar'))
  ];
  return interaction.reply({ embeds: [embed], components: layout, ephemeral: true });
}
