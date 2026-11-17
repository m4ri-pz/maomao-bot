# Maomao Bot

> **Observar. Catalogar. Organizar. Só então aplicar.**
>
> Uma administradora visual para servidores Discord, com a atmosfera de um palácio de ervas: estrutura profissional, painéis interativos, atendimento reservado e um RPG narrativo construído em botões, menus e descobertas.

<p align="center">
  <a href="https://github.com/m4ri-pz/maomao-bot"><img src="https://img.shields.io/badge/Maomao%20Bot-em%20desenvolvimento-6D3BB8?style=for-the-badge" alt="Maomao Bot"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-20%2B-5FA04E?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 20+"></a>
  <a href="https://discord.js.org/"><img src="https://img.shields.io/badge/discord.js-v14-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="discord.js v14"></a>
</p>

## ✦ A ideia

Maomao não é um amontoado de comandos. Ela observa a estrutura do servidor, apresenta o que encontrou e oferece uma ação clara para cada etapa.

A experiência combina:

- **administração visual**, com diagnósticos, backups e aplicação segura;
- **provisionamento oficial**, com cargos, categorias, canais, permissões e mensagens iniciais;
- **atendimento organizado**, com Tickets privados por categoria;
- **identidade visual**, com embeds, assets e linguagem própria;
- **RPG interativo**, com casos, pistas, exploração, alquimia e progressão.

> “Uma boa investigação começa quando alguém decide não ignorar os detalhes.”

Os textos são autorais e a identidade visual usa referências gerais de ervas, laboratório, investigação e palácio. O projeto não utiliza falas ou artes oficiais da obra.

## ✧ O que já existe

| Câmara | O que acontece ali |
| --- | --- |
| **Palácio oficial** | Cria a estrutura temática completa sem apagar o que já existe. |
| **Centro administrativo** | Diagnostica, faz backup e pede confirmação antes de aplicar mudanças. |
| **Painel de configuração** | Concentra cargos, canais, Tickets, automações e identidade. |
| **Câmara de Atendimento** | Abre Tickets privados de suporte, relatos, sugestões e parcerias. |
| **Registros do Palácio** | RPG visual com dashboard, locais, casos, pistas, alquimia e ficha. |
| **Arquivo visual** | Organiza banner, avatar, painéis e imagens do RPG por contexto. |

## ❖ O servidor oficial

O template único se chama **Palácio das Ervas**. Ele foi desenhado para que um servidor novo já tenha uma identidade coerente, em vez de receber apenas canais vazios.

### Cargos

- Regente do Palácio;
- Curandeiro-chefe;
- Investigador;
- Mestre de Atendimento;
- Apoiador do Palácio;
- Visitante;
- Bot.

### Áreas

```text
PORTÃO DO PALÁCIO
CASA DAS ERVAS
INVESTIGAÇÕES
PÁTIO DA COMUNIDADE
RPG · REGISTROS DO PALÁCIO
ATENDIMENTO
ÁREA RESTRITA
```

A aplicação oficial também prepara descrições de canais e publica mensagens iniciais em boas-vindas, regras, anúncios, biblioteca de casos, relatórios, painel do RPG e atendimento.

### Segurança da aplicação

O modo oficial é **aditivo**:

- cria somente o que estiver faltando;
- preserva canais e cargos existentes;
- configura permissões pertencentes à base;
- publica mensagens iniciais sem duplicá-las;
- cria backup antes do provisionamento automático;
- bloqueia a operação se as permissões mínimas não estiverem disponíveis.

Para visualizar a base:

```text
/template-oficial
```

## ❖ Registros do Palácio · RPG

O RPG foi planejado para funcionar por interação, não como uma lista de comandos de texto.

```text
/rpg
  ├── Dashboard da ficha
  ├── Escolha de classe
  ├── Mapa de exploração
  ├── Biblioteca de casos
  ├── Pistas e investigação
  ├── Laboratório de alquimia
  ├── Inventário e ingredientes
  ├── Minha ficha
  ├── Caso ativo
  └── Progressão e reputação
```

### Conteúdo atual

- Cartógrafo, Guardião e Cronista;
- Pavilhão das Ervas;
- Jardim Imperial;
- Biblioteca dos Casos;
- Mercado Noturno;
- As ervas desaparecidas;
- As lanternas silenciosas;
- O perfume amargo;
- pistas individuais por investigação;
- recompensas e casos concluídos;
- receitas com ingredientes e custo;
- XP, níveis, HP, ouro e reputação;
- estatísticas de exploração, investigação e preparo.

O conteúdo está separado em `src/modules/rpg/` para que novos capítulos, personagens, locais, eventos e escolhas possam crescer sem contaminar a administração do servidor.

## ❖ Câmara de Atendimento

O painel de Tickets oferece quatro portas de entrada:

| Categoria | Para quê serve |
| --- | --- |
| **Orientação geral** | Dúvidas e problemas com o servidor. |
| **Relato reservado** | Assuntos sensíveis para a equipe. |
| **Sugestão para o Palácio** | Ideias para melhorar a comunidade. |
| **Proposta de parceria** | Contatos e propostas externas. |

Publique o painel com:

```text
/painel-tickets
```

A equipe também pode editar o nome da categoria e o título do painel pelo `/configuracao`.

## ❖ Comandos

| Comando | Função |
| --- | --- |
| `/configuracao` | Abre o salão principal de configuração. |
| `/template-oficial` | Examina e aplica o Palácio das Ervas. |
| `/painel-admin` | Abre a Câmara de Administração. |
| `/painel-tickets` | Publica a Câmara de Atendimento. |
| `/rpg` | Abre os Registros interativos do Palácio. |
| `/status` | Mostra a saúde e a latência do bot. |

