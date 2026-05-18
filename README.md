# FlowPilot AI

Sistema operacional autônomo de follow-up comercial com IA.

O FlowPilot AI monitora conversas, identifica leads esquecidos, gera follow-ups automáticos e executa ações reais para aumentar conversão, reduzir perda de oportunidades e automatizar operações comerciais.

---

# Visão Geral

Empresas perdem receita diariamente por falha humana em acompanhamento.

O FlowPilot AI resolve esse problema utilizando IA, automações e processamento de eventos em tempo real.

A plataforma integra:

* Gmail
* WhatsApp
* Pipeline comercial
* IA generativa
* Workers assíncronos
* Score de urgência
* Histórico de interações
* Follow-up autônomo

A IA não apenas sugere ações.
Ela executa operações reais.

---

# Funcionalidades MVP

* Autenticação multi-tenant
* Dashboard operacional
* Pipeline de leads
* Integração Gmail
* Integração WhatsApp
* Resumo automático de conversas
* Alertas de leads esquecidos
* Follow-up automático com IA
* Score de urgência
* Histórico de interações
* Painel administrativo
* Sistema de filas e workers
* Observabilidade e logs

---

# Stack Tecnológica

## Frontend

* Next.js App Router
* TypeScript
* TailwindCSS
* shadcn/ui
* React Query
* Zustand
* React Hook Form
* Zod

## Backend

* Supabase
* PostgreSQL
* Redis
* BullMQ
* Edge Functions

## IA

* OpenAI API
* LangGraph
* RAG
* Vector Storage

## Infraestrutura

* Docker
* Vercel
* GitHub Actions
* Sentry
* PostHog

---

# Arquitetura

```txt
apps/
  web/
  admin/
  workers/

packages/
  ai/
  auth/
  crm/
  database/
  integrations/
  observability/
  queues/
  types/
  ui/

infra/
  docker/
  github/
  scripts/

supabase/
  migrations/
  functions/
```

---

# Princípios Arquiteturais

* Clean Architecture
* Multi-tenant por padrão
* Event-driven architecture
* Services pequenos e reutilizáveis
* Separação entre UI e business logic
* Workers stateless
* Segurança via RLS
* Observabilidade obrigatória
* IA orientada à execução

---

# Segurança

* Row Level Security (RLS)
* JWT seguro
* Cookies HTTP-only
* Rate limiting
* Audit logs
* Validação de webhooks
* Segregação multi-tenant
* Criptografia de secrets

---

# Setup Local

## Pré-requisitos

* Node.js 22+
* pnpm
* Docker
* Supabase CLI

---

## Instalação

```bash
pnpm install
```

---

## Variáveis de Ambiente

Criar:

```bash
.env.local
```

Exemplo:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
REDIS_URL=
```

---

## Rodar Projeto

```bash
pnpm dev
```

---

# Roadmap

## Sprint 1

Foundation

* Monorepo
* Auth
* Database
* Docker
* CI/CD

## Sprint 2

CRM Core

* Leads
* Pipeline
* Dashboard
* Interações

## Sprint 3

Integrações

* Gmail
* WhatsApp
* Webhooks

## Sprint 4

Sistema de IA

* Summarizer
* Urgency Scoring
* Auto Follow-up

## Sprint 5

Automação

* Workers
* Queues
* Retries
* Scheduling

## Sprint 6

Production Hardening

* Observabilidade
* Segurança
* Billing
* Performance

---

# Objetivo do Produto

Criar uma plataforma de operações comerciais autônomas capaz de executar follow-ups inteligentes de forma escalável, confiável e segura.

---

# Licença

MIT
