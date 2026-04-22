# Design: linear-spec v3

**Data:** 2026-04-22
**Autor:** Ithalo Mendes <ithalo.mendes@arcotech.io>
**Status:** Em revisão

---

## Contexto

A v2 da `linear-spec` generalizou a skill para qualquer workspace Linear via conector nativo do Claude Chat, removendo os times hardcoded da Arcotech. A v3 evolui em três frentes:

1. **Activity updates automáticos**: ao final dos fluxos create e promote, a skill sugere um rascunho de update narrativo e pergunta se deve postar na Activity do item pai.
2. **Nova hierarquia de projetos**: o conceito de "Briefing" é eliminado. A hierarquia passa a ser Iniciativa → Projeto de Discovery → Projeto de Delivery → Issue. O comando `brief` é removido; `promote` é adicionado para converter Discovery em Delivery.
3. **Diagnóstico de contexto**: em vez de um questionário linear, a skill classifica o que falta em bloqueante vs. enriquecedor e faz as perguntas na ordem certa — novos usuários nunca ficam presos por falta de orientação.

---

## Decisões de Design

### 1. Nova hierarquia

```
Iniciativa
└── Projeto de Discovery  (problema claro, escopo a definir com o Designer)
    └── Projeto de Delivery  (escopo fechado, pronto para build)
        └── Issue: Improvement / Bug  (criadas pelo PM)
```

Issues técnicas de engenharia continuam no `linear-issues`. Esta skill cobre apenas Improvement e Bug — os tipos que o PM origina.

### 2. Comandos

| Comando | Uso | Descrição |
|---------|-----|-----------|
| `create` | `/linear-spec create` | Cria qualquer nível: Iniciativa, Discovery, Delivery ou Issue |
| `promote` | `/linear-spec promote [PROJ-ID]` | Converte Projeto de Discovery em novo Projeto de Delivery |
| `validate` | `/linear-spec validate [ID]` | Valida item existente e sugere melhorias |
| `help` | `/linear-spec help` | Guia de uso, hierarquia, exemplos |

O comando `brief` é removido. O `create` absorve o papel de criar projetos em qualquer fase.

**Milestones não são mais um tipo criável standalone.** Eles aparecem como seções dentro dos templates de Discovery e Delivery. O EM é responsável por preencher as datas e criar os milestones no Linear após o projeto estar estruturado.

### 3. Datas e prazos

- **Iniciativa**: Timeframe é bloqueante — sempre um quarter (ex: Q2 2026).
- **Projeto (Discovery e Delivery)**: sem datas. Milestones são gerados sem data-alvo — responsabilidade do EM preencher.

### 4. Escopo vs. Critérios de Aceite nos templates de Projeto

- **Escopo (macro)**: capacidades comportamentais orientadas ao usuário — "Usuário consegue fazer X". Define o que entra e o que fica fora.
- **Critérios de aceite (micro)**: agrupados por área funcional, checkbox, testáveis e binários. Definem como cada capacidade se comporta em detalhe.

Os dois campos não se repetem: escopo comunica intenção, critérios de aceite validam implementação.

### 5. Projeto de Discovery e Delivery são projetos separados no Linear

O `promote` cria um **novo projeto** de Delivery no Linear. O projeto de Discovery permanece como referência histórica, com um Activity Update indicando que foi concluído e listando os projetos de Delivery gerados.

### 6. Activity Updates: formato narrativo

Os updates não são one-liners — são narrativas estruturadas que contextualizam o momento do projeto para toda a equipe. Dois modelos:

**Update em Iniciativa (após promote):**
```
[Título do momento — ex: "Discovery concluído — entrando em refinamento e delivery"]

[Parágrafo de contexto: o que foi concluído no Discovery]

[Lista de projetos de Delivery gerados com summaries]

Próximos passos: [milestone 1 + prazo], [milestone 2 + prazo].
```

**Update em Projeto de Discovery (após promote):**
```
[Frase-síntese: "Discovery concluído. [o que foi validado]"]

O que foi decidido:
- [decisão 1 — derivada das questões em aberto respondidas]
- [decisão N]

Projetos de Delivery gerados:
- [nome do projeto 1]
- [nome do projeto N]

[Contexto de Iniciativa e prazo-alvo]
```

A skill gera os updates com base no conteúdo real do Discovery (questões em aberto → decisões tomadas) e nos projetos de Delivery criados.

### 7. Diagnóstico de contexto (novos usuários)

Antes de qualquer pergunta de conteúdo, a skill identifica o que falta e classifica:

**Bloqueantes por tipo** (perguntados em bloco único antes de continuar):

