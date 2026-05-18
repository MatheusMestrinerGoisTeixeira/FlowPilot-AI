# FollowFlow AI Architecture

## Incremento atual

Este foundation entrega a base modular do SaaS sem acoplar UI, regras de negócio e integrações externas.

## Fronteiras

- `apps/web`: experiência Next.js App Router, páginas públicas, dashboard, pipeline e admin.
- `apps/workers`: ponto de entrada para jobs assíncronos de follow-up.
- `packages/crm`: regras de pipeline, validação e score de urgência.
- `packages/ai`: contrato de sumarização e validação de resposta estruturada.
- `packages/integrations`: contratos para Gmail e WhatsApp.
- `packages/queues`: schemas de jobs e interface de publicação.
- `packages/observability`: logger estruturado.
- `supabase/migrations`: schema PostgreSQL, índices e RLS multi-tenant.

## Decisões críticas

1. O frontend consome dados tipados e não acessa integrações externas diretamente.
2. RLS isola todos os recursos por `tenant_id`.
3. Jobs de follow-up são validados antes da execução.
4. A IA retorna saída estruturada validada por schema antes de afetar operações reais.
5. Integrações são contratos substituíveis para permitir mocks, sandbox e produção.

## Próximos passos

1. Conectar Supabase Auth com cookies HTTP-only.
2. Implementar repositórios Supabase para leads, interações e follow-ups.
3. Adicionar BullMQ/Redis para workers reais.
4. Implementar OAuth Gmail e webhook WhatsApp.
5. Adicionar Stripe billing e limites por plano.
