# Referência de avaliação da detecção — C2-A

- **Arquivo analisado:** [C2-A.ts](../codigos/C2-A.ts).
- **Cenário de origem:** 2 — Acoplamento a implementações concretas.
- **Problemas esperados:** 2.
- **Fonte do mecanismo principal:** [Inappropriate Static](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/inappropriate-static.md). Os mecanismos adicionais são construções da adaptação dentro do mesmo cenário, documentadas por inspeção do código; não são atribuídos automaticamente ao exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [Referência de avaliação da detecção](README.md).

A correspondência será verificada na resposta completa. O reconhecimento da tensão ou do risco com evidência concreta poderá contar como detecção, mesmo quando o modelo considera o desenho aceitável ou recomenda adiar uma refatoração. Não será exigido nome exato do smell nem reprodução de uma resposta ideal.

## Problemas esperados

### C2-A-01 — Serviço de folha preso à consulta estática de WorkLedger

- **Tipo:** Acoplamento a implementações concretas.
- **Decisão ou fragilidade observável:** `PayrollService` recebe um `WorkLedger` concreto e resolve horas pela operação estática específica dessa classe. A consulta acessa o armazenamento privado da implementação; não há contrato de consulta substituível para outra fonte de jornada.
- **Elementos e evidências:** `WorkLedger` mantém registros por instância e sua operação estática acessa esse armazenamento (linhas 5–19); `PayrollService` recebe o tipo concreto e chama `WorkLedger.minutesFor` (linhas 23–27).
- **Critério mínimo de detecção:** Será verificado se a resposta relaciona `PayrollService` à chamada fixa de `WorkLedger.minutesFor` e reconhece dificuldade de substituir a consulta ou isolá-la em testes.
- **Variações de nome:**
  - Acoplamento estático ao livro de horas.
  - Dependência concreta da consulta de jornada.
  - Integração de horas não substituível no serviço de folha.
- **Formulações equivalentes aceitas:** DIP, baixo acoplamento ou Inappropriate Static com evidência da ligação entre serviço e consulta.
- **Afirmações insuficientes:** “Todo método estático é ruim”; alegar estado global mutável em `WorkLedger`; mera recomendação de interfaces.
- **Distinção e contagem:** `minutesFor` não possui estado compartilhado mutável. O problema é a integração fixa no consumidor. Seus efeitos sobre substituição e teste pertencem ao mesmo item.

### C2-A-02 — Lote de folha instancia diretamente PayrollService

- **Tipo:** Acoplamento a implementações concretas.
- **Decisão ou fragilidade observável:** `PayrollBatch.process` escolhe e constrói a implementação de cálculo dentro da execução. O lote não recebe um serviço ou contrato de emissão substituível.
- **Elementos e evidências:** `PayrollBatch.process` cria `new PayrollService(this.ledger, this.store)` e chama `issue` (linhas 37–39).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica a criação direta de `PayrollService` em `PayrollBatch` como uma dependência fixa que dificulta trocar ou isolar a emissão no processamento do lote.
- **Variações de nome:**
  - Serviço de folha fixado no processamento em lote.
  - Construção da dependência dentro de `PayrollBatch`.
  - Acoplamento do lote à implementação de emissão.
- **Formulações equivalentes aceitas:** DIP, dependência concreta, criação interna de colaborador ou baixo acoplamento.
- **Afirmações insuficientes:** “Há um new”; criticar apenas `WorkLedger`; afirmar que `store` não pode ser substituído.
- **Distinção e contagem:** O item é a fronteira `PayrollBatch` → `PayrollService`, enquanto C2-A-01 é `PayrollService` → `WorkLedger`. Uma crítica genérica a acoplamento não gera os dois acertos sem localizar ambas as ligações.