## 🌸 Instalação delicada

Não precisa correr. A Maomao funciona melhor quando cada ingrediente é colocado no frasco certo. Siga as etapas abaixo com calma e mantenha seu token em segredo.

### 1. Preparar a aplicação no Discord

1. Abra o [Discord Developer Portal](https://discord.com/developers/applications).
2. Crie uma aplicação chamada **Maomao**.
3. Crie o usuário bot e copie o token somente para o `.env`.
4. Convide a aplicação usando os escopos `bot` e `applications.commands`.
5. Coloque o cargo da Maomao acima dos cargos que ela irá organizar.

> 🩷 **Pequena verificação:** o bot precisa ter acesso aos canais e às permissões que você deseja que ele examine. Sem isso, até a melhor investigadora fica de mãos atadas.

### 2. Buscar o projeto e preparar o caderno

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
DATA_DIR=./data
```

> 🌷 O `.env` é o caderno privado da Maomao. Não publique esse arquivo, não envie o token para ninguém e não o coloque no GitHub.

### 3. Registrar os comandos e abrir as portas

```bash
npm run check
npm run register
npm start
```

Durante o desenvolvimento, `DISCORD_GUILD_ID` faz os comandos aparecerem rapidamente em um servidor de ensaio. Quando tudo estiver bonito e funcionando, você pode remover esse valor para trabalhar com o registro global.

Se aparecer uma mensagem de erro, não apague arquivos às pressas: leia o registro, confira o `.env` e revise as permissões do bot. A Maomao prefere uma investigação curta a uma poção preparada no escuro.

## 🏯 Preparação automática do Palácio

Se quiser que a Maomao prepare o seu servidor ao iniciar, adicione estas linhas ao `.env`:

```env
MAOMAO_AUTO_SETUP=true
MAOMAO_AUTO_SETUP_GUILD_ID=id_do_seu_servidor
MAOMAO_SETUP_MODE=additive
```

A Maomao irá:

1. verificar o servidor indicado;
2. confirmar suas permissões;
3. guardar um backup estrutural;
4. aplicar o Palácio das Ervas;
5. publicar as mensagens iniciais;
6. registrar que a preparação terminou;
7. evitar duplicações em reinicializações.

Se uma permissão estiver faltando, a preparação será interrompida com segurança. Se algo falhar, o estado ficará registrado para análise — nada de esconder sintomas debaixo do tapete.

### 🪻 Usar no Android com Termux

No Android, o Termux funciona como o pequeno laboratório onde você edita, testa e inicia a Maomao. Cole os comandos abaixo um por vez:

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

Quando quiser encerrar a Maomao por enquanto, use:

```text
Ctrl + C
```

> 💗 **Dica:** para manter o bot ativo por longos períodos, use uma hospedagem apropriada. O Termux é ótimo para cuidar do projeto e fazer testes, mas o sistema Android pode suspender processos em segundo plano.

## ◈ Arquitetura do projeto

```text
src/
├── branding/       tema, catálogo e envio de imagens
├── commands/       comandos Slash e registro central
├── config/         ambiente e validação de execução
├── core/           blueprint, segurança e mensagens iniciais
├── interactions/   UI, roteador e handlers por domínio
├── modules/
│   ├── admin/      diagnóstico e operações administrativas
│   ├── provisioning/ backup, estado e setup automático
│   ├── rpg/        domínio, conteúdo, motor e painéis
│   └── tickets/    categorias e interface de atendimento
├── panels/         visões reutilizáveis
├── personality/    voz e identidade da Maomao
├── services/       compatibilidade e serviços Discord
└── store/          configurações persistentes por servidor
```

O fluxo de uma interação é pequeno e previsível:

```text
comando ou botão
      ↓
registro central
      ↓
roteador
      ↓
handler do domínio
      ↓
serviço + armazenamento
      ↓
embed, menu ou confirmação
```

## ◈ Assets e identidade visual

As imagens não ficam espalhadas pelo código:

```text
assets/
├── branding/       avatar e banner do bot
├── panels/         imagens dos painéis
└── rpg/            personagens, locais, itens e eventos
```

Cada asset é registrado com nome, caminho, contexto e texto alternativo antes de ser usado. A captura de tela do perfil não deve ser colocada no projeto; utilize os arquivos originais do banner e do avatar, separados da interface do celular.

## Princípios da Maomao

1. **Observar antes de aplicar.**
2. **Explicar antes de modificar.**
3. **Guardar antes de reorganizar.**
4. **Não apagar automaticamente.**
5. **Separar cada assunto em seu devido lugar.**
6. **Usar painéis para reduzir confusão.**
7. **Manter a estética sem sacrificar a segurança.**

## Fluxo Git

```bash
git pull --rebase origin main
npm run check
git status
git add .
git commit -m "feat: descreva sua mudança"
git push origin main
```

Para mudanças maiores:

```bash
git switch -c feat/nova-funcao
npm run check
git add .
git commit -m "feat: adicionar nova função"
git push -u origin feat/nova-funcao
```

## Estado do projeto

O Maomao Bot está em desenvolvimento ativo. A fundação profissional já está separada por domínios e preparada para receber novos capítulos do RPG, personagens, eventos, configurações de cargos e canais, logs avançados e mais assets visuais.

## Licença e uso

Este repositório é público para estudo e desenvolvimento. Antes de publicar nomes, imagens ou elementos de uma obra em um servidor público, verifique os direitos aplicáveis. A personalidade, os textos, a estrutura e a apresentação deste projeto são autorais.
