# Template: Projeto de Discovery

Use quando o problema é claro, mas o escopo ainda será definido com o Designer. O objetivo é estruturar o contexto para a exploração — não uma spec completa.

Para o contexto completo sobre o fluxo de discovery e design: [discovery-e-design.md](discovery-e-design.md)

---

## Template

```markdown
## [Verbo no Imperativo] + [Nome do Projeto]

**Iniciativa:** [Nome da Iniciativa vinculada]
**Dono:** [Nome]

---

### 🎯 Objetivo
[O que precisamos descobrir e decidir neste projeto — 1-2 frases]

### 🧠 Contexto e Problema
[Bloco narrativo com o porquê real. Inclua: personas afetadas, dados ou métricas que justificam o problema, tensões e riscos que tornam a solução não trivial. Quanto mais específico, melhor o ponto de partida para o Designer.]

### 📋 Escopo
✅ **Dentro:**
- [O que será explorado / prototipado]

🚫 **Fora:**
- [Restrições já conhecidas do espaço de solução]

### 🔍 Questões em aberto
- [ ] [O que o discovery precisa responder 1]
- [ ] [O que o discovery precisa responder 2]
- [ ] [O que o discovery precisa responder 3]

### ✅ Critérios de saída
Para avançar para Delivery:
- [ ] Direção validada com [stakeholder]
- [ ] Escopo fechado (dentro e fora definidos)
- [ ] Spec de Delivery aprovada

### 🚩 Milestones
| Marco | Objetivo | Data-alvo |
|-------|----------|-----------|
| Validar direção de design | Go/no-go com stakeholders — ponto de decisão | — |
| Spec de Delivery aprovada | Escopo fechado, engenharia pode iniciar planejamento | — |

### 🔗 Links
- Figma: [link ou "Aguardando"]
```

---

> **Próximo passo**: após o Milestone 1 (direção validada), use `/linear-spec promote [PROJ-ID]` para gerar o Projeto de Delivery a partir deste Discovery.
