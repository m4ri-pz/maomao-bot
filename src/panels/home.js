import { EmbedBuilder, ButtonStyle } from 'discord.js';
import { getGuildConfig } from '../store/guild-store.js';
import { characterProfile } from '../personality/character-profile.js';
import { personality } from '../personality/messages.js';
import { button, row } from '../interactions/ui.js';
import { applyImage } from '../branding/discord-assets.js';

export async function homeView(guildId) {
  const config = await getGuildConfig(guildId);
  const embed = new EmbedBuilder().setColor(characterProfile.colors.primary).setTitle(personality.panelTitle('Salão principal', config.personality.name)).setDescription(`${characterProfile.tagline}\n\n${personality.preview}`).addFields({ name: 'Base em análise', value: config.template, inline: true }, { name: 'Estado', value: config.dryRun ? 'Modo de observação' : 'Aplicação autorizada', inline: true }, { name: 'Câmaras', value: 'Estrutura · Atendimento · Registros · Automações', inline: false }).setFooter({ text: `${config.personality.name} · cada detalhe tem seu lugar` });
  const components = [row(button('panel:template', 'Base oficial', ButtonStyle.Primary), button('panel:roles', 'Cargos'), button('panel:channels', 'Canais'), button('panel:tickets', 'Tickets', ButtonStyle.Primary), button('panel:automation', 'Automações', ButtonStyle.Success)), row(button('panel:rpg', 'RPG', ButtonStyle.Success), button('panel:personality', 'Identidade'), button('panel:admin', 'Administração'), button('panel:help', 'Como usar'))];
  return { ...applyImage(embed, 'mainPanel'), components };
}
