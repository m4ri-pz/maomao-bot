import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlayer } from '../src/modules/rpg/domain/player.js';
import { cases } from '../src/modules/rpg/content/cases.js';

test('casos possuem pistas suficientes para investigação por painel', () => {
  assert.equal(cases.length, 3);
  assert.ok(cases.every((item) => item.clues.length >= 3));
});

test('estado RPG preserva caso ativo, inventário e ingredientes', () => {
  const player = createPlayer({ activeCase: 'missing-herbs', discoveredClues: ['empty-shelf'], ingredients: ['pó de jade'] });
  assert.equal(player.activeCase, 'missing-herbs');
  assert.deepEqual(player.discoveredClues, ['empty-shelf']);
  assert.ok(player.ingredients.includes('pó de jade'));
});
