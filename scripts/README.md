# Scripts de Relatório Linear

## Relatório de Impacto em Satisfação

Analisa todos os projetos do Linear (de todos os times) e classifica o impacto potencial de cada um na satisfação do cliente/usuário.

### Como usar

```bash
cd scripts
npm install
LINEAR_API_KEY=sua_chave_aqui npm run relatorio
```

### O que o relatório analisa

- **Palavras-chave** no nome e descrição do projeto (UX, bug, performance, churn, NPS, etc.)
- **Prioridade das issues** — issues urgentes/alta prioridade pesam mais
- **Labels das issues** — labels relacionadas a satisfação
- **Saúde do projeto** — projetos "em risco" ou "fora do prazo" pesam mais
- **Progresso vs prazo** — projetos com baixo progresso e prazo curto pesam mais

### Classificação de impacto

| Pontuação | Classificação |
|-----------|--------------|
| ≥ 15 | 🔴 Crítico |
| 10–14 | 🟠 Alto |
| 5–9 | 🟡 Médio |
| 1–4 | 🟢 Baixo |
| 0 | ⚪ Sem impacto identificado |

### Saída

O relatório é salvo em `relatorios/impacto-satisfacao-YYYY-MM-DD.md` e também impresso no terminal.
