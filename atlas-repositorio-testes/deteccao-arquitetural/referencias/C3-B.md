# Referência de avaliação da detecção — C3-B

- **Arquivo analisado:** [C3-B.ts](../codigos/C3-B.ts).
- **Cenário:** Encapsulamento inadequado de regras e estado do domínio.
- **Problemas esperados:** 3.
- **Mecanismos do Code Smells Catalog:** [Indecent Exposure][S10] — exposição da representação interna, aplicada ao estoque e às referências de reserva e configuração (01 a 03).
- **Fundamentos complementares:** [Cópia defensiva de referências mutáveis (SEI CERT OBJ06-J)][S16] — isolamento de componentes internos e coleções mutáveis recebidas (02 e 03).
- **Adaptação do cenário:** O retorno de Allocation (02) e a cópia superficial que mantém o Map compartilhado (03) são adaptações verificadas em TypeScript. A orientação SEI CERT é para Java e fornece apoio conceitual, sem atribuir esses casos ao exemplo do catálogo.
- **Regras comuns, categorias e inventário:** [referência de avaliação da detecção](README.md), [inventário](../inventario.json) e [detalhamento das fontes](../selecao-fontes.md).

## Problemas esperados

### C3-B-01 — Coleção interna publicamente alterável

**Variações de título (exemplos):**

- “Map de estoque exposto em Warehouse.stock”
- “Estoque alterável sem passar por receive e take”
- “readonly não protege o conteúdo do estoque público”
- “Encapsulamento insuficiente da coleção de estoque”

**Como confirmar a detecção:**

- **Tipo:** Encapsulamento de regras e estado.
- **Fundamentação:** [Indecent Exposure][S10].
- **Decisão ou fragilidade observável:** Warehouse.stock é um Map publicamente acessível. readonly impede substituir a referência, mas set, delete e clear permitem mudar o estoque fora de receive e take.
- **Elementos e evidências:** Coleção pública e operações do armazém: [linhas 5–20](../codigos/C3-B.ts#L5-L20).
- **Critério mínimo de detecção:** localizar a coleção exposta e reconhecer a possibilidade de alterar o estoque sem as operações da classe.
- **Formulações equivalentes aceitas:** estado público mutável, coleção exposta, encapsulamento frágil ou invariantes do estoque contornáveis.
- **Afirmações insuficientes:** Citar public, readonly ou mutabilidade sem localizar a fronteira que permite alterar o estado fora das operações previstas.
- **Distinção e contagem:** proteger o estoque do armazém não altera o objeto devolvido pelo livro de reservas nem a configuração recebida por ele. As diferentes operações sobre o Map contam como um item.

### C3-B-02 — Referência mutável devolvida

**Variações de título (exemplos):**

- “ReservationBook.find expõe a alocação interna”
- “Reserva alterável por meio do objeto retornado”
- “Vazamento de estado na consulta de reservas”
- “Retorno da própria Allocation permite mutação externa”

**Como confirmar a detecção:**

- **Tipo:** Encapsulamento de regras e estado.
- **Fundamentação:** [Indecent Exposure][S10], [Cópia defensiva de referências mutáveis (SEI CERT OBJ06-J)][S16].
- **Decisão ou fragilidade observável:** ReservationBook.find devolve a mesma Allocation mantida no livro. Alterações do consumidor em seus dados são utilizadas posteriormente por release.
- **Elementos e evidências:** Retorno e uso da alocação: [linhas 48–56](../codigos/C3-B.ts#L48-L56).
- **Critério mínimo de detecção:** reconhecer que o objeto retornado permite modificar externamente o estado da reserva, com localização da consulta ou da alocação.
- **Formulações equivalentes aceitas:** vazamento de estado, objeto interno exposto, retorno mutável ou reserva alterável sem operação de domínio.
- **Afirmações insuficientes:** Citar public, readonly ou mutabilidade sem localizar a fronteira que permite alterar o estado fora das operações previstas.
- **Distinção e contagem:** devolver valores de leitura independentes deixa o Map público do armazém e a referência de entrada do livro presentes. Os campos da mesma alocação compõem um único item. Preservar a referência ao colaborador Stock, se necessária, não equivale a permitir trocar os dados da alocação.

### C3-B-03 — Estrutura recebida compartilhada por cópia superficial

**Variações de título (exemplos):**

- “Cópia superficial mantém o Map de limites compartilhado”
- “maximumUnitsBySku alterável pela configuração de entrada”
- “Configuração de ReservationBook sem isolamento da coleção recebida”
- “Alteração externa dos limites contorna setMaximumUnits”

**Como confirmar a detecção:**

- **Tipo:** Encapsulamento de regras e estado.
- **Fundamentação:** [Indecent Exposure][S10], [Cópia defensiva de referências mutáveis (SEI CERT OBJ06-J)][S16].
- **Decisão ou fragilidade observável:** ReservationBook valida a configuração recebida e copia somente o objeto externo. O Map maximumUnitsBySku permanece compartilhado com o chamador, que pode alterar os limites usados por reserve sem passar por setMaximumUnits.
- **Elementos e evidências:** Validação e cópia superficial da entrada: [linhas 26–31](../codigos/C3-B.ts#L26-L31); Operação validada e uso dos limites: [linhas 33–46](../codigos/C3-B.ts#L33-L46).
- **Critério mínimo de detecção:** identificar que a cópia superficial ou retenção da coleção permite alterar a configuração usada internamente sem passar pela validação do livro.
- **Formulações equivalentes aceitas:** alias mutável de entrada, cópia superficial insuficiente, configuração compartilhada ou encapsulamento incompleto da coleção recebida.
- **Afirmações insuficientes:** Citar public, readonly ou mutabilidade sem localizar a fronteira que permite alterar o estado fora das operações previstas.
- **Distinção e contagem:** copiar o Map com valores numéricos ao receber a configuração não corrige o estoque exposto nem o retorno de find. Não exigir usar o termo “cópia profunda”; reconhecer o compartilhamento relevante basta.

## Fontes

Os conceitos e as adaptações estão detalhados na [seleção das fontes](../selecao-fontes.md).

[S10]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/indecent-exposure.md
[S16]: https://cmu-sei.github.io/secure-coding-standards/sei-cert-oracle-coding-standard-for-java/rules/object-orientation-obj/obj06-j/
