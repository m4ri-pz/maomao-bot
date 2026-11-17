import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import * as configuration from './commands/configuration.js';
import * as status from './commands/status.js';
import * as tickets from './commands/tickets.js';
import * as rpg from './commands/rpg.js';
import * as admin from './commands/admin.js';
import * as xenon from './commands/xenon.js';
import { handleInteraction } from './interactions/router.js';
import { logger } from './core/logger.js';

if (!process.env.DISCORD_TOKEN) throw new Error('DISCORD_TOKEN não configurado. Copie .env.example para .env.');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
const commands = new Map([[configuration.data.name, configuration], [status.data.name, status], [tickets.data.name, tickets], [rpg.data.name, rpg], [admin.data.name, admin], [xenon.data.name, xenon]]);

client.once(Events.ClientReady, (ready) => logger.info({ user: ready.user.tag, guilds: ready.guilds.cache.size }, 'Discord Architect online'));
client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isChatInputCommand()) return await commands.get(interaction.commandName)?.execute(interaction);
    await handleInteraction(interaction, logger);
  } catch (error) {
    logger.error({ error: error.message, stack: error.stack }, 'Falha ao processar interação');
    const payload = { content: 'Ocorreu um erro controlado. Consulte os logs do bot.', ephemeral: true };
    if (interaction.deferred || interaction.replied) await interaction.editReply(payload).catch(() => {});
    else await interaction.reply(payload).catch(() => {});
  }
});
client.on(Events.Error, (error) => logger.error({ error: error.message }, 'Erro do cliente Discord'));
await client.login(process.env.DISCORD_TOKEN);
