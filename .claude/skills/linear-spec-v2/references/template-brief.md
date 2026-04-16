# Template: Briefing de Projeto (Discovery)

Use quando o projeto ainda está em discovery — o problema é claro, mas o escopo será definido com o Designer. Gera um briefing leve, não uma spec completa.

Para o contexto completo sobre o fluxo de discovery e design: [discovery-e-design.md](discovery-e-design.md)

---

## Template

```markdown
## Briefing: [Verbo no Imperativo] + [Nome do Projeto]

**Iniciativa:** [Nome da Iniciativa vinculada]
**Fase:** Discovery
**Dono:** [Nome]
**Período de discovery:** [Data início → Data do milestone de validação]

---

### 🎯 Resumo (O que?)
[1-3 frases descrevendo o que será construído e qual o resultado esperado. Objetivo: qualquer pessoa do time entender o escopo em 10 segundos.]

### 🧠 Contexto e Problema (Por que?)
[Bloco narrativo com o porquê real. Inclua: datas e janelas relevantes, personas afetadas, dados ou métricas que justificam o problema, tensões e riscos que tornam a solução não trivial. Quanto mais específico, melhor o ponto de partida para o Designer.]

### 🔄 Jobs to Be Done
| Persona | Quando... | Quero... | Para... |
|---------|-----------|----------|---------|
| [Persona] | [situação/contexto] | [job/motivação] | [resultado esperado] |

### 📸 Estado atual
[O que existe hoje — fluxo atual, tela, comportamento ou ausência de funcionalidade. Se houver prints ou links, inclua aqui. O Designer precisa saber o ponto de partida antes de explorar alternativas.]

### ⚠️ Restrições conhecidas
[Limites do espaço de solução: design system obrigatório, plataforma, fluxos que não podem mudar, dependências técnicas, decisões já tomadas. Diferente de "fora de escopo" — aqui são constraints que delimitam a exploração criativa.]

### 🔍 Questões em aberto (a responder no discovery)
- [ ] [Pergunta que o discovery precisa responder 1]
- [ ] [Pergunta que o discovery precisa responder 2]
- [ ] [Pergunta que o discovery precisa responder 3]

### ✅ Critérios de saída do discovery
Para o projeto avançar para build, precisamos ter:
- [ ] Direção de design validada com [stakeholder]
- [ ] Escopo fechado (dentro e fora definidos)
- [ ] Spec completa aprovada

### 🚩 Milestones
| Marco | Objetivo | Data-alvo |
|-------|----------|-----------|
| Validar direção de design | Aprovar direção antes de detalhar — ponto de go/no-go | [data] |
| Spec aprovada para build | Escopo fechado, engenharia pode iniciar planejamento | [data] |

### 📋 Issues sugeridas para o Designer iniciar
- [ ] `Explorar direções de design para [funcionalidade]`
- [ ] `Validar protótipo com [usuários/stakeholder]`
```

---

> **Lembrete**: O briefing é um ponto de partida. Após o Milestone 1 (direção validada), ele deve evoluir para uma spec completa usando o fluxo `/linear-spec create`.
