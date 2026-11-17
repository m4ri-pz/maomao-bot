import fs from 'node:fs/promises';
import path from 'node:path';

const queues = new Map();
let sequence = 0;

function exclusive(file, task) {
  const previous = queues.get(file) || Promise.resolve();
  const current = previous.catch(() => {}).then(task);
  let queued;
  queued = current.finally(() => {
    if (queues.get(file) === queued) queues.delete(file);
  });
  queues.set(file, queued);
  return current;
}

async function load(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return structuredClone(fallback);
    throw new Error(`Não foi possível ler ${file}: ${error.message}`, { cause: error });
  }
}

async function save(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temp = `${file}.${process.pid}.${++sequence}.tmp`;
  await fs.writeFile(temp, JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(temp, file);
}

export function readJson(file, fallback = {}) {
  return exclusive(file, () => load(file, fallback));
}

export function updateJson(file, fallback, updater) {
  return exclusive(file, async () => {
    const current = await load(file, fallback);
    const next = await updater(current);
    await save(file, next);
    return next;
  });
}

export function writeJson(file, data) {
  return exclusive(file, async () => {
    await save(file, data);
    return data;
  });
}
