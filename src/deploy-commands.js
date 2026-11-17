import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import * as configuration from './commands/configuration.js';
import * as status from './commands/status.js';
import * as tickets from './commands/tickets.js';
import * as rpg from './commands/rpg.js';
import * as admin from './commands/admin.js';

const commands = [configuration.data.toJSON(), status.data.toJSON(), tickets.data.toJSON(), rpg.data.toJSON(), admin.data.toJSON()];
if (!process.env.DISCORD_TOKEN || !process.env.DISCORD_CLIENT_ID) throw new Error('Configure DISCORD_TOKEN e DISCORD_CLIENT_ID no .env');
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
const route = process.env.DISCORD_GUILD_ID ? Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID) : Routes.applicationCommands(process.env.DISCORD_CLIENT_ID);
await rest.put(route, { body: commands });
console.log(`Registrados ${commands.length} comandos ${process.env.DISCORD_GUILD_ID ? 'no servidor de desenvolvimento' : 'globalmente'}.`);
