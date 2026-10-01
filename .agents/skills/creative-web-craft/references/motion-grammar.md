# Motion grammar

## Função antes da forma

Classifique cada movimento como feedback, orientação, continuidade, narrativa
ou ambientação. Remova movimentos sem função clara.

## Tokens iniciais

```css
:root {
  --duration-feedback: 120ms;
  --duration-ui: 240ms;
  --duration-reveal: 560ms;
  --duration-scene: 900ms;
  --ease-enter: cubic-bezier(.16, 1, .3, 1);
  --ease-exit: cubic-bezier(.4, 0, 1, 1);
  --ease-scene: cubic-bezier(.65, .05, 0, 1);
}
```

Ajuste ao produto. Saídas geralmente são mais rápidas; ações primárias não
devem aguardar decoração.

## Cursor magnético

Ative somente com `(hover: hover) and (pointer: fine)` e sem reduced motion.
Calcule um alvo por evento, aplique lerp no único loop de animação e limite o
deslocamento. Hover e foco devem comunicar o mesmo affordance.

## Transições de página

Prefira View Transitions quando disponível e preserve navegação normal como
fallback. Após navegação:

- atualize título e landmark principal;
- restaure ou mova foco deliberadamente;
- trate scroll restoration;
- finalize ou reverta timelines anteriores;
- não prenda interação atrás de um overlay.

## Split text

Preserve o texto semântico original. Use um clone visual `aria-hidden="true"`,
recalcule em resize relevante e reverta o DOM no cleanup.

## Scroll

Use velocidade filtrada, limite de amplitude e transformação compositada.
Se Lenis for ligado ao GSAP ticker, desative qualquer segundo RAF e destrua
ambos no lifecycle apropriado.

## Áudio

- inicie ou retome AudioContext em gesto explícito;
- forneça master mute persistente;
- não sonifique cada tick de scroll;
- limite vozes simultâneas e use envelopes curtos;
- suspenda quando a página ficar oculta;
- não use som como único feedback.

## Reduced motion

Reduza distância, parallax, zoom espacial, scrubbing e auto-motion. Entregue
estados finais rapidamente e preserve a compreensão da interface.

