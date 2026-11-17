import { PermissionFlagsBits } from 'discord.js';

export const MANAGE_GUILD_PERMISSIONS = [PermissionFlagsBits.ManageGuild, PermissionFlagsBits.ManageRoles, PermissionFlagsBits.ManageChannels];
export function canManageServer(member) { return Boolean(member?.permissions?.has(PermissionFlagsBits.Administrator) || member?.permissions?.has(PermissionFlagsBits.ManageGuild)); }
export function canManageStructure(member) { return Boolean(member?.permissions?.has(PermissionFlagsBits.Administrator) || MANAGE_GUILD_PERMISSIONS.every((permission) => member?.permissions?.has(permission))); }
export function summarizePlan(plan) { return ` cargos: ${plan.roles.length} | categorias: ${plan.categories.length} | canais: ${plan.channels.length}`; }
export function permissionBits(names = []) { return names.reduce((bits, name) => bits | (PermissionFlagsBits[name] ?? 0n), 0n); }
