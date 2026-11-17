import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { commandMap } from './commands/index.js';
import { handleInteraction } from './interactions/router.js';
import { logger } from './core/logger.js';
import { assertRuntimeEnv } from './config/env.js';
import { runAutoSetup } from './modules/provisioning/auto-setup.js';

assertRuntimeEnv();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once(Events.ClientReady, (ready) => { logger.info({ user: ready.user.tag, guilds: ready.guilds.cache.size }, 'Maomao abriu as portas do Palácio'); void runAutoSetup(client, logger).catch((error) => logger.error({ error: error.message, stack: error.stack }, 'A preparação automática encontrou um obstáculo')); });
client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isChatInputCommand()) return await commandMap.get(interaction.commandName)?.execute(interaction);
    await handleInteraction(interaction, logger);
  } catch (error) {
    logger.error({ error: error.message, stack: error.stack }, 'Uma interação saiu do registro esperado');
    const payload = { content: 'A Maomao encontrou um detalhe fora do lugar. Consulte os registros e tente novamente com calma.', ephemeral: true };
    if (interaction.deferred || interaction.replied) await interaction.editReply(payload).catch(() => {});
    else await interaction.reply(payload).catch(() => {});
  }
});
client.on(Events.Error, (error) => logger.error({ error: error.message }, 'O mensageiro do Discord encontrou um obstáculo'));
await client.login(process.env.DISCORD_TOKEN);
