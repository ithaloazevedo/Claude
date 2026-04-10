# Spec — Slides: Modelagem, Design Thinking e Prototipagem (Engenharia de Software)

**Data:** 2026-04-10
**Disciplina:** Engenharia de Software · 2026/1
**Professor:** Ithalo Azevedo
**Aula:** Modelagem I — Do Rascunho ao Sistema: como engenheiros constroem software antes de escrever código
**Data da aula:** 10/04/2026
**Duração:** 1h30 · 29 slides · ~3,1 min/slide

---

## Contexto

Primeira aula após a N1. A turma (TEI 162, 9 alunos, média N1 de 7,59) já viu:
- Ciclo de vida de software: Cascata, Modelo V, Manifesto Ágil, Scrum, Kanban, XP
- Requisitos I, II e III: RF/RNF, User Stories, Casos de Uso, Validação e Gestão de Mudanças

Conforme o plano de ensino, hoje inicia a **Unidade III — Modelagem, Arquitetura e Design de Software**. O foco da aula é o Diagrama de Classes (UML), com Design Thinking e Prototipagem como contexto motivador para mostrar por que modelar bem exige entender o problema certo antes de desenhar o sistema.

**Case central:** Nubank — produto que todos conhecem, nasceu de um problema simples e conecta cada tópico da aula à realidade do mercado.

**Âncora conceitual da disciplina:** "Transformar necessidades vagas em especificações técnicas precisas."

---

## Decisões de Design

- **Visual:** Sistema Premium (tipografia refinada, fundo escuro nas provocações, fundo claro nos explicativos, legível em projetor)
- **Tom:** Expositivo com provocações — cada bloco começa com uma pergunta que force o aluno a raciocinar antes de receber a resposta
- **Estrutura:** 5 atos + revisão de abertura (ATO 0), 29 slides
- **Padrão de slides:** fundo escuro = provocação/interação · fundo claro = explicativo · fundo preto com tipografia grande = impacto
- **Pré-requisito visual:** Slide 3 linka explicitamente com a fase "Design/Arquitetura" do Modelo Cascata para criar continuidade com a N1

---

## Estrutura — 5 Atos + Revisão de Abertura

| Ato | Tema | Min | Slides |
|-----|------|-----|--------|
| 0 | Revisão de Requisitos — a ponte para modelagem | 12 | 4 |
| 1 | Abertura — a pergunta que muda tudo (Nubank) | 5 | 2 |
| 2 | UML — a linguagem dos engenheiros | 30 | 10 |
| 3 | Design Thinking — como nasce a solução certa | 15 | 5 |
| 4 | Design Sprint + Prototipagem | 18 | 5 |
| 5 | Fechamento e gancho para próxima aula | 10 | 3 |
| — | **Total** | **90** | **29** |

---

## Roteiro Slide a Slide

### ATO 0 — Revisão de Requisitos (12 min · slides 0–3)
*Objetivo: aquecer a turma, verificar retenção da N1, criar ponte para modelagem*

| # | Tipo | Conteúdo |
|---|------|----------|
| 0 | Provocação | "Antes de começar: você ainda lembra?" · fundo escuro · sem subtítulo · pausa de 10 segundos antes de virar |
| 1 | Provocação-quiz | 3 perguntas na tela: "O que é um requisito funcional?" · "Qual a diferença entre User Story e Caso de Uso?" · "Quando um requisito está 'pronto'?" · Turma responde livremente; professor consolida oralmente. Fala: "Não vou dar a resposta — vocês vão." |
| 2 | Explicativo | Mapa visual de síntese: RF/RNF · User Story · Caso de Uso · Validação · Gestão de mudanças. "Tudo que vocês viram em 3 semanas numa tela só. Fotografa." |
| 3 | Ponte | Visual: linha do tempo horizontal do Modelo Cascata com 5 fases. "Requisitos" com ✓ verde (concluído). "Design/Arquitetura" com seta → e destaque (onde estamos). Fala: "No Cascata, depois de capturar os requisitos vem a fase de Design. Não importa se você usa Cascata ou Scrum — em algum momento você precisa desenhar o sistema antes de codificá-lo. É disso que trata a aula de hoje." |

