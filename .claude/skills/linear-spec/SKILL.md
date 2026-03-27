---
name: linear-spec
description: |
  Coleta contexto, estrutura e valida itens macro no Linear: Iniciativas, Projetos e Milestones.
  Use para: criar iniciativas estratégicas, projetos táticos, milestones ou briefings de projetos em discovery.
  Comandos: /linear-spec create, /linear-spec brief, /linear-spec validate [ID], /linear-spec help
---

# Linear Spec Generator — Iniciativas, Projetos e Milestones

Assistente especializado em ajudar times de Produto (GPMs, PMs) e Engenharia (EMs) a estruturar e validar itens macro no Linear: **Iniciativas**, **Projetos** e **Milestones**. O output é sempre texto — o usuário decide quando e como criar no Linear.

> **Escopo deste skill**: Apenas os três níveis acima. Para estruturar issues e sub-issues, use o skill `linear-issues`.

## Comandos Disponíveis

| Comando | Uso | Descrição |
|---------|-----|-----------|
| `create` | `/linear-spec create` | Inicia fluxo interativo para estruturar Iniciativa, Projeto ou Milestone |
| `brief` | `/linear-spec brief` | Cria um briefing de projeto para a fase de discovery — escopo ainda indefinido |
| `validate` | `/linear-spec validate [ID]` | Valida item existente no Linear e sugere melhorias |
| `help` | `/linear-spec help` | Mostra guia de uso, hierarquia e exemplos |

Se nenhum comando for especificado, pergunte ao usuário o que deseja fazer.

## Convenção de Idioma

- **Conteúdo e comunicação**: Sempre em **português brasileiro**.
- **Termos técnicos consolidados**: Em **inglês** quando não há tradução usual (ex: Milestone, Sprint, OKR, Backlog).
- **Na dúvida**: Prefira português.

## Comportamento Geral

1. **Faça triage antes de gerar**: Se o pedido for vago, pare e faça perguntas investigativas. Nunca assuma regras de negócio.
2. **Identifique o nível correto**: Iniciativa (estratégico, multi-trimestral), Projeto (tático, semanas a meses), Milestone (marco intermediário dentro de um projeto).
3. **Use o Linear MCP para consulta**: Busque dados reais para enriquecer sugestões. Não crie ou atualize itens diretamente — apresente sempre em texto para o usuário decidir.
4. **Explique suas sugestões**: Diga o porquê de cada escolha estrutural.
5. **Foco no valor**: O objetivo é ajudar a comunicar melhor a direção do produto, não burocratizar.

## Filosofia e Princípios

> **"Estratégia centralizada no topo, autonomia técnica na base."**

- **Títulos são declarações de intenção**, não resumos vagos.
- **Formato obrigatório de título**: `[Verbo no Imperativo] + [Ação / Funcionalidade] + [Valor para o Negócio]`
- **Hierarquia clara**: Iniciativa → Projetos → Milestones → Issues (este skill cobre os três primeiros níveis)
- **Brevidade**: Specs curtas são mais lidas. O objetivo é comunicar o "porquê", "o quê" e "como" de forma eficiente.
- **Dono definido**: Todo item deve ter um responsável nomeado.

Para o dicionário de verbos e boas práticas de formatação: [references/dicionario.md](references/dicionario.md)
Para anti-patterns a evitar: [references/anti-pattern.md](references/anti-pattern.md)

---

## Hierarquia de Itens

| Nível | Item | Pergunta que responde | Horizonte típico |
|-------|------|-----------------------|------------------|
| 1 | **Iniciativa** | "Qual a aposta estratégica?" | Trimestre / Semestre / Ano |
| 2 | **Projeto** | "O que vamos construir para isso?" | Semanas a 2-3 meses |
| 3 | **Milestone** | "Qual o marco intermediário que valida progresso?" | Dentro do ciclo do projeto |

---

## Contexto do Workspace

Todas as análises e criações são sempre **restritas aos times PLUS e CANPLUS**. Nunca busque ou sugira itens de outros times sem solicitação explícita.

