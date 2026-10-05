# Seleção das fontes e construção dos códigos

## Base utilizada

Os exemplos foram construídos a partir do [Code Smells Catalog](https://www.codesmells.org/) e de seu [repositório Luzkan/smells](https://github.com/Luzkan/smells). Trata-se de um catálogo de definições, relações, referências e exemplos didáticos. A fundamentação acadêmica apresentada pelo projeto é o capítulo de **Marcel Jerzyk e Lech Madeyski (2023), Code Smells: A Comprehensive Online Catalog and Taxonomy**, publicado pela Springer, DOI [10.1007/978-3-031-25695-0_24](https://doi.org/10.1007/978-3-031-25695-0_24).

A descrição e o resumo públicos do capítulo foram consultados; não se pressupõe acesso ao texto integral nem validação dos nossos códigos pelos autores. O catálogo fornece uma base conceitual rastreável. Ele **não fornece um conjunto experimental já validado de dez programas com referências de avaliação**. Os arquivos deste experimento são adaptações e construções sintéticas em TypeScript, cuja adequação e cuja referência de avaliação precisam de revisão antes da coleta.

Revisão do catálogo consultada: **`7f3f7dae09d487fbe68ad38e132135118155f30a`**, acessada em **30/09/2026**. As referências abaixo apontam para essa revisão fixa, pois o site pode mudar. A origem e as adaptações dos arquivos são descritas a seguir.

## Correspondência com os cinco cenários

| Cenário do plano | Código e referência escolhida | Por que se encaixa no ATLAS | Princípios relacionados |
| --- | --- | --- | --- |
| 1 — Responsabilidades excessivas e baixa coesão | C1-A e C1-B: [Divergent Change](https://www.codesmells.org/smells/divergent-change) | Classes reúnem políticas com motivos distintos de mudança. Permite verificar concentração de responsabilidades e coesão sem usar o tamanho da classe como critério. | C1-A e C1-B: SOLID: responsabilidade única (SRP). GRASP: alta coesão. |
| 2 — Acoplamento a implementações concretas | C2-A: [Inappropriate Static](https://www.codesmells.org/smells/inappropriate-static); C2-B: [Base Class depends on Subclass](https://www.codesmells.org/smells/base-class-depends-on-subclass) | Consultas fixadas em tipos concretos, construção interna de colaboradores e dependência da base em derivados tornam a substituição verificável no próprio arquivo. | C2-A: SOLID: inversão de dependências (DIP). GRASP: baixo acoplamento. C2-B: SOLID: inversão de dependências (DIP) e aberto/fechado (OCP). GRASP: polimorfismo e baixo acoplamento. |
| 3 — Encapsulamento inadequado de regras e estado do domínio | C3-A e C3-B: [Indecent Exposure](https://www.codesmells.org/smells/indecent-exposure) | Campos e referências mutáveis permitem contornar operações do domínio. O estado afetado e a regra contornada podem ser localizados sem contexto externo. | C3-A e C3-B: GRASP: especialista na informação e baixo acoplamento. |
| 4 — Dificuldade de extensão | C4-A: [Conditional Complexity](https://www.codesmells.org/smells/conditional-complexity); C4-B: [Combinatorial Explosion](https://www.codesmells.org/smells/combinatorial-explosion) | Formatos, transformações, combinações de frete e níveis de desconto exigem alterações em despachos centrais ou vários pontos existentes. | C4-A e C4-B: SOLID: aberto/fechado (OCP). GRASP: proteção contra variações. |
| 5 — Estado global e baixa testabilidade | C5-A: [Global Data](https://www.codesmells.org/smells/global-data); C5-B: [Hidden Dependencies](https://www.codesmells.org/smells/hidden-dependencies) | Contextos globais, configurações compartilhadas, relógio implícito e cache estático afetam isolamento e controle das dependências nos testes. | C5-A: GRASP: baixo acoplamento e proteção contra variações do ambiente. C5-B: GRASP: baixo acoplamento. |

Esses temas coincidem com a análise de responsabilidades, acoplamento, encapsulamento, extensão e testabilidade proposta pelo modo de análise arquitetural do ATLAS. Os critérios cobram a identificação do mecanismo e do elemento afetado. Não exigem que o modelo use o nome em inglês do catálogo nem que recomende uma refatoração específica.

Os **princípios relacionados** são interpretações dos mecanismos presentes nos códigos adaptados. A identificação de uma tensão com SOLID ou GRASP será verificada pelos critérios do problema correspondente; nomes distintos para o mesmo mecanismo serão reunidos em um único acerto. A relação por arquivo está na [tabela de referências](referencias/README.md#referências-por-arquivo).

## Origem e adaptação de cada arquivo

| Código                  | Entrada na revisão fixa                                                                                                                                              | Material disponível na fonte e adaptação realizada                                                                                                                                                                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [C1-A](codigos/C1-A.ts) | [divergent-change.md](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/divergent-change.md) | Construção de um fluxo de relatórios de vendas. `SalesReport` mistura persistência, cálculo e apresentação; `ReportMailer` mistura composição comercial e fila; `ReportAdministration` mistura acesso e retenção. A fonte inspira a concentração de motivos de mudança, não esses domínios e classes adicionais. |
| [C1-B](codigos/C1-B.ts) | [divergent-change.md](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/divergent-change.md) | Construção a partir da definição. `AdmissionOffice` reúne matrícula, bolsa, armazenamento e comunicação; `StudentAccount` reúne cobrança e controle de acesso. O domínio de admissão e a segunda classe são próprios da adaptação. |
| [C2-A](codigos/C2-A.ts) | [inappropriate-static.md](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/inappropriate-static.md) | Adaptação do mecanismo de integração estática para uma consulta de jornada ligada ao tipo concreto `WorkLedger`. Seus registros pertencem à instância, sem arquivo global compartilhado. `PayrollBatch` também constrói diretamente `PayrollService`, em outra fronteira de dependência. |
| [C2-B](codigos/C2-B.ts) | [base-class-depends-on-subclass.md](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/base-class-depends-on-subclass.md) | Construção de uma hierarquia cuja base consulta subclasses por `instanceof`. Na mesma adaptação, `DispatchService` fixa uma impressora concreta e seu protocolo ESC/POS. O catálogo inspira a primeira dependência; a segunda foi construída para o cenário. |
| [C3-A](codigos/C3-A.ts) | [indecent-exposure.md](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/indecent-exposure.md) | Adaptação da exposição de campo público para uma carteira. Saldo e indicador de bloqueio permitem contornar regras distintas; `history` devolve a coleção interna mutável. Todos os itens tratam de proteção do estado e das operações de domínio. |
| [C3-B](codigos/C3-B.ts) | [indecent-exposure.md](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/indecent-exposure.md) | Construção a partir de Indecent Exposure. `Warehouse` expõe um Map de estoque; `ReservationBook` devolve a alocação interna e expõe o limite validado de reserva. Não se reproduz o exemplo de outra entrada do catálogo. |
| [C4-A](codigos/C4-A.ts) | [conditional-complexity.md](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/conditional-complexity.md) | Adaptação de um exportador com formatos alternativos. A seleção de formato se repete em três operações. `RowTransform` acrescenta outro eixo independente, com transformações fixadas em despacho central. O CSV protege aspas e delimitadores para concentrar o cenário na extensão. |
| [C4-B](codigos/C4-B.ts) | [combinatorial-explosion.md](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/combinatorial-explosion.md) | Construção a partir da definição de combinações de variações: seis métodos para duas modalidades e três regiões. `ShippingDiscount` acrescenta uma política de níveis de cliente fechada em switch, independente da matriz de frete. |
| [C5-A](codigos/C5-A.ts) | [global-data.md](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/global-data.md) | Construção de um checkout dependente de cliente e tributação globais. O prazo de uma cotação também depende diretamente do relógio do ambiente. Global Data inspira os estados compartilhados; o relógio é um mecanismo adicional de dependência oculta da adaptação. |
| [C5-B](codigos/C5-B.ts) | [hidden-dependencies.md](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/hidden-dependencies.md) | Adaptação da resolução de dependências por ambiente global para um gerador de recibos. Fonte e moeda são obtidas de configuração externa, e um cache estático compartilha resultados entre instâncias. O cache distingue IDs, mas persiste entre configurações/fontes. |

## Problemas próprios da adaptação

Os mecanismos associados às entradas do catálogo foram complementados pelos itens abaixo, construídos dentro do cenário correspondente. Esses itens decorrem da preparação dos códigos experimentais e não são atribuídos automaticamente ao exemplo original do catálogo. As evidências e os critérios estão registrados nas referências individuais.

| Arquivo e item | Problema na adaptação | Tipo principal |
| --- | --- | --- |
| [C1-A-02](referencias/C1-A.md) | Mistura de composição de mensagens e gestão da fila em ReportMailer | Responsabilidades e coesão |
| [C1-A-03](referencias/C1-A.md) | Políticas de acesso e retenção reunidas em ReportAdministration | Responsabilidades e coesão |
| [C1-B-02](referencias/C1-B.md) | Regras financeiras e controle de acesso reunidos em StudentAccount | Responsabilidades e coesão |
| [C2-A-02](referencias/C2-A.md) | Lote de folha instancia diretamente PayrollService | Acoplamento a implementações concretas |
| [C2-B-02](referencias/C2-B.md) | Serviço de despacho fixado em ThermalPrinter e ESC/POS | Acoplamento a implementações concretas |
| [C3-A-02](referencias/C3-A.md) | Histórico devolvido como coleção interna mutável | Encapsulamento de regras e estado |
| [C3-A-03](referencias/C3-A.md) | Bloqueio de gastos público permite ignorar a resolução da retenção | Encapsulamento de regras e estado |
| [C3-B-02](referencias/C3-B.md) | Consulta de reserva devolve o objeto interno modificável | Encapsulamento de regras e estado |
| [C3-B-03](referencias/C3-B.md) | Limite de reserva público permite contornar sua validação | Encapsulamento de regras e estado |
| [C4-A-02](referencias/C4-A.md) | Transformações de linhas fechadas em despacho central | Dificuldade de extensão |
| [C4-B-02](referencias/C4-B.md) | Política de descontos fechada nos níveis de cliente existentes | Dificuldade de extensão |
| [C5-A-02](referencias/C5-A.md) | Tributação global altera cotações de instâncias existentes | Estado global e dependências ocultas |
| [C5-A-03](referencias/C5-A.md) | Prazo da cotação depende diretamente do relógio do ambiente | Estado global e dependências ocultas |
| [C5-B-02](referencias/C5-B.md) | Cache estático de recibos compartilha resultados entre instâncias | Estado global e dependências ocultas |

## Critérios de construção

1. **Evidência no arquivo:** nenhum problema obrigatório depende de conhecer outro arquivo, executar uma aplicação externa ou imaginar requisitos não fornecidos.
2. **Dois exemplos independentes:** cada cenário tem dois arquivos próprios. Os arquivos representam domínios ou formas de ocorrência distintas dentro do mesmo tema. Os dois códigos de um cenário não são necessariamente iguais em dificuldade.
3. **Concentração no cenário:** os problemas esperados de cada arquivo têm tipo principal correspondente ao seu cenário. Validação integra C3 quando evidencia uma regra de domínio contornável. Outros efeitos dos mesmos mecanismos não serão convertidos em problemas adicionais de outros tipos.
4. **Todos os problemas esperados por arquivo:** a [Referência de avaliação da detecção](referencias/README.md) registra 24 problemas em dez Markdown individuais. Cada item possui identificador, tipo principal, evidência e critério. A comparação por tipo utiliza a categoria de cada item, correspondente ao cenário do arquivo. Consequências e nomes alternativos do mesmo mecanismo não geram acertos adicionais.
5. **Fluxos de aplicação:** os arquivos representam serviços e operações de negócio, com dados recebidos por parâmetros e armazenamento em memória quando necessário. Não incluem funções de demonstração nem sequências de chamadas preparadas apenas para expor defeitos. Os problemas esperados permanecem observáveis nas decisões de projeto e nos contratos das operações.
6. **Rastreabilidade:** versão da fonte, transformação, código, evidência e critério mínimo de detecção são registrados antes das respostas dos modelos.
7. **Localização das evidências:** o ATLAS envia os arquivos integrais com numeração no formato `<linha> | conteúdo`, correspondente às linhas originais a partir de 1, inclusive linhas em branco. Os prefixos são metadados de localização e não integram o código-fonte; as referências individuais utilizam essa mesma numeração.

### Referência bibliográfica

JERZYK, Marcel; MADEYSKI, Lech. Code Smells: A Comprehensive Online Catalog and Taxonomy. In: KRYVINSKA, Nataliya; GREGUŠ, Michal; FEDUSHKO, Solomiia (org.). _Developments in Information and Knowledge Management Systems for Business Applications_. Studies in Systems, Decision and Control, v. 462. Cham: Springer, 2023. p. 543–576. DOI: [10.1007/978-3-031-25695-0_24](https://doi.org/10.1007/978-3-031-25695-0_24).
