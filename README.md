# Maomao Bot

> **Observar. Separar. Organizar. Aplicar somente quando tudo estiver conferido.**
>
> Um bot Discord modular com a personalidade da Maomao e uma base oficial inspirada em investigação, ervas, laboratório e organização do palácio.

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-5FA04E?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![discord.js](https://img.shields.io/badge/discord.js-v14-5865F2?style=flat-square&logo=discord&logoColor=white)](https://discord.js.org/)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-C39B5B?style=flat-square)](https://github.com/m4ri-pz/maomao-bot)

## A proposta

Maomao não é apenas um bot de comandos. Ela funciona como uma administradora visual do servidor: analisa a estrutura, apresenta um plano e pede confirmação antes de aplicar mudanças importantes.

A personalidade padrão é curiosa, direta, analítica, reservada e levemente sarcástica. Os textos do projeto são autorais e a estética usa referências gerais de ervas, investigação, laboratório e palácio, sem copiar falas ou artes da obra.

> “Se a estrutura está desorganizada, primeiro encontramos a causa. Depois mexemos no que precisa ser mexido.”

## O que já existe

| Área | Função |
| --- | --- |
| **Template oficial** | `/template-oficial` prepara a estrutura-base do servidor Maomao. |
| **Painel visual** | `/configuracao` concentra a configuração em botões, menus e modais. |
| **Arquitetura** | Criação segura de cargos, hierarquia, categorias, canais e permissões. |
| **Tickets** | Central configurável, canais privados, abertura e fechamento por botão. |
| **Automações** | Ativação individual de recursos como boas-vindas e logs. |
| **RPG** | Classes, exploração, experiência, níveis, missões, ouro e inventário. |
| **Personalidade** | Nome e tom de voz ajustáveis por servidor. |

## Template oficial · Palácio das Ervas

Para quem não quer montar tudo do zero, o bot oferece uma única base oficial. Ela foi pensada para uma comunidade temática de investigação, botânica e mistérios do palácio.

Use:

```text
/template-oficial
```

Antes de aplicar, Maomao mostra uma prévia. Depois da confirmação, ela configura:

- cargos de Regente, Curandeiro-chefe, Investigador, Apoiador, Visitante e Bot;
- permissões e hierarquia planejada;
- Portão do Palácio;
- Casa das Ervas;
- Investigações;
- Pátio da Comunidade;
- Atendimento;
- Área Restrita da equipe;
- canais de texto e voz;
- regras, boas-vindas e anúncios em modo leitura.

O modo oficial **não apaga canais ou cargos existentes**. Ele cria o que estiver faltando, ajusta os itens pertencentes à base oficial, adiciona descrições aos canais e publica mensagens iniciais idempotentes em áreas importantes. Se for executado novamente, a Maomao verifica os marcadores existentes em vez de duplicar a apresentação.

A base agora possui sete áreas: Portão do Palácio, Casa das Ervas, Investigações, Pátio da Comunidade, RPG · Registros do Palácio, Atendimento e Área Restrita. A área de RPG já nasce com painel, casos, eventos e taverna; a equipe recebe uma área privada para registros e coordenação.

### O que foi removido

O projeto não aceita mais templates externos ou templates arbitrários criados por qualquer usuário. O comando antigo `/importar-template` foi removido de propósito. A base única mantém cargos, permissões, estética e experiência consistentes em todos os servidores.

## Comandos principais

| Comando | Uso |
| --- | --- |
| `/template-oficial` | Visualiza e aplica o template-base Maomao. |
| `/configuracao` | Abre o painel geral do servidor. |
| `/painel-tickets` | Publica a central de atendimento. |
| `/rpg` | Abre o dashboard interativo de RPG. |
| `/painel-admin` | Acessa ferramentas administrativas seguras. |
| `/status` | Verifica o estado do bot. |

## Instalação

### 1. Criar a aplicação no Discord

1. Abra o [Discord Developer Portal](https://discord.com/developers/applications).
2. Crie uma aplicação com o nome **Maomao**.
3. Crie o usuário bot e copie o token somente para o arquivo `.env`.
4. Convide o bot com os escopos `bot` e `applications.commands`.
5. Dê apenas as permissões necessárias. O cargo do bot precisa ficar acima dos cargos que ele gerenciará.

### 2. Instalar e configurar

```bash
git clone https://github.com/m4ri-pz/maomao-bot.git
cd maomao-bot
npm install
cp .env.example .env
```

Preencha o `.env`:

```env
DISCORD_TOKEN=seu_token
DISCORD_CLIENT_ID=id_da_aplicacao
DISCORD_GUILD_ID=id_do_servidor_de_desenvolvimento
```

### 3. Registrar e executar

```bash
npm run check
npm run register
npm start
```

Durante o desenvolvimento, `DISCORD_GUILD_ID` faz os comandos aparecerem mais rapidamente no servidor de teste. O arquivo `.env` nunca deve ser enviado ao GitHub.

### Configuração automática do servidor

Depois que o bot estiver convidado para o seu servidor, a configuração inicial pode ser ativada no `.env`:

```env
MAOMAO_AUTO_SETUP=true
MAOMAO_AUTO_SETUP_GUILD_ID=id_do_seu_servidor
MAOMAO_SETUP_MODE=additive
```

Ao iniciar no Termux, Maomao verifica o servidor indicado, cria um backup estrutural e aplica o Palácio das Ervas de forma idempotente. Se a configuração já foi concluída, ela não duplica canais nem cargos. O único modo permitido atualmente é `additive`: nada é apagado automaticamente.

O bot precisa de `Gerenciar Servidor`, `Gerenciar Cargos` e `Gerenciar Canais`. Se alguma permissão faltar, o provisionamento é bloqueado e o motivo aparece nos logs.

## Usar pelo Android com Termux

O Termux pode ser usado para editar, testar e sincronizar o projeto. Ele é adequado para desenvolvimento; manter o bot online 24 horas exige uma hospedagem apropriada.

```bash
pkg update && pkg upgrade -y
pkg install git nodejs-lts openssh nano -y
git clone https://github.com/m4ri-pz/maomao-bot.git
cd maomao-bot
npm install
cp .env.example .env
nano .env
npm run check
npm run register
npm start
```

Para parar o bot, use `Ctrl+C`.

## Fluxo Git

Confira o repositório e a branch atual:

```bash
git remote -v
git branch --show-current
```

Para atualizar e enviar uma alteração simples:

```bash
git pull --rebase origin main
# edite os arquivos
git status
npm run check
git add .
git commit -m "feat: descreva sua mudança"
git push origin main
```

Para uma alteração maior, use uma branch:

```bash
git switch main
git pull --rebase origin main
git switch -c feat/nova-funcao
# edite e teste
npm run check
git add .
git commit -m "feat: adicionar nova função"
git push -u origin feat/nova-funcao
```

Depois, abra um Pull Request no GitHub. Nunca faça commit do `.env`, tokens, senhas ou credenciais.

## Organização do projeto

```text
src/
├── commands/       comandos Slash e registro único
├── core/           template oficial, segurança e planos
├── interactions/   UI, roteador e handlers por domínio
├── panels/         visões reutilizáveis dos painéis
├── personality/    identidade e mensagens da Maomao
├── services/       estrutura, Tickets e RPG
└── store/          configurações persistentes por servidor
```

### Como a nova estrutura funciona

Os comandos Slash ficam registrados uma única vez em `src/commands/index.js`. O `index.js` apenas inicializa o cliente e encaminha a interação. O roteador não contém mais a lógica de todas as funções: ele identifica o domínio e delega para um handler específico.

```text
comando Slash
    ↓
commands/index.js
    ↓
interactions/router.js
    ├── handlers/template.js
    ├── handlers/tickets.js
    ├── handlers/settings.js
    └── handlers/rpg.js
    ↓
services + store
```

Isso permite ampliar cargos, canais, permissões e automações sem transformar um único arquivo em um painel impossível de manter. Cada domínio pode ganhar novas telas, confirmações e testes sem reescrever o bot inteiro.

O RPG já possui uma camada própria em `src/modules/rpg/`, com domínio de personagem, armazenamento, motor de regras, locais, casos, receitas e telas interativas. O `/rpg` abre um dashboard com botões para explorar, consultar casos, abrir o laboratório de alquimia, ver inventário, consultar a ficha e descansar. Menus de seleção exibem locais, casos e receitas sem transformar o RPG em uma sequência de comandos de texto.

## Assets e imagens

Imagens não ficam espalhadas pelo código. O catálogo visual está em `src/branding/assets.js` e os arquivos esperados ficam em:

```text
assets/
├── branding/       avatar e banner do bot
├── panels/         imagens dos painéis
└── rpg/            personagens, locais, itens e eventos
```

O banner e a foto originais devem ser colocados nessas pastas como arquivos separados, não como captura de tela da interface do celular. Cada imagem deverá ser registrada com contexto e texto alternativo antes de ser usada em um embed.

## Princípios da Maomao

1. **Simular antes de aplicar.**
2. **Não apagar a estrutura do servidor automaticamente.**
3. **Não conceder permissões perigosas sem confirmação.**
4. **Explicar o que será alterado.**
5. **Manter cargos e configurações-base consistentes.**
6. **Permitir personalização sem perder a identidade do bot.**

## Estado do projeto

A base está em desenvolvimento ativo. O próximo ciclo pode adicionar edição individual de cargos e canais, backups locais, logs avançados, painel web e configurações mais detalhadas para moderação.

## Licença e uso

O repositório é público para estudo e desenvolvimento. Antes de usar nomes, imagens ou outros elementos de uma obra em um servidor público, verifique as permissões e os direitos aplicáveis. O código usa uma apresentação autoral para a identidade Maomao.