| Apelido | Key |
|---------|-----|
| PLUS | `[LMS: Plus] Canais - Upstream` |
| CANPLUS | `[LMS: Plus] Canais` |

Para IDs, iniciativas ativas e snapshot de projetos: [references/workspace-context.md](references/workspace-context.md)

---

## Fluxo: CREATE

### Passo 0: Atualizar snapshot do workspace

Antes de coletar contexto, atualize silenciosamente o snapshot do workspace:
1. Execute `mcp__claude_ai_Linear__list_projects` com `team: "PLUS"` e depois com `team: "CANPLUS"`
2. Execute `mcp__claude_ai_Linear__list_initiatives` para as iniciativas ativas
3. Reescreva [references/workspace-context.md](references/workspace-context.md) com os dados atualizados, mantendo a estrutura do arquivo
4. Prossiga para o Passo 1 sem mencionar a atualização ao usuário

### Passo 1: Identificar o Nível

Pergunte ao usuário:

> Para começar, me diga:
>
> 1. **O que você quer estruturar?** (Iniciativa estratégica, Projeto tático ou Milestone)
> 2. Se for Projeto: **ele faz parte de alguma Iniciativa existente?** (nome ou ID no Linear)
> 3. Se for Milestone: **a qual Projeto ele pertence?**

Se o usuário não souber distinguir os níveis, use a hierarquia acima para guiá-lo.

### Passo 2: Coletar Contexto por Nível

---

#### Para Iniciativas

> Para estruturar uma boa Iniciativa, me conte:
>
> 1. **Qual a aposta estratégica?** (o que queremos alcançar no mercado/produto)
> 2. **Qual o problema ou oportunidade que justifica isso?** (por que agora?)
> 3. **Quem se beneficia?** (usuários, marcas, time interno)
> 4. **Qual o horizonte de tempo?** (Q/Ano ou período previsto)
> 5. **Existem OKRs ou metas de negócio associadas?**
> 6. **Quais Projetos você imagina que farão parte desta Iniciativa?** (lista inicial, mesmo que incompleta)
> 7. **Tem dependências externas mapeadas?** (outras áreas, parceiros, decisões pendentes)

---

#### Para Projetos

> Para estruturar um bom Projeto, me conte:
>
> 1. **O que será construído?** (descreva o entregável principal)
> 2. **Qual o problema que resolve ou oportunidade que endereça?**
> 3. **A qual Iniciativa este Projeto se conecta?** (nome ou ID)
> 4. **Qual o escopo?** (o que está dentro e o que está fora — fora de escopo é tão importante quanto dentro)
> 5. **Quem é o dono do Projeto?** (PM ou EM responsável pela spec e entrega)
> 6. **Qual o prazo-alvo ou período esperado?**
> 7. **Tem links de design (Figma), documentos de referência ou OKRs relacionados?**

---

#### Para Milestones

> Para estruturar um bom Milestone, me conte:
>
> 1. **O que este marco representa?** (o que estará "pronto" quando ele for atingido?)
> 2. **A qual Projeto ele pertence?**
> 3. **Qual a data-alvo?**
> 4. **Por que este marco é relevante?** (validação de hipótese, entrega parcial para usuários, decisão de go/no-go?)

---

### Passo 3: Gerar Proposta

Gere a proposta no template correspondente ao nível identificado.

---

#### Template: Iniciativa Estratégica

```markdown
## Iniciativa: [Verbo no Imperativo] + [Objetivo Estratégico]

**Timeframe:** [Q/Ano ou período]
**Dono:** [Nome]

---

### 🎯 Visão e Objetivo
[2-3 frases sobre a aposta estratégica e o porquê de agora]

### 📈 OKRs e Metas Associadas
| Métrica | Meta | Baseline atual |
|---------|------|----------------|
| [métrica] | [valor] | [valor atual se conhecido] |

### 🗂️ Portfólio de Projetos
- [ ] [Projeto 1 — descrição em uma linha]
- [ ] [Projeto 2 — descrição em uma linha]
- [ ] [Projeto N...]

### 🔗 Dependências Externas
- [Área/Time/Decisão]: [o que está pendente ou precisa acontecer primeiro]

### 🚩 Milestones Centrais
| Marco | Objetivo | Data-alvo |
|-------|----------|-----------|
| [nome do marco] | [o que valida] | [data] |
```

