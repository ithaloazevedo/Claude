# Design: Dashboard CSAT Automatizado

**Data:** 2026-04-16
**Produtos:** DesafiEI, HackaNAV, ArcoPlus (placeholder)
**Output:** `dashboards/csat-dashboard.html`

---

## Visão Geral

Automação diária via agente Claude agendado que lê dados de CSAT do Google Sheets e análise de canais Slack, gerando um dashboard HTML auto-contido com 4 abas. Nenhum script externo — o agente lê, calcula, analisa e escreve o arquivo em uma única passagem.

---

## Arquitetura

```
Google Sheets (DesafiEI)  ─┐
Google Sheets (HackaNAV)  ──┤
                            ├─→ Agente Claude (schedule diário, 8h) ─→ dashboards/csat-dashboard.html
Slack #canal-bugs-internos ─┤
Slack #canal-erros-auto   ──┘
```

**Recorrência:** Diária às 8h  
**Mecanismo:** `schedule` skill do Claude Code  
**Output:** Arquivo HTML sobrescrito a cada execução  

---

## Fontes de Dados

### Google Sheets — DesafiEI
Colunas relevantes:

| Coluna | Uso |
|--------|-----|
| `Numa escala de 1 a 5, o quão satisfeito você está com a nova plataforma digital do DesafiEI?` | Satisfação e CSAT |
| `Sentimos muito por isso :(` (1ª) | Comentário crítico de satisfação |
| `Você conseguiu concluir a inscrição de todos os grupos sem precisar de ajuda?` | Taxa de conclusão |
| `Sentimos muito por isso :(` (2ª) | Comentário crítico de conclusão |
| `Numa escala de 1 a 5, quão relevante você considera o DesafiEI...` | Score de relevância pedagógica |
| `Sentimos muito por isso :(` (3ª) | Comentário crítico de relevância |
| `Por fim, tem algum comentário, sugestão ou feedback...` | Feedback aberto |
| `school_id` | Recorte por escola |
| `Submitted At` | Evolução temporal |

### Google Sheets — HackaNAV
Colunas relevantes:

| Coluna | Uso |
|--------|-----|
| `Numa escala de 1 a 5, o quão satisfeito você está com a nova plataforma digital do HackaNAV?` | Satisfação e CSAT |
| `Sentimos muito por isso :(` | Comentário crítico |
| `Apropriação do Material` | Dimensão de competência |
| `Autonomia Tecnológica` | Dimensão de competência |
| `Depuração e Resolução de Problemas` | Dimensão de competência |
| `Fluência Técnica` | Dimensão de competência |
| `Consciência Ética` | Dimensão de competência |
| `Integração com BNCC` | Dimensão de competência |
| `Por fim, tem algum comentário, sugestão ou feedback...` | Feedback aberto |
| `school_id` | Recorte por escola |
| `Submitted At` | Evolução temporal |

### Slack
- **Canal 1 (bugs internos):** Discussões da equipe sobre problemas, bugs, reclamações
- **Canal 2 (erros automáticos):** Notificações automáticas de erro da plataforma
- **Janela:** Últimos 7 dias a cada execução

---

## Definições de Métricas

- **Satisfação:** `(respostas com nota 5 / total de respostas) × 100`
- **CSAT:** `(respostas com notas 4 ou 5 / total de respostas) × 100`
- **Taxa de conclusão (DesafiEI):** `(respostas "Sim" / total) × 100`
- **Score de relevância (DesafiEI):** média aritmética da pergunta de relevância (1–5)
- **Score por dimensão (HackaNAV):** média aritmética de cada coluna de competência (1–5)
- **Comentários críticos:** respostas com nota ≤ 3 que preencheram o campo "Sentimos muito por isso" ou o campo de feedback aberto

---

## Estrutura do Dashboard

### Aba 1 — CSAT DesafiEI
- Cards de destaque: Satisfação (%), CSAT (%), Total de respostas
- Card: Taxa de conclusão de inscrição (%)
- Card: Score médio de relevância pedagógica (1–5)
- Tabela: CSAT por escola (`school_id`)
- Seção: Comentários críticos — lista de textos das respostas com nota ≤ 3

### Aba 2 — CSAT HackaNAV
- Cards de destaque: Satisfação (%), CSAT (%), Total de respostas
- Gráfico radar: médias das 6 dimensões de competência
- Tabela: CSAT por escola (`school_id`)
- Seção: Comentários críticos — lista de textos das respostas com nota ≤ 3

### Aba 3 — CSAT Geral (ArcoPlus)
- Badge "Em breve" visível
- Layout idêntico às outras abas, mas com estado vazio em todos os cards e gráficos
- Comentário no HTML marcando onde conectar o novo Google Sheet quando disponível
- Texto explicativo: "Esta aba medirá a satisfação geral com o portal ArcoPlus. Em construção."

### Aba 4 — Sustentação
- **Bugs identificados** (canal de erros automáticos): lista agrupada por tipo, com frequência e criticidade
- **Discussões da equipe** (canal interno): principais tópicos/problemas levantados no período
- **Sugestões de melhoria**: geradas pelo Claude com base nos dois canais
- **Classificação de criticidade:** Alta / Média / Baixa por item
- Timestamp: "Análise gerada em [data/hora]"

---

## Casos Especiais

| Situação | Comportamento |
|----------|---------------|
| Sem respostas na planilha | Cards exibem "—" (sem 0% enganoso) |
| Nova escola aparece nos dados | Aparece automaticamente na tabela de recorte |
| Slack sem mensagens nos últimos 7 dias | Aba Sustentação exibe "Nenhum item identificado no período" por canal |
| Coluna ausente na planilha | Agente ignora a métrica e registra aviso no rodapé do dashboard |

---

## Stack do HTML

- **Gráficos:** Chart.js via CDN (radar, barras, linha do tempo)
- **Estilo:** Tailwind CSS via CDN
- **Navegação:** JavaScript puro (troca de abas)
- **Cabeçalho:** Nome do produto + timestamp da última atualização
- **Auto-contido:** sem dependências locais

---

## Estrutura do Prompt do Agente

O agente agendado recebe um prompt com 4 seções fixas:

1. **Contexto fixo:** IDs das planilhas Google Sheets, nomes dos canais Slack, data de execução
2. **Instruções de cálculo:** fórmulas exatas de Satisfação, CSAT, taxa de conclusão, score de relevância e scores por dimensão
3. **Instruções de análise Slack:** critérios para classificar criticidade (Alta = erro que impede uso, Média = degradação de experiência, Baixa = sugestão/melhoria)
4. **Template HTML:** estrutura completa do dashboard com placeholders para os dados calculados

---

## Configuração Necessária

Antes da implementação, coletar:

- [ ] URL ou ID da planilha Google Sheets do DesafiEI
- [ ] URL ou ID da planilha Google Sheets do HackaNAV
- [ ] Nome exato do canal Slack de bugs internos
- [ ] Nome exato do canal Slack de erros automáticos
- [ ] Confirmar horário de execução diária (padrão: 8h)
