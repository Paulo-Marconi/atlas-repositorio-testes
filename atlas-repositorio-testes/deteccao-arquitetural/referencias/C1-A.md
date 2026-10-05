# Referência de avaliação da detecção — C1-A

- **Arquivo analisado:** [C1-A.ts](../codigos/C1-A.ts).
- **Cenário de origem:** 1 — Responsabilidades excessivas e baixa coesão.
- **Problemas esperados:** 3.
- **Fonte do mecanismo principal:** [Divergent Change](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/divergent-change.md). Os mecanismos adicionais são construções da adaptação dentro do mesmo cenário, documentadas por inspeção do código; não são atribuídos automaticamente ao exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [Referência de avaliação da detecção](README.md).

A correspondência será verificada na resposta completa. O reconhecimento da tensão ou do risco com evidência concreta poderá contar como detecção, mesmo quando o modelo considera o desenho aceitável ou recomenda adiar uma refatoração. Não será exigido nome exato do smell nem reprodução de uma resposta ideal.

## Problemas esperados

### C1-A-01 — Concentração de responsabilidades em SalesReport

- **Tipo:** Responsabilidades e coesão.
- **Decisão ou fragilidade observável:** `SalesReport` reúne persistência e formato JSON, cálculo de vendas e apresentação textual. Mudanças no armazenamento, na regra de cálculo e no relatório atingem a mesma classe.
- **Elementos e evidências:** `load` e `append` interpretam e armazenam documentos (linhas 14–29); `calculate` e `render` definem cálculo e apresentação (linhas 29–38).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica pelo menos duas dessas responsabilidades em `SalesReport` e reconhece motivos distintos de mudança, baixa coesão ou dificuldade de isolamento.
- **Variações de nome:**
  - Acúmulo de responsabilidades em `SalesReport`.
  - Baixa coesão do relatório de vendas.
  - Mistura de persistência, cálculo e apresentação.
- **Formulações equivalentes aceitas:** Responsabilidade única (SRP), Divergent Change ou baixa coesão, com identificação das políticas reunidas.
- **Afirmações insuficientes:** “A classe tem muitos métodos”; “use SOLID”; descrever que a classe gera relatórios.
- **Distinção e contagem:** Armazenamento, cálculo e apresentação integram um único problema nesta classe. Não serão contabilizados como três acertos. Os outros itens exigem localizar mecanismos nas respectivas classes.

### C1-A-02 — Mistura de composição de mensagens e gestão da fila em ReportMailer

- **Tipo:** Responsabilidades e coesão.
- **Decisão ou fragilidade observável:** `ReportMailer` define a política de destinatários e o conteúdo da mensagem/anexo, além de armazenar e consultar mensagens pendentes. A apresentação comercial e a gestão da fila possuem motivos distintos de mudança.
- **Elementos e evidências:** `schedule` valida destinatários, fixa assunto e anexo e insere na fila (linhas 46–53); `retryFor` consulta as mensagens pendentes (linhas 53–54).
- **Critério mínimo de detecção:** Será verificado se a resposta relaciona `ReportMailer` à composição/política da mensagem e à gestão da fila, reconhecendo a mistura de responsabilidades ou os motivos distintos de mudança.
- **Variações de nome:**
  - Responsabilidades acumuladas no envio de relatórios.
  - Composição e enfileiramento de mensagens na mesma classe.
  - Baixa coesão entre conteúdo comercial e fila de envio.
- **Formulações equivalentes aceitas:** SRP, mistura de apresentação e armazenamento ou Divergent Change aplicado a `ReportMailer`.
- **Afirmações insuficientes:** “Existe uma fila”; “o assunto é fixo”; apenas descrever o envio sem reconhecer a concentração.
- **Distinção e contagem:** Os três aspectos de `schedule` formam um único item. Uma crítica apenas a `SalesReport` não será estendida automaticamente a `ReportMailer`.

### C1-A-03 — Políticas de acesso e retenção reunidas em ReportAdministration

- **Tipo:** Responsabilidades e coesão.
- **Decisão ou fragilidade observável:** `ReportAdministration` concentra concessão/consulta de acesso e exclusão de documentos por retenção. Alterar as regras de autorização e o ciclo de vida dos documentos exige modificar a mesma unidade.
- **Elementos e evidências:** `grantReader` e `canRead` gerenciam acesso (linhas 61–71); `purgeExcept` aplica retenção e remove documentos (linhas 71–80).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica em `ReportAdministration` a união das políticas de acesso e retenção e reconhece sua baixa coesão ou seus motivos distintos de mudança.
- **Variações de nome:**
  - Baixa coesão da administração de relatórios.
  - Mistura de autorização e retenção de documentos.
  - Responsabilidades de acesso e ciclo de vida concentradas.
- **Formulações equivalentes aceitas:** SRP, Divergent Change ou concentração de políticas independentes.
- **Afirmações insuficientes:** “A classe administra relatórios”; “há dois mapas”; apontar falta de segurança sem requisito verificável.
- **Distinção e contagem:** Remover permissões junto com o documento mantém a limpeza consistente e não constitui outro item. A concentração de políticas nesta classe será distinguida dos itens de `SalesReport` e `ReportMailer`.

