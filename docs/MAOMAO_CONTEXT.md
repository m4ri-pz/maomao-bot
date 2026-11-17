# Memória operacional do Maomao Bot

Este documento registra somente o contexto público e compatível com a instalação JSON local. A fonte de verdade do comportamento é o código atual.

## Projeto

O Maomao Bot é um bot profissional de Discord com identidade inspirada em Maomao: curiosa, analítica, elegante, reservada e com humor seco. O tema visual e textual é o **Palácio das Ervas**. O bot organiza servidores, publica regras e instruções, oferece Tickets privados e conduz um RPG por painéis.

Repositório público: https://github.com/m4ri-pz/maomao-bot

## Stack e execução

Node.js com ES Modules, discord.js v14, dotenv e JSON local. Use `npm install`, `npm run check`, `npm start` e `npm run register`. Nunca versionar `.env`, tokens, IDs privados ou dados pessoais. A pasta `data/` permanece local e é protegida pelo `.gitignore`.

## Módulos importantes

- `src/core/blueprints.js`: template oficial, cargos, canais e aliases de migração.
- `src/core/starter-messages.js`: mensagens iniciais e painéis.
- `src/modules/provisioning/auto-setup.js`: organização automática e revisão do template.
- `src/services/maomao-structure.js`: reconciliação, permissões, limpeza e publicação.
- `src/services/automations.js`: boas-vindas com avatar e audit log visual da equipe.
- `src/services/tickets.js`: atendimento privado.
- `src/interactions/router.js`: interações.
- `src/store/`: configurações de guilda e estado do RPG em JSON local.

## Regras de manutenção

O template oficial é `maomao-palace`. A organização deve ser idempotente e consolidar aliases antigos, sem criar cópias. A categoria canônica de Tickets é `╭・ATENDIMENTO`, com painel em `central-de-atendimento`. Em canais somente leitura, `@everyone` não envia, mas o cargo da Maomao precisa enviar para publicar embeds e atualizar painéis. Ao alterar o comportamento do provisionamento, incremente `TEMPLATE_REVISION`.

O RPG deve continuar modular e baseado em botões/menus: investigação, pistas, exames de veneno, ervas, laboratório, relações e progressão. Respostas privadas devem usar `flags: 64`.

As automações `welcome` e `auditLog` são opcionais e começam desativadas. Quando ativadas no painel, `welcome` publica no canal `boas-vindas` e `auditLog` registra eventos em `registros-da-equipe`. Ambas respeitam a configuração JSON da guilda e verificam permissões antes de enviar.

## Validação

A suíte atual contém 12 testes. Antes de publicar mudanças, executar `npm run check` e `git diff --check`.

## Retomada rápida

1. Conferir `git status` e os últimos commits.
2. Ler este arquivo e os módulos citados.
3. Confirmar as variáveis de ambiente sem exibir valores secretos.
4. Rodar `npm run check`.
5. Publicar somente versões estáveis no repositório público.
