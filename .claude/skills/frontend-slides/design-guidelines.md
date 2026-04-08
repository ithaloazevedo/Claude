# Diretrizes de Design para Apresentações

## Design Thinking

Antes de escrever qualquer código, compreenda o contexto e comprometa-se com uma **direção estética OUSADA**:

| Dimensão | Pergunta-chave |
|---|---|
| **Propósito** | Que problema essa interface resolve? Quem a usa? |
| **Tom** | Qual extremo define esse projeto? |
| **Restrições** | Quais são os requisitos técnicos (framework, performance, acessibilidade)? |
| **Diferenciação** | O que torna isso INESQUECÍVEL? O que o usuário vai lembrar? |

### Direções Estéticas de Referência

Escolha **uma** direção e execute-a com precisão:

- **Brutalmente minimalista** — espaço, silêncio, tipografia soberana
- **Maximalismo caótico** — camadas, texturas, sobrecarga visual intencional
- **Retro-futurista** — nostalgia técnica, CRT, interfaces de ficção científica
- **Orgânico/natural** — formas irregulares, paletas terrosas, texturas naturais
- **Luxury/refinado** — serifa elegante, ouro/platina, composição contida
- **Playful/lúdico** — formas arredondadas, cores vibrantes, micro-animações expressivas
- **Editorial/magazine** — grid de publicação, hierarquia tipográfica forte
- **Brutalista/cru** — bordas expostas, estrutura aparente, sem ornamento
- **Art Déco/geométrico** — simetria, ornamento controlado, dourado e preto
- **Soft/pastel** — degradês suaves, leveza, fundos leitosos
- **Industrial/utilitário** — monoespaçado, cinzas metálicos, funcionalidade aparente

> **CRÍTICO:** Maximalismo ousado e minimalismo refinado funcionam igualmente bem — o que define qualidade é **intencionalidade**, não intensidade.

---

## Diretrizes Estéticas de Frontend

### Tipografia

- Escolha fontes **belas, únicas e com personalidade** — não fontes genéricas
- **Evitar:** Arial, Roboto, Inter, fontes de sistema
- **Preferir:** escolhas inesperadas que elevam a estética do projeto
- Combine uma **fonte display distintiva** com uma **fonte de corpo refinada**
- A tipografia deve carregar parte do peso estético — não seja apenas texto

### Cor e Tema

- Comprometa-se com uma **estética coesa** do início ao fim
- Use **variáveis CSS** para garantir consistência em todo o projeto
- **Paletas dominantes com acentos nítidos** superam paletas tímidas e equilibradas
- Derive de temas de IDE, culturas visuais específicas ou períodos históricos
- Alterne entre temas claros e escuros — não repita a mesma combinação

### Movimento e Animação

- Use animações em **momentos de alto impacto**: entrada de página, transições de slide
- Prefira **soluções CSS puras** para HTML; use Motion library em React
- **Revelações escalonadas** (`animation-delay`) criam mais encantamento que microinterações dispersas
- Explore **scroll-trigger** e **hover states que surpreendem**
- Nunca anime por animar — cada movimento deve ter intenção

### Composição Espacial

- Layouts **inesperados**: assimetria, sobreposição, fluxo diagonal
- Elementos que **quebram o grid** com propósito
- Espaço negativo generoso **ou** densidade controlada — nunca o meio-termo sem caráter
- A composição deve guiar o olhar com intenção coreográfica

### Fundos e Detalhes Visuais

Crie **atmosfera e profundidade** — nunca use cores sólidas por padrão. Explore:

- Gradient meshes e degradês multicamadas
- Texturas de ruído (`noise`) e granulação
- Padrões geométricos e transparências sobrepostas
- Sombras dramáticas e bordas decorativas
- Efeitos contextuais que reforçam a estética geral
- Cursores customizados quando apropriado

---

## O Que Nunca Fazer

| Proibido | Motivo |
|---|---|
| Inter, Roboto, Arial, fontes de sistema | Genérico, sem personalidade |
| Gradientes roxos em fundo branco | Clichê de "IA" |
| Space Grotesk como escolha padrão | Convergência — evitar sempre |
| Layouts previsíveis e padrões de componentes prontos | Sem identidade contextual |
| Design igual em gerações diferentes | Cada projeto deve ser único |

---

## Complexidade de Implementação

A complexidade do código deve corresponder à visão estética:

- **Design maximalista** → código elaborado, animações extensas, efeitos em camadas
- **Design minimalista/refinado** → contenção, precisão, atenção a espaçamento e detalhes sutis
- Elegância vem de **executar bem a visão**, não de economizar esforço

---

## Princípio Final

> Não se contenha. Mostre o que é possível criar quando se pensa fora do óbvio e se compromete totalmente com uma visão distinta. Nenhum design deve parecer igual ao anterior.
