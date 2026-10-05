# Referência de avaliação da detecção — C2-B

- **Arquivo analisado:** [C2-B.ts](../codigos/C2-B.ts).
- **Cenário de origem:** 2 — Acoplamento a implementações concretas.
- **Problemas esperados:** 2.
- **Fonte do mecanismo principal:** [Base Class depends on Subclass](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/base-class-depends-on-subclass.md). Os mecanismos adicionais são construções da adaptação dentro do mesmo cenário, documentadas por inspeção do código; não são atribuídos automaticamente ao exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [Referência de avaliação da detecção](README.md).

A correspondência será verificada na resposta completa. O reconhecimento da tensão ou do risco com evidência concreta poderá contar como detecção, mesmo quando o modelo considera o desenho aceitável ou recomenda adiar uma refatoração. Não será exigido nome exato do smell nem reprodução de uma resposta ideal.

## Problemas esperados

### C2-B-01 — Classe base conhece os tipos derivados concretos

- **Tipo:** Acoplamento a implementações concretas.
- **Decisão ou fragilidade observável:** `Delivery.dispatchLabel` inspeciona subclasses com `instanceof` e acessa seus dados específicos. A base depende de detalhes dos derivados e precisa conhecê-los para produzir uma etiqueta.
- **Elementos e evidências:** `Delivery.dispatchLabel` distingue `HomeDelivery`, `PickupDelivery` e `LockerDelivery` (linhas 4–10).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica a dependência de `Delivery` em suas subclasses concretas, relacionando os `instanceof` à inversão da direção de dependência ou à necessidade de alterar a base.
- **Variações de nome:**
  - Dependência da classe base em subclasses.
  - Hierarquia invertida na geração de etiquetas.
  - Base acoplada aos tipos concretos de entrega.
- **Formulações equivalentes aceitas:** Base Class depends on Subclass, ausência de polimorfismo, OCP ou baixo acoplamento com localização da dependência.
- **Afirmações insuficientes:** “Há condicionais”; dizer que a herança é sempre inadequada; apenas listar os tipos.
- **Distinção e contagem:** Ausência de polimorfismo e custo de acrescentar subclasses são consequências deste único mecanismo. Não serão contados novamente como problema de extensão.

### C2-B-02 — Serviço de despacho fixado em ThermalPrinter e ESC/POS

- **Tipo:** Acoplamento a implementações concretas.
- **Decisão ou fragilidade observável:** `DispatchService` cria sua própria `ThermalPrinter` e chama uma operação específica do protocolo ESC/POS. A seleção da tecnologia de impressão não pode ser substituída pelo consumidor.
- **Elementos e evidências:** `ThermalPrinter.printEscPos` codifica comandos do protocolo (linhas 39–41); `DispatchService` constrói a impressora e chama `printEscPos` (linhas 45–49).
- **Critério mínimo de detecção:** Será verificado se a resposta relaciona `DispatchService` à criação de `ThermalPrinter` e/ou à operação específica `printEscPos`, reconhecendo a dificuldade de substituir ou isolar a impressão.
- **Variações de nome:**
  - Acoplamento do despacho à impressora térmica.
  - Dependência fixa do protocolo ESC/POS.
  - Impressora concreta criada dentro do serviço.
- **Formulações equivalentes aceitas:** DIP, baixo acoplamento, tecnologia de impressão fixa ou ausência de contrato substituível.
- **Afirmações insuficientes:** “Impressão térmica é ruim”; criticar o conteúdo da etiqueta; mera recomendação de injeção sem localizar a dependência.
- **Distinção e contagem:** Construção da impressora e chamada específica compõem um único item. Este vínculo é independente da dependência da base em subclasses, em C2-B-01.

