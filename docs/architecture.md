# Arquitetura do FollowFlow AI

## Base atual

A base separa interface, regras de negócio, integrações externas, filas e processos assíncronos. O objetivo é manter o produto simples de evoluir sem misturar acesso a dados com componentes de tela.

## Fronteiras

- `apps/web`: aplicação Next.js com páginas públicas, dashboard, pipeline e administração.
- `apps/workers`: entrada para execução assíncrona de follow-ups.
- `packages/crm`: regras de pipeline, validação e score de urgência.
- `packages/ai`: contrato de resumo de conversas e validação do retorno estruturado.
- `packages/integrations`: contratos para Gmail e WhatsApp.
- `packages/queues`: validação dos jobs e interface de publicação.
- `packages/observability`: logs estruturados.
- `supabase/migrations`: schema PostgreSQL, índices e RLS por tenant.

## Decisões

1. A interface trabalha com dados tipados e não chama integrações externas diretamente.
2. O isolamento por empresa fica no banco usando `tenant_id` e RLS.
3. Jobs de follow-up são validados antes da execução.
4. Resumos de conversa precisam passar por validação antes de gerar ação operacional.
5. Integrações ficam atrás de contratos para facilitar testes, sandbox e produção.

## Próximos passos

1. Conectar Supabase Auth com cookies HTTP-only.
2. Implementar repositórios Supabase para leads, interações e follow-ups.
3. Adicionar BullMQ e Redis para execução real dos workers.
4. Implementar OAuth Gmail e webhook WhatsApp.
5. Adicionar cobrança e limites por plano.
