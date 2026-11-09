# Referência de avaliação da detecção — C4-B

- **Arquivo analisado:** [C4-B.ts](../codigos/C4-B.ts).
- **Cenário:** Dificuldade de extensão.
- **Problemas esperados:** 3.
- **Mecanismos do Code Smells Catalog:** [Combinatorial Explosion][S12] — operações multiplicadas pelas combinações de modalidade e região (01); [Conditional Complexity][S11] — seleções de desconto e embalagem que exigem modificar decisões existentes (02 e 03).
- **Fundamentos complementares:** [OCP (Martin)][S4] — custo de incluir alternativas alterando a implementação existente (01 a 03); [Protected Variations (Larman)][S5] — proteção dos pontos de variação de desconto e embalagem (02 e 03).
- **Adaptação do cenário:** Tarifas, descontos e embalagens foram combinados num exemplo próprio em TypeScript. Os três eixos são construções do experimento, apoiadas nos mecanismos do catálogo e nos princípios indicados.
- **Regras comuns, categorias e inventário:** [referência de avaliação da detecção](README.md), [inventário](../inventario.json) e [detalhamento das fontes](../selecao-fontes.md).

## Problemas esperados

### C4-B-01 — Multiplicação de operações por combinações

**Variações de título (exemplos):**

- “Explosão combinatória entre modalidade e região de entrega”
- “API de preços multiplicada por combinações de frete”
- “Tarifas específicas para cada par de modalidade e região”
- “Novas opções de frete ampliam métodos e a enumeração da cotação”

**Como confirmar a detecção:**

- **Tipo:** Dificuldade de extensão.
- **Fundamentação:** [OCP (Martin)][S4], [Combinatorial Explosion][S12].
- **Decisão ou fragilidade observável:** DeliveryPricing implementa as combinações de modalidade e região em métodos separados. quoteDeliveryOptions também enumera essas combinações para compor o resultado.
- **Elementos e evidências:** Matriz de tarifas: [linhas 4–40](../codigos/C4-B.ts#L4-L40); Enumeração na composição da cotação: [linhas 70–87](../codigos/C4-B.ts#L70-L87).
- **Critério mínimo de detecção:** A resposta identifica os eixos e relaciona a matriz ao aumento no número de operações ou de pontos que mudam quando se acrescentam alternativas.
- **Formulações equivalentes aceitas:** explosão combinatória, variações combinadas sem composição, OCP ou Combinatorial Explosion.
- **Afirmações insuficientes:** A menção a um switch ou a um conjunto finito de opções é insuficiente sem o reconhecimento dos pontos que precisam mudar para ampliar o comportamento.
- **Distinção e contagem:** separar as políticas de modalidade e região não torna extensíveis desconto ou embalagem. A enumeração e a repetição das fórmulas são evidências do mesmo item.

### C4-B-02 — Despacho central fechado

**Variações de título (exemplos):**

- “Políticas de desconto sem ponto de extensão”
- “Seleção fixa de descontos em ShippingDiscount”
- “Novo nível de cliente exige modificar o cálculo central de desconto”
- “Despacho fechado por CustomerTier”

**Como confirmar a detecção:**

- **Tipo:** Dificuldade de extensão.
- **Fundamentação:** [OCP (Martin)][S4], [Protected Variations (Larman)][S5], [Conditional Complexity][S11].
- **Decisão ou fragilidade observável:** ShippingDiscount.apply concentra as políticas dos níveis de cliente num despacho central. Incluir outra política exige alterar a união CustomerTier e a implementação existente.
- **Elementos e evidências:** Alternativas de desconto: [linhas 1–1](../codigos/C4-B.ts#L1-L1); Despacho de descontos: [linhas 42–50](../codigos/C4-B.ts#L42-L50).
- **Critério mínimo de detecção:** A resposta localiza a seleção fixa e reconhece o custo de incluir ou substituir um comportamento de desconto.
- **Formulações equivalentes aceitas:** políticas sem ponto de extensão, OCP, despacho fechado ou Conditional Complexity.
- **Afirmações insuficientes:** A menção a um switch ou a um conjunto finito de opções é insuficiente sem o reconhecimento dos pontos que precisam mudar para ampliar o comportamento.
- **Distinção e contagem:** Uma política de desconto substituível mantém a matriz de modalidade e região e os despachos de embalagem. A detecção depende da identificação do custo de extensão. O julgamento dos percentuais e a crítica ao uso de switch são dispensáveis.

### C4-B-03 — Seleção de comportamento repetida

**Variações de título (exemplos):**

- “Conhecimento de embalagens duplicado”
- “Seleção de embalagem repetida no adicional e na descrição”
- “Nova embalagem exige mudanças coordenadas em PackagingPolicy”
- “Preço e descrição de embalagens mantidos em decisões paralelas”

**Como confirmar a detecção:**

- **Tipo:** Dificuldade de extensão.
- **Fundamentação:** [OCP (Martin)][S4], [Protected Variations (Larman)][S5], [Conditional Complexity][S11].
- **Decisão ou fragilidade observável:** PackagingPolicy repete a escolha da embalagem para definir adicional e descrição. Uma nova categoria exige mudanças coordenadas nas duas operações e na união Packaging.
- **Elementos e evidências:** Eixo de embalagem: [linhas 2–2](../codigos/C4-B.ts#L2-L2); Seleção repetida de embalagem: [linhas 52–68](../codigos/C4-B.ts#L52-L68).
- **Critério mínimo de detecção:** A resposta reconhece a repetição da seleção por embalagem e a necessidade de alterar mais de uma operação quando se acrescenta uma categoria.
- **Formulações equivalentes aceitas:** seleção espalhada, regras fechadas de embalagem, OCP ou alterações coordenadas para extensão.
- **Afirmações insuficientes:** A menção a um switch ou a um conjunto finito de opções é insuficiente sem o reconhecimento dos pontos que precisam mudar para ampliar o comportamento.
- **Distinção e contagem:** encapsular um comportamento de embalagem não corrige tarifas por combinação ou descontos centrais. Os despachos de preço e descrição formam um item; seus nomes são apenas localização.

## Fontes

Os conceitos e as adaptações estão detalhados na [seleção das fontes](../selecao-fontes.md).

[S4]: https://www.cs.utexas.edu/~downing/papers/OCP-1996.pdf
[S5]: https://martinfowler.com/ieeeSoftware/protectedVariation.pdf
[S11]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/conditional-complexity.md
[S12]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/combinatorial-explosion.md
