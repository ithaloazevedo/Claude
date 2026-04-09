# Workshop Linear para PMs — Design Spec

**Data:** 2026-04-09
**Autor:** Ithalo Mendes
**Status:** Aprovado para implementação

---

## Contexto e Objetivo

Workshop de 30–45 minutos para PMs sobre a mudança de Gestão de Requisitos do Jira para o Linear.

**Objetivo duplo:** alinhar o time na mudança cultural + capacitar o uso prático da ferramenta na mesma sessão.

**Audiência:** PMs que já usam issues no dia a dia, mas não conhecem a hierarquia completa (Iniciativas, Projetos, Milestones).

**Motivação central:** No Jira, a gestão de requisitos era centralizada no PM — criando um gargalo. A migração para o Linear foi uma decisão estratégica para distribuir o ownership: PM cuida do macro (Iniciativas e Projetos), PD e Engenheiros escrevem suas próprias issues.

---

## Narrativa

**Abordagem:** "Dono do próprio trabalho" — centralizada na mudança cultural, não numa comparação técnica de ferramentas.

**Arco:** Problema → Decisão → Novo modelo → Mapa prático → Call to action

---

## Design System

**Estilo:** Premium  
**Inspiração:** Apple-inspired — dark navy, glassmorphism, gradientes suaves  
**Background:** `linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%)`  
**Tipografia:** Inter (primary + display), JetBrains Mono (mono)  
**Paleta base:** primary `#3B82F6`, secondary `#8B5CF6`, surface `#FFFFFF`, text `#111827`

**Sistema de cores por papel** (consistente em todos os slides):
- PM → roxo `#a78bfa` / gradiente `#a78bfa → #7c3aed`
- PD → rosa `#f9a8d4` / gradiente `#f9a8d4 → #db2777`
- Engenharia → verde `#6ee7b7` / gradiente `#6ee7b7 → #059669`

---

## Estrutura dos Slides

### Ato 1 — O problema (~7 min)

**Slide 01 — Abertura**
- Título: "Como mudamos a gestão de requisitos"
- Subtítulo: nome do time + data
- Visual: minimalista, só tipografia

**Slide 02 — O gargalo do PM**
- Mensagem: tudo centralizava no PM — issues, histórias, critérios de aceite. Time esperava, PM acumulava.
- Visual: diagrama radial com PM no centro e flechas apontando para ele (todos dependem do PM)

**Slide 03 — O que a gente queria mudar**
- Mensagem: não é só trocar ferramenta — é trocar mentalidade. Autonomia, senso de dono, decisão perto de quem executa.
- Visual: duas colunas — "Antes" (centralizado) vs "Depois" (distribuído)

---

### Ato 2 — A virada (~17 min)

**Slide 04 — Por que o Linear?**
- Mensagem: decisão estratégica — ferramenta construída para times de produto com autonomia real.
- Visual: citação-destaque + contexto da decisão

**Slide 05 — Os princípios do Linear Method**
- 4 princípios em destaque visual, tratados como provocações:
  1. **Issues ≠ User Stories** — chega de "Como usuário, quero..."
  2. **Escreva para quem vai executar** — direto, sem burocracia
  3. **Escopo pequeno, momentum constante** — entrega contínua > sprint heroico
  4. **Direção significativa** — todo trabalho conectado a um propósito maior
- Visual: 4 cards premium com ícone + frase de impacto + explicação curta
- Fonte: Linear Method (documentação oficial)

**Slide 06 — Do Épico ao Projeto: a virada de mentalidade**
- Mensagem central: o Projeto no Linear não é só o "Épico renomeado" — é uma mudança de filosofia sobre como entregar valor.
- Storytelling em dois tempos:
  - **O mundo do Épico (Jira):** entregas grandes, ciclo longo. Usuários e stakeholders esperavam meses para ver impacto. O progresso era invisível durante a execução. Cada sprint era um esforço para "fechar o épico" — o famoso sprint heroico.
  - **O mundo do Projeto (Linear):** entrega de valor menor viável, concluída em até 2 cycles (~4 semanas). Cada projeto tem começo, meio e fim visíveis. Stakeholders veem impacto mais cedo. O time sente progresso real.
- O que viabiliza isso: **planejamento de longo prazo contínuo** — backlog sempre alimentado, Iniciativas como bússola, Projetos segmentando a entrega em fatias de valor reais.
- Mensagem final do slide: "A mentalidade de projeto não é fazer menos — é entregar mais, de forma que todos consigam ver."
- Visual: comparativo lado a lado — linha do tempo do Épico (longa, usuário vê valor só no fim) vs. linha do tempo com múltiplos Projetos (valor entregue a cada ciclo, progresso visível)
- Detalhe visual: barra de progresso do Épico quase sempre em 60–70% (nunca parece acabar) vs. projetos concluídos sequencialmente com check verde

**Slide 07 — Quem escreve o quê ⭐ (slide central)**
- Mensagem: o novo modelo de ownership distribuído
- Visual: diagrama de 3 colunas (PM / PD / Eng) com sistema de cores por papel, mostrando o que cada um cria no Linear
  - PM: Iniciativas, Projetos, Milestones
  - PD: Issues de design (exploração, prototipação, validação, handover)
  - Eng: Issues técnicas ([BFF], [Frontend], [Infra])

