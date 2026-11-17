import { PermissionFlagsBits } from 'discord.js';
import { env } from '../../config/env.js';
import { backupGuild } from './backup.js';
import { getProvisioningState, saveProvisioningState } from './state.js';
import { applyTemplate } from '../../services/maomao-structure.js';
import { updateGuildConfig } from '../../store/guild-store.js';

const TEMPLATE_REVISION = 6;

export async function runAutoSetup(client, logger) {
  if (!env.autoSetup) return { status: 'disabled' };
  if (!env.autoSetupGuildId) { logger.warn({}, 'MAOMAO_AUTO_SETUP está ativo, mas MAOMAO_AUTO_SETUP_GUILD_ID não foi informado'); return { status: 'blocked', reason: 'missing-guild-id' }; }
  if (env.setupMode !== 'additive') { logger.warn({ setupMode: env.setupMode }, 'Provisionamento bloqueado: somente o modo additive é permitido'); return { status: 'blocked', reason: 'unsafe-mode' }; }
  const guild = await client.guilds.fetch(env.autoSetupGuildId);
  await Promise.all([guild.roles.fetch(), guild.channels.fetch()]);
  const me = guild.members.me || await guild.members.fetchMe();
  const required = [PermissionFlagsBits.ManageGuild, PermissionFlagsBits.ManageRoles, PermissionFlagsBits.ManageChannels];
  if (!required.every((permission) => me.permissions.has(permission))) { logger.error({ guildId: guild.id }, 'Maomao não possui as permissões mínimas para provisionar o servidor'); return { status: 'blocked', reason: 'missing-permissions' }; }
  const current = await getProvisioningState(guild.id);
  if (current?.setupCompleted && current.template === 'maomao-palace' && current.templateRevision >= TEMPLATE_REVISION) { logger.info({ guildId: guild.id, revision: TEMPLATE_REVISION }, 'Provisionamento já está na revisão atual'); return { status: 'already-complete' }; }
  const backup = current?.backupFile ? { file: current.backupFile } : await backupGuild(guild, 'before-maomao-setup');
  await saveProvisioningState(guild.id, { status: 'running', template: 'maomao-palace', templateRevision: TEMPLATE_REVISION, backupFile: backup.file });
  try {
    const result = await applyTemplate(guild, 'maomao-palace', logger);
    await updateGuildConfig(guild.id, { template: 'maomao-palace' });
    const state = await saveProvisioningState(guild.id, { status: 'complete', setupCompleted: true, template: 'maomao-palace', templateRevision: TEMPLATE_REVISION, backupFile: backup.file, counts: { roles: result.plan.roles.length, channels: result.plan.channels.length } });
    logger.info({ guildId: guild.id, backupFile: backup.file }, 'Provisionamento inicial da Maomao concluído');
    return { status: 'complete', state, result };
  } catch (error) {
    await saveProvisioningState(guild.id, { status: 'failed', error: error.message, backupFile: backup.file });
    throw error;
  }
}