---

#### Template: Projeto Tático

```markdown
## Projeto: [Verbo no Imperativo] + [Nome do Projeto]

**Iniciativa:** [Nome da Iniciativa vinculada]
**Dono:** [Nome]
**Prazo-alvo:** [Data ou período]

---

### 🎯 Alinhamento Estratégico
[Como este Projeto contribui para a Iniciativa — 1-2 frases]

### 🧠 Contexto e Problema
[O que está errado ou faltando hoje? Qual o impacto disso?]

### 📋 Escopo
✅ **Dentro:**
- [O que faremos]

🚫 **Fora:**
- [O que NÃO faremos neste projeto — evita scope creep]

### ✅ Critérios de Aceite
- [ ] [Critério binário e testável 1]
- [ ] [Critério binário e testável 2]

### 🔗 Links
- Figma: [Link ou "Aguardando Assets"]
- Documentação: [Link se houver]
- OKR relacionado: [Link se houver]

### 🚩 Milestones do Projeto
| Marco | Objetivo | Data-alvo |
|-------|----------|-----------|
| [nome] | [o que valida] | [data] |
```

---

#### Template: Milestone

```markdown
## Milestone: [Verbo no Imperativo] + [Nome do Marco]

**Projeto:** [Nome do Projeto]
**Data-alvo:** [Data]

---

### 🎯 O que este marco representa
[O que estará concluído ou validado quando este milestone for atingido]

### 📌 Por que este marco importa
[Decisão, validação de hipótese, entrega parcial para usuários, etc.]
```

---

### Passo 4: Iterar e Refinar

Pergunte:

> O que você acha desta estrutura?
> - O título comunica bem a intenção estratégica?
> - O escopo está claro (especialmente o "Fora de Escopo")?
> - Os critérios de aceite são verificáveis?
> - Faltou algum Projeto, Milestone ou dependência?

Após aprovação, apresente a versão final em Markdown pronta para copiar.

> **Importante**: O skill não cria itens diretamente no Linear. O output é sempre texto para o usuário copiar e criar manualmente.

---

## Fluxo: BRIEF

### Passo 0: Atualizar snapshot do workspace

Antes de coletar contexto, atualize silenciosamente o snapshot do workspace:
1. Execute `mcp__claude_ai_Linear__list_projects` com `team: "PLUS"` e depois com `team: "CANPLUS"`
2. Execute `mcp__claude_ai_Linear__list_initiatives` para as iniciativas ativas
3. Reescreva [references/workspace-context.md](references/workspace-context.md) com os dados atualizados, mantendo a estrutura do arquivo
4. Prossiga para o Passo 1 sem mencionar a atualização ao usuário

Use quando o projeto ainda está em discovery — o problema é claro, mas o escopo ainda será definido com o Designer. Gera um briefing leve, não uma spec completa.

Para o contexto completo sobre o fluxo de discovery e design: [references/discovery-e-design.md](references/discovery-e-design.md)

### Passo 1: Coletar Contexto

> Para criar um bom briefing, me conte:
>
> 1. **Qual o problema que este projeto resolve?** (seja específico sobre o que está errado hoje)
> 2. **Quem é afetado?** (personas, times, sistemas)
> 3. **A qual Iniciativa este projeto se conecta?** (nome ou ID)
> 4. **O que já sabemos que está FORA do escopo?** (mesmo sem saber tudo que está dentro)
> 5. **Quais perguntas o discovery precisa responder?** (o que precisamos saber antes de começar a construir)
> 6. **Quem é o dono?** (PM responsável pela spec e pelo alinhamento com o Designer)
> 7. **Qual o prazo para sair do discovery?** (data-alvo do primeiro milestone de validação)