---

### ATO 1 — A Pergunta que Muda Tudo (5 min · slides 4–5)
*Objetivo: contextualizar o Nubank como case e criar engajamento emocional*

| # | Tipo | Conteúdo |
|---|------|----------|
| 4 | Provocação | Logo Nubank grande · "Como nasce um produto de R$300 bilhões?" · Levantamento de mão: "Quem tem conta no Nubank?" · Deixar a pergunta no ar sem responder |
| 5 | Impacto | Fundo preto · texto branco: *"Em 2013, abrir uma conta bancária no Brasil levava 40 dias, 12 documentos e 3 visitas à agência."* · Linha abaixo: "David Vélez passou por isso. Em vez de reclamar, ele fez o que qualquer engenheiro deveria fazer: **desenhou o problema antes de codificar a solução.**" · Gancho direto para UML |

---

### ATO 2 — UML: A Linguagem dos Engenheiros (30 min · slides 6–15)
*Objetivo: ensinar Diagrama de Classes com o Nubank como exemplo vivo*

| # | Tipo | Conteúdo |
|---|------|----------|
| 6 | Provocação | "Você nunca trabalha sozinho num sistema grande. Como você conta para 50 engenheiros o que cada parte do sistema faz — sem usar código?" · Pausa · "A resposta que a indústria adotou se chama UML." |
| 7 | Explicativo | O que é UML: Unified Modeling Language, padrão ISO desde 1997. Visual: duas categorias — **Estruturais** (Classe, Componente, Pacote) e **Comportamentais** (Sequência, Atividade, Caso de Uso). Destaque visual: "Hoje: Diagrama de Classes. Semana que vem: Comportamentais." |
| 8 | Explicativo | Anatomia de uma Classe UML. Caixa com 3 divisões: nome / atributos / métodos. Exemplo: classe `Conta` do Nubank — atributos: `saldo: Float`, `limite: Float`, `dataAbertura: Date` — métodos: `sacar()`, `depositar()`, `consultarSaldo()`. Fala: "Cada classe é como a planta baixa de um objeto. Você define o que ele tem (atributos) e o que ele faz (métodos)." |
| 9 | Explicativo | Visibilidades: `+` público · `-` privado · `#` protegido. Fala: "Visibilidade é como você controla o que o mundo externo pode ver ou mudar. O saldo de uma conta nunca deveria ser público — qualquer objeto poderia alterá-lo. Por isso ele é privado, acessado só pelo método `consultarSaldo()`." |
| 10 | Explicativo | Relacionamento — **Associação**: "Um `Cliente` tem uma `Conta`. Uma `Conta` tem muitas `Transações`." Visual com setas de associação + multiplicidade (1, 0..1, 1..*, *..*). Fala: "Multiplicidade responde: um cliente pode ter quantas contas? Uma transação pertence a quantas contas?" |
| 11 | Provocação | "Conta Corrente e Conta Poupança são coisas diferentes ou são a mesma coisa com variações?" · Debate rápido (1 minuto) · Conduzir para: herança vs. composição. "Essa é a decisão que separa um diagrama bom de um diagrama ruim." |
| 12 | Explicativo | Relacionamentos — **Herança e Composição**: `ContaCorrente` e `ContaPoupança` herdam de `Conta` (triângulo vazio). Composição: `Conta` é composta de `Transação` (losango cheio — se a conta some, as transações somem). Fala: "Herança = 'é um tipo de'. Composição = 'é parte de'." |
| 13 | Explicativo | **Diagrama completo do Nubank** (slide de referência para fotografar): classes `Cliente`, `Conta`, `Cartão`, `Transação`, `Limite`, `ChavePix` com todos os atributos, métodos e relacionamentos. Fala: "Este é o esqueleto do Nubank em UML. Antes de escrever uma linha de código, o time de engenharia desenhou algo parecido com isso." |
| 14 | Provocação | "Como o engenheiro do Nubank sabia que precisava de uma classe `Limite` e não apenas um atributo dentro de `Conta`? Ele inventou isso?" · Pausa · "Ele não inventou. Ele descobriu. E a ferramenta que ensina engenheiros a descobrir o problema certo se chama Design Thinking." |
| 15 | Explicativo | Visão geral dos diagramas comportamentais — imagem de cada um (sequência, atividade, caso de uso) com 2 linhas de descrição. "Você vai usar todos esses no projeto da disciplina. Próxima aula detalha cada um." Gancho de antecipação. |

