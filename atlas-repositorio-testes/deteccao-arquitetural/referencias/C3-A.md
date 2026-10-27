# Referência de avaliação da detecção — C3-A

- **Arquivo analisado:** [C3-A.ts](../codigos/C3-A.ts).
- **Cenário:** Encapsulamento inadequado de regras e estado do domínio.
- **Problemas esperados:** 3.
- **Mecanismos do Code Smells Catalog:** [Indecent Exposure][S10] — exposição da representação interna, aplicada à escrita direta e às referências compartilhadas (01 a 03).
- **Fundamentos complementares:** [Cópia defensiva de referências mutáveis (SEI CERT OBJ06-J)][S16] — isolamento de componentes internos e entradas mutáveis para preservar estado e validações (02 e 03).
- **Adaptação do cenário:** O histórico devolvido (02) e a política recebida por referência (03) são adaptações verificadas em TypeScript. A orientação SEI CERT é para Java e fornece apoio conceitual, sem atribuir esses casos ao exemplo do catálogo.
- **Regras comuns, categorias e inventário:** [referência de avaliação da detecção](README.md), [inventário](../inventario.json) e [detalhamento das fontes](../selecao-fontes.md).

## Problemas esperados

### C3-A-01 — Escrita externa em estado interno

**Variações de título (exemplos):**

- “Saldo e bloqueio de Wallet expostos para escrita direta”
- “Estado público mutável na carteira”
- “Operações da carteira contornadas por alteração dos campos”
- “Encapsulamento insuficiente de balanceCents e spendingBlocked”

**Como confirmar a detecção:**

- **Tipo:** Encapsulamento de regras e estado.
- **Fundamentação:** [Indecent Exposure][S10].
- **Decisão ou fragilidade observável:** Wallet expõe balanceCents e spendingBlocked para escrita direta, embora suas operações coordenem validações, movimentações e retenção. applyAdjustment utiliza um desses caminhos externos.
- **Elementos e evidências:** Campos públicos e construção: [linhas 4–15](../codigos/C3-A.ts#L4-L15); Operações e bloqueio: [linhas 23–31](../codigos/C3-A.ts#L23-L31); Escrita externa: [linhas 50–52](../codigos/C3-A.ts#L50-L52).
- **Critério mínimo de detecção:** localizar um desses caminhos de escrita e reconhecer que expõe estado ou contorna as operações responsáveis por mantê-lo consistente. Não exigir enumerar ambos os campos ou todas as consequências.
- **Formulações equivalentes aceitas:** estado público mutável, encapsulamento inadequado, invariantes contornáveis ou Indecent Exposure.
- **Afirmações insuficientes:** Citar public, readonly ou mutabilidade sem localizar a fronteira que permite alterar o estado fora das operações previstas.
- **Distinção e contagem:** encapsular os campos não elimina a referência devolvida nem a política mutável retida. Saldo e bloqueio pertencem ao mesmo item de exposição direta.

### C3-A-02 — Referência mutável devolvida

**Variações de título (exemplos):**

- “Histórico interno exposto por Wallet.history”
- “Vazamento da coleção de movimentações pelo retorno”
- “Consumidor pode modificar o histórico devolvido”
- “Retorno de referência mutável ao estado da carteira”

**Como confirmar a detecção:**

- **Tipo:** Encapsulamento de regras e estado.
- **Fundamentação:** [Indecent Exposure][S10], [Cópia defensiva de referências mutáveis (SEI CERT OBJ06-J)][S16].
- **Decisão ou fragilidade observável:** Wallet.history devolve o próprio array privado de movimentações. Seu consumidor pode alterar a coleção ou seus elementos sem passar pelas operações da carteira.
- **Elementos e evidências:** Coleção privada: [linhas 5–5](../codigos/C3-A.ts#L5-L5); Retorno da referência interna: [linhas 33–33](../codigos/C3-A.ts#L33-L33).
- **Critério mínimo de detecção:** identificar o retorno como uma referência ao estado interno e reconhecer a possibilidade de alteração externa. Não exigir um exemplo específico de lançamento corrompido.
- **Formulações equivalentes aceitas:** vazamento de referência, coleção interna exposta, encapsulamento inadequado no retorno ou histórico modificável externamente.
- **Afirmações insuficientes:** Citar public, readonly ou mutabilidade sem localizar a fronteira que permite alterar o estado fora das operações previstas.
- **Distinção e contagem:** devolver uma representação independente, incluindo os elementos necessários, deixa a escrita nos campos e a referência de entrada intactas. Coleção e elementos desse retorno não geram acertos separados.

### C3-A-03 — Entrada mutável retida por referência

**Variações de título (exemplos):**

- “WalletPolicy compartilhada com o chamador após a construção”
- “Limite da carteira alterável pela referência de entrada”
- “Configuração recebida sem isolamento em Wallet”
- “Campo privado readonly retém uma política externamente mutável”

**Como confirmar a detecção:**

- **Tipo:** Encapsulamento de regras e estado.
- **Fundamentação:** [Indecent Exposure][S10], [Cópia defensiva de referências mutáveis (SEI CERT OBJ06-J)][S16].
- **Decisão ou fragilidade observável:** O construtor de Wallet valida WalletPolicy e guarda o mesmo objeto recebido. A alteração posterior pelo chamador muda o limite usado por withdraw, sem repetir a validação inicial.
- **Elementos e evidências:** Entrada retida e validada: [linhas 9–15](../codigos/C3-A.ts#L9-L15); Uso da política na retirada: [linhas 23–31](../codigos/C3-A.ts#L23-L31).
- **Critério mínimo de detecção:** relacionar o objeto recebido e retido à possibilidade de mudar o estado interno por um alias externo, apesar do campo privado.
- **Formulações equivalentes aceitas:** entrada mutável compartilhada, falta de isolamento da política, vazamento por referência recebida ou insuficiência de readonly para proteger o objeto.
- **Afirmações insuficientes:** Citar public, readonly ou mutabilidade sem localizar a fronteira que permite alterar o estado fora das operações previstas.
- **Distinção e contagem:** copiar os valores de configuração ao recebê-los deixa os campos públicos e o retorno de history inalterados. O item é a fronteira de entrada; não pontuar validação inicial e mutação posterior separadamente.

## Fontes

Os conceitos e as adaptações estão detalhados na [seleção das fontes](../selecao-fontes.md).

[S10]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/indecent-exposure.md
[S16]: https://cmu-sei.github.io/secure-coding-standards/sei-cert-oracle-coding-standard-for-java/rules/object-orientation-obj/obj06-j/
