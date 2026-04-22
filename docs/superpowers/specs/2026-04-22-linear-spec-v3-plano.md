# Plano de Implementação: linear-spec v3

**Data:** 2026-04-22
**Spec de referência:** [2026-04-22-linear-spec-v3-design.md](2026-04-22-linear-spec-v3-design.md)
**Status:** Pronto para execução

---

## Visão geral

Criar `.claude/skills/linear-spec-v3/` como nova skill independente. A v2 permanece intacta. A v3 traz nova hierarquia (Discovery/Delivery), comando `promote`, Activity Updates narrativos, Issues de PM e coleta de contexto por diagnóstico.

---

## Etapas

### Etapa 1 — Criar estrutura de pastas

Criar o diretório `.claude/skills/linear-spec-v3/` com subpasta `references/`.

Nenhum arquivo existente deve ser modificado nesta etapa.

---

### Etapa 2 — Copiar e adaptar arquivos de referência imutáveis

Copiar da v2 sem alterações:
- `references/dicionario.md`
- `references/anti-pattern.md`
- `references/linear-method.md`

Copiar e renomear para atualizar terminologia:
- `references/discovery-e-design.md` → atualizar ocorrências de "Briefing" para "Projeto de Discovery" e "Projeto Tático" para "Projeto de Delivery"

---

### Etapa 3 — Criar `references/template-iniciativa.md`

Baseado no template da v2, com uma alteração: `**Timeframe:**` passa a ser campo obrigatório com hint de quarter (ex: `Q2 2026`). Remover qualquer referência a "prazo-alvo".

---

### Etapa 4 — Criar `references/template-discovery.md`

Novo arquivo — substitui `template-brief.md`. Usar o template definido na spec:
- Seções: Objetivo, Contexto e Problema, Escopo (macro), Questões em aberto, Critérios de saída, Milestones (sem datas), Links
- Milestones sem data-alvo (campo `—`)

---

### Etapa 5 — Criar `references/template-delivery.md`

Novo arquivo — substitui `template-projetos.md`. Usar o template definido na spec:
- Seções: Objetivo, Contexto, Escopo (capacidades do usuário), Critérios de Aceite (agrupados por área funcional), Milestones (sem datas), Links
- Campo `**Discovery:**` obrigatório no cabeçalho
- Sem campo de prazo-alvo

---

### Etapa 6 — Criar `references/template-issues.md`

Novo arquivo com dois templates:
- **Improvement**: Objetivo, Solução proposta, Critério de aceite
- **Bug**: Comportamento atual, Comportamento esperado, Como reproduzir, Evidência

---

### Etapa 7 — Escrever `SKILL.md`

Arquivo principal da skill. Seguir a estrutura da v2 como base. Diferenças obrigatórias:

**Frontmatter:**
```yaml
---
name: linear-spec
description: |
  Estrutura e valida itens no Linear seguindo a hierarquia: Iniciativa → Projeto de Discovery → Projeto de Delivery → Issue.
  Comandos: /linear-spec create, /linear-spec promote [ID], /linear-spec validate [ID], /linear-spec help
---
```

**Seções a incluir:**
1. Hierarquia de itens (nova tabela: Iniciativa / Discovery / Delivery / Issue)
2. Comandos (create, promote, validate, help — sem brief)
3. Convenção de idioma (igual v2)
4. Verificação de conector (igual v2)
5. Comportamento geral com diagnóstico de contexto
6. Fluxo CREATE (Passos 0–4 conforme spec)
7. Fluxo PROMOTE (Passos 1–4 conforme spec)
8. Fluxo VALIDATE (atualizado para cobrir todos os tipos)
9. Fluxo HELP
10. Activity Updates — formato e exemplos dos dois modelos (Iniciativa e Discovery)
11. Referência técnica: tratamento de argumentos
12. Tabela de referências (apontando para os novos arquivos)

**Regras a codificar no SKILL.md:**
- Timeframe de Iniciativa é bloqueante (quarter)
- Projetos não têm datas — Milestones gerados com `—`
- Milestones não são tipo standalone no `create`
- `promote` alerta se critérios de saída do Discovery não estão todos marcados (não bloqueia)
- `promote` alerta e encerra se o projeto já for um Delivery
- Activity Update: sugerido ao final de `create`, `promote` e `validate` (quando há melhorias)

---

### Etapa 8 — Commit

Commitar toda a pasta `.claude/skills/linear-spec-v3/` com mensagem:

```
Adicionar skill linear-spec-v3 com nova hierarquia Discovery/Delivery e Activity Updates
```

---

## Ordem de execução

```
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8
```

Etapas 2–6 podem ser executadas em paralelo entre si (são arquivos independentes). A etapa 7 depende de todas as anteriores estarem prontas (o SKILL.md referencia os arquivos de referência). A etapa 8 é sempre a última.

---

## Arquivos gerados ao final

```
.claude/skills/linear-spec-v3/
├── SKILL.md
└── references/
    ├── dicionario.md
    ├── anti-pattern.md
    ├── linear-method.md
    ├── discovery-e-design.md
    ├── template-iniciativa.md
    ├── template-discovery.md
    ├── template-delivery.md
    └── template-issues.md
```
