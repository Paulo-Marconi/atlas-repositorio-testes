# Seleção das fontes e construção dos códigos

## Base e alcance

Os dez exemplos foram construídos para avaliação controlada de detecção, com 30 ocorrências estruturais. A fundamentação inclui princípios de projeto e mecanismos do [Code Smells Catalog](https://www.codesmells.org/), apoiado na taxonomia de Jerzyk e Madeyski (2023). As entradas do catálogo são rastreadas à revisão `7f3f7dae09d487fbe68ad38e132135118155f30a`.

O catálogo oferece definições, relações e exemplos didáticos. Ele não fornece nem valida este conjunto de dez arquivos. Os domínios, as combinações de ocorrências, as adaptações para TypeScript e os critérios de detecção pertencem aos autores do experimento. A revisão independente dessas decisões deverá anteceder a coleta.

## Correspondência com os cenários

| Cenário | Fundamento | Mecanismos usados e adaptação |
| --- | --- | --- |
| C1 — Responsabilidades e coesão | SRP, alta coesão e distribuição de responsabilidades | Divergent Change apoia responsabilidades concentradas em unidades distintas. Shotgun Surgery apoia uma regra comum repetida entre componentes e o custo de mudanças coordenadas. A categoria abrange concentração e dispersão de responsabilidades. |
| C2 — Acoplamento concreto | DIP, baixo acoplamento e polimorfismo | Inappropriate Static e Base Class depends on Subclass apoiam as ligações estática e da base a derivados. Construção interna e API técnica fixa são adaptações apoiadas em DIP; não se atribuem automaticamente a um exemplo do catálogo. |
| C3 — Encapsulamento | Proteção de estado e invariantes | Indecent Exposure apoia a exposição de representação. Retornos e entradas mutáveis são adaptações; SEI CERT OBJ06-J complementa o apoio conceitual, com verificação específica de objetos, arrays e Map em TypeScript. |
| C4 — Extensão | OCP e Protected Variations | Conditional Complexity apoia seleções centrais/repetidas; Combinatorial Explosion apoia operações por combinação de eixos. Cada eixo independente pertence a um item, sem contar cada branch ou consequência. |
| C5 — Estado global e testabilidade | Isolamento e dependências explícitas | Global Data e Hidden Dependencies apoiam contexto/ambiente compartilhado. Cache estático, relógio e aleatoriedade são adaptações complementadas pela discussão de não determinismo e isolamento de Fowler. |

## Manifestação por arquivo

| Código | Ocorrências construídas |
| --- | --- |
| [C1-A](codigos/C1-A.ts) | Concentração de responsabilidades; Políticas independentes na mesma classe; Responsabilidade de regra dispersa. |
| [C1-B](codigos/C1-B.ts) | Concentração de responsabilidades; Políticas independentes na mesma classe; Responsabilidade de regra dispersa. |
| [C2-A](codigos/C2-A.ts) | Dependência estática fixa; Construção interna de colaborador; Dependência de API concreta de armazenamento. |
| [C2-B](codigos/C2-B.ts) | Base dependente de derivados; Construção interna de colaborador; Construção interna do serviço de aplicação. |
| [C3-A](codigos/C3-A.ts) | Escrita externa em estado interno; Referência mutável devolvida; Entrada mutável retida por referência. |
| [C3-B](codigos/C3-B.ts) | Coleção interna publicamente alterável; Referência mutável devolvida; Estrutura recebida compartilhada por cópia superficial. |
| [C4-A](codigos/C4-A.ts) | Seleção de comportamento repetida; Despacho central fechado; Multiplicação de operações por combinações. |
| [C4-B](codigos/C4-B.ts) | Multiplicação de operações por combinações; Despacho central fechado; Seleção de comportamento repetida. |
| [C5-A](codigos/C5-A.ts) | Contexto global mutável; Cache estático compartilhado; Relógio como dependência oculta. |
| [C5-B](codigos/C5-B.ts) | Ambiente global implícito; Cache estático compartilhado; Aleatoriedade como dependência oculta. |

Cada item recebe uma categoria principal, mesmo quando também se relaciona a outros princípios. A referência aceita nomes equivalentes ao mecanismo. Uma detecção não depende de empregar o nome do catálogo ou recomendar sua refatoração sugerida.

## Critérios de construção e verificação

1. Toda evidência obrigatória está no arquivo submetido integralmente. A referência e a categoria não compõem a entrada do modelo.
2. O número de três itens representa ocorrências independentes, e não três rótulos para uma mesma causa. O [planejamento](planejamento-experimento.md) descreve a unidade de contagem e os critérios de independência.
3. Dados compartilhados, APIs específicas e pontos de extensão são usados de forma a tornar a fragilidade observável. A presença de public, static, new ou switch isoladamente não basta.
4. Os fluxos são autocontidos e usam memória para armazenamento e saídas codificadas para impressão. As funções exportadas são operações de aplicação; os testes de demonstração ficam fora dos arquivos submetidos.
5. A compilação estrita e os testes verificam os comportamentos relevantes. Contrastes temporários confirmam que explicitar o contexto não resolve o cache estático em C5. Propriedades de responsabilidade e extensão também exigem revisão da estrutura.
6. O inventário alimenta as referências e a planilha. As evidências por linha são regeneradas após mudanças do código, evitando manter numerações manuais divergentes.

## Fontes conceituais e técnicas

As referências abaixo sustentam conceitos e mecanismos. Elas não validam automaticamente os códigos ou a contagem proposta. A relação de cada item com sua fonte é uma interpretação dos autores do experimento. A fundamentação científica do catálogo e fontes conceituais adicionais complementam-se; não é necessário atribuir a cada adaptação um smell distinto.

As entradas do catálogo estão fixadas na revisão `7f3f7dae09d487fbe68ad38e132135118155f30a`. As fontes complementares foram consultadas em 27/10/2026. Trechos e exemplos não foram reproduzidos integralmente.

- **S1 — Base científica do catálogo.** Jerzyk, M.; Madeyski, L. (2023). Code Smells: A Comprehensive Online Catalog and Taxonomy. [DOI e capítulo](https://doi.org/10.1007/978-3-031-25695-0_24). Fundamenta o catálogo e a organização dos conceitos; não fornece validação deste conjunto de dez arquivos.
- **S2 — Responsabilidade única.** Martin, R. C. (2014). [The Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html). Apoia a análise de motivos independentes de mudança em unidades com responsabilidades acumuladas.
- **S3 — Inversão de dependências.** Martin, R. C. (1996). [The Dependency Inversion Principle](https://www.cs.utexas.edu/~downing/papers/DIP-1996.pdf). Apoia a análise de políticas da aplicação vinculadas a detalhes concretos de colaboradores.
- **S4 — Extensão.** Martin, R. C. (1996). [The Open-Closed Principle](https://www.cs.utexas.edu/~downing/papers/OCP-1996.pdf). Apoia a análise dos pontos modificados para ampliar comportamentos, considerando que a proteção contra mudança é seletiva.
- **S5 — Variações protegidas.** Larman, C. (2001). [Protected Variation: The Importance of Being Closed](https://martinfowler.com/ieeeSoftware/protectedVariation.pdf). IEEE Software, 18(3), 89–91. [DOI](https://doi.org/10.1109/52.922731). Relaciona interfaces estáveis, ocultação de informação e proteção dos pontos de variação.
- **S6 — Concentração de responsabilidades.** Code Smells Catalog. [Divergent Change](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/divergent-change.md).
- **S7 — Responsabilidade dispersa.** Code Smells Catalog. [Shotgun Surgery](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/shotgun-surgery.md). Apoia a alteração de uma decisão que exige mudanças em múltiplas unidades; a aplicação a uma regra repetida será demonstrada no código.
- **S8 — Acoplamento estático.** Code Smells Catalog. [Inappropriate Static](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/inappropriate-static.md).
- **S9 — Direção de dependência na hierarquia.** Code Smells Catalog. [Base Class depends on Subclass](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/base-class-depends-on-subclass.md).
- **S10 — Exposição de representação.** Code Smells Catalog. [Indecent Exposure](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/indecent-exposure.md). Apoia a caracterização geral da exposição; o vazamento pela entrada é uma adaptação apoiada também em S16.
- **S11 — Despachos condicionais.** Code Smells Catalog. [Conditional Complexity](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/conditional-complexity.md).
- **S12 — Combinações fixas.** Code Smells Catalog. [Combinatorial Explosion](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/combinatorial-explosion.md).
- **S13 — Estado compartilhado.** Code Smells Catalog. [Global Data](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/global-data.md).
- **S14 — Dependências implícitas.** Code Smells Catalog. [Hidden Dependencies](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/hidden-dependencies.md).
- **S15 — Isolamento e controle ambiental.** Fowler, M. (2011). [Eradicating Non-Determinism in Tests](https://martinfowler.com/articles/nonDeterminism.html). Apoia a discussão de estado entre testes, relógio substituível e controle do gerador aleatório.
- **S16 — Referências mutáveis.** SEI CERT. [OBJ06-J: Defensively copy mutable inputs and mutable internal components](https://cmu-sei.github.io/secure-coding-standards/sei-cert-oracle-coding-standard-for-java/rules/object-orientation-obj/obj06-j/). Orientação técnica para Java, usada como apoio conceitual à proteção de entradas e componentes mutáveis. A validade da adaptação para objetos, arrays e Map em TypeScript deverá ser verificada nos exemplos. Aspectos de segurança descritos pela fonte não são novos alvos do experimento.

[S1]: https://doi.org/10.1007/978-3-031-25695-0_24
[S2]: https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html
[S3]: https://www.cs.utexas.edu/~downing/papers/DIP-1996.pdf
[S4]: https://www.cs.utexas.edu/~downing/papers/OCP-1996.pdf
[S5]: https://martinfowler.com/ieeeSoftware/protectedVariation.pdf
[S6]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/divergent-change.md
[S7]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/shotgun-surgery.md
[S8]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/inappropriate-static.md
[S9]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/base-class-depends-on-subclass.md
[S10]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/indecent-exposure.md
[S11]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/conditional-complexity.md
[S12]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/combinatorial-explosion.md
[S13]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/global-data.md
[S14]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/hidden-dependencies.md
[S15]: https://martinfowler.com/articles/nonDeterminism.html
[S16]: https://cmu-sei.github.io/secure-coding-standards/sei-cert-oracle-coding-standard-for-java/rules/object-orientation-obj/obj06-j/