| Tipo | Bloqueantes |
|------|-------------|
| Iniciativa | tipo confirmado, time, timeframe (quarter) |
| Discovery | tipo confirmado, time, Iniciativa associada |
| Delivery | tipo confirmado, time, Iniciativa, Projeto de Discovery associado |
| Issue | tipo confirmado, time, Projeto de Delivery associado, subtipo (Improvement ou Bug) |

Se o usuário não souber distinguir Discovery de Delivery, a skill pergunta: *"O escopo já está fechado e validado com stakeholders?"* — sim → Delivery, não → Discovery.

**Enriquecedores** (solicitados após bloqueantes, apenas quando relevantes):

| Enriquecedor | Relevante para |
|--------------|---------------|
| Figma | Delivery |
| OKRs / KPIs | Iniciativa, Delivery |
| Dependências externas | Iniciativa, Delivery |
| Questões em aberto | Discovery |

---

## Templates

### Iniciativa

```markdown
## [Verbo no Imperativo] + [Objetivo Estratégico]

**Timeframe:** Q_ 20__
**Dono:** [Nome]

---

### 🎯 Visão e Objetivo
[2-3 frases sobre a aposta estratégica e o porquê de agora]

### 📈 OKRs e Metas Associadas
| Métrica | Meta | Baseline atual |
|---------|------|----------------|
| [métrica] | [valor] | [valor atual] |

### 🗂️ Portfólio de Projetos
- [ ] [Projeto 1 — descrição em uma linha]
- [ ] [Projeto N...]

### 🔗 Dependências Externas
- [Área/Time/Decisão]: [o que está pendente]

### 🚩 Milestones Centrais
| Marco | Objetivo | Data-alvo |
|-------|----------|-----------|
| [nome] | [o que valida] | [data] |
```

---

### Projeto de Discovery

```markdown
## [Verbo no Imperativo] + [Nome do Projeto]

**Iniciativa:** [Nome da Iniciativa]
**Dono:** [Nome]

---

### 🎯 Objetivo
[O que precisamos descobrir e decidir neste projeto]

### 🧠 Contexto e Problema
[Problema específico, personas afetadas, dados que justificam explorar agora]

### 📋 Escopo
✅ **Dentro:**
- [O que será explorado / prototipado]

🚫 **Fora:**
- [Restrições já conhecidas do espaço de solução]

### 🔍 Questões em aberto
- [ ] [O que o discovery precisa responder 1]
- [ ] [O que o discovery precisa responder 2]

### ✅ Critérios de saída
Para avançar para Delivery:
- [ ] Direção validada com [stakeholder]
- [ ] Escopo fechado (dentro e fora definidos)
- [ ] Spec de Delivery aprovada

### 🚩 Milestones
| Marco | Objetivo | Data-alvo |
|-------|----------|-----------|
| Validar direção de design | Go/no-go com stakeholders | — |
| Spec de Delivery aprovada | Engenharia pode iniciar planejamento | — |

### 🔗 Links
- Figma: [link ou "Aguardando"]
```

---

### Projeto de Delivery

```markdown
## [Verbo no Imperativo] + [Nome do Projeto]

**Iniciativa:** [Nome da Iniciativa]
**Discovery:** [Link do Projeto de Discovery]
**Dono:** [Nome]

---

### 🎯 Objetivo
[1-2 frases sobre o que este projeto entrega e qual KPI move]

### 🧠 Contexto
[Problema validado no discovery, dados que justificam, o que já sabemos]

### 📋 Escopo
✅ **Dentro:**
- Usuário consegue [capacidade 1]
- Usuário consegue [capacidade 2]

🚫 **Fora:**
- [O que explicitamente não será feito neste projeto]

### ✅ Critérios de Aceite

**[Área funcional 1]**
- [ ] [comportamento específico e testável]

**[Área funcional 2]**
- [ ] [comportamento específico e testável]

### 🚩 Milestones
| Marco | Objetivo | Data-alvo |
|-------|----------|-----------|
| [nome] | [o que valida] | — |

### 🔗 Links
- Figma: [link]
- Discovery: [link]
- Pré-requisito: [link se houver]
```

---

### Issue: Improvement

```markdown
## [Verbo no Imperativo] + [descrição da melhoria]

**Projeto:** [Projeto de Delivery vinculado]
**Tipo:** Improvement

---

### 🎯 O que melhorar
[O que existe hoje e o que deveria ser diferente — 1-2 frases]

### 💡 Solução proposta
[O que deve ser feito — objetivo, não prescritivo de implementação]

### ✅ Critério de aceite
- [ ] [comportamento esperado após a melhoria]
```

---

### Issue: Bug