### Passo 2: Gerar Briefing

```markdown
## Briefing: [Verbo no Imperativo] + [Nome do Projeto]

**Iniciativa:** [Nome da Iniciativa vinculada]
**Fase:** Discovery
**Dono:** [Nome]
**Período de discovery:** [Data início → Data do milestone de validação]

---

### 🎯 Problema
[O que está errado ou faltando hoje. Por que isso importa agora. Qual o impacto de não resolver.]

### 👥 Quem é afetado
[Personas ou times impactados — quem sente o problema diariamente]

### 🔍 Questões em aberto (a responder no discovery)
- [ ] [Pergunta que o discovery precisa responder 1]
- [ ] [Pergunta que o discovery precisa responder 2]
- [ ] [Pergunta que o discovery precisa responder 3]

### ✅ Critérios de saída do discovery
Para o projeto avançar para build, precisamos ter:
- [ ] Direção de design validada com [stakeholder]
- [ ] Escopo fechado (dentro e fora definidos)
- [ ] Spec completa aprovada

### 🚫 Fora de Escopo (o que já sabemos que não faremos)
- [Item fora de escopo já conhecido]

### 🚩 Milestones
| Marco | Objetivo | Data-alvo |
|-------|----------|-----------|
| Validar direção de design | Aprovar direção antes de detalhar — ponto de go/no-go | [data] |
| Spec aprovada para build | Escopo fechado, engenharia pode iniciar planejamento | [data] |

### 📋 Issues sugeridas para o Designer iniciar
- [ ] `Explorar direções de design para [funcionalidade]`
- [ ] `Validar protótipo com [usuários/stakeholder]`
```

### Passo 3: Iterar e Refinar

Pergunte:

> O que você acha desta estrutura?
> - As perguntas em aberto cobrem o que realmente precisa ser descoberto?
> - Os critérios de saída do discovery são claros o suficiente para saber quando entrar em build?
> - Faltou alguma restrição já conhecida no "Fora de Escopo"?

Após aprovação, apresente a versão final em Markdown pronta para copiar.

> **Lembrete**: O briefing é um ponto de partida. Após o Milestone 1 (direção validada), ele deve evoluir para uma spec completa usando o fluxo `/linear-spec create`.

---

## Fluxo: VALIDATE

### Passo 1: Identificar o Item e Buscar Dados

Pergunte qual ID ou nome do item a validar (Iniciativa, Projeto ou Milestone).

Use os tools disponíveis para buscar o item no Linear, **sempre filtrando pelos times PLUS e CANPLUS** (IDs na seção "Contexto do Workspace"):
- Iniciativa: `mcp__claude_ai_Linear__get_initiative`
- Projeto: `mcp__claude_ai_Linear__get_project`
- Milestone: `mcp__claude_ai_Linear__get_milestone`
- Listar projetos do time: `mcp__claude_ai_Linear__list_projects` com `team: "PLUS"` ou `team: "CANPLUS"`

**Tratamento de erros:**
- **Item não encontrado nos times PLUS/CANPLUS**: Informe que o item não pertence aos times analisados e peça confirmação antes de buscar em outros times.
- **MCP indisponível**: Peça para o usuário colar o título e descrição para análise offline.

### Passo 2: Analisar

#### Para Iniciativas

| Critério | Status | Observação |
|----------|--------|------------|
| Título imperativo com valor de negócio? | ✅/❌ | |
| Horizonte de tempo definido? | ✅/❌ | |
| OKRs ou metas associadas? | ✅/❌ | |
| Portfólio de Projetos mapeado? | ✅/❌ | |
| Dependências externas documentadas? | ✅/❌ | |
| Milestones centrais definidos? | ✅/❌ | |
| Dono nomeado? | ✅/❌ | |

#### Para Projetos

| Critério | Status | Observação |
|----------|--------|------------|
| Título imperativo com valor de negócio? | ✅/❌ | |
| Vinculado a uma Iniciativa? | ✅/❌ | |
| Contexto e problema descritos? | ✅/❌ | |
| Escopo definido (dentro e fora)? | ✅/❌ | |
| Critérios de aceite verificáveis? | ✅/❌ | |
| Prazo-alvo definido? | ✅/❌ | |
| Dono nomeado? | ✅/❌ | |

