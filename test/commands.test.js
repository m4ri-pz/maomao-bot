import test from 'node:test';
import assert from 'node:assert/strict';
import { commandModules, commandPayloads } from '../src/commands/index.js';
import { execute as executeRpg } from '../src/commands/rpg.js';

test('registro central contém somente os comandos oficiais', () => {
  assert.equal(commandModules.length, 6);
  assert.deepEqual(commandPayloads.map((command) => command.name), ['configuracao', 'status', 'painel-tickets', 'rpg', 'painel-admin', 'template-oficial']);
  assert.ok(commandPayloads.every((command) => command.dm_permission === false));
});

test('painel do RPG é respondido de forma privada', async () => {
  let payload;
  await executeRpg({ guildId: 'test-guild', user: { id: 'test-user', username: 'Investigador' }, reply: async (value) => { payload = value; } });
  assert.equal(payload.flags, 64);
});
