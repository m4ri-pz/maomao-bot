import { SlashCommandBuilder } from 'discord.js';
import { canManageServer } from '../core/safety.js';
import { adminView } from '../modules/admin/ui/panel.js';
export const data = new SlashCommandBuilder().setName('painel-admin').setDescription('Abre a Câmara de Administração da Maomao.').setDMPermission(false);
export async function execute(interaction) { if (!canManageServer(interaction.member)) return interaction.reply({ content: 'Você não tem permissão para abrir a Câmara de Administração.', flags: 64 }); const view = adminView(); return interaction.reply({ embeds: [view.embed], files: view.files, components: view.components, flags: 64 }); }
