# Referência de avaliação da detecção — C5-B

- **Arquivo analisado:** [C5-B.ts](../codigos/C5-B.ts).
- **Cenário de origem:** 5 — Estado global e baixa testabilidade.
- **Problemas esperados:** 2.
- **Fonte do mecanismo principal:** [Hidden Dependencies](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/hidden-dependencies.md). Os mecanismos adicionais são construções da adaptação dentro do mesmo cenário, documentadas por inspeção do código; não são atribuídos automaticamente ao exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [Referência de avaliação da detecção](README.md).

A correspondência será verificada na resposta completa. O reconhecimento da tensão ou do risco com evidência concreta poderá contar como detecção, mesmo quando o modelo considera o desenho aceitável ou recomenda adiar uma refatoração. Não será exigido nome exato do smell nem reprodução de uma resposta ideal.

## Problemas esperados

### C5-B-01 — Dependências do gerador de recibos resolvidas por ambiente global

- **Tipo:** Estado global e dependências ocultas.
- **Decisão ou fragilidade observável:** `ReceiptBuilder.build` obtém fonte de dados e moeda de uma configuração do módulo. A instância não declara essas dependências e sua operação exige inicialização externa prévia.
- **Elementos e evidências:** `configureReceipts` substitui o ambiente compartilhado (linha 5; linhas 7–9); `build` lê fonte e moeda do ambiente (linhas 15–17).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica a resolução de fonte/moeda por configuração global, reconhecendo inicialização implícita, dependência da ordem ou dificuldade de isolamento.
- **Variações de nome:**
  - Configuração global oculta na geração de recibos.
  - Fonte e moeda resolvidas fora do contrato da instância.
  - Dependências implícitas de `ReceiptBuilder`.
- **Formulações equivalentes aceitas:** Hidden Dependencies, service locator neste mecanismo, dependência global ou baixo acoplamento.
- **Afirmações insuficientes:** “O construtor deveria ter parâmetros” sem localizar dependências; alegar que cada instância guarda configuração própria.
- **Distinção e contagem:** Fonte e moeda compõem o mesmo ambiente e um único problema. A configuração global será distinguida do cache estático em C5-B-02.

### C5-B-02 — Cache estático de recibos compartilha resultados entre instâncias

- **Tipo:** Estado global e dependências ocultas.
- **Decisão ou fragilidade observável:** `ReceiptBuilder.receipts` pertence à classe e persiste entre geradores. Após reconfigurar a fonte, uma nova instância pode reutilizar um recibo carregado pela fonte anterior para o mesmo ID; iniciar outro gerador não isola o estado.
- **Elementos e evidências:** `receipts` é um Map estático (linha 13); `build` consulta e grava esse estado (linhas 18–23). `configureReceipts` altera o ambiente, sem reiniciar o cache (linhas 7–9).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica o cache estático compartilhado e reconhece reutilização entre instâncias/fontes ou contaminação entre testes, apesar de criar outro gerador.
- **Variações de nome:**
  - Cache de recibos compartilhado entre geradores.
  - Resultados persistentes entre testes de recibos.
  - Estado estático que impede isolamento de `ReceiptBuilder`.
- **Formulações equivalentes aceitas:** Global Data, estado estático compartilhado, cache dependente da ordem de execução ou baixa testabilidade.
- **Afirmações insuficientes:** “Cache é ruim”; afirmar que identificadores diferentes usam sempre o primeiro recibo; criticar apenas a configuração global.
- **Distinção e contagem:** O Map usa o ID corretamente para distinguir recibos na mesma fonte. O problema documentado é sua persistência compartilhada entre instâncias/configurações. Injetar fonte/moeda sem tratar o cache não elimina este mecanismo.

