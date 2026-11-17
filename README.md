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

A identidade padrão é **Maomao**: curiosa, direta e analítica, com estética de ervas, investigação e organização do palácio. Os textos do projeto são autorais; não incluímos falas ou artes copiadas da obra.

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
6. No Developer Portal, defina o nome exibido da aplicação como **Maomao** e escolha um avatar que você tenha permissão para usar. O código fornece a estética e os textos; nome e avatar da conta do Discord são configurados no próprio portal.

## Template oficial do servidor

O bot trabalha com um único template-base: **Palácio das Ervas**, uma estrutura oficial com estética de investigação, botânica, laboratório, mistérios e organização do palácio. Isso mantém os cargos, permissões e configurações essenciais consistentes em todos os servidores.

Para usar a configuração pronta:

```text
/template-oficial
```

O comando mostra uma prévia e, após a confirmação, configura:

- cargos-base e suas permissões;
- hierarquia planejada dos cargos;
- categorias do palácio;
- canais de texto e voz;
- canais de regras, boas-vindas e anúncios em modo leitura;
- área restrita para a equipe;
- permissões de visualização, envio, histórico, conexão e fala;
- estrutura de investigação, ervas, comunidade e atendimento.

O modo oficial não apaga canais ou cargos existentes. Ele cria o que estiver faltando e atualiza os itens que pertencem ao template-base. Depois da aplicação, cada administrador pode personalizar nomes, cores, canais e módulos pelo painel `/configuracao`, preservando a identidade estrutural do bot.

Para manter a experiência coerente, o projeto não oferece importação de templates externos nem criação de templates arbitrários pelo usuário. A personalização acontece sobre a base oficial.

## Estado atual

A base inclui `/configuracao`, o `/template-oficial` do Palácio das Ervas, aplicação segura de arquitetura com permissões, painel configurável de Tickets, abertura e fechamento de canais privados, automações com ativação por painel e RPG interativo com classes, exploração, missões, inventário e progressão. A identidade Maomao pode ser personalizada por servidor sem trocar a base estrutural. As próximas etapas podem adicionar banco SQLite, painel web, logs avançados e moderação visual.
