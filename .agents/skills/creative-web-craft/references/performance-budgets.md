# Performance budgets

## Gates de campo

Meça no percentil 75 quando houver RUM:

| Métrica | Gate inicial |
| --- | ---: |
| LCP | ≤ 2500 ms |
| INP | ≤ 200 ms |
| CLS | ≤ 0.10 |

Lighthouse é diagnóstico de laboratório, não substituto de dados reais.

## Frames

- 60 Hz oferece 16,7 ms por frame para toda a pipeline.
- 120 Hz oferece 8,3 ms.
- Reserve margem para style, layout, paint e composição.
- Observe long animation frames e dropped frames durante interação real.

Não declare 60/120 FPS “cravados”. Informe dispositivo, browser, resolução,
duração do teste e percentis.

## Tiers adaptativos

### Baseline

Sem dependência de WebGL, smooth scrolling, áudio ou decode em massa.

### Enhanced

Motion leve, View Transitions, mídia responsiva e componentes lazy.

### Cinematic

Shaders, sequências e som. Ative somente após capability check e amostragem de
frames; rebaixe o tier se o custo persistir.

Não use apenas user agent. Considere reduced motion, save-data quando
disponível, tipo de input, viewport, falhas reais e tempo de frame.

## Carregamento

- poster/hero crítico antes de bundles decorativos;
- reserve dimensões para evitar CLS;
- não permita que frame sequences concorram com LCP;
- lazy load por proximidade;
- limite scripts terceiros;
- pré-carregue somente recursos comprovadamente críticos.

## Validação

Exporte métricas para JSON e rode:

```shell
node scripts/check-budgets.mjs metrics.json
```

Defina budgets adicionais por projeto em vez de tornar pesos de JS ou mídia
universais.

