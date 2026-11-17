import test from 'node:test';
import assert from 'node:assert/strict';
import { getBlueprint, listBlueprints, buildPlan } from '../src/core/blueprints.js';

test('somente o template oficial do Maomao fica disponível', () => {
  assert.deepEqual(listBlueprints(), ['maomao-palace']);
  const blueprint = getBlueprint('maomao-palace');
  const plan = buildPlan(blueprint);
  assert.equal(blueprint.staffRoles.includes('Investigador'), true);
  assert.ok(plan.categories.some((category) => category.staffOnly));
  assert.ok(plan.channels.some((channel) => channel.readOnly));
  assert.ok(plan.channels.some((channel) => channel.type === 'voice'));
});

test('rejeita template inexistente', () => {
  assert.throws(() => getBlueprint('nao-existe'));
});
