# Acessibilidade criativa

## Baseline sem efeitos

O DOM deve comunicar a estrutura completa sem canvas, shader, áudio ou animação.
Use headings, landmarks, links e controles nativos antes de recriá-los.

## Movimento

- respeite `prefers-reduced-motion`;
- ofereça pausa para movimento contínuo e auto-updates relevantes;
- evite flashes e grandes deslocamentos inesperados;
- não dependa de scroll-jacking para acessar conteúdo;
- preserve leitura e foco durante transições.

## Input

Toda ação por hover, drag ou pointer deve ter equivalente por teclado e touch.
Mantenha target confortável, estado `:focus-visible` e ordem de foco coerente
com a ordem visual.

## Canvas e WebGL

Forneça alternativa textual/DOM. O canvas pode enriquecer a apresentação, mas
não conter sozinho preço, especificação, navegação ou CTA.

## Split text

O leitor de tela deve receber uma frase contínua. Marque fragments visuais como
ocultos para tecnologia assistiva e preserve seleção/cópia quando possível.

## Áudio

Não reproduza automaticamente. Ofereça mute/volume acessível e não use som como
único sinal de sucesso, erro ou mudança.

## Cor e mídia

Valide contraste no frame mais desfavorável do vídeo. Use overlay adaptativo,
text shadow somente como reforço e legenda/transcrição quando houver fala.

## Testes mínimos

- teclado completo;
- leitor de tela ao menos no fluxo crítico;
- zoom 200%;
- reduced motion;
- forced colors/high contrast quando aplicável;
- touch sem hover;
- orientação e reflow estreito.

