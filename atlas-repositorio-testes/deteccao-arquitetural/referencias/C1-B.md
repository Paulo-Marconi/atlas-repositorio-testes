# Referência de avaliação da detecção — C1-B

- **Arquivo analisado:** [C1-B.ts](../codigos/C1-B.ts).
- **Cenário de origem:** 1 — Responsabilidades excessivas e baixa coesão.
- **Problemas esperados:** 2.
- **Fonte do mecanismo principal:** [Divergent Change](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/divergent-change.md). Os mecanismos adicionais são construções da adaptação dentro do mesmo cenário, documentadas por inspeção do código; não são atribuídos automaticamente ao exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [Referência de avaliação da detecção](README.md).

A correspondência será verificada na resposta completa. O reconhecimento da tensão ou do risco com evidência concreta poderá contar como detecção, mesmo quando o modelo considera o desenho aceitável ou recomenda adiar uma refatoração. Não será exigido nome exato do smell nem reprodução de uma resposta ideal.

## Problemas esperados

### C1-B-01 — Concentração de políticas de admissão, armazenamento e apresentação

- **Tipo:** Responsabilidades e coesão.
- **Decisão ou fragilidade observável:** `AdmissionOffice` define aprovação e bolsa, guarda matrículas, compõe notificações e apresenta carteirinhas. Essas políticas têm motivos distintos de mudança.
- **Elementos e evidências:** `qualifies` e `scholarshipPercent` definem políticas (linhas 8–16); `save` persiste (linhas 16–17); `sendConfirmation` e `renderStudentCard` definem conteúdo (linhas 25–39).
- **Critério mínimo de detecção:** Será verificado se a resposta localiza em `AdmissionOffice` pelo menos duas dessas responsabilidades e reconhece concentração, baixa coesão ou diferentes motivos de mudança.
- **Variações de nome:**
  - Acúmulo de responsabilidades na secretaria de admissão.
  - Mistura de regras de matrícula e apresentação.
  - Baixa coesão em `AdmissionOffice`.
- **Formulações equivalentes aceitas:** SRP, Divergent Change, concentração de políticas ou baixa coesão.
- **Afirmações insuficientes:** “Tem muitas funções”; “deveria usar camadas”; descrever o fluxo sem reconhecer a tensão.
- **Distinção e contagem:** As políticas reunidas em `AdmissionOffice` contam como um item. `enroll` coordenar o fluxo não cria outro problema.

### C1-B-02 — Regras financeiras e controle de acesso reunidos em StudentAccount

- **Tipo:** Responsabilidades e coesão.
- **Decisão ou fragilidade observável:** `StudentAccount` mantém cobrança/pagamento de mensalidades e autenticação/bloqueio de acesso. São responsabilidades financeiras e de acesso com estado, regras e motivos de mudança independentes.
- **Elementos e evidências:** `chargeTuition` e `pay` alteram a dívida (linhas 58–75); `signIn` controla tentativas/bloqueio e `changeAccessKey` altera a credencial (linhas 75–88).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica a mistura de cobrança/pagamento e controle de acesso em `StudentAccount`, relacionando-a à baixa coesão ou a motivos distintos de mudança.
- **Variações de nome:**
  - Mistura de cobrança e autenticação na conta do aluno.
  - Responsabilidades financeiras e de acesso acumuladas.
  - Baixa coesão em `StudentAccount`.
- **Formulações equivalentes aceitas:** SRP, Divergent Change ou união de políticas de finanças e autenticação.
- **Afirmações insuficientes:** “Autenticação poderia ser melhor”; discutir criptografia sem relacionar as duas responsabilidades; crítica apenas a `AdmissionOffice`.
- **Distinção e contagem:** Uma identificação da concentração em `AdmissionOffice` não demonstra automaticamente este item. Regras de cobrança e tentativas de acesso são evidências de um único problema em `StudentAccount`.

