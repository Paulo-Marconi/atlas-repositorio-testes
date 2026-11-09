# Referência de avaliação da detecção — C4-A

- **Arquivo analisado:** [C4-A.ts](../codigos/C4-A.ts).
- **Cenário:** Dificuldade de extensão.
- **Problemas esperados:** 3.
- **Mecanismos do Code Smells Catalog:** [Conditional Complexity][S11] — seleções de formato e transformação que exigem modificar decisões existentes (01 e 02); [Combinatorial Explosion][S12] — operações multiplicadas pelas combinações de chave e direção de ordenação (03).
- **Fundamentos complementares:** [OCP (Martin)][S4] — custo de estender comportamentos alterando a implementação existente (01 a 03); [Protected Variations (Larman)][S5] — proteção dos pontos de variação de formato e transformação (01 e 02).
- **Adaptação do cenário:** Exportação, transformação e ordenação foram combinadas num exemplo próprio em TypeScript. Os três eixos são construções do experimento, apoiadas nos mecanismos do catálogo e nos princípios indicados.
- **Regras comuns, categorias e inventário:** [referência de avaliação da detecção](README.md), [inventário](../inventario.json) e [detalhamento das fontes](../selecao-fontes.md).

## Problemas esperados

### C4-A-01 — Seleção de comportamento repetida

**Variações de título (exemplos):**

- “Conhecimento de formatos duplicado”
- “Seleção de formato repetida em três métodos”
- “Extensão de formatos exige mudanças coordenadas em DataExporter”
- “Metadados e codificação de formatos mantidos em decisões paralelas”

**Como confirmar a detecção:**

- **Tipo:** Dificuldade de extensão.
- **Fundamentação:** [OCP (Martin)][S4], [Protected Variations (Larman)][S5], [Conditional Complexity][S11].
- **Decisão ou fragilidade observável:** DataExporter repete a escolha entre formatos em encode, contentType e extension. Acrescentar um formato exige alterar a união e as três decisões existentes.
- **Elementos e evidências:** Seleção repetida do formato: [linhas 44–73](../codigos/C4-A.ts#L44-L73).
- **Critério mínimo de detecção:** A resposta localiza a seleção por formato e reconhece que acrescentar outro formato exige alterar vários pontos existentes.
- **Formulações equivalentes aceitas:** seleção repetida, condicionais espalhados, OCP, custo de extensão ou ausência de proteção da variação.
- **Afirmações insuficientes:** A menção a um switch ou a um conjunto finito de opções é insuficiente sem o reconhecimento dos pontos que precisam mudar para ampliar o comportamento.
- **Distinção e contagem:** encapsular uma estratégia de formato deixa a seleção de transformações e a matriz de ordenação presentes. Os três despachos do mesmo formato formam um item.

### C4-A-02 — Despacho central fechado

**Variações de título (exemplos):**

- “Registro de transformações fragmentado”
- “Transformações sem ponto de extensão em RowTransform”
- “Tipo, validação e execução de transformações precisam permanecer alinhados”
- “Nova transformação exige alterar os pontos centrais de seleção”

**Como confirmar a detecção:**

- **Tipo:** Dificuldade de extensão.
- **Fundamentação:** [OCP (Martin)][S4], [Protected Variations (Larman)][S5], [Conditional Complexity][S11].
- **Decisão ou fragilidade observável:** RowTransform mantém a lista de transformações na união, no reconhecimento da entrada e no despacho de execução. Outra transformação requer modificar esses pontos centrais.
- **Elementos e evidências:** Reconhecimento e execução das transformações: [linhas 7–24](../codigos/C4-A.ts#L7-L24).
- **Critério mínimo de detecção:** A resposta localiza o mecanismo em RowTransform e reconhece que acrescentar um comportamento exige alterar a implementação central.
- **Formulações equivalentes aceitas:** despacho fechado, transformações sem ponto de extensão, OCP ou Conditional Complexity.
- **Afirmações insuficientes:** A menção a um switch ou a um conjunto finito de opções é insuficiente sem o reconhecimento dos pontos que precisam mudar para ampliar o comportamento.
- **Distinção e contagem:** A possibilidade de receber ou registrar uma transformação mantém as decisões sobre formato e ordenação. A contagem considera o custo verificável de extensão, inclusive quando a resposta aceita esse custo como escolha atual. Um conjunto finito de opções, por si só, é evidência insuficiente.

### C4-A-03 — Multiplicação de operações por combinações

**Variações de título (exemplos):**

- “API de ordenação com operações duplicadas”
- “Explosão combinatória entre chave e direção de ordenação”
- “Métodos específicos para cada combinação de ordenação”
- “Novos critérios ampliam a matriz de métodos e o despacho de RowOrdering”

**Como confirmar a detecção:**

- **Tipo:** Dificuldade de extensão.
- **Fundamentação:** [OCP (Martin)][S4], [Combinatorial Explosion][S12].
- **Decisão ou fragilidade observável:** RowOrdering oferece uma operação para cada combinação de chave e direção e enumera as alternativas em order. Acrescentar uma chave ou direção amplia essa matriz de métodos e chamadas.
- **Elementos e evidências:** Matriz de operações de ordenação: [linhas 26–42](../codigos/C4-A.ts#L26-L42).
- **Critério mínimo de detecção:** A resposta reconhece os dois eixos e identifica a multiplicação de operações ou as mudanças coordenadas necessárias para ampliá-los.
- **Formulações equivalentes aceitas:** explosão combinatória, matriz fixa de comportamentos, Combinatorial Explosion ou dificuldade de extensão por combinações.
- **Afirmações insuficientes:** A menção a um switch ou a um conjunto finito de opções é insuficiente sem o reconhecimento dos pontos que precisam mudar para ampliar o comportamento.
- **Distinção e contagem:** A composição do comparador e da direção deixa presentes os itens de formato e transformação. A ordenação dos registros, a transformação de seus valores e a codificação da saída são eixos separados. Os nomes exatos desses eixos são opcionais.

## Fontes

Os conceitos e as adaptações estão detalhados na [seleção das fontes](../selecao-fontes.md).

[S4]: https://www.cs.utexas.edu/~downing/papers/OCP-1996.pdf
[S5]: https://martinfowler.com/ieeeSoftware/protectedVariation.pdf
[S11]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/conditional-complexity.md
[S12]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/combinatorial-explosion.md
