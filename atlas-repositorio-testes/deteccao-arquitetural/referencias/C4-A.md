# Referência de avaliação da detecção — C4-A

- **Arquivo analisado:** [C4-A.ts](../codigos/C4-A.ts).
- **Cenário de origem:** 4 — Dificuldade de extensão.
- **Problemas esperados:** 2.
- **Fonte do mecanismo principal:** [Conditional Complexity](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/conditional-complexity.md). Os mecanismos adicionais são construções da adaptação dentro do mesmo cenário, documentadas por inspeção do código; não são atribuídos automaticamente ao exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [Referência de avaliação da detecção](README.md).

A correspondência será verificada na resposta completa. O reconhecimento da tensão ou do risco com evidência concreta poderá contar como detecção, mesmo quando o modelo considera o desenho aceitável ou recomenda adiar uma refatoração. Não será exigido nome exato do smell nem reprodução de uma resposta ideal.

## Problemas esperados

### C4-A-01 — Seleção de formato repetida em várias operações

- **Tipo:** Dificuldade de extensão.
- **Decisão ou fragilidade observável:** `DataExporter` repete a escolha de formato em codificação, tipo de conteúdo e extensão. Acrescentar um formato exige alterar o tipo e várias decisões na classe.
- **Elementos e evidências:** `encode`, `contentType` e `extension` repetem text/json/csv (linhas 16–41); `ExportFormat` lista as alternativas (linha 1).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica a escolha de formato repetida em `DataExporter` e reconhece os vários pontos que precisam mudar para incluir uma alternativa.
- **Variações de nome:**
  - Condicionais de formato espalhados no exportador.
  - Extensão de formatos exige mudanças coordenadas.
  - Política de exportação fechada nas operações existentes.
- **Formulações equivalentes aceitas:** OCP, Conditional Complexity, proteção contra variações ou ausência de uma política extensível de formatos.
- **Afirmações insuficientes:** “Há um switch”; alegar que o CSV não protege aspas e delimitadores; listar formatos sem discutir custo de extensão.
- **Distinção e contagem:** Os três switches e a união de formatos compõem um único mecanismo. Não serão contados como problemas separados.

### C4-A-02 — Transformações de linhas fechadas em despacho central

- **Tipo:** Dificuldade de extensão.
- **Decisão ou fragilidade observável:** `RowTransform.apply` concentra implementações de trim, uppercase e mask em um switch. Uma nova transformação exige modificar o tipo e a operação central, sem ponto de registro ou contrato para acrescentar um comportamento.
- **Elementos e evidências:** `Transformation` enumera comportamentos (linha 3); `RowTransform.apply` implementa todos no mesmo despacho (linhas 5–10). `prepareExport` recebe transformação e formato separadamente (linhas 46–48).
- **Critério mínimo de detecção:** Será verificado se a resposta localiza o despacho de transformações em `RowTransform` e reconhece a necessidade de alterar sua implementação para acrescentar um comportamento.
- **Variações de nome:**
  - Pipeline de transformação sem ponto de extensão.
  - Transformações fixadas em switch central.
  - Inclusão de transformações exige modificar `RowTransform`.
- **Formulações equivalentes aceitas:** OCP, comportamento fechado a novas transformações, despacho central ou proteção contra variações.
- **Afirmações insuficientes:** “Todo switch é um problema”; criticar apenas a seleção de formatos; alegar mutação das linhas de entrada.
- **Distinção e contagem:** Transformação de dados e formato de saída são eixos independentes em unidades distintas. Uma crítica que localize apenas os switches de formato receberá somente C4-A-01.

