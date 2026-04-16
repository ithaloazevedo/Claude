# Discovery e Design no Linear Method

Como documentar projetos cujo escopo ainda será definido na fase de discovery e prototipação.

---

## O princípio fundamental

> **O Project não precisa ter escopo completo para existir.**
> Ele precisa ter problema claro e critérios de saída do discovery definidos como milestone.

O escopo aberto não é um bloqueio para criar o projeto — é o estado natural do discovery. O que muda é o *tipo* de documento que você cria: um **briefing**, não uma spec completa.

---

## Briefing vs. Spec completa

| | Briefing (discovery) | Spec completa (build) |
|--|----------------------|-----------------------|
| **Quando usar** | Escopo ainda indefinido | Direção de design validada |
| **Foco** | Problema, perguntas em aberto, critérios de saída | Escopo fechado, critérios de aceite detalhados |
| **Escopo** | O que sabemos que está *fora* | Dentro e fora bem definidos |
| **Critérios** | De saída do discovery (o que precisa estar respondido) | De aceite da entrega (binários e testáveis) |
| **Próximo passo** | Designer inicia exploração | Engenharia inicia build |

---

## Como o Designer cria as próprias issues

O Linear Method é direto: *"The designers file their own issues."*

O PM não cria issues para o Designer — cria o contexto (Project/Briefing), e o Designer quebra o trabalho conforme descobre. Issues típicas de discovery:

| Issue | Quando criar |
|-------|-------------|
| `Explorar direções de design para [funcionalidade]` | Início do discovery — espaço livre para explorar sem julgamento |
| `Escrever spec do projeto [nome]` | Quando PM precisa formalizar decisões e fechar escopo |
| `Validar protótipo com [usuários/stakeholder]` | Após exploração inicial, antes de escolher direção |
| `Design [tela X]` | Quando a direção está escolhida — tarefa concreta e fechada |
| `Alinhar handover com engenharia` | Antes de entrar em build |

A issue de exploração é intencionalmente aberta. O Linear Method orienta: *"Explore the solution freely and without judging whether something is feasible."* Isso é diferente de issues de build, que devem ser atômicas e fechadas.

---

## Estrutura de Milestones para projetos em discovery

Os milestones estruturam a transição entre fases, funcionando como portões de decisão:

```
Milestone 1: Validar direção de design    ← discovery termina aqui
             O que valida: decisão tomada, direção aprovada com stakeholders

Milestone 2: Spec aprovada para build     ← engenharia começa aqui
             O que valida: escopo fechado, critérios de aceite definidos

Milestone 3: [Entrega ou lançamento]      ← valor chegou ao usuário
```

**Por que isso funciona:** O PM e o Designer sabem exatamente quando o projeto muda de fase. A engenharia não começa sem a Milestone 2 estar completa. Não há ambiguidade sobre o que precisa acontecer antes de o build começar.

---

## Quando atualizar o Project para spec completa

Após o Milestone 1 (direção validada), o PM atualiza o briefing para uma spec completa:

1. Fecha o escopo (o que faremos e o que não faremos)
2. Converte critérios de saída do discovery em critérios de aceite da entrega
3. Adiciona links de Figma e documentação técnica
4. O Designer cria as issues de design detalhadas (`Design tela X`, `Design componente Y`)
5. A engenharia começa a criar as próprias issues técnicas

---

## Erros comuns nesse fluxo

| Erro | Consequência |
|------|-------------|
| Esperar o escopo estar completo para criar o projeto | Discovery sem estrutura, sem milestone, sem contexto compartilhado |
| PM cria todas as issues do Designer | Designer não tem ownership, perde o raciocínio de quem entende o trabalho |
| Discovery sem milestone de saída | Não há critério claro para o projeto entrar em build — vira exploração infinita |
| Atualizar o briefing direto para spec sem validar com stakeholders | Escopo fecha errado, retrabalho no build |
| Issue de exploração com critérios rígidos | Bloqueia a liberdade criativa necessária no discovery |
