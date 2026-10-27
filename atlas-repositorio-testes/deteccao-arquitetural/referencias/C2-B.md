# Referência de avaliação da detecção — C2-B

- **Arquivo analisado:** [C2-B.ts](../codigos/C2-B.ts).
- **Cenário:** Acoplamento a implementações concretas.
- **Problemas esperados:** 3.
- **Mecanismos do Code Smells Catalog:** [Base Class depends on Subclass][S9] — Delivery conhece os tipos concretos dos próprios derivados (01).
- **Fundamentos complementares:** [DIP (Martin)][S3] — dependência de implementações fixas de impressão e despacho (02 e 03).
- **Adaptação do cenário:** A impressora criada pelo serviço (02) e o serviço criado pelo lote (03) foram acrescentados e documentados por inspeção do código, com apoio em DIP; não são atribuídos ao exemplo do catálogo.
- **Regras comuns, categorias e inventário:** [referência de avaliação da detecção](README.md), [inventário](../inventario.json) e [detalhamento das fontes](../selecao-fontes.md).

## Problemas esperados

### C2-B-01 — Base dependente de derivados

**Variações de título (exemplos):**

- “Classe base Delivery acoplada às subclasses”
- “Seleção de derivados por instanceof na classe base”
- “Novo tipo de entrega exige alterar Delivery”
- “Despacho por tipos concretos em vez de polimorfismo nas entregas”

**Como confirmar a detecção:**

- **Tipo:** Acoplamento a implementações concretas.
- **Fundamentação:** [Base Class depends on Subclass][S9].
- **Decisão ou fragilidade observável:** Delivery.dispatchLabel inspeciona seus derivados concretos com instanceof e acessa dados específicos de cada tipo. Um novo derivado não é atendido sem alterar essa decisão na base.
- **Elementos e evidências:** Base e referências aos derivados: [linhas 1–12](../codigos/C2-B.ts#L1-L12).
- **Critério mínimo de detecção:** identificar a dependência da base em tipos derivados concretos, com reconhecimento da inversão da direção de conhecimento ou da necessidade de alterar a base ao acrescentar um derivado.
- **Formulações equivalentes aceitas:** base acoplada a subclasses, ausência de polimorfismo, Base Class depends on Subclass ou custo de extensão da base.
- **Afirmações insuficientes:** Mencionar new, static, instanceof ou ausência de interface sem localizar o vínculo e sua restrição de substituição.
- **Distinção e contagem:** deslocar o comportamento para os derivados não substitui a impressora do serviço nem o serviço escolhido pelo lote. Ausência de polimorfismo e custo de extensão são um item.

### C2-B-02 — Construção interna de colaborador

**Variações de título (exemplos):**

- “DispatchService cria a própria impressora”
- “Serviço de despacho acoplado a ThermalPrinter”
- “Tecnologia de impressão ESC/POS fixada no serviço”
- “Dificuldade de substituir a impressora de DispatchService”

**Como confirmar a detecção:**

- **Tipo:** Acoplamento a implementações concretas.
- **Fundamentação:** [DIP (Martin)][S3].
- **Decisão ou fragilidade observável:** DispatchService constrói ThermalPrinter e chama printEscPos. O consumidor fica vinculado à implementação e à API específica de impressão.
- **Elementos e evidências:** Implementação e API de impressão: [linhas 39–43](../codigos/C2-B.ts#L39-L43); Escolha da impressora no serviço: [linhas 45–51](../codigos/C2-B.ts#L45-L51).
- **Critério mínimo de detecção:** identificar a escolha fixa da impressora/API pelo consumidor e a dificuldade de substituí-la ou isolá-la.
- **Formulações equivalentes aceitas:** acoplamento concreto à impressão, DIP, construção interna ou tecnologia de impressão fixa.
- **Afirmações insuficientes:** Mencionar new, static, instanceof ou ausência de interface sem localizar o vínculo e sua restrição de substituição.
- **Distinção e contagem:** receber um contrato de impressão não altera a dependência da base nos derivados nem oferece substituição do serviço no lote. Construção e chamada específica contam juntas.

### C2-B-03 — Construção interna do serviço de aplicação

**Variações de título (exemplos):**

- “DispatchBatch cria o próprio DispatchService”
- “Lote acoplado à implementação do serviço de despacho”
- “Serviço de despacho fixado dentro de printAll”
- “Ausência de substituição do despachante em DispatchBatch”

**Como confirmar a detecção:**

- **Tipo:** Acoplamento a implementações concretas.
- **Fundamentação:** [DIP (Martin)][S3].
- **Decisão ou fragilidade observável:** DispatchBatch.printAll constrói DispatchService dentro do lote. O chamador não pode fornecer outra implementação de despacho para esse processamento.
- **Elementos e evidências:** Serviço escolhido no lote: [linhas 53–58](../codigos/C2-B.ts#L53-L58).
- **Critério mínimo de detecção:** reconhecer a fronteira lote–serviço como uma escolha concreta que impede ao chamador substituir ou isolar o despacho.
- **Formulações equivalentes aceitas:** lote acoplado ao serviço, colaborador criado internamente, dependência concreta ou DIP.
- **Afirmações insuficientes:** Mencionar new, static, instanceof ou ausência de interface sem localizar o vínculo e sua restrição de substituição.
- **Distinção e contagem:** injetar um despachante no lote mantém a impressora fixa dentro da implementação existente; injetar apenas a impressora no serviço mantém a construção do serviço pelo lote. Exigir localização dessas fronteiras para dois acertos.

## Fontes

Os conceitos e as adaptações estão detalhados na [seleção das fontes](../selecao-fontes.md).

[S3]: https://www.cs.utexas.edu/~downing/papers/DIP-1996.pdf
[S9]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/base-class-depends-on-subclass.md
