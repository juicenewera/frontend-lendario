# Layout e tipografia

## Princípios

- Preserve `html { font-size: 100%; }` e preferências de zoom.
- Trate espaçamento, aspect ratio e tracking como presets, não mandatos.
- Valide com conteúdo real, fontes carregadas e idiomas suportados.
- Use container queries quando o componente depender do espaço disponível.

## Escalas fluidas

Prefira uma interpolação limitada no componente:

```css
.display {
  font-size: clamp(3rem, 1.6rem + 6.2vw, 9rem);
  line-height: var(--display-leading, 0.94);
  letter-spacing: var(--display-tracking, -0.035em);
  text-wrap: balance;
}
```

Não use uma base root menor para simular o artboard de origem. Teste acentos,
descendentes, ligaturas, fallback fonts, zoom a 200% e wrapping.

## Grid

Defina gutters fluidos, largura útil de leitura, colunas, alinhamentos ópticos,
ritmo vertical por densidade e exceções deliberadas para criar tensão.

Um grid de 8 px pode auxiliar consistência, mas ajustes ópticos de 1–4 px são
aceitáveis quando compensam forma, peso ou baseline.

## Aspect ratios

Escolha pelo conteúdo:

- 21:9 ou 16:9: cenas horizontais e contexto;
- 4:5 ou 3:4: retrato, produto e editorial;
- 1:1: comparação, catálogo e thumbnails;
- proporção intrínseca: quando crop altera significado.

Registre focal point e alternativa mobile no asset manifest.

## Superfícies

Blur e translucidez devem comunicar profundidade ou estado. Sobre vídeo,
WebGL ou listas extensas, prefira superfícies opacas ou pré-compostas.

## Tokens

Use tokens semânticos, não cores prescritivas:

```css
:root {
  --surface-canvas: light-dark(#f6f4ef, #0a0a0a);
  --surface-raised: light-dark(#ffffff, #151515);
  --text-primary: light-dark(#111111, #ffffff);
  --text-secondary: light-dark(#4d4d4d, #b8b8b8);
  --accent-action: #6b5cff;
  --border-subtle: color-mix(in srgb, currentColor 10%, transparent);
}
```

Valide contraste no estado final, incluindo texto sobre mídia.

