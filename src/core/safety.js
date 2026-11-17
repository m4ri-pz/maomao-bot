import { PermissionFlagsBits } from 'discord.js';

export const MANAGE_GUILD_PERMISSIONS = [PermissionFlagsBits.ManageGuild, PermissionFlagsBits.ManageRoles, PermissionFlagsBits.ManageChannels];
export function canArchitect(member) {
  return member.permissions.has(PermissionFlagsBits.Administrator) || member.permissions.has(PermissionFlagsBits.ManageGuild);
}
export function summarizePlan(plan) {
  return ` cargos: ${plan.roles.length} | categorias: ${plan.categories.length} | canais: ${plan.channels.length}`;
}
export function permissionBits(names = []) {
  return names.reduce((bits, name) => bits | (PermissionFlagsBits[name] ?? 0n), 0n);
}
