import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { commandMap } from './commands/index.js';
import { handleInteraction } from './interactions/router.js';
import { logger } from './core/logger.js';
import { assertRuntimeEnv } from './config/env.js';
import { runAutoSetup } from './modules/provisioning/auto-setup.js';

assertRuntimeEnv();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once(Events.ClientReady, (ready) => { logger.info({ user: ready.user.tag, guilds: ready.guilds.cache.size }, 'Maomao online'); void runAutoSetup(client, logger).catch((error) => logger.error({ error: error.message, stack: error.stack }, 'Falha no provisionamento automático')); });
client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isChatInputCommand()) return await commandMap.get(interaction.commandName)?.execute(interaction);
    await handleInteraction(interaction, logger);
  } catch (error) {
    logger.error({ error: error.message, stack: error.stack }, 'Falha ao processar interação');
    const payload = { content: 'Maomao encontrou um erro controlado. Consulte os registros antes de tentar novamente.', ephemeral: true };
    if (interaction.deferred || interaction.replied) await interaction.editReply(payload).catch(() => {});
    else await interaction.reply(payload).catch(() => {});
  }
});
client.on(Events.Error, (error) => logger.error({ error: error.message }, 'Erro do cliente Discord'));
await client.login(process.env.DISCORD_TOKEN);
