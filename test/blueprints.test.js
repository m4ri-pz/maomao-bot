import test from 'node:test';
import assert from 'node:assert/strict';
import { getBlueprint, listBlueprints, buildPlan } from '../src/core/blueprints.js';

test('lista templates e gera plano de comunidade', () => {
  assert.ok(listBlueprints().includes('community'));
  const plan = buildPlan(getBlueprint('community'));
  assert.ok(plan.roles.length > 0);
  assert.ok(plan.channels.length > 0);
  assert.ok(plan.roles.some((role) => role.name === 'Moderador'));
});

test('rejeita template inexistente', () => {
  assert.throws(() => getBlueprint('nao-existe'));
});
