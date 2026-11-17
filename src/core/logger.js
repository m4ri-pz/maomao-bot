function line(level, payload, message) { const details = payload && Object.keys(payload).length ? ` ${JSON.stringify(payload)}` : ''; console.log(`[${new Date().toISOString()}] ${level.toUpperCase()} ${message}${details}`); }
export const logger = { info: (payload, message) => line('info', payload, message), error: (payload, message) => line('error', payload, message) };
