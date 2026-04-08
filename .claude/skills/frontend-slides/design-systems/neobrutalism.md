---
name: neobrutalism
description: Releitura moderna do brutalismo com bordas marcadas, cores de acento vibrantes e layouts crus de alto contraste sobre superfícies quentes.
license: MIT
metadata:
  author: typeui.sh
---

# Neobrutalism — Sistema de Design

## Missão

Releitura contemporânea do brutalismo: moderno, limpo e de alto contraste, com bordas visíveis, cores saturadas e uma estética crua que desafia o design genérico.

## Fundações de Estilo

- **Visual:** moderno, limpo, alto contraste
- **Tipografia:** escala 13/15/17/21/27/35 | Fontes: primary=Inter, display=Inter, mono=JetBrains Mono | pesos: 100–900
- **Paleta:** primary=#FDC800, secondary=#432DD7, success=#16A34A, warning=#D97706, danger=#DC2626, surface=#FBFBF9, text=#1C293C
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
