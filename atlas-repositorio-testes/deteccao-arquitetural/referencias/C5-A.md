# Referência de avaliação da detecção — C5-A

- **Arquivo analisado:** [C5-A.ts](../codigos/C5-A.ts).
- **Cenário:** Estado global e baixa testabilidade.
- **Problemas esperados:** 3.
- **Mecanismos do Code Smells Catalog:** [Global Data][S13] — contexto global e cache estático compartilhados entre instâncias (01 e 02); [Hidden Dependencies][S14] — contexto e relógio resolvidos implicitamente pelo consumidor (01 e 03).
- **Fundamentos complementares:** [Isolamento e não determinismo em testes (Fowler)][S15] — isolamento de estado entre testes e controle do tempo (02 e 03).
- **Adaptação do cenário:** O cache de cotações (02) e a leitura direta de Date.now (03) foram construídos para este fluxo e verificados no código; não são atribuídos automaticamente ao exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [referência de avaliação da detecção](README.md), [inventário](../inventario.json) e [detalhamento das fontes](../selecao-fontes.md).

## Problemas esperados

### C5-A-01 — Contexto global mutável

**Variações de título (exemplos):**

- “Checkout depende de configuração global compartilhada”
- “Cliente, desconto e tributação implícitos no ambiente do módulo”
- “Instâncias de Checkout afetadas por mudanças no contexto global”
- “Dependência da ordem de configuração de checkoutContext”

**Como confirmar a detecção:**

- **Tipo:** Estado global e dependências ocultas.
- **Fundamentação:** [Global Data][S13], [Hidden Dependencies][S14].
- **Decisão ou fragilidade observável:** Checkout lê cliente, desconto e tributação de checkoutContext, um estado mutável do módulo. selectCustomer e configureTax alteram o ambiente de instâncias já criadas.
- **Elementos e evidências:** Contexto e operações de configuração: [linhas 5–20](../codigos/C5-A.ts#L5-L20); Uso do contexto na cotação: [linhas 25–32](../codigos/C5-A.ts#L25-L32).
- **Critério mínimo de detecção:** identificar o contexto global usado pelo checkout e reconhecer compartilhamento indevido, dependência oculta ou dificuldade de isolamento. Localizar uma parte relevante do contexto pode demonstrar o item.
- **Formulações equivalentes aceitas:** Global Data, contexto global compartilhado, dependência temporal ou configuração global implícita.
- **Afirmações insuficientes:** Criticar globais ou afirmar ausência de testes sem localizar a dependência, o compartilhamento ou a dificuldade de controle.
- **Distinção e contagem:** fornecer um contexto por instância não elimina o cache estático ou a leitura direta do relógio. Os campos do contexto não são itens adicionais.

### C5-A-02 — Cache estático compartilhado

**Variações de título (exemplos):**

- “Cache de cotações persiste entre instâncias de Checkout”
- “Contaminação entre operações pelo cache estático de cotações”
- “Cotação de contexto anterior reutilizada por outro checkout”
- “Estado de Checkout.quotes dificulta o isolamento entre testes”

**Como confirmar a detecção:**

- **Tipo:** Estado global e dependências ocultas.
- **Fundamentação:** [Global Data][S13], [Isolamento e não determinismo em testes (Fowler)][S15].
- **Decisão ou fragilidade observável:** Checkout.quotes pertence à classe e persiste entre instâncias. cachedQuote pode devolver uma cotação armazenada sob um contexto anterior para o mesmo identificador, mesmo após criar outro checkout.
- **Elementos e evidências:** Cache da classe: [linhas 23–23](../codigos/C5-A.ts#L23-L23); Consulta e escrita no cache: [linhas 34–42](../codigos/C5-A.ts#L34-L42).
- **Critério mínimo de detecção:** localizar o estado estático e reconhecer reutilização ou interferência entre instâncias/operações que deveriam poder ser isoladas.
- **Formulações equivalentes aceitas:** cache compartilhado, estado persistente entre testes, contaminação entre instâncias ou estado global de classe.
- **Afirmações insuficientes:** Criticar globais ou afirmar ausência de testes sem localizar a dependência, o compartilhamento ou a dificuldade de controle.
- **Distinção e contagem:** tornar o cache pertencente à instância remove esse compartilhamento e mantém contexto global e relógio implícito. A composição da chave e o resultado desatualizado sustentam a mesma ocorrência, sem criar outro item de bug funcional.

### C5-A-03 — Relógio como dependência oculta

**Variações de título (exemplos):**

- “Leitura direta de Date.now em reserveQuote”
- “Tempo não controlável no cálculo de validade da cotação”
- “Relógio implícito dificulta testes determinísticos”
- “Dependência temporal não fornecida pelo chamador de Checkout”

**Como confirmar a detecção:**

- **Tipo:** Estado global e dependências ocultas.
- **Fundamentação:** [Hidden Dependencies][S14], [Isolamento e não determinismo em testes (Fowler)][S15].
- **Decisão ou fragilidade observável:** Checkout.reserveQuote obtém Date.now diretamente para calcular expiresAtMillis. O chamador não fornece o instante ou um relógio controlável para repetir condições temporais.
- **Elementos e evidências:** Leitura do relógio na reserva: [linhas 51–54](../codigos/C5-A.ts#L51-L54).
- **Critério mínimo de detecção:** localizar a leitura e relacioná-la à dificuldade de controlar o tempo ou reproduzir condições temporais nos testes.
- **Formulações equivalentes aceitas:** relógio implícito, dependência ambiental, dificuldade de testes determinísticos ou Hidden Dependencies.
- **Afirmações insuficientes:** Criticar globais ou afirmar ausência de testes sem localizar a dependência, o compartilhamento ou a dificuldade de controle.
- **Distinção e contagem:** receber um relógio controlável não reorganiza o contexto nem o cache. Não exigir alegar falha de prazo ou que duas chamadas sempre retornam horários diferentes.

## Fontes

Os conceitos e as adaptações estão detalhados na [seleção das fontes](../selecao-fontes.md).

[S13]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/global-data.md
[S14]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/hidden-dependencies.md
[S15]: https://martinfowler.com/articles/nonDeterminism.html
