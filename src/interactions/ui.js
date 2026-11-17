import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export function button(id, label, style = ButtonStyle.Secondary) { return new ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style); }
export function row(...components) { return new ActionRowBuilder().addComponents(components); }
export function backRow() { return row(button('panel:home', 'Voltar ao painel')); }
export function cancelRow() { return row(button('panel:cancel', 'Cancelar')); }
export function modalInput(id, label, value, style = TextInputStyle.Short) { return new TextInputBuilder().setCustomId(id).setLabel(label).setStyle(style).setValue(String(value || '').slice(0, 4000)).setRequired(true); }
export function modal(id, title, fields) { const builder = new ModalBuilder().setCustomId(id).setTitle(title); builder.addComponents(...fields.map((field) => row(modalInput(field.id, field.label, field.value, field.style)))); return builder; }
