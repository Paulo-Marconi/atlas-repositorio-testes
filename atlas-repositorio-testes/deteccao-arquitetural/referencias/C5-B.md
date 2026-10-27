# Referência de avaliação da detecção — C5-B

- **Arquivo analisado:** [C5-B.ts](../codigos/C5-B.ts).
- **Cenário:** Estado global e baixa testabilidade.
- **Problemas esperados:** 3.
- **Mecanismos do Code Smells Catalog:** [Global Data][S13] — ambiente global e cache estático compartilhados entre geradores (01 e 02); [Hidden Dependencies][S14] — fonte, moeda e gerador aleatório obtidos implicitamente (01 e 03).
- **Fundamentos complementares:** [Isolamento e não determinismo em testes (Fowler)][S15] — isolamento de estado entre testes (02); discussão de não determinismo aplicada à aleatoriedade na adaptação (03).
- **Adaptação do cenário:** O cache de recibos (02) e o uso direto de Math.random (03) foram construídos para este fluxo e verificados no código; não são atribuídos automaticamente ao exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [referência de avaliação da detecção](README.md), [inventário](../inventario.json) e [detalhamento das fontes](../selecao-fontes.md).

## Problemas esperados

### C5-B-01 — Ambiente global implícito

**Variações de título (exemplos):**

- “ReceiptBuilder depende de receiptEnvironment compartilhado”
- “Fonte e moeda resolvidas por configuração global”
- “Geração de recibos depende de inicialização externa do ambiente”
- “Dependências de ReceiptBuilder ocultas na configuração do módulo”

**Como confirmar a detecção:**

- **Tipo:** Estado global e dependências ocultas.
- **Fundamentação:** [Global Data][S13], [Hidden Dependencies][S14].
- **Decisão ou fragilidade observável:** ReceiptBuilder resolve fonte e moeda por receiptEnvironment, configurado externamente e compartilhado no módulo. A operação depende dessa inicialização e da configuração corrente.
- **Elementos e evidências:** Ambiente e configuração: [linhas 5–10](../codigos/C5-B.ts#L5-L10); Resolução das dependências na geração: [linhas 15–26](../codigos/C5-B.ts#L15-L26).
- **Critério mínimo de detecção:** identificar a resolução implícita dessas dependências e reconhecer inicialização obrigatória, dependência da ordem ou dificuldade de isolamento.
- **Formulações equivalentes aceitas:** ambiente global, dependências ocultas, service locator nesse vínculo ou configuração compartilhada.
- **Afirmações insuficientes:** Criticar globais ou afirmar ausência de testes sem localizar a dependência, o compartilhamento ou a dificuldade de controle.
- **Distinção e contagem:** passar fonte/moeda por instância não elimina a persistência do cache nem a aleatoriedade da emissão. Fonte e moeda formam um item de ambiente.

### C5-B-02 — Cache estático compartilhado

**Variações de título (exemplos):**

- “Cache de recibos persiste entre instâncias de ReceiptBuilder”
- “Recibo de fonte anterior reutilizado por outro gerador”
- “Contaminação entre geradores pelo estado estático de receipts”
- “Cache global de recibos dificulta o isolamento entre testes”

**Como confirmar a detecção:**

- **Tipo:** Estado global e dependências ocultas.
- **Fundamentação:** [Global Data][S13], [Isolamento e não determinismo em testes (Fowler)][S15].
- **Decisão ou fragilidade observável:** ReceiptBuilder.receipts é estático e guarda resultados entre geradores. Para o mesmo identificador, outra instância pode reutilizar o recibo de uma fonte anterior após reconfigurar o ambiente.
- **Elementos e evidências:** Cache estático: [linhas 13–13](../codigos/C5-B.ts#L13-L13); Consulta e escrita no cache: [linhas 15–26](../codigos/C5-B.ts#L15-L26).
- **Critério mínimo de detecção:** identificar o cache compartilhado e reconhecer persistência entre instâncias/fontes ou interferência entre testes.
- **Formulações equivalentes aceitas:** estado estático, cache global, contaminação entre instâncias ou baixa testabilidade por estado persistente.
- **Afirmações insuficientes:** Criticar globais ou afirmar ausência de testes sem localizar a dependência, o compartilhamento ou a dificuldade de controle.
- **Distinção e contagem:** usar cache por instância deixa a configuração global e a fonte aleatória implícita presentes. O problema continua observável com fonte/moeda injetadas. A chave e a persistência não geram dois acertos.

### C5-B-03 — Aleatoriedade como dependência oculta

**Variações de título (exemplos):**

- “Uso direto de Math.random em ReceiptBuilder.issue”
- “Gerador aleatório não controlável pelo chamador”
- “Referência de emissão difícil de reproduzir em testes”
- “Fonte de não determinismo implícita na emissão de recibos”

**Como confirmar a detecção:**

- **Tipo:** Estado global e dependências ocultas.
- **Fundamentação:** [Hidden Dependencies][S14], [Isolamento e não determinismo em testes (Fowler)][S15].
- **Decisão ou fragilidade observável:** ReceiptBuilder.issue chama Math.random diretamente para compor a referência de emissão. O chamador não fornece o valor ou o gerador, dificultando controlar as saídas em testes.
- **Elementos e evidências:** Geração implícita do valor aleatório: [linhas 28–33](../codigos/C5-B.ts#L28-L33).
- **Critério mínimo de detecção:** localizar a obtenção implícita do valor e reconhecer dificuldade de controlar saídas ou reproduzir casos nos testes.
- **Formulações equivalentes aceitas:** aleatoriedade não controlada, dependência ambiental implícita, fonte de não determinismo ou Hidden Dependencies.
- **Afirmações insuficientes:** Criticar globais ou afirmar ausência de testes sem localizar a dependência, o compartilhamento ou a dificuldade de controle.
- **Distinção e contagem:** fornecer um gerador controlável não corrige o ambiente global nem o cache. A propriedade aleatória é esperada; o alvo é o controle da dependência. Não exigir afirmar que chamadas sempre produzem valores diferentes.

## Fontes

Os conceitos e as adaptações estão detalhados na [seleção das fontes](../selecao-fontes.md).

[S13]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/global-data.md
[S14]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/hidden-dependencies.md
[S15]: https://martinfowler.com/articles/nonDeterminism.html
