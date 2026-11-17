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

### 5. Fluxo Git completo

O repositório oficial é `https://github.com/m4ri-pz/discord-architect`. Depois do clone, confirme o endereço remoto:

```bash
git remote -v
git branch --show-current
```

Para editar diretamente a branch principal:

```bash
git pull --rebase origin main
nano src/commands/configuration.js
npm run check
git add .
git commit -m "feat: descreva sua mudança"
git push origin main
```

Para trabalhar de forma mais organizada, crie uma branch para cada recurso:

```bash
git pull --rebase origin main
git switch -c feat/painel-tickets
# edite, teste e revise os arquivos
npm run check
git add .
git commit -m "feat: melhorar painel de tickets"
git push -u origin feat/painel-tickets
```

Depois, abra um **Pull Request** no GitHub. Quando a alteração estiver aprovada e incorporada à `main`, volte ao ambiente local:

```bash
git switch main
git pull --rebase origin main
npm install
```

Se o Git pedir sua identidade pela primeira vez, configure apenas seu nome e e-mail público do GitHub:

```bash
git config --global user.name "m4ri-pz"
git config --global user.email "SEU_EMAIL_DO_GITHUB"
```

Não coloque tokens em commits. Para desfazer uma mudança ainda não enviada, use `git restore caminho/do/arquivo`; para consultar o histórico, use `git log --oneline --decorate -10`.

Se preferir um editor visual, abra a pasta clonada em um editor de código compatível com o armazenamento do Termux. O fluxo continua sendo o mesmo: editar, testar, fazer commit e enviar.

Nunca faça commit do `.env` e nunca cole o token do Discord em mensagens, issues ou código.

## Configuração do Discord

1. Crie uma aplicação no Discord Developer Portal.
2. Crie um bot e copie o token somente para `.env`.
3. Convide-o com os escopos `bot` e `applications.commands`.
4. Durante o desenvolvimento, use `DISCORD_GUILD_ID` para registrar comandos rapidamente.
5. Dê ao bot somente as permissões necessárias. O cargo do bot precisa ficar acima dos cargos que ele deverá gerenciar.

## Estado atual

A base inclui `/configuracao`, templates com simulação, aplicação de arquitetura, painel configurável de Tickets, abertura e fechamento de canais privados, automações com ativação por painel e RPG interativo com classes, exploração, missões, inventário e progressão. A identidade A.U.R.A. é original e pode ser personalizada por servidor. As próximas etapas podem adicionar banco SQLite, painel web, logs avançados, moderação visual e integração opcional com IA.