```markdown
## [Comportamento atual] → [Comportamento esperado]

**Projeto:** [Projeto de Delivery vinculado]
**Tipo:** Bug

---

### 🐛 Comportamento atual
[O que está acontecendo, com contexto de onde/quando ocorre]

### ✅ Comportamento esperado
[O que deveria acontecer]

### 🔁 Como reproduzir
1. [Passo 1]
2. [Passo 2]

### 📎 Evidência
[Print, link de sessão, log — se houver]
```

---

## Fluxos

### Fluxo: CREATE

**Passo 0 — Verificação de conector e descoberta de times**
Silenciosamente verifica o conector e lista os times disponíveis. Se falhar, exibe instruções de conexão e para. Se listar com sucesso, apresenta os times e confirma quais usar na sessão.

**Passo 1 — Diagnóstico de contexto**
Analisa o que o usuário forneceu. Identifica o tipo de item e lista os bloqueantes ausentes. Faz todas as perguntas bloqueantes em uma única mensagem estruturada. Só avança após ter todas as respostas bloqueantes.

**Passo 2 — Busca no Linear**
Com time e vínculos confirmados, busca iniciativas e projetos existentes para pré-preencher vínculos e detectar possíveis duplicatas.

**Passo 3 — Gerar proposta**
Usa o template do tipo identificado. Explica escolhas estruturais não-óbvias.

**Passo 4 — Iterar e confirmar**
Após aprovação do usuário, pergunta se deve postar um Activity Update no item pai. Apresenta o rascunho do update antes de postar.

---

### Fluxo: PROMOTE

`/linear-spec promote [PROJ-ID]`

**Passo 1 — Buscar o Discovery**
Busca o Projeto de Discovery no Linear pelo ID. Extrai: objetivo, contexto, questões em aberto, critérios de saída, links.

Edge cases:
- ID não encontrado → pede confirmação ou nome para busca alternativa
- Projeto já é um Delivery → avisa e encerra
- Critérios de saída do Discovery não estão todos marcados → alerta o usuário antes de continuar (não bloqueia, mas registra)

**Passo 2 — Diagnóstico de gaps**
Compara o conteúdo do Discovery com o que o template de Delivery exige. Pergunta apenas o que falta:
- Critérios de aceite micro (por área funcional)
- Escopo em linguagem de capacidade ("Usuário consegue...")
- Link do Figma (se não estiver no Discovery)

**Passo 3 — Gerar Projeto de Delivery**
Pré-preenche com os dados do Discovery. Apresenta proposta completa para aprovação.

**Passo 4 — Activity Updates duplos**
Após aprovação, sugere dois updates simultâneos:

> **No Projeto de Discovery:** update narrativo com "O que foi decidido" (derivado das questões em aberto) + lista de projetos de Delivery gerados.
>
> **Na Iniciativa associada:** update de momento ("Discovery concluído — entrando em Delivery") + lista de projetos com summaries + próximos passos.

Pergunta se deseja postar ambos, apenas um, ou nenhum.

---

### Fluxo: VALIDATE (atualizado)

Cobre Iniciativa, Discovery, Delivery e Issue (Improvement/Bug).

Para Delivery, verifica especificamente:
- Escopo está em linguagem de capacidade ("Usuário consegue...")?
- Critérios de aceite estão agrupados por área funcional?
- Projeto de Discovery está referenciado nos Links?

Ao final, se houver melhorias sugeridas, pergunta se deve postar um Activity Update com resumo da análise.

---

## Estrutura de Arquivos

```
.claude/skills/linear-spec-v3/
├── SKILL.md
└── references/
    ├── dicionario.md
    ├── anti-pattern.md
    ├── linear-method.md
    ├── template-iniciativa.md
    ├── template-discovery.md        ← novo (substitui template-brief.md)
    ├── template-delivery.md         ← novo (substitui template-projetos.md)
    ├── template-issues.md           ← novo
    └── discovery-e-design.md
```

---

## O que muda da v2

| Elemento | v2 | v3 |
|----------|----|----|
| Hierarquia | Iniciativa → Projeto → Milestone | Iniciativa → Discovery → Delivery → Issue |
| Comando `brief` | presente | removido |
| Comando `promote` | ausente | adicionado |
| Issues | fora do escopo | Improvement e Bug cobertos |
| Template de projeto | único (Projeto Tático) | dois separados (Discovery e Delivery) |
| Escopo | lista de bullets | capacidades do usuário ("Usuário consegue...") |
| Critérios de aceite | lista plana | agrupados por área funcional |
| Datas em projetos | prazo-alvo no template | sem datas — responsabilidade do EM |
| Timeframe de Iniciativa | enriquecedor | bloqueante (quarter obrigatório) |
| Coleta de contexto | questionário linear por nível | diagnóstico bloqueante vs. enriquecedor |
| Activity updates | ausente | narrativos, sugeridos ao final de create e promote |
| Milestone de Issues | N/A | sem milestone — Issues não têm milestone próprio |
