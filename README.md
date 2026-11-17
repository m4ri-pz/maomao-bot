# Discord Architect

Bot Discord modular para planejar e organizar servidores usando painéis interativos. O bot tem como princípio: **simular antes de aplicar**.

## Visão

O Architect poderá:

- montar uma arquitetura de cargos e canais a partir de templates;
- mostrar um plano de mudanças antes de executá-lo;
- criar cargos e canais com permissões explícitas;
- abrir painéis de configuração por botões, menus e modais;
- guardar preferências por servidor;
- configurar personalidade e tom do personagem;
- executar automações com permissões mínimas e logs;
- evoluir para plugins de tickets, onboarding, formulários e backups de configuração.

A primeira identidade padrão é **A.U.R.A., a Arquiteta do Servidor**: clara, prestativa e técnica, sem fingir que uma ação foi aplicada quando ainda está apenas planejada.

## Desenvolvimento pelo Samsung A13 com Termux

No Termux:

```bash
pkg update && pkg upgrade -y
pkg install git nodejs-lts openssh -y
git clone https://github.com/SEU_USUARIO/discord-architect.git
cd discord-architect
npm install
cp .env.example .env
nano .env
npm run check
npm start
```

Para editar: `nano src/features/setup/panel.js` ou use um editor Android que abra a pasta do Termux. Para sincronizar:

```bash
git status
git add .
git commit -m "feat: descreva sua mudança"
git push
```

Nunca faça commit do `.env` e nunca cole o token do Discord em mensagens, issues ou código.

## Configuração do Discord

1. Crie uma aplicação no Discord Developer Portal.
2. Crie um bot e copie o token somente para `.env`.
3. Convide-o com os escopos `bot` e `applications.commands`.
4. Durante o desenvolvimento, use `DISCORD_GUILD_ID` para registrar comandos rapidamente.
5. Dê ao bot somente as permissões necessárias. O cargo do bot precisa ficar acima dos cargos que ele deverá gerenciar.

## Estado atual

A base já inclui `/configuracao`, painel de botões, templates, simulação, aplicação de arquitetura, armazenamento local por servidor e registro de comandos. A próxima etapa pode adicionar banco SQLite, painel web e integração opcional com IA.
