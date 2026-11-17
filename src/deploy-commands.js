import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import { commandPayloads } from './commands/index.js';

if (!process.env.DISCORD_TOKEN || !process.env.DISCORD_CLIENT_ID) throw new Error('Configure DISCORD_TOKEN e DISCORD_CLIENT_ID no .env');
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
const route = process.env.DISCORD_GUILD_ID ? Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID) : Routes.applicationCommands(process.env.DISCORD_CLIENT_ID);
await rest.put(route, { body: commandPayloads });
console.log(`Registrados ${commandPayloads.length} comandos da Maomao ${process.env.DISCORD_GUILD_ID ? 'no servidor de desenvolvimento' : 'globalmente'}.`);
