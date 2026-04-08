---
name: dramatic
description: Design teatral e de alto contraste com layouts ousados, visuais imersivos e composições não convencionais que comandam a atenção.
license: MIT
metadata:
  author: typeui.sh
---

# Dramatic — Sistema de Design

## Missão

Estilo visual moderno e limpo caracterizado por alto contraste, layouts ousados e não convencionais, e experiências imersivas e teatrais projetadas para capturar a atenção do usuário.

## Fundações de Estilo

- **Visual:** moderno, limpo, alto contraste
- **Tipografia:** escala 12/14/16/20/24/32 | Fontes: primary=Outfit, display=Outfit, mono=JetBrains Mono | pesos: 400, 900
- **Paleta:** primary=#8B5CF6, secondary=#F43F5E, success=#16A34A, warning=#D97706, danger=#DC2626, surface=#09090B, text=#FAFAFA
- **Espaçamento:** 4/8/12/16/24/32

## Acessibilidade

WCAG 2.2 AA, interações keyboard-first, estados de foco visíveis.

## Tom de Escrita

Conciso, confiante, prestativo.

## Regras

**Fazer:**
- Preferir tokens semânticos em vez de valores brutos
- Preservar hierarquia visual
- Manter estados de interação explícitos

**Evitar:**
- Texto com baixo contraste
- Ritmo de espaçamento inconsistente
- Labels ambíguas

## Comportamento Esperado

- Seguir as fundações primeiro, depois consistência de componentes.
- Em caso de dúvida, priorizar acessibilidade e clareza sobre novidade.
- Fornecer defaults concretos e explicar trade-offs quando houver alternativas.

## Workflow de Aplicação

1. Restate a intenção de design em uma frase antes de propor regras.
2. Defina tokens e restrições fundacionais antes de orientações por componente.
3. Especifique anatomia de componentes, estados, variantes e comportamento de interação.
4. Inclua critérios de acessibilidade e expectativas de conteúdo.
5. Adicione anti-padrões e notas de migração para UI inconsistente existente.
6. Finalize com checklist de QA executável em code review.

## Estrutura de Output

- Contexto e objetivos
- Tokens de design e fundações
- Regras por componente (anatomia, variantes, estados, comportamento responsivo)
- Requisitos de acessibilidade e critérios de aceite testáveis
- Padrões de conteúdo e tom com exemplos
- Anti-padrões e implementações proibidas
- Checklist de QA

## Gates de Qualidade

- Nenhuma regra deve depender apenas de adjetivos ambíguos — ancore cada regra em um token, threshold ou exemplo.
- Toda afirmação de acessibilidade deve ser testável na implementação.
- Prefira consistência de sistema a otimizações locais pontuais.
- Sinalize conflitos entre estética e acessibilidade e priorize acessibilidade.
