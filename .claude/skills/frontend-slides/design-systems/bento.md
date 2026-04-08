---
name: bento
description: Layout modular em grid com blocos tipo card, hierarquia clara, espaçamento suave e contraste visual sutil para interfaces organizadas e escaneáveis.
license: MIT
metadata:
  author: typeui.sh
---

# Bento — Sistema de Design

## Missão

Abordagem inovadora que usa um layout em grid para apresentar conteúdo em blocos visualmente atrativos de tamanhos variados, como uma marmita bento — organizado, modular e visualmente equilibrado.

## Fundações de Estilo

- **Visual:** moderno, limpo
- **Tipografia:** escala 12/14/16/20/24/32 | Fontes: primary=Inter, display=Inter, mono=JetBrains Mono | pesos: 100–900
- **Paleta:** primary=#FAD4C0, secondary=#80A1C1, success=#16A34A, warning=#D97706, danger=#DC2626, surface=#FFF5E6, text=#111827
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
