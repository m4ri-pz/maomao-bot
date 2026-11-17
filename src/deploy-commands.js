import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import { commandPayloads } from './commands/index.js';

if (!process.env.DISCORD_TOKEN || !process.env.DISCORD_CLIENT_ID) throw new Error('O caderno está incompleto. Preencha DISCORD_TOKEN e DISCORD_CLIENT_ID no .env.');
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
const route = process.env.DISCORD_GUILD_ID ? Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID) : Routes.applicationCommands(process.env.DISCORD_CLIENT_ID);
await rest.put(route, { body: commandPayloads });
console.log(`✦ ${commandPayloads.length} registros da Maomao foram entregues ${process.env.DISCORD_GUILD_ID ? 'ao servidor de ensaio' : 'ao Discord globalmente'}.`);