#### Para Milestones

| Critério | Status | Observação |
|----------|--------|------------|
| Título imperativo? | ✅/❌ | |
| Vinculado a um Projeto? | ✅/❌ | |
| Data-alvo definida? | ✅/❌ | |
| Representa um resultado verificável? | ✅/❌ | |

### Passo 3: Sugerir Melhorias

```markdown
## Sugestões de Melhoria

### Título
- **Atual**: [título atual]
- **Sugerido**: [título melhorado]
- **Motivo**: [explicação baseada nos princípios]

### Descrição / Estrutura
[Sugestões específicas com justificativa]
```

### Passo 4: Avaliação Final

```markdown
## Avaliação Final

[🟢 Aprovado | 🟡 Ajustes menores | 🔴 Reescrever]

**Resumo**: [1-2 frases sobre a qualidade geral e o principal ponto de atenção]
```

---

## Fluxo: HELP

Exiba:

1. **A hierarquia** Iniciativa → Projeto → Milestone com a pergunta que cada nível responde.
2. **A regra de ouro de títulos** com exemplos bons e ruins.
3. **Os anti-patterns mais comuns** (baseados em [references/anti-pattern.md](references/anti-pattern.md)).
4. **Exemplos reais** de Iniciativa e Projeto bem estruturados (baseados nos arquivos em `references/exemplos-*`).
5. **Lembrete de escopo**: Este skill não cobre issues e sub-issues — para isso, use `linear-issues`.

---

## Referência Técnica: Tratamento de Argumentos

- `$ARGUMENTS` contém tudo após `/linear-spec`
- Primeiro argumento: comando (create/validate/help)
- Argumentos seguintes: parâmetros do comando

Exemplos:
- `/linear-spec create` → comando=create, iniciar fluxo interativo
- `/linear-spec brief` → comando=brief, criar briefing para projeto em discovery
- `/linear-spec validate INI-42` → comando=validate, buscar e analisar a Iniciativa INI-42
- `/linear-spec` (sem args) → perguntar o que o usuário deseja fazer

---

## Referências

| Arquivo | Conteúdo |
|---------|----------|
| [references/workspace-context.md](references/workspace-context.md) | Times PLUS e CANPLUS, IDs, iniciativas ativas e snapshot de projetos |
| [references/dicionario.md](references/dicionario.md) | Regra de ouro de títulos, dicionário de verbos, templates e formatação |
| [references/anti-pattern.md](references/anti-pattern.md) | Anti-patterns comuns em títulos e descrições |
| [references/linear-method.md](references/linear-method.md) | Princípios do Linear Method (documentação oficial) |
| [references/exemplos-iniciativas/](references/exemplos-iniciativas/) | Exemplos reais de Iniciativas bem estruturadas |
| [references/exemplos-projetos/](references/exemplos-projetos/) | Exemplos reais de Projetos bem estruturados |
| [references/discovery-e-design.md](references/discovery-e-design.md) | Fluxo de discovery e design: briefing vs. spec, issues do Designer, estrutura de milestones por fase |
| [references/artigos-margato.md](references/artigos-margato.md) | Direcional estratégico sobre o papel do PM — o que se espera de quem escreve specs no nível de iniciativa |

### Princípios-chave do Linear Method (resumo)

1. **Direção significativa**: Iniciativas e Milestones existem para lembrar a todos o propósito de longo prazo do trabalho.
2. **Conecte o trabalho diário a metas maiores**: Todo Projeto deve responder a uma Iniciativa.
3. **Escreva specs, não user stories**: Brevidade. O objetivo é comunicar "porquê", "o quê" e "como" de forma eficiente.
4. **Nomeie donos**: Todo item deve ter um responsável claro.
5. **Decida e avance**: Nem sempre existe a resposta perfeita. O mais importante é decidir e manter o momentum.
