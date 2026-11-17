import fs from 'node:fs';
import path from 'node:path';
import { AttachmentBuilder } from 'discord.js';
import { asset } from './assets.js';

export function attachmentFor(id) {
  const definition = asset(id); if (!definition) return null;
  const absolute = path.resolve(definition.path); if (!fs.existsSync(absolute)) return null;
  const filename = path.basename(absolute); return { attachment: new AttachmentBuilder(absolute, { name: filename }), filename };
}
export function applyImage(embed, id) { const item = attachmentFor(id); if (!item) return { embed, files: [] }; embed.setImage(`attachment://${item.filename}`); return { embed, files: [item.attachment] }; }
