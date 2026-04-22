# Reorganização do Notion — Design Spec

**Data:** 2026-04-21
**Autor:** Ithalo Mendes

---

## Contexto

O objetivo é reorganizar o Notion com uma estrutura clara e intuitiva, inspirada no Obsidian, partindo de uma página **Home** e ramificando em três grandes áreas: **Pessoal**, **Docência** e **Profissional**. A área Profissional centraliza todo o trabalho, com destaque para uma database de notas de reunião estruturada para facilitar a recuperação de contexto pelo Claude.

---

## Abordagem escolhida: Dashboard + Seções

A Home funciona como um dashboard visual com cards para cada área. Cada área tem sub-páginas bem definidas. Databases são usadas onde o conteúdo é estruturado e recorrente (reuniões, aulas, tasks). Páginas simples são usadas onde o conteúdo é documental (projetos, referências, materiais).

---

## Hierarquia de páginas

```
🏠 Home
├── 💼 Profissional
│   ├── 📋 Reuniões             (database)
│   ├── 📁 Projetos             (sub-páginas por projeto)
│   ├── 📄 Documentos           (specs, planos, referências técnicas)
│   └── ✅ Tasks                (database)
│
├── 🎓 Docência
│   ├── 📚 Disciplinas          (sub-páginas por disciplina)
│   ├── 📝 Aulas                (database)
│   └── 📦 Materiais            (slides, exercícios, referências)
│
└── 🏡 Pessoal
    ├── 🎬 Listas               (Filmes & Séries, Restaurantes & Lugares)
    ├── 💰 Finanças             (controle mensal, metas de economia)
    └── 🎯 Metas                (objetivos pessoais por período)
```

---

## Home

Página de entrada do workspace. Contém:

- **Cards das 3 áreas** (Profissional, Docência, Pessoal) com link direto para cada seção
- **Shortcuts**: visualização inline das próximas reuniões com ações pendentes e tasks em aberto da área Profissional

A Home não armazena conteúdo — apenas navega e exibe resumos via linked databases.

---

## Profissional

Área central de trabalho. Toda anotação, projeto, documento e tarefa profissional vive aqui.

### 📋 Reuniões (database)

Database principal para notas de reunião. Cada registro é uma página com o conteúdo completo; as colunas são o resumo estruturado.

| Coluna | Tipo | Descrição |
|---|---|---|
| **Título** | Title | Nome descritivo da reunião |
| **Data** | Date | Data de realização |
| **Tipo** | Select | 1:1 · Squad · Stakeholder · Cliente · Planejamento · Retrospectiva |
| **Projeto / Área** | Select | Iniciativa ou área relacionada |
| **Participantes** | Text | Quem esteve presente |
| **Tags** | Multi-select | Palavras-chave semânticas — principal vetor de contexto para o Claude |
| **Ações** | Text | Resumo dos próximos passos decididos |
| **Status** | Select | Concluído · Pendente · Em andamento |

**Views recomendadas:**
- **Todas** — tabela completa, ordenada por data decrescente
- **Ações pendentes** — filtro: Status = Pendente ou Em andamento
- **Por projeto** — agrupado por Projeto / Área

**Conteúdo interno de cada página:**
Estrutura sugerida para o corpo de cada nota de reunião:
```
## Contexto
(o que motivou essa reunião)

## O que foi discutido

## Decisões tomadas

## Ações
- [ ] Ação 1 — responsável
- [ ] Ação 2 — responsável
```

### 📁 Projetos

Sub-páginas criadas conforme projetos surgem. Cada projeto tem sua própria página com descrição, objetivo, status e links para documentos e reuniões relacionadas.

### 📄 Documentos

Repositório de specs, planos, briefings e referências técnicas. Organizado em sub-pastas conforme necessário.

### ✅ Tasks

Database de tarefas profissionais. Colunas mínimas: Título, Projeto, Prioridade, Status, Data limite.

---

## Docência

Área para tudo relacionado à atividade de professor.

### 📚 Disciplinas

Uma sub-página por disciplina ativa (ex: Engenharia de Software, Gestão de TI). Cada página da disciplina serve como hub para suas aulas e materiais.

### 📝 Aulas (database)

Database de planos de aula. Colunas: Título, Disciplina, Data, Status (Planejada, Ministrada), Slides (link), Observações.

### 📦 Materiais

Repositório de slides, exercícios e referências organizados por disciplina.

---

## Pessoal

Área para listas e acompanhamento pessoal.

### 🎬 Listas

Duas páginas simples com tabelas:
- **Filmes & Séries** — colunas: Título, Plataforma, Status (Quero ver, Assistindo, Assistido), Nota
- **Restaurantes & Lugares** — colunas: Nome, Cidade, Tipo, Status (Quero ir, Fui), Nota

### 💰 Finanças

Página para controle financeiro básico. Sugestão: tabela mensal com entradas, saídas e saldo. Pode evoluir para database conforme necessidade.

### 🎯 Metas

Página com objetivos pessoais organizados por período (trimestre/ano), com checkboxes de progresso.

---

## Princípios de manutenção

1. **Sempre preencher as colunas de Reuniões** antes de fechar a página — especialmente Tags e Projeto/Área.
2. **Títulos descritivos** em reuniões e documentos, evitando nomes genéricos como "Reunião 1".
3. **Tags consistentes** — usar as mesmas palavras para o mesmo tema (ex: sempre "CSAT" em vez de variar entre "csat", "Csat", "dashboard-csat").
4. **Home não acumula conteúdo** — se algo não couber nas 3 áreas, criar sub-página dentro da área mais adequada.
