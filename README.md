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

## Desenvolvimento no Android com Termux

O Termux permite clonar, editar, testar e executar o projeto diretamente em um ambiente Linux no Android. Esta seção é voltada ao desenvolvimento e não substitui uma hospedagem permanente para manter o bot online 24 horas.

### 1. Preparar o ambiente

Instale o Termux por uma fonte confiável e, dentro dele, execute:

```bash
pkg update && pkg upgrade -y
pkg install git nodejs-lts openssh nano -y
```

### 2. Baixar o projeto

```bash
git clone https://github.com/m4ri-pz/discord-architect.git
cd discord-architect
npm install
```

### 3. Configurar o bot

Crie o arquivo local de ambiente e abra-o no editor:

```bash
cp .env.example .env
nano .env
```

Preencha `DISCORD_TOKEN` e `DISCORD_CLIENT_ID`. Durante o desenvolvimento, também é útil informar `DISCORD_GUILD_ID` para registrar os comandos rapidamente. O arquivo `.env` é privado e está protegido pelo `.gitignore`; nunca o publique.

### 4. Verificar e executar

```bash
npm run check
npm run register
npm start
```

Se tudo estiver correto, o bot ficará conectado enquanto o processo estiver ativo. Para interromper, use `Ctrl+C`.

### 5. Editar e sincronizar

Os principais arquivos ficam em `src/`. Para editar rapidamente:

```bash
nano src/commands/configuration.js
nano src/interactions/router.js
```

Depois de testar suas alterações:

```bash
git status
git add .
git commit -m "feat: descreva sua mudança"
git push
```

Para trazer mudanças feitas no GitHub:

```bash
git pull --rebase
npm install
```

Se preferir um editor visual, abra a pasta clonada em um editor de código compatível com o armazenamento do Termux. O fluxo continua sendo o mesmo: editar, testar, fazer commit e enviar.

Nunca faça commit do `.env` e nunca cole o token do Discord em mensagens, issues ou código.

## Configuração do Discord

1. Crie uma aplicação no Discord Developer Portal.
2. Crie um bot e copie o token somente para `.env`.
3. Convide-o com os escopos `bot` e `applications.commands`.
4. Durante o desenvolvimento, use `DISCORD_GUILD_ID` para registrar comandos rapidamente.
5. Dê ao bot somente as permissões necessárias. O cargo do bot precisa ficar acima dos cargos que ele deverá gerenciar.

## Estado atual

A base já inclui `/configuracao`, painel de botões, templates, simulação, aplicação de arquitetura, armazenamento local por servidor e registro de comandos. A próxima etapa pode adicionar banco SQLite, painel web e integração opcional com IA.
