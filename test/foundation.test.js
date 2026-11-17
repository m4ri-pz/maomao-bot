import test from 'node:test';
import assert from 'node:assert/strict';
import { maomaoTheme, embedColor } from '../src/branding/theme.js';
import { visualAssets } from '../src/branding/assets.js';
import { createPlayer, RPG_CLASSES } from '../src/modules/rpg/domain/player.js';

test('tema visual possui identidade e catálogo de assets', () => {
  assert.equal(maomaoTheme.name, 'Maomao');
  assert.equal(embedColor('purple'), 0x6d3bb8);
  assert.ok(visualAssets.banner.path.endsWith('bot-banner.png'));
  assert.ok(visualAssets.mainPanel.usage === 'embed-panel');
});

test('personagem RPG começa normalizado para evoluir por módulos', () => {
  const player = createPlayer({ class: 'Cronista', quest: { progress: 2 } });
  assert.equal(player.level, 1);
  assert.equal(player.quest.goal, 3);
  assert.equal(player.quest.progress, 2);
  assert.equal(RPG_CLASSES.scholar, 'Cronista');
});