---

### Ato 3 — O mapa (~14 min)

**Slide 08 — A hierarquia do Linear**
- Diagrama vertical: Iniciativa → Projeto → Milestone → Issue
- Para cada nível: nome + pergunta que responde + quem é responsável + horizonte de tempo
  - Iniciativa: "Qual a aposta estratégica?" · PM · Trimestre/Semestre
  - Projeto: "O que vamos construir?" · PM · Semanas a meses
  - Milestone: "Qual o marco que valida progresso?" · PM + time · Dentro do ciclo
  - Issue: "O que precisa ser feito?" · Time · Dias
- Visual: linha vertical conectando os níveis, cor degradê do topo (roxo) ao fundo (verde)

**Slide 09 — Os dois caminhos: Discovery e Delivery**
- Dois caminhos lado a lado:
  - **Caminho A — Projeto de Discovery:** escopo ainda indefinido → PM cria briefing (não spec completa) → Designer explora livremente → Milestone 1 = direção validada → PM fecha spec → Build começa
  - **Caminho B — Discovery como Milestone:** problema claro → Milestone 1 = discovery → Milestone 2 = spec aprovada → Build começa
- Visual: dois fluxogramas compactos lado a lado com os milestones como portões de decisão
- Anti-pattern em destaque: "Esperar escopo completo para criar o projeto = discovery sem estrutura"

**Slide 10 — Papéis por cenário**
- Tabela ou diagrama com ações de cada papel em cada fase:
  - PM: cria briefing/spec, fecha escopo no M1, **não cria issues para o Designer**
  - PD: "Explorar direções", "Validar protótipo", "Design tela X" — escreve as próprias issues
  - Eng: começa após M2 (spec aprovada), cria as próprias issues técnicas
- Anti-pattern em destaque: "PM criando issues de design = Designer perde ownership e o raciocínio de quem entende o trabalho"

**Slide 11 — O que o PM faz no Linear**
- Foco prático: como estruturar uma Iniciativa e um Projeto
- Regra de ouro de títulos: `[Verbo Imperativo] + [Ação] + [Valor para o Negócio]`
- Exemplo real: título ruim vs. título bom
- Diferença entre Briefing (discovery) e Spec completa (build)
- Visual: card de exemplo preenchido com anatomia anotada

**Slide 12 — O que o time faz no Linear**
- Foco prático: como estruturar issues
- Hierarquia: Issue Pai (valor) → Sub-issues (técnica)
- Prefixos técnicos: `[BFF]`, `[Frontend]`, `[Infra]`
- Exemplos de título: ruim vs. bom
- Visual: árvore de issues com anotações de cada elemento

---

### Ato 4 — A prática (~6 min)

**Slide 13 — Como fazer hoje**
- Fluxo em 2 pistas:
  - PM → usa `/linear-spec` no Claude Code para estruturar Iniciativas e Projetos
  - Time → usa `/linear-issues` no Claude Code para estruturar issues
- Visual: cards dos dois skills com descrição e QR code / link
- Mensagem: "a ferramenta já tem um assistente treinado no processo do nosso time"

**Slide 14 — Encerramento — Call to action**
- Uma coisa para fazer essa semana: "Abra uma Iniciativa ou Projeto no Linear e use /linear-spec para estruturá-la"
- Pergunta para reflexão em grupo
- Link / canal para tirar dúvidas

---

## Conteúdo de Referência

Os slides devem usar como base os seguintes arquivos do repositório:

| Fonte | Uso |
|-------|-----|
| `.claude/skills/linear-spec/references/linear-method.md` | Princípios do Linear Method (Slide 05) |
| `.claude/skills/linear-spec/references/discovery-e-design.md` | Discovery vs. Delivery, papéis por cenário (Slides 08–09) |
| `.claude/skills/linear-spec/references/dicionario.md` | Regra de ouro de títulos, verbos (Slide 10) |
| `.claude/skills/linear-spec/references/anti-pattern.md` | Anti-patterns de títulos (Slides 09–10) |
| `.claude/skills/linear-issues/references/principles.md` | Hierarquia issue pai / sub-issues (Slide 11) |
| `.claude/skills/linear-issues/references/examples.md` | Exemplos bons e ruins de issues (Slide 11) |
| `.claude/skills/linear-issues/references/anti-patterns.md` | Anti-patterns de issues (Slide 11) |

---

## Restrições de Implementação

- Slides em HTML com o design system **Premium** do skill `frontend-slides`
- Animações suaves de entrada por elemento (stagger) em cada slide
- Navegação por teclado (setas) e barra de progresso visível
- Proporção 16:9, fullscreen ao apresentar
- Fontes: Inter + JetBrains Mono via Google Fonts
- Sistema de cores por papel (roxo/rosa/verde) consistente do Slide 06 ao 13
- Sem texto em imagem — todo conteúdo deve ser HTML/CSS para facilitar edição futura
