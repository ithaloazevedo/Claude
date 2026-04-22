# Reorganização do Notion — Plano de Implementação

**Spec:** [2026-04-21-notion-reorganizacao-design.md](2026-04-21-notion-reorganizacao-design.md)
**Data:** 2026-04-21

---

## Visão geral

Reorganizar o Notion em 4 fases sequenciais: estrutura base → área Profissional → Docência → Pessoal. Cada fase é independente e pode ser feita em sessões separadas.

---

## Fase 1 — Estrutura base e Home

**Objetivo:** Criar o esqueleto do workspace antes de mover qualquer conteúdo.

- [ ] Criar a página **Home** como raiz do workspace
- [ ] Criar as três páginas filhas: **Profissional**, **Docência**, **Pessoal**
- [ ] Na Home, adicionar 3 cards/callouts linkando para cada área
- [ ] Configurar a Home como página inicial do Notion (Settings → Sidebar)

---

## Fase 2 — Profissional

**Objetivo:** Montar toda a estrutura de trabalho com databases funcionais.

### 2a — Database de Reuniões
- [ ] Criar a página **Reuniões** dentro de Profissional como Full-page Database (Table view)
- [ ] Configurar as 8 colunas:
  - Title (Título) — já existe por padrão
  - Date (Data)
  - Select (Tipo) — opções: 1:1, Squad, Stakeholder, Cliente, Planejamento, Retrospectiva
  - Select (Projeto / Área)
  - Text (Participantes)
  - Multi-select (Tags)
  - Text (Ações)
  - Select (Status) — opções: Concluído, Pendente, Em andamento
- [ ] Criar 3 views:
  - **Todas** — tabela completa, ordenada por Data decrescente
  - **Ações pendentes** — filtro: Status ≠ Concluído
  - **Por projeto** — agrupado por Projeto / Área
- [ ] Migrar notas de reunião existentes para a nova database
- [ ] Preencher colunas das notas migradas (especialmente Tags e Projeto/Área)

### 2b — Demais páginas
- [ ] Criar página **Projetos** — mover/criar sub-páginas por projeto ativo
- [ ] Criar página **Documentos** — mover specs, planos e referências existentes
- [ ] Criar database **Tasks** com colunas: Título, Projeto, Prioridade, Status, Data limite
- [ ] Adicionar shortcuts na Home: linked view de Reuniões com filtro "Ações pendentes"

---

## Fase 3 — Docência

**Objetivo:** Organizar todo o material de ensino por disciplina.

- [ ] Criar página **Disciplinas** com sub-páginas por disciplina ativa (ex: Engenharia de Software, Gestão de TI)
- [ ] Criar database **Aulas** com colunas: Título, Disciplina, Data, Status (Planejada/Ministrada), Observações
- [ ] Criar página **Materiais** com sub-páginas por disciplina para slides, exercícios e referências
- [ ] Mover/organizar conteúdo existente de aulas para a nova estrutura

---

## Fase 4 — Pessoal

**Objetivo:** Organizar listas e páginas pessoais existentes.

- [ ] Criar página **Listas** com duas sub-páginas:
  - **Filmes & Séries** — tabela com colunas: Título, Plataforma, Status, Nota
  - **Restaurantes & Lugares** — tabela com colunas: Nome, Cidade, Tipo, Status, Nota
- [ ] Migrar listas existentes de filmes e restaurantes para as novas tabelas
- [ ] Criar página **Finanças** — tabela simples com meses como linhas e entradas/saídas/saldo como colunas
- [ ] Criar página **Metas** — lista de objetivos com checkboxes por período (trimestre/ano)

---

## Critérios de conclusão

- Home é a primeira página ao abrir o Notion
- Toda nota de reunião está na database de Reuniões com Tags e Projeto/Área preenchidos
- Nenhuma página "solta" fora das 3 áreas (Profissional, Docência, Pessoal)
- As 3 views da database de Reuniões funcionam corretamente