---

### ATO 3 — Design Thinking: Como Nasce a Solução Certa (15 min · slides 16–20)
*Objetivo: mostrar que modelar bem exige entender o problema certo antes de desenhar*

| # | Tipo | Conteúdo |
|---|------|----------|
| 16 | Provocação | "A maioria dos times de software modela a solução errada para o problema errado. Não porque são ruins — porque nunca foram ensinados a empatizar antes de modelar." · Visual: citação de Don Norman. Fala: "Design Thinking é o antídoto." |
| 17 | Explicativo | As 5 fases do Design Thinking em ciclo visual: **Empatizar → Definir → Idear → Prototipar → Testar**. Fala: "Não é linear. Você volta ao início quando descobre que estava resolvendo o problema errado. Isso é saúde no projeto, não falha." |
| 18 | Explicativo | **Nubank no Design Thinking:** · Empatizar: David foi ao banco e sentiu a dor · Definir: o problema não é 'banco ruim' — é 'abrir conta é humilhante e burocrático' · Idear: 100% digital, sem agência, sem documentos físicos, sem anuidade · Prototipar + Testar: próximo ato. Fala: "O produto surgiu da fase Definir — não da fase Idear. Definir o problema certo foi o diferencial." |
| 19 | Explicativo | **Do Design Thinking para o UML** — funil visual: · Empatizar → descobre os **atores** · Definir → descobre os **requisitos reais** · Idear → propõe as **funcionalidades** · Prototipar → cria um **modelo navegável** · Testar → **valida o modelo** antes de codificar. Fala: "Cada fase do DT alimenta uma decisão no seu Diagrama de Classes." |
| 20 | Provocação | "5 fases de Design Thinking levam semanas. Você tem 3 sprints e uma deadline na sexta. Como você acelera isso sem perder qualidade?" · Pausa · "Google Ventures criou uma resposta para isso." |

---

### ATO 4 — Design Sprint + Prototipagem (18 min · slides 21–25)
*Objetivo: mostrar o Sprint como forma operacional do DT, e prototipagem como saída que alimenta o UML*

| # | Tipo | Conteúdo |
|---|------|----------|
| 21 | Explicativo | O que é Design Sprint: "5 dias para responder uma pergunta crítica de negócio — sem reuniões infinitas, sem código, só protótipos." Timeline horizontal com os 5 dias: **Entender · Esboçar · Decidir · Prototipar · Testar**. Referência: livro *Sprint* de Jake Knapp (Google Ventures). |
| 22 | Explicativo | **Nubank em 5 dias** — sprint hipotético para "Como simplificar a abertura de conta?": · Seg: jornada do usuário abrindo conta hoje (mapa de dor) · Ter: cada membro esboça uma solução diferente, sozinho · Qua: time vota na melhor solução, cria storyboard · Qui: monta o protótipo em 1 dia (sem código!) · Sex: 5 usuários testam e dão feedback real. Fala: "Na quinta o Nubank tinha um protótipo. Na sexta, sabia se a ideia funcionava. Sem escrever uma linha de código." |
| 23 | Explicativo | **Os 3 tipos de protótipo** em escada progressiva: · **Baixa Fidelidade:** papel, post-it, rascunho. "Você testa uma ideia de R$1 milhão com papel e caneta. Custo: zero." · **Média Fidelidade:** wireframe digital (Balsamiq, Figma modo wireframe). Estrutura sem estética. · **Alta Fidelidade:** UI finalizada, clicável, com dados reais. "É o que você entrega para o dev implementar." |
| 24 | Impacto | **Protótipo → UML: o ciclo completo.** Visual lado a lado: tela de protótipo de alta fidelidade (abertura de conta) → Diagrama de Classes correspondente. Fala: "Cada tela do protótipo tem objetos. Cada objeto vira uma classe no UML. O protótipo não é o fim — é a entrada para a modelagem formal." |
| 25 | Impacto | **O custo de mudar em cada etapa** — visual comparativo: · Mudar rascunho em papel = 0 minutos · Mudar wireframe = 1 hora · Mudar código de produção = dias ou semanas. Fala: "Prototipagem não é perda de tempo. É a forma mais barata de descobrir que você está errado." |

