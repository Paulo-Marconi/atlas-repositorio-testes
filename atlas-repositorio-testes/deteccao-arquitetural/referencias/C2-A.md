# Referência de avaliação da detecção — C2-A

- **Arquivo analisado:** [C2-A.ts](../codigos/C2-A.ts).
- **Cenário:** Acoplamento a implementações concretas.
- **Problemas esperados:** 3.
- **Mecanismos do Code Smells Catalog:** [Inappropriate Static][S8] — consulta estática fixa entre PayrollService e WorkLedger (01).
- **Fundamentos complementares:** [DIP (Martin)][S3] — dependência de detalhes concretos de consulta, emissão e armazenamento (01 a 03).
- **Adaptação do cenário:** A construção de PayrollService no lote (02) e o vínculo à API CSV (03) foram acrescentados e documentados por inspeção do código, com apoio em DIP; não são atribuídos ao exemplo do catálogo.
- **Regras comuns, categorias e inventário:** [referência de avaliação da detecção](README.md), [inventário](../inventario.json) e [detalhamento das fontes](../selecao-fontes.md).

## Problemas esperados

### C2-A-01 — Dependência estática fixa

**Variações de título (exemplos):**

- “Acoplamento estático de PayrollService a WorkLedger”
- “Consulta de minutos vinculada a uma implementação fixa”
- “Dificuldade de substituir a consulta WorkLedger.minutesFor”
- “Dependência concreta da consulta estática no cálculo da folha”

**Como confirmar a detecção:**

- **Tipo:** Acoplamento a implementações concretas.
- **Fundamentação:** [DIP (Martin)][S3], [Inappropriate Static][S8].
- **Decisão ou fragilidade observável:** PayrollService recebe WorkLedger e consulta diretamente WorkLedger.minutesFor. A operação estática específica acessa os registros privados da implementação, fixando a fonte de consulta do consumidor.
- **Elementos e evidências:** Consulta estática e registros por instância: [linhas 10–25](../codigos/C2-A.ts#L10-L25); Consumidor da consulta: [linhas 27–38](../codigos/C2-A.ts#L27-L38).
- **Critério mínimo de detecção:** localizar a ligação fixa entre consumidor e consulta estática e reconhecer dificuldade de substituição ou isolamento.
- **Formulações equivalentes aceitas:** acoplamento estático, DIP, Static Cling, Inappropriate Static ou dependência concreta da consulta.
- **Afirmações insuficientes:** Mencionar new, static, instanceof ou ausência de interface sem localizar o vínculo e sua restrição de substituição.
- **Distinção e contagem:** passar um contrato de consulta ao serviço não altera a criação interna do lote nem a API concreta de armazenamento. A mera existência de static não basta.

### C2-A-02 — Construção interna de colaborador

**Variações de título (exemplos):**

- “PayrollBatch cria o próprio PayrollService”
- “Lote acoplado à implementação de emissão da folha”
- “Serviço de folha fixado dentro do processamento em lote”
- “Ausência de substituição do emissor em PayrollBatch”

**Como confirmar a detecção:**

- **Tipo:** Acoplamento a implementações concretas.
- **Fundamentação:** [DIP (Martin)][S3].
- **Decisão ou fragilidade observável:** PayrollBatch.process escolhe e constrói PayrollService dentro do processamento. O chamador do lote não fornece um emissor ou uma fábrica substituível.
- **Elementos e evidências:** Construção do serviço no lote: [linhas 40–47](../codigos/C2-A.ts#L40-L47).
- **Critério mínimo de detecção:** relacionar essa construção à fixação da implementação de emissão no lote e à dificuldade de trocá-la ou isolá-la.
- **Formulações equivalentes aceitas:** dependência concreta, construção interna, acoplamento do lote ou falta de substituição do colaborador.
- **Afirmações insuficientes:** Mencionar new, static, instanceof ou ausência de interface sem localizar o vínculo e sua restrição de substituição.
- **Distinção e contagem:** permitir receber o emissor no lote não reorganiza as dependências internas desse emissor. Não contar a instanciação e a chamada seguinte como dois itens.

### C2-A-03 — Dependência de API concreta de armazenamento

**Variações de título (exemplos):**

- “PayrollService acoplado à persistência em CSV”
- “Regra de emissão conhece o formato e a API do arquivo”
- “Infraestrutura de armazenamento não isolada do serviço de folha”
- “Dependência direta de CsvPayslipArchive.appendCsvRow”

**Como confirmar a detecção:**

- **Tipo:** Acoplamento a implementações concretas.
- **Fundamentação:** [DIP (Martin)][S3].
- **Decisão ou fragilidade observável:** PayrollService prepara a representação CSV e chama CsvPayslipArchive.appendCsvRow. A política de emissão conhece o formato e a API técnica de persistência, em vez de um contrato de gravação orientado ao domínio.
- **Elementos e evidências:** API do arquivo CSV: [linhas 3–8](../codigos/C2-A.ts#L3-L8); Representação e chamada no emissor: [linhas 27–38](../codigos/C2-A.ts#L27-L38).
- **Critério mínimo de detecção:** reconhecer que o consumidor depende do detalhe concreto de persistência e precisa mudar para adotar uma alternativa com outro contrato de armazenamento.
- **Formulações equivalentes aceitas:** dependência de infraestrutura, acoplamento ao formato/API concreta, DIP ou persistência não isolada.
- **Afirmações insuficientes:** Mencionar new, static, instanceof ou ausência de interface sem localizar o vínculo e sua restrição de substituição.
- **Distinção e contagem:** introduzir um contrato de armazenamento orientado ao domínio deixa a consulta estática e a construção no lote presentes. Tipar uma classe concreta, por si só, não é evidência suficiente em TypeScript; mostrar a ligação ao contrato técnico. Serialização e API específica integram um item.

## Fontes

Os conceitos e as adaptações estão detalhados na [seleção das fontes](../selecao-fontes.md).

[S3]: https://www.cs.utexas.edu/~downing/papers/DIP-1996.pdf
[S8]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/inappropriate-static.md
