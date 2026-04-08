---
name: criar-aula
description: Use when creating a lesson from scratch — covering the full workflow from context gathering in Notion, through brainstorming and slide generation, to documentation. Applies when the user wants to plan, build, or document a class lesson for any discipline.
---

# Criar Aula

## Visão Geral

Workflow completo para criação de aulas: do contexto no Notion até a documentação final. Cobre 5 etapas sequenciais, cada uma com uma skill ou ferramenta dedicada.

## Fluxo Principal

```
CONTEXTO → ROTEIRO → SLIDES → PDF → DOCUMENTAÇÃO
(Notion)  (brainstorm) (frontend-slides) (export) (Notion)
```

### Etapa 1 — Contexto (Notion)

Antes de qualquer criação, buscar no Notion:
- Plano de ensino da disciplina (ementa, cronograma)
- Aulas anteriores da mesma disciplina (para continuidade)
- Perfil da turma e pré-requisitos já vistos

Campos relevantes: tema, carga horária, âncoras conceituais da disciplina, data planejada.

### Etapa 2 — Roteiro (brainstorming)

Invocar **brainstorming** com o contexto coletado.

Passar no prompt:
- Tema e duração da aula
- O que a turma já viu (pré-requisitos)
- Âncora conceitual da disciplina (frase ou conceito recorrente)
- Tom desejado (provocativo, expositivo, híbrido)

Output esperado:
- Spec em `docs/superpowers/specs/YYYY-MM-DD-<tema>-<disciplina>-design.md`
- Estrutura em atos com tipos de slide (provocação / explicativo / impacto)
- Falas sugeridas para cada slide
- Estudos de caso e exemplos contextualizados

### Etapa 3 — Slides (frontend-slides)

Invocar **frontend-slides** com a spec aprovada.

Decisões obrigatórias antes de gerar:
- Sistema de design (padrão: `premium` para projeção em sala)
- Fontes mínimas para projeção: `body ≥ 1.1rem`, `h2 ≥ 1.75rem`, `title ≥ 2.5rem`

Salvar output em:
```
aulas/<disciplina>/<tema-kebab-case>/slides.html
```

Convenção de nomes de disciplina:
- `gestao-de-ti`
- `engenharia-de-software`

### Etapa 4 — PDF

Exportar via skill frontend-slides (comando `/export-pdf`).

Salvar em:
```
aulas/<disciplina>/<tema-kebab-case>/slides.pdf
```

> **Nota:** O export usa Playwright. Na primeira execução baixa ~260MB de Chromium — demora alguns minutos.

### Etapa 5 — Documentação (Notion)

Criar ou atualizar a página na DB de planos de aula da disciplina correspondente.

Campos obrigatórios:
- `Data planejada` — do plano de ensino
- `Data realizada` — quando a aula foi ministrada
- `Status` — planejada / em andamento / concluída
- `Observações` — desvios do plano, slides não ministrados, etc.

Seções da página:
1. **Roteiro** — slide por slide com fala sugerida e tipo (provocação/explicativo)
2. **Apostila** — conteúdo ministrado em forma de capítulos; serve como material de estudo

> **Limitação:** O MCP do Notion não faz upload de arquivos. Anexar `slides.html` e `slides.pdf` manualmente na página após a criação.

---

## Convenções de Nomenclatura

| Item | Padrão | Exemplo |
|------|--------|---------|
| Pasta disciplina | kebab-case | `gestao-de-ti` |
| Pasta aula | kebab-case com número se for série | `transformacao-digital-I` |
| Arquivos de slides | sempre `slides.html` / `slides.pdf` | — |
| Spec | `YYYY-MM-DD-<tema>-<disciplina>-design.md` | `2026-04-06-slides-transformacao-digital-ti-design.md` |

---

## Skills Dependentes

- **REQUIRED:** `brainstorming` — roteiro e spec da aula
- **REQUIRED:** `frontend-slides` — geração do HTML e export PDF
- **CONTEXT:** MCP Notion — busca de contexto e documentação final
