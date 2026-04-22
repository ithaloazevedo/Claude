# Templates: Issues de PM

Issues criadas pelo PM — Improvement e Bug. Para issues técnicas de engenharia, use o skill `linear-issues`.

---

## Template: Improvement

Use para melhorias em funcionalidades existentes, ajustes de experiência ou otimizações identificadas pelo PM.

```markdown
## [Verbo no Imperativo] + [descrição da melhoria]

**Projeto:** [Projeto de Delivery vinculado]
**Tipo:** Improvement

---

### 🎯 O que melhorar
[O que existe hoje e o que deveria ser diferente — 1-2 frases. Seja específico sobre o comportamento atual.]

### 💡 Solução proposta
[O que deve ser feito — objetivo, não prescritivo de implementação. O assignee decide o como.]

### ✅ Critério de aceite
- [ ] [comportamento esperado após a melhoria — binário e testável]
```

---

## Template: Bug

Use para reportar comportamentos incorretos ou quebrados que o PM identificou — via teste, feedback de usuário ou monitoramento.

```markdown
## [Comportamento atual] → [Comportamento esperado]

**Projeto:** [Projeto de Delivery vinculado]
**Tipo:** Bug

---

### 🐛 Comportamento atual
[O que está acontecendo, com contexto de onde/quando ocorre — plataforma, perfil de usuário, fluxo]

### ✅ Comportamento esperado
[O que deveria acontecer nesta situação]

### 🔁 Como reproduzir
1. [Passo 1]
2. [Passo 2]
3. [Resultado observado]

### 📎 Evidência
[Print, link de sessão, log, feedback direto de usuário — se houver. Citações literais de usuários são preferíveis a paráfrases.]
```

---

## Boas práticas

- **Improvement**: descreva o problema, não a solução técnica. O assignee define a implementação.
- **Bug**: quote feedback de usuários diretamente quando disponível — é mais autêntico e rápido do que parafrasear.
- **Título de Bug**: use o padrão `[o que acontece] → [o que deveria acontecer]` para deixar claro tanto o problema quanto a expectativa.
- **Critério de aceite**: um único critério é suficiente para a maioria das issues. Mais de três indica que pode ser um projeto, não uma issue.
