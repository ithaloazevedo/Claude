# Plano de Implementação: Dashboard CSAT Automatizado

**Spec de referência:** `2026-04-16-dashboard-csat-design.md`  
**Data:** 2026-04-16

---

## Pré-requisitos (coletar antes de começar)

- [ ] URL da planilha Google Sheets do **DesafiEI**
- [ ] URL da planilha Google Sheets do **HackaNAV**
- [ ] Nome exato do canal Slack de **bugs internos** (ex: `#bugs-plataforma`)
- [ ] Nome exato do canal Slack de **erros automáticos** (ex: `#erros-auto`)

---

## Etapa 1 — Criar a pasta e o HTML base

**Arquivo:** `dashboards/csat-dashboard.html`

Criar um HTML auto-contido com:
- Cabeçalho com título "Dashboard CSAT" e campo de timestamp (`id="last-updated"`)
- Navegação com 4 abas: `DesafiEI`, `HackaNAV`, `CSAT Geral`, `Sustentação`
- Cada aba em um `<section>` com `id` correspondente, ocultada por padrão via Tailwind (`hidden`)
- JavaScript puro para troca de abas
- Chart.js e Tailwind carregados via CDN

---

## Etapa 2 — Aba DesafiEI

Dentro da section `#tab-desafiei`, implementar:

**Cards de destaque (grid 3 colunas):**
- Satisfação `(notas 5 / total) × 100` — exibir "—" se total = 0
- CSAT `(notas 4+5 / total) × 100` — exibir "—" se total = 0
- Total de respostas

**Cards secundários:**
- Taxa de conclusão de inscrição `(respostas "Sim" / total) × 100`
- Score médio de relevância pedagógica (média da coluna de relevância, escala 1–5)

**Tabela: CSAT por escola**
- Colunas: Escola (`school_id`) | Respostas | Satisfação | CSAT
- Ordenada por CSAT crescente (escolas com pior score no topo)
- Gerada dinamicamente com base nos `school_id` presentes nos dados

**Seção: Comentários críticos**
- Listar textos de "Sentimos muito por isso" e do campo de feedback aberto
- Filtro: apenas respostas com nota principal ≤ 3
- Cada item exibe: nota recebida + texto do comentário

---

## Etapa 3 — Aba HackaNAV

Dentro da section `#tab-hackanav`, implementar:

**Cards de destaque (grid 3 colunas):**
- Satisfação, CSAT, Total de respostas (mesma lógica do DesafiEI)

**Gráfico radar: Dimensões de competência**
- 6 eixos: Apropriação do Material, Autonomia Tecnológica, Depuração e Resolução de Problemas, Fluência Técnica, Consciência Ética, Integração com BNCC
- Valor de cada eixo = média da coluna correspondente (escala 1–5)
- Chart.js `type: 'radar'`

**Tabela: CSAT por escola**
- Mesma estrutura da aba DesafiEI

**Seção: Comentários críticos**
- Mesma lógica: nota ≤ 3 + textos de "Sentimos muito por isso" e feedback aberto

---

## Etapa 4 — Aba CSAT Geral (placeholder)

Dentro da section `#tab-geral`, implementar:

- Badge visual "Em breve" no topo
- Cards com valores "—" e estado vazio (sem dados)
- Texto: "Esta aba medirá a satisfação geral com o portal ArcoPlus. O formulário está em construção."
- Comentário HTML: `<!-- TODO: conectar Google Sheet do ArcoPlus aqui -->`

---

## Etapa 5 — Aba Sustentação

Dentro da section `#tab-sustentacao`, implementar:

**Seção: Bugs identificados** (canal de erros automáticos)
- Lista de itens com badge de criticidade: 🔴 Alta / 🟡 Média / 🟢 Baixa
- Critérios de classificação:
  - Alta = erro que impede uso da plataforma
  - Média = degradação de experiência / funcionalidade parcial
  - Baixa = comportamento inesperado / sugestão de melhoria
- Cada item: título do problema + frequência de ocorrência (se repetido)

**Seção: Discussões da equipe** (canal interno)
- Lista dos principais tópicos levantados no período
- Cada item: resumo do tópico + classificação de criticidade

**Seção: Sugestões de melhoria**
- Geradas pelo Claude com base nos dois canais
- Lista de até 5 sugestões priorizadas

**Rodapé da aba:**
- "Análise gerada em [timestamp]"
- "Período analisado: [data início] – [data fim]"

---

## Etapa 6 — Prompt do agente agendado

Criar o prompt que o agente recebe a cada execução diária. Estrutura:

```
Você é um agente de análise de CSAT. Execute as seguintes etapas:

1. LEITURA DE DADOS
   - Leia a planilha do DesafiEI: [URL_DESAFIEI]
   - Leia a planilha do HackaNAV: [URL_HACKANAV]
   - Leia o canal Slack [#CANAL_BUGS] — mensagens dos últimos 7 dias
   - Leia o canal Slack [#CANAL_ERROS] — mensagens dos últimos 7 dias

2. CÁLCULO DE MÉTRICAS
   Aplique as fórmulas exatas:
   - Satisfação = (contagem notas 5 / total respostas) × 100
   - CSAT = (contagem notas 4 ou 5 / total respostas) × 100
   - Taxa de conclusão DesafiEI = (respostas "Sim" / total) × 100
   - Score de relevância DesafiEI = média aritmética da coluna de relevância
   - Score por dimensão HackaNAV = média aritmética de cada coluna de competência
   - CSAT por escola = calcule Satisfação e CSAT agrupando por school_id
   - Comentários críticos = textos de respostas com nota principal ≤ 3

3. ANÁLISE SLACK
   - Canal de erros: identifique padrões de erro, agrupe por tipo, classifique criticidade
   - Canal interno: identifique tópicos principais, classifique criticidade
   - Gere até 5 sugestões de melhoria priorizadas com base nos dois canais

4. GERAÇÃO DO HTML
   - Abra o arquivo dashboards/csat-dashboard.html
   - Preencha todos os valores calculados nos campos correspondentes
   - Atualize o timestamp de "última atualização" para agora
   - Salve o arquivo sobrescrevendo a versão anterior
```

---

## Etapa 7 — Configurar o agente agendado

Usar o `schedule` skill para criar o trigger:

- **Frequência:** diária
- **Horário:** 8h (fuso horário local)
- **Prompt:** o prompt completo da Etapa 6 com as URLs e nomes de canais preenchidos
- **Working directory:** `/Users/ithalomendes/Claude`

---

## Etapa 8 — Teste manual

Antes de ativar o agendamento:
1. Rodar o agente manualmente uma vez com `/schedule run`
2. Abrir `dashboards/csat-dashboard.html` no browser
3. Verificar: todos os cards exibem valores ou "—" (nunca vazios), gráfico radar renderiza, aba Sustentação tem conteúdo, timestamp está correto
4. Verificar aba Geral mostra placeholder "Em breve"

---

## Resultado Final

```
dashboards/
└── csat-dashboard.html   ← dashboard auto-contido, atualizado diariamente às 8h
```
