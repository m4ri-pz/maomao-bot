import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlayer } from '../src/modules/rpg/domain/player.js';
import { cases } from '../src/modules/rpg/content/cases.js';
import { experiments } from '../src/modules/rpg/content/experiments.js';
import { starterEmbed } from '../src/core/starter-messages.js';

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

test('ficha nova normaliza armazenamento vazio e prepara o primeiro registro', () => {
  const player = createPlayer(null);
  assert.equal(player.level, 1);
  assert.equal(player.quest.name, 'Primeiros registros');
  assert.match(player.lastEvent, /caderno está em branco/i);
  assert.deepEqual(player.inventory, ['Caderno de observações']);
});

test('ficha corrompida recebe invariantes seguros', () => {
  const player = createPlayer({ level: 0, hp: 'invalido', inventory: 3, lastEvent: 42, quest: { goal: 0 }, talents: null });
  assert.equal(player.level, 1);
  assert.equal(player.hp, 100);
  assert.deepEqual(player.inventory, ['Caderno de observações']);
  assert.equal(player.lastEvent, 'Seu caderno está em branco. Escolha uma função para começar os registros.');
  assert.equal(player.quest.goal, 1);
  assert.equal(typeof player.lastEvent, 'string');
});

test('painel automático de Tickets já nasce com menu funcional', () => {
  const panel = starterEmbed('tickets');
  assert.equal(panel.components.length, 1);
  assert.equal(panel.components[0].components[0].data.custom_id, 'ticket:type');
});

test('exames do RPG possuem materiais e resultado narrativo seguro', () => {
  assert.ok(experiments.length >= 3);
  assert.ok(experiments.every((item) => item.materials.length > 0 && typeof item.effect === 'string' && item.result));
});
