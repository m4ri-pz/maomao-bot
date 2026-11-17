import test from 'node:test';
import assert from 'node:assert/strict';
import { commandModules, commandPayloads } from '../src/commands/index.js';

test('registro central contém somente os comandos oficiais', () => {
  assert.equal(commandModules.length, 6);
  assert.deepEqual(commandPayloads.map((command) => command.name), ['configuracao', 'status', 'painel-tickets', 'rpg', 'painel-admin', 'template-oficial']);
  assert.ok(commandPayloads.every((command) => command.dm_permission === false));
});
