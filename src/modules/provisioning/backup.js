import fs from 'node:fs/promises';
import path from 'node:path';
import { env } from '../../config/env.js';

export async function backupGuild(guild, reason = 'pre-setup') {
  const snapshot = { version: 1, reason, createdAt: new Date().toISOString(), guild: { id: guild.id, name: guild.name }, roles: guild.roles.cache.map((role) => ({ id: role.id, name: role.name, color: role.hexColor, position: role.position, permissions: role.permissions.bitfield.toString(), managed: role.managed })), channels: guild.channels.cache.map((channel) => ({ id: channel.id, name: channel.name, type: channel.type, parentId: channel.parentId, position: channel.position, topic: channel.topic || null, permissionOverwrites: channel.permissionOverwrites.cache.map((overwrite) => ({ id: overwrite.id, type: overwrite.type, allow: overwrite.allow.bitfield.toString(), deny: overwrite.deny.bitfield.toString() })) })) };
  const dir = path.join(env.dataDir, 'backups', guild.id); await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, `${Date.now()}-${reason}.json`); await fs.writeFile(file, JSON.stringify(snapshot, null, 2));
  return { file, snapshot };
}
