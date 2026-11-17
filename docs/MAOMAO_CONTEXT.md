# Memória operacional do Maomao Bot

Este arquivo preserva as decisões e o contexto necessário para continuar o projeto em outra sessão. A fonte de verdade do comportamento é sempre o código atual.

## Projeto

O Maomao Bot é um bot profissional de Discord com identidade inspirada em Maomao: curiosa, analítica, elegante e reservada. O tema visual e textual é o **Palácio das Ervas**. O bot organiza servidores, publica regras e instruções, oferece Tickets privados e conduz um RPG por painéis.

Repositório: https://github.com/m4ri-pz/maomao-bot

## Stack e comandos

Node.js com ES Modules, discord.js v14, dotenv e JSON local. Use `npm install`, `npm run check`, `npm start` e `npm run register` conforme a necessidade. Nunca versionar `.env`, tokens, IDs privados ou dados pessoais.

## Módulos importantes

- `src/core/blueprints.js`: template oficial, cargos, canais e aliases de migração.
- `src/core/starter-messages.js`: mensagens iniciais e painéis.
- `src/modules/provisioning/auto-setup.js`: organização automática e revisão do template.
- `src/services/maomao-structure.js`: reconciliação, permissões, limpeza e publicação.
- `src/services/tickets.js`: atendimento privado.
- `src/interactions/router.js`: interações.
- `src/store/`: configurações de guild e estado do RPG.

## Regras de manutenção

O template oficial é `maomao-palace`. A organização deve ser idempotente e consolidar aliases antigos, sem criar cópias. A categoria canônica de Tickets é `╭・ATENDIMENTO`, com painel em `central-de-atendimento`. Em canais somente leitura, `@everyone` não envia, mas o cargo da Maomao precisa enviar para publicar embeds e atualizar painéis. Ao alterar o comportamento do provisionamento, incremente `TEMPLATE_REVISION`.

O RPG deve continuar modular e baseado em botões/menus: investigação, pistas, exames de veneno, ervas, laboratório, relações e progressão. Respostas privadas devem usar `flags: 64`.

## Última correção registrada

Na revisão 6, o bot passou a liberar o próprio cargo nas permissões de publicação, aplicar permissões antes de atualizar starters, conectar Tickets à categoria visual nova e forçar uma reaplicação do template existente. Commit: `496d4e3`.

## Retomada rápida

1. Conferir `git status` e os últimos commits.
2. Ler este arquivo e os módulos citados.
3. Confirmar variáveis `MAOMAO_AUTO_SETUP`, `MAOMAO_AUTO_SETUP_GUILD_ID` e `MAOMAO_SETUP_MODE` sem expor segredos.
4. Rodar `npm run check`.
5. Atualizar este arquivo e fazer commit quando uma decisão ou correção importante for concluída.
