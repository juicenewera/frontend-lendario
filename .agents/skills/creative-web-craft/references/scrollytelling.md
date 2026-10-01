# Scrollytelling

## Escolha do mecanismo

Use a opção mais simples que preserve a intenção:

1. CSS e imagens responsivas para mudanças discretas.
2. Vídeo normal para reprodução temporal.
3. Vídeo com GOP curto quando seek direto for suficiente.
4. Image sequence quando controle frame a frame for essencial.
5. WebCodecs ou pipeline especializado somente com suporte e QA compatíveis.

All-Intra (`-g 1`) aumenta muito o bitrate; não é fallback universal.

## Budget de memória

Calcule o teto decodificado:

```text
width × height × 4 bytes × quantidade de frames
```

Uma sequência de 120 frames em 1920×1080 aproxima-se de 949 MiB. Não mantenha
tudo decodificado em mobile.

## Arquitetura da sequência

- preload do poster e dos primeiros frames;
- cache LRU ao redor do frame atual;
- 8–16 bitmaps como ponto inicial mobile, medido por device tier;
- variantes de resolução pelo tamanho renderizado;
- `createImageBitmap` e `close()` quando disponíveis;
- AbortController por montagem/rota;
- retry limitado e poster como fallback;
- render apenas quando o índice mudar;
- um único loop alinhado ao refresh do browser.

Não faça 120 requests simultâneos. Priorize a direção do scroll e pré-busque
uma janela curta.

## Canvas responsivo

Use ResizeObserver, calcule backing store pelo box e por um DPR adaptativo.
Implemente object-fit cover/contain explicitamente. O canvas deve possuir
conteúdo alternativo.

## Fallbacks

- reduced motion: poster ou capítulos discretos;
- save-data/rede lenta: poster responsivo;
- erro de decode: vídeo ou imagem final;
- aba oculta: pausar decode e render;
- pressão de memória: reduzir cache e resolução.

## Cleanup

Cancele fetches, feche bitmaps, limpe cache, desconecte observers e mate
timelines. Em SPA, valide ida e volta entre rotas várias vezes.

