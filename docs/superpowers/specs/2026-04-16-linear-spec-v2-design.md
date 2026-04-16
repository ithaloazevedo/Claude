# Design: linear-spec v2 — Publicação para PMs Externos

**Data:** 2026-04-16  
**Autor:** Ithalo Mendes <ithalo.mendes@arcotech.io>  
**Status:** Aprovado

---

## Contexto

A skill `linear-spec` foi criada internamente para ajudar PMs a estruturar Iniciativas, Projetos e Milestones no Linear. A v1 depende de MCP com ferramentas específicas (`mcp__claude_ai_Linear__*`) e tem contexto hardcoded dos times PLUS e CANPLUS da Arcotech.

O objetivo da v2 é publicar a skill para PMs de outras empresas, operando via conectores nativos do Claude Chat (não MCP).

---

## Decisões de Design

### 1. Pasta separada

A v2 será criada em `.claude/skills/linear-spec-v2/` sem modificar a v1 existente.

### 2. Abordagem: Generalização + conector

Remove todo contexto de workspace específico (times PLUS/CANPLUS, snapshot hardcoded). Usa o conector do Linear disponível no Claude Chat para buscar dados reais. Se o conector não estiver habilitado, orienta o usuário a conectar.

### 3. Verificação de conector

Antes de qualquer fluxo (CREATE, BRIEF, VALIDATE), o skill verifica silenciosamente se o conector do Linear está ativo:
- **Conector disponível:** prossegue normalmente
- **Conector indisponível:** exibe guia de conexão e interrompe o fluxo

Mensagem de orientação:
> "Para usar este skill, você precisa conectar o Linear ao Claude Chat.
>
> **Como conectar:**
> 1. Acesse as configurações do Claude Chat
> 2. Vá em **Integrações** → **Adicionar conector**
> 3. Selecione **Linear** e autorize o acesso
>
> Após conectar, execute o comando novamente."

### 4. Passo 0 dinâmico (substitui snapshot hardcoded)

Em vez de executar ferramentas MCP com times fixos, o Passo 0 usa o conector para listar os times disponíveis no workspace do usuário e pede confirmação de quais usar na sessão.

Fallback: se o conector não listar times, pede que o PM informe os nomes manualmente.

### 5. Fluxo VALIDATE via conector genérico

Substituição de chamadas MCP específicas por instruções para o conector:
- *"Busque a Iniciativa pelo ID ou nome usando o conector do Linear"*
- Se não encontrar: pede ao usuário para colar o conteúdo

### 6. Autor

Campo adicionado no corpo do SKILL.md logo após o frontmatter:

```
**Autor:** Ithalo Mendes <ithalo.mendes@arcotech.io>
```

(A Anthropic não padroniza `author` no frontmatter YAML — o padrão recomendado é no corpo do Markdown.)

---

## Estrutura de Arquivos

```
.claude/skills/linear-spec-v2/
├── SKILL.md
└── references/
    ├── dicionario.md
    ├── anti-pattern.md
    ├── linear-method.md
    ├── template-iniciativa.md
    ├── template-projetos.md
    ├── template-brief.md
    └── discovery-e-design.md
```

**Não copiados para v2:**
- `workspace-context.md` — específico da Arcotech, já deletado na v1
- `artigos-margato.md` — contexto interno, já deletado na v1

---

## O que NÃO muda

- Hierarquia de itens (Iniciativa → Projeto → Milestone)
- Filosofia e princípios do Linear Method
- Templates de Iniciativa, Projeto, Milestone e Brief
- Fluxos CREATE, BRIEF, VALIDATE, HELP (estrutura)
- Convenção de idioma (pt-BR)
- Arquivos de referência (copiados sem alteração)

---

## O que muda no SKILL.md

| Elemento | v1 | v2 |
|----------|----|----|
| Autor | ausente | `**Autor:** Ithalo Mendes <ithalo.mendes@arcotech.io>` |
| Verificação de conector | ausente | Pré-fluxo em CREATE, BRIEF e VALIDATE |
| Passo 0 | MCP hardcoded (PLUS/CANPLUS) | Conector dinâmico + fallback manual |
| Contexto do Workspace | Seção PLUS/CANPLUS | Removida |
| Chamadas de ferramenta | `mcp__claude_ai_Linear__*` | Instruções genéricas para o conector |
| Referências | 9 arquivos (inclui 2 deletados) | 7 arquivos (sem workspace-context e artigos-margato) |
