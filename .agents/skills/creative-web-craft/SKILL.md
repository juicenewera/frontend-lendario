---
name: creative-web-craft
description: >-
  Projeta, implementa e audita experiências web premium com direção de arte,
  motion systems, scrollytelling, WebGL, showcases de produto e narrativa
  editorial. Use em pedidos de creative frontend, Awwwards/FWA, sites de
  lançamento, portfólios imersivos, shaders, sequências de frames ou auditorias
  visuais e de performance. Não use para CRUD rotineiro, alterações apenas de
  copy ou interfaces em que direção de arte e movimento estejam fora do escopo.
---

# Creative Web Craft

Crie experiências distintas, coerentes e mensuráveis. Efeitos servem à tese
criativa; não são o produto.

## Classifique o pedido

Escolha apenas os modos necessários:

- **Direção:** conceito, narrativa, composição, tipografia e linguagem visual.
- **Implementação:** frontend semântico, responsivo e pronto para produção.
- **Motion:** transições, microinterações, scroll e física de interface.
- **Scrollytelling:** vídeo, image sequence ou narrativa por capítulos.
- **WebGL:** shaders, texturas, canvas compartilhado ou cenas 3D.
- **QA:** fidelidade visual, acessibilidade, performance e lifecycle.

## Defina o tier

- **Baseline:** conteúdo e tarefa funcionam sem JavaScript, motion ou WebGL.
- **Enhanced:** motion progressivo, View Transitions e mídia responsiva.
- **Cinematic:** WebGL, sequências, som e assets especializados com fallbacks.

Não selecione Cinematic por padrão. Baseie a escolha em conceito, dispositivo,
rede, manutenção e orçamento.

## Gates obrigatórios

1. Antes de desenhar ou codificar, defina uma tese criativa em uma frase.
2. Identifique conteúdo real, público, ação primária e restrições técnicas.
3. Declare budgets e fallbacks para reduced motion, sem WebGL e rede lenta.
4. Preserve HTML semântico, teclado, foco e conteúdo alternativo.
5. Implemente cleanup para listeners, observers, timelines, mídia e GPU.
6. Meça o resultado; nunca prometa FPS fixo.

Se faltarem informações que mudem materialmente o conceito, faça perguntas
curtas. Caso contrário, declare suposições reversíveis e avance.

## Carregue somente a referência necessária

- Direção e brief: [references/art-direction.md](references/art-direction.md)
- Layout e tipografia: [references/layout-and-type.md](references/layout-and-type.md)
- Motion, cursores e áudio: [references/motion-grammar.md](references/motion-grammar.md)
- Vídeo e sequências: [references/scrollytelling.md](references/scrollytelling.md)
- WebGL e shaders: [references/webgl-shaders.md](references/webgl-shaders.md)
- Budgets e degradação: [references/performance-budgets.md](references/performance-budgets.md)
- Acessibilidade: [references/accessibility.md](references/accessibility.md)
- Verificação: [references/qa-matrix.md](references/qa-matrix.md)
- Trabalho com agentes: [references/orchestration.md](references/orchestration.md)

## Artefatos de trabalho

Quando agregarem valor, copie e preencha:

- [assets/creative-brief.schema.json](assets/creative-brief.schema.json)
- [assets/asset-manifest.schema.json](assets/asset-manifest.schema.json)
- [assets/qa-report-template.md](assets/qa-report-template.md)
- [assets/shaders/liquid-distortion.frag](assets/shaders/liquid-distortion.frag)
- [assets/runtime/resource-tracker.js](assets/runtime/resource-tracker.js)

Valide manifests com `node scripts/validate-assets.mjs <manifest>` e budgets
com `node scripts/check-budgets.mjs <metrics.json>`.

## Critério de conclusão

Entregue a experiência somente quando:

- a tese criativa for reconhecível sem explicar os efeitos;
- conteúdo e CTA funcionarem no tier Baseline;
- o tier escolhido passar nos budgets declarados;
- teclado, touch, reduced motion e foco tiverem comportamento explícito;
- navegação e remontagem não acumularem recursos;
- QA incluir evidência, falhas conhecidas e fallbacks testados.
