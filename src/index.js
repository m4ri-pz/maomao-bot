import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { commandMap } from './commands/index.js';
import { handleInteraction } from './interactions/router.js';
import { logger } from './core/logger.js';
import { assertRuntimeEnv } from './config/env.js';
import { runAutoSetup } from './modules/provisioning/auto-setup.js';
import { auditChannel, auditMemberAdd, auditMemberRemove, auditRole, welcomeMember } from './services/automations.js';

assertRuntimeEnv();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once(Events.ClientReady, (ready) => { logger.info({ user: ready.user.tag, guilds: ready.guilds.cache.size }, 'Maomao abriu as portas do Palácio'); void runAutoSetup(client, logger).catch((error) => logger.error({ error: error.message, stack: error.stack }, 'A preparação automática encontrou um obstáculo')); });
client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isChatInputCommand()) { const command = commandMap.get(interaction.commandName); if (!command) { logger.warn({ command: interaction.commandName }, 'Comando slash sem handler; registro antigo ou divergente'); return interaction.reply({ content: 'Este comando está desatualizado. Registre os comandos novamente e tente outra vez.', flags: 64 }); } return await command.execute(interaction); }
    await handleInteraction(interaction, logger);
  } catch (error) {
    logger.error({ error: error.message, stack: error.stack }, 'Uma interação saiu do registro esperado');
    const payload = { content: 'A Maomao encontrou um detalhe fora do lugar. Consulte os registros e tente novamente com calma.', flags: 64 };
    if (interaction.deferred || interaction.replied) await interaction.editReply(payload).catch(() => {});
    else await interaction.reply(payload).catch(() => {});
  }
});
client.on(Events.Error, (error) => logger.error({ error: error.message }, 'O mensageiro do Discord encontrou um obstáculo'));
client.on(Events.GuildMemberAdd, (member) => { void welcomeMember(member, logger).catch((error) => logger.warn({ guildId: member.guild.id, error: error.message }, 'A recepção automática encontrou um obstáculo')); void auditMemberAdd(member).catch(() => {}); });
client.on(Events.GuildMemberRemove, (member) => { void auditMemberRemove(member).catch(() => {}); });
client.on(Events.ChannelCreate, (channel) => { void auditChannel(channel, 'criado').catch(() => {}); });
client.on(Events.ChannelDelete, (channel) => { void auditChannel(channel, 'removido').catch(() => {}); });
client.on(Events.RoleCreate, (role) => { void auditRole(role, 'criado').catch(() => {}); });
client.on(Events.RoleDelete, (role) => { void auditRole(role, 'removido').catch(() => {}); });
await client.login(process.env.DISCORD_TOKEN);
