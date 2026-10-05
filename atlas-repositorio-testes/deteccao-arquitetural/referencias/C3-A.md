# Referência de avaliação da detecção — C3-A

- **Arquivo analisado:** [C3-A.ts](../codigos/C3-A.ts).
- **Cenário de origem:** 3 — Encapsulamento inadequado de regras e estado do domínio.
- **Problemas esperados:** 3.
- **Fonte do mecanismo principal:** [Indecent Exposure](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/indecent-exposure.md). Os mecanismos adicionais são construções da adaptação dentro do mesmo cenário, documentadas por inspeção do código; não são atribuídos automaticamente ao exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [Referência de avaliação da detecção](README.md).

A correspondência será verificada na resposta completa. O reconhecimento da tensão ou do risco com evidência concreta poderá contar como detecção, mesmo quando o modelo considera o desenho aceitável ou recomenda adiar uma refatoração. Não será exigido nome exato do smell nem reprodução de uma resposta ideal.

## Problemas esperados

### C3-A-01 — Saldo público permite contornar as regras da carteira

- **Tipo:** Encapsulamento de regras e estado.
- **Decisão ou fragilidade observável:** `balanceCents` pode ser alterado diretamente, sem as regras de `deposit`/`withdraw`. `applyAdjustment` utiliza esse caminho, permitindo saldo inválido e movimentação sem registro.
- **Elementos e evidências:** `balanceCents` é público no construtor (linha 8); os métodos de movimentação validam e registram (linhas 12–27); `applyAdjustment` altera o saldo diretamente (linhas 44–45).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica a escrita externa em `balanceCents` ou `applyAdjustment` como um caminho que contorna as regras de movimentação e pode violar a consistência da carteira.
- **Variações de nome:**
  - Exposição do saldo da carteira.
  - Movimentação financeira fora das operações de domínio.
  - Invariantes de saldo contornáveis.
- **Formulações equivalentes aceitas:** Indecent Exposure, encapsulamento frágil, domínio anêmico neste mecanismo ou regras do especialista contornadas.
- **Afirmações insuficientes:** “O saldo é público” sem reconhecer risco ou regra contornada; pedir validação sem localizar o caminho externo.
- **Distinção e contagem:** Saldo negativo, falta de validação e ausência de registro causada pela escrita direta são consequências deste item. A alteração da coleção retornada por `history` exige evidência própria para C3-A-02.

### C3-A-02 — Histórico devolvido como coleção interna mutável

- **Tipo:** Encapsulamento de regras e estado.
- **Decisão ou fragilidade observável:** `history` retorna o próprio array privado de movimentações. O consumidor pode excluir/inserir lançamentos ou alterar seus valores sem passar pelas operações da carteira.
- **Elementos e evidências:** `entries` é privado, mas `history` devolve sua referência (linha 4; linha 27). Os registros são criados por `deposit` e `withdraw` (linhas 12–27).
- **Critério mínimo de detecção:** Será verificado se a resposta relaciona o retorno de `history` ao array interno mutável e reconhece que alterações externas podem corromper o histórico, mesmo com o campo privado.
- **Variações de nome:**
  - Vazamento da coleção de movimentações.
  - Histórico financeiro modificável pelo consumidor.
  - Exposição indireta do estado interno da carteira.
- **Formulações equivalentes aceitas:** Quebra de encapsulamento pelo retorno, referência mutável exposta ou falta de cópia/snapshot do histórico.
- **Afirmações insuficientes:** “Arrays são ruins”; afirmar que `entries` é um campo público; criticar apenas o saldo.
- **Distinção e contagem:** Array e objetos nele contidos integram o mesmo mecanismo de vazamento. Uma crítica genérica a campos públicos não demonstra este retorno mutável.

### C3-A-03 — Bloqueio de gastos público permite ignorar a resolução da retenção

- **Tipo:** Encapsulamento de regras e estado.
- **Decisão ou fragilidade observável:** `spendingBlocked` é público e pode ser desativado sem `releaseSpending`, que exige resolução e limpa `holdReason`. Isso permite saque com uma retenção ainda registrada.
- **Elementos e evidências:** `withdraw` verifica `spendingBlocked` (linha 19); `blockSpending` e `releaseSpending` coordenam indicador e motivo (linhas 29–41); o indicador é público (linha 6).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica a alteração direta de `spendingBlocked` como um caminho que contorna a liberação da retenção ou deixa indicador e motivo inconsistentes.
- **Variações de nome:**
  - Retenção financeira contornável por campo público.
  - Bloqueio da carteira sem proteção de domínio.
  - Estado de bloqueio exposto a alteração externa.
- **Formulações equivalentes aceitas:** Encapsulamento inadequado do bloqueio, transição de estado sem a operação de domínio ou invariantes de retenção expostas.
- **Afirmações insuficientes:** “Falta autenticação”; criticar apenas `balanceCents`; mencionar um booleano público sem explicar a regra contornada.
- **Distinção e contagem:** Este item protege a regra de retenção, independentemente de o saldo ser válido e o histórico estar intacto. Será exigida evidência específica do bloqueio para um acerto separado.

