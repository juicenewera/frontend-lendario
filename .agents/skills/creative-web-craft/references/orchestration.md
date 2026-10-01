# Orquestração de agentes

## Princípio

Paralelize investigação independente; serialize decisões e edições dependentes.
Agentes não devem editar os mesmos arquivos simultaneamente.

## Papéis

### Creative architect

Lê o brief e o produto. Entrega `creative-brief.json` com tese, capítulos,
linguagem visual, tier, budgets e fallbacks. Não implementa produção.

### Asset director

Inventaria assets existentes, lacunas, crop, formatos, duração, peso e
alternativas. Entrega `asset-manifest.json`. Não inventa permissões ou licenças.

### Creative technologist

Implementa somente a direção aprovada. Declara lifecycle, progressive
enhancement e decisões que divergiram do brief.

### QA auditor

Testa de forma independente e entrega relatório com evidência. Não reduz
budgets para aprovar a própria implementação.

## Ondas

1. Architect e asset director podem pesquisar em paralelo.
2. O agente líder resolve conflitos e fecha o creative brief.
3. Technologist implementa.
4. QA audita.
5. Faça no máximo dois ciclos automáticos de correção; depois, reporte o
   impasse e peça decisão humana.

## Workspaces

- leitura/análise: workspace compartilhado ou herdado;
- edições independentes: worktrees/branches isolados;
- mudanças na mesma superfície: um único editor por vez.

## Contratos

Passe caminhos e critérios, não toda a conversa. Cada agente deve retornar:

- resumo de decisão;
- artefato criado ou alterado;
- evidência;
- riscos e perguntas pendentes;
- status: pass, fail ou needs-decision.