---

### ATO 5 — Fechamento e Gancho (10 min · slides 26–28)
*Objetivo: consolidar a jornada completa e criar antecipação para a próxima aula*

| # | Tipo | Conteúdo |
|---|------|----------|
| 26 | Síntese | Jornada completa em visual horizontal: **Requisitos** (o que fazer) → **UML** (como é estruturado) → **Design Thinking** (por que esse problema) → **Design Sprint** (como validar rápido) → **Prototipagem** (o que construir). Fala: "Engenharia de Software é tudo que acontece ANTES do código." |
| 27 | Impacto | Fundo preto · tipografia grande · texto branco: *"O engenheiro ruim começa a codar no dia 1. O engenheiro bom ainda está desenhando no dia 5."* Silêncio. Nada mais no slide. |
| 28 | Gancho | "Semana que vem você aprende a modelar não só a estrutura, mas o **comportamento** do sistema. Diagramas de Sequência, Atividade e Casos de Uso. Traga o seu projeto em mente — você vai precisar deles." · Fundo com ícones sutis dos 3 diagramas comportamentais |

---

## Falas-Chave para o Professor

| Momento | Fala |
|---------|------|
| Slide 3 (cascata) | "No Cascata, depois de capturar os requisitos vem a fase de Design. Não importa se você usa Cascata ou Scrum — em algum momento você precisa desenhar o sistema antes de codificá-lo." |
| Slide 8 (classe) | "Cada classe é como a planta baixa de um objeto. Você define o que ele tem e o que ele faz." |
| Slide 9 (visibilidade) | "O saldo nunca deveria ser público — qualquer objeto poderia alterá-lo. Por isso ele é privado." |
| Slide 12 (herança) | "Herança = 'é um tipo de'. Composição = 'é parte de'. Decorar essa frase economiza horas de debate." |
| Slide 13 (diagrama completo) | "Este é o esqueleto do Nubank em UML. Antes de escrever uma linha de código, o time de engenharia desenhou algo parecido com isso." |
| Slide 18 (nubank DT) | "O produto surgiu da fase Definir — não da fase Idear. Definir o problema certo foi o diferencial." |
| Slide 22 (design sprint) | "Na quinta o Nubank tinha um protótipo. Na sexta, sabia se a ideia funcionava. Sem escrever uma linha de código." |
| Slide 25 (custo) | "Prototipagem não é perda de tempo. É a forma mais barata de descobrir que você está errado." |
| Slide 27 (encerramento) | Silêncio intencional. Deixar a frase respirar antes de passar. |

---

## Dados para Documentação no Notion

- **DB:** Planos de aula — Engenharia de Software (`collection://b72b887e-5e6e-838a-a482-0748f58533bb`)
- **Template:** `7f6b887e-5e6e-83b0-a8db-81a3215b852d`
- **Campos:** Data da aula: 2026-04-10 · Status: Não iniciado · Tipo: Aula
- **Salvar slides em:** `aulas/engenharia-de-software/modelagem-i/slides.html` e `slides.pdf`
