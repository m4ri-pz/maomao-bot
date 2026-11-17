import * as configuration from './configuration.js';
import * as status from './status.js';
import * as tickets from './tickets.js';
import * as rpg from './rpg.js';
import * as admin from './admin.js';
import * as officialTemplate from './official-template.js';

export const commandModules = [configuration, status, tickets, rpg, admin, officialTemplate];
export const commandMap = new Map(commandModules.map((command) => [command.data.name, command]));
export const commandPayloads = commandModules.map((command) => command.data.toJSON());
