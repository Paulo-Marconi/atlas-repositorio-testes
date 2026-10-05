# Referência de avaliação da detecção — C3-B

- **Arquivo analisado:** [C3-B.ts](../codigos/C3-B.ts).
- **Cenário de origem:** 3 — Encapsulamento inadequado de regras e estado do domínio.
- **Problemas esperados:** 3.
- **Fonte do mecanismo principal:** [Indecent Exposure](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/indecent-exposure.md). Os mecanismos adicionais são construções da adaptação dentro do mesmo cenário, documentadas por inspeção do código; não são atribuídos automaticamente ao exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [Referência de avaliação da detecção](README.md).

A correspondência será verificada na resposta completa. O reconhecimento da tensão ou do risco com evidência concreta poderá contar como detecção, mesmo quando o modelo considera o desenho aceitável ou recomenda adiar uma refatoração. Não será exigido nome exato do smell nem reprodução de uma resposta ideal.

## Problemas esperados

### C3-B-01 — Coleção pública de estoque permite contornar as operações do armazém

- **Tipo:** Encapsulamento de regras e estado.
- **Decisão ou fragilidade observável:** `Warehouse.stock` expõe um `Map` mutável. `readonly` impede trocar a referência, mas não bloqueia `set`, `delete` ou `clear`, que contornam validações de recebimento e retirada.
- **Elementos e evidências:** `stock` é público e readonly (linha 5); `receive` e `take` validam quantidades e disponibilidade (linhas 7–18).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica a mutabilidade do `Map` exposto e a possibilidade de alterar o estoque sem `receive`/`take`, contornando suas regras.
- **Variações de nome:**
  - Estoque interno exposto como Map mutável.
  - Invariantes do armazém contornáveis.
  - Coleção de estoque sem proteção de encapsulamento.
- **Formulações equivalentes aceitas:** Indecent Exposure, estado mutável público ou insuficiência de readonly para proteger a coleção.
- **Afirmações insuficientes:** “readonly torna o estoque imutável”; dizer apenas que existe um Map; alegar que `ReservationBook` acessa o Map diretamente.
- **Distinção e contagem:** Alterações de saldo, remoção e limpeza do Map são consequências de um único mecanismo. O retorno de uma reserva, C3-B-02, pertence a outro estado e outra fronteira.

### C3-B-02 — Consulta de reserva devolve o objeto interno modificável

- **Tipo:** Encapsulamento de regras e estado.
- **Decisão ou fragilidade observável:** `ReservationBook.find` retorna a mesma alocação armazenada. O consumidor pode mudar `units`, `sku` ou `stock`; `release` usa esses dados alterados para devolver itens.
- **Elementos e evidências:** `find` retorna diretamente o valor do Map (linha 39); `release` usa `allocation.stock`, `sku` e `units` (linhas 41–45). A alocação guarda a origem durante `reserve` (linha 36).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica o objeto retornado por `find` como estado interno mutável e relaciona sua alteração à corrupção dos dados da reserva ou da devolução.
- **Variações de nome:**
  - Vazamento do estado interno da reserva.
  - Alocação de estoque modificável após a consulta.
  - Consulta que permite alterar a reserva sem validação.
- **Formulações equivalentes aceitas:** Referência mutável exposta, quebra de encapsulamento no retorno ou modificação externa da reserva.
- **Afirmações insuficientes:** “O Map de reservas é público”; afirmar que a origem não é armazenada; pedir DTO sem localizar o retorno mutável.
- **Distinção e contagem:** Quantidade, SKU e origem expostos no mesmo objeto compõem um único item. A reserva guarda a origem; a fragilidade é permitir modificá-la pelo objeto devolvido.

### C3-B-03 — Limite de reserva público permite contornar sua validação

- **Tipo:** Encapsulamento de regras e estado.
- **Decisão ou fragilidade observável:** `maximumUnits` pode receber valores não inteiros ou não positivos sem `setMaximumUnits`. Como `reserve` usa esse campo, uma atribuição de `NaN` também inutiliza a comparação com o limite.
- **Elementos e evidências:** `maximumUnits` é público (linha 23); `setMaximumUnits` valida inteiros positivos (linhas 25–27); `reserve` compara a quantidade ao campo (linha 32).
- **Critério mínimo de detecção:** Será verificado se a resposta relaciona a escrita direta em `maximumUnits` à possibilidade de contornar o setter validado e comprometer a regra de limite de reserva.
- **Variações de nome:**
  - Regra de limite de reserva exposta.
  - Configuração de quantidade alterável sem validação.
  - Limite público que contorna a operação do domínio.
- **Formulações equivalentes aceitas:** Encapsulamento frágil da política de quantidade ou estado de domínio alterável sem preservar sua validade.
- **Afirmações insuficientes:** “O limite de 100 é arbitrário”; dizer apenas que falta validação em `reserve`; criticar somente o estoque.
- **Distinção e contagem:** Este item trata da validade da política de limite. Estoque exposto e objeto de alocação vazado são mecanismos distintos. Citar encapsulamento de modo genérico não gera os três acertos.

