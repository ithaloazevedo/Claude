# Design: Linear Spec v3 — Patch de Melhorias

**Data:** 2026-04-22
**Tipo:** In-place patch na v3 existente
**Escopo:** SKILL.md + template-discovery.md + template-issues.md

---

## Contexto

A v3 do skill `linear-spec` foi implementada com foco no fluxo estrutural (hierarquia, commands, templates). Este patch endereça 10 pontos de melhoria identificados após revisão voltada para PMs de todos os níveis.

O ponto 8 (caching de times entre sessões) foi explicitamente adiado — requer um mecanismo diferente dos demais e será tratado separadamente.

---

## Mudanças por arquivo

### SKILL.md

#### Opção B — Criação real no Linear
Após aprovação da spec pelo usuário, o skill usa `save_initiative`, `save_project` ou `save_issue` para criar o item diretamente no Linear. Fluxo do Passo 4:
1. Usuário aprova a spec
2. Skill pergunta: "Posso criar este item no Linear?"
3. Se sim → cria via connector, retorna o link do item criado
4. Sugere milestones (se aplicável)
5. Sugere Activity Update

#### Ponto 1 — VALIDATE: remover "Milestones centrais definidos?"
Remove o item do checklist de Iniciativas. Milestones são gerados pelo skill automaticamente, não são critério de validação do PM.

#### Ponto 2 — Comportamento Geral: corrigir contradição
Substitui "Nunca crie ou atualize itens diretamente" por linguagem precisa: o skill sempre pede confirmação antes de criar. Três ações que requerem confirmação: criação do item, criação de milestones, postagem de Activity Update.

#### Ponto 3 — CREATE para Delivery: link de Discovery opcional
Bloqueante `Projeto de Discovery associado` passa a ser opcional. Pergunta precisa: "Existe um Projeto de Discovery criado no Linear para este trabalho?" Se não → campo `Discovery:` não aparece no template gerado.

#### Ponto 4 — PROMOTE: aceitar nome além de ID
Sintaxe: `promote [ID ou nome parcial]`. Se o nome for ambíguo, lista candidatos e pede confirmação.

#### Ponto 6 — Activity Update no CREATE: padrão narrativo
Os templates de update do CREATE adotam o mesmo padrão narrativo já usado no PROMOTE: contexto → decisão → próximo passo. Remove os one-liners genéricos atuais.

#### Ponto 7 — Milestones derivados do spec
Em vez de sugestões genéricas fixas, o skill analisa o spec gerado e extrai candidatos a milestone. Regras:
- Só sugere quando há paralelização visível (ex: múltiplas áreas funcionais em Delivery, múltiplas questões independentes em Discovery)
- Máximo 3 milestones por item
- Se não houver paralelização clara, não sugere nada

#### Ponto 9 — HELP: "quando NÃO criar projeto"
Adiciona seção com 3 sinais de que o item certo é uma Issue, não um Projeto:
1. Escopo cabe em 1-2 dias de trabalho
2. Não tem fases nem paralelismo
3. Não envolve Designer nem múltiplos times

#### Bug + Slack: fechar o loop na thread
Ao criar um Bug, se o usuário forneceu link de thread do Slack como evidência: após criar a issue no Linear, o skill pergunta se deve responder à thread do Slack com o link do Linear. Se sim → posta reply via `slack_send_message`.

---

### template-discovery.md

#### Ponto 5 — "Escopo" → "Restrições conhecidas"
A seção `📋 Escopo` é renomeada para `📋 Restrições conhecidas`. Remove o bloco `✅ Dentro` (inadequado para fase de discovery). Mantém apenas `🚫 Fora` — as restrições já conhecidas do espaço de solução. Atualizado no template e no exemplo real.

---

### template-issues.md

#### Ponto 11 — Exemplos reais inventados (coerentes com Biblioteca de Conteúdos)
Adiciona um exemplo de Improvement e um de Bug, ambos coerentes com a narrativa da Biblioteca de Conteúdos do Portal Arcoplus — sem usar dados reais do Linear.
