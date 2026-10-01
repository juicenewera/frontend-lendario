# Matriz de QA

## Evidência

Registre URL/commit quando disponível, browser, dispositivo, viewport,
condição de rede, resultado esperado, resultado observado e evidência.

## Matriz mínima

| Dimensão | Cobertura |
| --- | --- |
| Browsers | Chrome, Safari e Firefox atuais |
| Mobile | iOS Safari e Android Chrome |
| Inputs | teclado, mouse, trackpad e touch |
| Viewports | estreito, tablet, laptop e wide/4K |
| Preferências | reduced motion e contraste aumentado |
| Rede | fast, slow e offline/error fallback |
| Lifecycle | entrada, saída, back/forward e remontagem |

## Visual

- hierarquia permanece com conteúdo real;
- crop e focal point corretos;
- fontes carregadas não causam overflow;
- estados hover, focus, pressed, loading, empty e error;
- transições não mostram tela branca ou conteúdo duplicado.

## Performance

- LCP/INP/CLS contra os budgets;
- long animation frames durante hero e scroll;
- memória após repetir navegação;
- contexts, textures e listeners não crescem a cada visita;
- sequências não disputam prioridade com o hero.

## Acessibilidade

- landmarks e headings;
- foco após transição;
- navegação e CTA por teclado;
- alternativa a canvas/WebGL;
- pausa e reduced motion;
- áudio opt-in;
- contraste sobre mídia.

## Severidade

- **P0:** bloqueio, perda de conteúdo, crash, inacessibilidade do CTA.
- **P1:** falha grave de performance, foco ou layout em alvo prioritário.
- **P2:** inconsistência visual ou interação com workaround.
- **P3:** refinamento sem impacto funcional.

Não aprove com P0/P1 aberto. Documente P2/P3 aceitos, responsável e condição
de reavaliação.

