# Template: Projeto Tático e Milestone

Formatos padrão para estruturar um Projeto e seus Milestones no Linear.

---

## Template: Projeto Tático

```markdown
## Projeto: [Verbo no Imperativo] + [Nome do Projeto]

**Iniciativa:** [Nome da Iniciativa vinculada]
**Dono:** [Nome]
**Prazo-alvo:** [Data ou período]

---

### 🎯 Alinhamento Estratégico
[Como este Projeto contribui para a Iniciativa — 1-2 frases]

### 🧠 Contexto e Problema
[O que está errado ou faltando hoje? Qual o impacto disso?]

### 📋 Escopo
✅ **Dentro:**
- [O que faremos]

🚫 **Fora:**
- [O que NÃO faremos neste projeto — evita scope creep]

### ✅ Critérios de Aceite
- [ ] [Critério binário e testável 1]
- [ ] [Critério binário e testável 2]

### 🔗 Links
- Figma: [Link ou "Aguardando Assets"]
- Documentação: [Link se houver]
- OKR relacionado: [Link se houver]

### 🚩 Milestones do Projeto
| Marco | Objetivo | Data-alvo |
|-------|----------|-----------|
| [nome] | [o que valida] | [data] |
```

---

## Template: Milestone

```markdown
## Milestone: [Verbo no Imperativo] + [Nome do Marco]

**Projeto:** [Nome do Projeto]
**Data-alvo:** [Data]

---

### 🎯 O que este marco representa
[O que estará concluído ou validado quando este milestone for atingido]

### 📌 Por que este marco importa
[Decisão, validação de hipótese, entrega parcial para usuários, etc.]
```

---

## Exemplo Real: Acompanhamento do Professor

### Antes (input bruto)

```
Resumo: Garantir visibilidade total para os professores sobre o progresso das suas turmas
nas competições, permitindo que acompanhem através de uma tela dedicada quais grupos
realizaram os envios de arquivos e quais materiais foram submetidos em cada etapa.

Contexto: Atualmente existe uma assimetria de informação: os professores não conseguem
saber facilmente se os seus alunos conseguiram enviar os arquivos da competição.
Isso gera ansiedade, acionamentos da consultoria e chamados de suporte técnico.

Critérios de aceite:
- Funcionalidade exclusiva para o perfil de Professor, acesso Read-only
- Botão primário "Acompanhar envios" no action card das etapas com envio configurado
- Página com lista de grupos e tag de status
- Drawer com os arquivos enviados pelo grupo
...
```

**Problemas:** sem título no topo, sem alinhamento à iniciativa, sem prazo-alvo, critérios de aceite misturados com detalhamento de UI, sem dono, sem links.

---

### Depois (estruturado)

## Projeto: Garantir visibilidade do professor sobre envios das equipes nas competições

**Iniciativa:** Expandir a Plataforma de Competições para sustentar engajamento e reduzir OPEX de suporte
**Dono:** [Nome do PM responsável]
**Prazo-alvo:** [Data ou período]

---

### 🎯 Alinhamento Estratégico
Elimina a principal causa de acionamentos de suporte e consultoria durante as competições, contribuindo diretamente para a meta de < 10 reclamações e ≥ 70% de grupos participando ativamente.

### 🧠 Contexto e Problema
Existe uma assimetria de informação: professores não sabem se seus alunos enviaram os arquivos da competição. Isso gera ansiedade, enxurrada de acionamentos da consultoria e chamados de suporte — e tira do professor o papel de engajador das equipes.

### 📋 Escopo

✅ **Dentro:**
- Tela exclusiva para professores (Read-only) com lista de grupos e status de envio por etapa
- Drawer com visualização dos arquivos enviados por grupo
- Botão "Ver como aluno" para visualizar a etapa sem poder interagir

🚫 **Fora:**
- Envio ou edição de arquivos por professores (exclusivo do Capitão do grupo)
- Acompanhamento de etapas que não exigem envio de arquivos
- Impersonação de alunos

### ✅ Critérios de Aceite
- [ ] Tela acessível apenas para o perfil Professor
- [ ] Botão "Acompanhar envios" visível somente em etapas com envio configurado e com módulo aberto ou finalizado
- [ ] Lista de grupos exibe tag de status de envio por etapa
- [ ] Drawer exibe arquivos enviados pelo grupo selecionado (vídeos, imagens, docs)
- [ ] Botão "Ver como aluno" visível apenas com módulo aberto, abre etapa com ações de upload desabilitadas
- [ ] Feedbacks visuais funcionais (toasts, alertas, modais de erro/sucesso em downloads)

### 🔗 Links
- Figma: [Aguardando Assets]
- Documentação: —
- OKR relacionado: < 10 reclamações na Plataforma de Competições

### 🚩 Milestones do Projeto

| Marco | Objetivo | Data-alvo |
|-------|----------|-----------|
| Entregar MVP da tela de acompanhamento | Validar com escolas piloto antes do lançamento geral | [data] |
| Lançar tela para todas as competições | Disponibilizar para 100% dos professores | [data] |
