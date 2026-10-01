# WebGL e shaders

## Quando usar

WebGL deve carregar significado visual que CSS/canvas 2D não entregam com
qualidade semelhante. Sempre mantenha conteúdo e ação disponíveis sem ele.

## Canvas compartilhado

Um renderer compartilhado reduz contextos, mas exige:

- retângulos cacheados e atualizados por ResizeObserver;
- no máximo uma leitura/escrita por frame;
- preload e reutilização de texturas;
- scissor ou viewport quando vários alvos forem visíveis;
- pausa fora da viewport e com document hidden;
- fallback para touch, teclado e perda de contexto.

## Distorção orgânica

Combine:

- pointer e velocidade suavizados por damping independente de FPS;
- correção de aspect ratio;
- falloff radial contínuo;
- campo de curl/noise de poucas oitavas;
- wake dissipativo;
- clamp ou estratégia de borda;
- strength limitado por tier.

Use [assets/shaders/liquid-distortion.frag](../assets/shaders/liquid-distortion.frag)
como starter, não como aparência universal.

## Fill rate e DPR

`Math.min(devicePixelRatio, 2)` ainda pode produzir buffers enormes em 4K.
Escolha DPR por tamanho físico, tempo de GPU e tier. Reduza primeiro resolução,
oitavas e passes; preserve timing e interação.

## Lifecycle

Pare `setAnimationLoop` ou RAF antes de descartar recursos. Libere:

- BufferGeometry;
- Material, incluindo arrays;
- Texture e render targets;
- listeners e observers;
- renderer quando a experiência terminar.

Assets compartilhados precisam de reference counting. Use
[assets/runtime/resource-tracker.js](../assets/runtime/resource-tracker.js)
como base.

## Context loss

Trate `webglcontextlost` sem reload infinito. Exiba fallback estático, impeça
ações de render e reconstrua somente quando seguro.

