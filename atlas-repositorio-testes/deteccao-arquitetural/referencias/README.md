# Referência de avaliação da detecção

Este documento reúne as regras de classificação e o índice das referências individuais. A revisão independente e a fixação das referências ocorrerão antes da coleta definitiva.

Cada arquivo de código possui um Markdown próprio, com os problemas esperados, evidências, critérios mínimos, interpretações equivalentes e regras de contagem. O conjunto reúne **24 problemas esperados em dez arquivos**.

## Estrutura das referências individuais

Cada referência reúne a identificação do arquivo e uma seção de **Problemas esperados**, com a documentação de cada problema identificado no código.

### Identificação do arquivo

- **Arquivo analisado:** link para o código integral que será submetido ao modelo.
- **Cenário de origem:** número e tema que orientaram a construção do exemplo.
- **Problemas esperados:** quantidade de problemas documentados na referência.
- **Fonte do mecanismo principal:** entrada do catálogo utilizada na construção do exemplo. Os mecanismos adicionais são construções da adaptação dentro do mesmo cenário e são documentados individualmente.
- **Regras comuns, categorias e inventário:** link para este README, que reúne as regras compartilhadas entre as referências.

### Tópicos de cada problema esperado

Cada problema possui um **identificador e um nome**, apresentados no título, como `C1-A-01 — Concentração de responsabilidades em SalesReport`. A documentação de cada item contém os seguintes tópicos:

| Tópico | Conteúdo |
| --- | --- |
| **Tipo** | Categoria principal do problema, utilizada na comparação dos resultados por tipo. |
| **Decisão ou fragilidade observável** | Descrição do mecanismo de projeto que caracteriza o problema no código. |
| **Elementos e evidências** | Classes, operações, estados ou relacionamentos afetados, com trechos e regiões do código que sustentam o problema. |
| **Critério mínimo de detecção** | Reconhecimento do mecanismo e do elemento afetado que será procurado na resposta para verificar a detecção. |
| **Variações de nome** | Pelo menos três exemplos de nomes alternativos para o mesmo problema, que poderão aparecer nos títulos ou no texto das respostas. |
| **Formulações equivalentes aceitas** | Termos e interpretações que expressam o mesmo problema e serão aceitos na classificação. |
| **Afirmações insuficientes** | Exemplos de apontamentos genéricos ou incompletos que, isoladamente, não demonstram a detecção do problema. |
| **Distinção e contagem** | Orientações para diferenciar problemas independentes de consequências do mesmo mecanismo e evitar a duplicação de acertos. |

## Referências por arquivo

| Cenário de origem | Código | Referência individual | Problemas esperados | Princípios relacionados |
| --- | --- | --- | --- | --- |
| 1 — Responsabilidades excessivas e baixa coesão | [C1-A.ts](../codigos/C1-A.ts) | [C1-A.md](C1-A.md) | 3 | SOLID: responsabilidade única (SRP). GRASP: alta coesão. |
| 1 — Responsabilidades excessivas e baixa coesão | [C1-B.ts](../codigos/C1-B.ts) | [C1-B.md](C1-B.md) | 2 | SOLID: responsabilidade única (SRP). GRASP: alta coesão. |
| 2 — Acoplamento a implementações concretas | [C2-A.ts](../codigos/C2-A.ts) | [C2-A.md](C2-A.md) | 2 | SOLID: inversão de dependências (DIP). GRASP: baixo acoplamento. |
| 2 — Acoplamento a implementações concretas | [C2-B.ts](../codigos/C2-B.ts) | [C2-B.md](C2-B.md) | 2 | SOLID: inversão de dependências (DIP) e aberto/fechado (OCP). GRASP: polimorfismo e baixo acoplamento. |
| 3 — Encapsulamento inadequado de regras e estado do domínio | [C3-A.ts](../codigos/C3-A.ts) | [C3-A.md](C3-A.md) | 3 | GRASP: especialista na informação e baixo acoplamento. |
| 3 — Encapsulamento inadequado de regras e estado do domínio | [C3-B.ts](../codigos/C3-B.ts) | [C3-B.md](C3-B.md) | 3 | GRASP: especialista na informação e baixo acoplamento. |
| 4 — Dificuldade de extensão | [C4-A.ts](../codigos/C4-A.ts) | [C4-A.md](C4-A.md) | 2 | SOLID: aberto/fechado (OCP). GRASP: proteção contra variações. |
| 4 — Dificuldade de extensão | [C4-B.ts](../codigos/C4-B.ts) | [C4-B.md](C4-B.md) | 2 | SOLID: aberto/fechado (OCP). GRASP: proteção contra variações. |
| 5 — Estado global e baixa testabilidade | [C5-A.ts](../codigos/C5-A.ts) | [C5-A.md](C5-A.md) | 3 | GRASP: baixo acoplamento e proteção contra variações do ambiente. |
| 5 — Estado global e baixa testabilidade | [C5-B.ts](../codigos/C5-B.ts) | [C5-B.md](C5-B.md) | 2 | GRASP: baixo acoplamento. |
| **Total** | **10 arquivos** | **10 referências individuais** | **24** | — |

A coluna **Princípios relacionados** indica relações de SOLID e GRASP com mecanismos já documentados em cada arquivo. O travessão indica que não foi estabelecida uma associação específica a esses princípios. Uma resposta que os mencione será avaliada pelo mesmo critério de detecção do problema correspondente, com identificação do mecanismo e evidência no código. Formulações equivalentes sobre o mesmo mecanismo serão contabilizadas uma única vez.

Fontes e adaptações: [seleção das fontes](../selecao-fontes.md). Identificadores, tipos e evidências estão registrados nas referências individuais.

## Tipos dos problemas e organização dos cenários

Cada arquivo concentra problemas esperados do cenário ao qual pertence. Cada item recebe **um tipo principal correspondente ao cenário**, utilizado na comparação da QP3. Consequências e rótulos alternativos não mudam esse tipo nem geram contagens adicionais. Problemas reais não previstos que apareçam nas respostas serão tratados pelas regras de classificação, sem inclusão retroativa na referência.

| Cenário | Tipo principal do problema | Quantidade de itens esperados |
| --- | --- | --- |
| 1 | Responsabilidades e coesão | 5 |
| 2 | Acoplamento a implementações concretas | 4 |
| 3 | Encapsulamento de regras e estado | 6 |
| 4 | Dificuldade de extensão | 4 |
| 5 | Estado global e dependências ocultas | 5 |
| **Total** | — | **24** |

As contagens por tipo correspondem às contagens por cenário: 5, 4, 6, 4 e 5. Dentro de um arquivo, cada item exige um mecanismo ou uma unidade afetada distinta. Uma crítica genérica ao cenário não gera automaticamente todos os acertos do código.

## O que caracteriza uma detecção

Será avaliada a **resposta completa**, incluindo a visão geral e os tópicos posteriores. Para cada problema, será procurado:

1. reconhecimento da decisão ou fragilidade descrita na referência;
2. identificação da classe, operação, estado ou relacionamento afetado;
3. evidência concreta que permita verificar a correspondência no código.

O código integral será enviado pelo ATLAS **com numeração de linhas**, no formato `<linha> | conteúdo`, a partir de 1. Os números das evidências nas referências individuais correspondem às linhas originais do arquivo e à numeração enviada ao modelo, incluindo linhas em branco. Os prefixos são metadados de localização e não integram o código-fonte.

Uma referência a “tensão”, “risco” ou “custo de mudança” pode demonstrar detecção. O modelo pode reconhecer esse mecanismo e considerar a decisão taticamente aceitável, adiar a mudança ou não recomendar refatoração imediata. A necessidade de refatoração não determina o acerto.

Uma descrição neutra de funcionalidades, sem reconhecer a tensão ou fragilidade, não basta. Também não basta indicar um princípio, propor uma técnica ou citar um nome do catálogo sem localizar o mecanismo no arquivo. Não será exigido título exato, número de linha, nome do smell, julgamento de severidade, solução específica ou uma redação ideal. Não serão avaliados qualidade da explicação, clareza ou acerto de sugestões.

As **variações de nome** registradas em cada problema são exemplos de títulos alternativos. Outras denominações poderão ser aceitas quando a resposta atender ao mesmo critério mínimo de detecção, com reconhecimento do mecanismo e evidência no código. A correspondência será avaliada na resposta completa, e nomes diferentes para o mesmo problema serão reunidos no mesmo identificador, contabilizado uma única vez.

## Configurações de execução

Os modelos serão executados com as **configurações padrão do ATLAS para o respectivo ambiente**: local para M1 e M2 e em nuvem para M3. A versão do ATLAS e as configurações de partida serão mantidas ao longo da coleta. Os parâmetros efetivamente aplicados, incluindo ajustes automáticos da ferramenta e eventuais restrições do provedor em nuvem, serão preservados nos metadados de cada execução.

Os parâmetros locais de partida de M1 e M2 serão:

| Parâmetro | Valor padrão |
| --- | --- |
| `temperature` | `0.4` |
| `topP` | `0.95` |
| `maxTokens` | `8192` tokens |
| `contextWindow` | `8192` tokens inicialmente |
| `gpuLayers` | `0` (automático) |
| `threads` | `0` (automático) |
| `batchSize` | `0` (automático) |
| `microBatchSize` | `0` (automático) |
| `flashAttention` | `auto` |
| `kvCacheType` | `auto` |
| `loadMode` | `auto` |

As opções gerais da execução local serão `dynamicContextWindow = true`, `prepareOnAtlasOpen = true`, `stream = true` e `timeout = 30` segundos. Nos parâmetros `gpuLayers`, `threads`, `batchSize` e `microBatchSize`, **`0` representa o modo automático (`auto`)**, com os valores definidos pela engine instalada. As opções `auto` de Flash Attention, cache e carregamento também seguem os padrões da engine. Como o ajuste automático de contexto estará habilitado, a janela efetiva poderá aumentar e será registrada nos metadados de cada execução. As fontes desses valores estão indicadas no [README geral](../../README.md#configurações-padrão-e-ambiente-de-execução).

A versão do llama.cpp, o tipo de engine local e a release e o pacote utilizados do GitHub serão registrados no [template de ambiente de execução do README geral](../../README.md#configurações-padrão-e-ambiente-de-execução), que será preenchido antes da coleta. Esses dados serão associados a M1 e M2, com registros separados caso utilizem versões ou engines diferentes.

## Registro das execuções

A avaliação será registrada na aba **Execuções**, com uma linha por execução. As abas **Resumo por repetição** e **Comparação dos modelos** reunirão os resultados calculados a partir desses registros. Serão realizadas **cinco repetições por combinação de modelo e código**, totalizando **150 execuções** para os dez códigos e os três modelos. Cada problema esperado será avaliado cinco vezes por modelo, ou **15 vezes no conjunto dos três modelos**. As colunas da aba Execuções serão:

| Coluna | Informação registrada |
| --- | --- |
| **Execução** | Identificador único, como `EXEC-001`, para relacionar a avaliação à resposta original. |
| **Modelo** | Identificador e nome na planilha de coleta: `M1 — gemma-4-E4B-it-GGUF`, `M2 — Qwen3.6-27B-GGUF` ou `M3 — GPT-5.6 Luna`. |
| **Código** | Identificador do arquivo analisado, como `C1-A`. |
| **Repetição** | Número de 1 a 5, correspondente à execução repetida para a mesma combinação de modelo e código. |
| **Problemas detectados** | Identificadores únicos dos problemas esperados corretamente detectados, separados por ponto e vírgula. |
| **VP** | Quantidade de identificadores listados em Problemas detectados. |
| **FP** | Quantidade de apontamentos distintos sem fundamento verificável no escopo avaliado. |
| **FN** | Quantidade de problemas esperados omitidos, conforme a referência do arquivo. |
| **Precisão** | Métrica calculada automaticamente a partir de VP e FP. |
| **Revocação** | Métrica calculada automaticamente a partir de VP e FN. |
| **F1** | Medida calculada automaticamente a partir das contagens. |
| **Observações** | Anotações relevantes sobre a execução e a classificação dos apontamentos. |

Na coluna **Problemas detectados**, será utilizado um travessão quando nenhum problema esperado tiver sido identificado. Cada identificador aparecerá uma única vez por execução. Para uma resposta cuja classificação esteja concluída, VP + FN corresponderá à quantidade de problemas esperados na referência do arquivo.

A coluna **Observações** reunirá anotações relevantes sobre a execução e a classificação dos apontamentos, como justificativas de falsos positivos, omissões, achados reais não previstos, casos indeterminados e observações fora do escopo. Também serão anotadas interrupções ou falhas técnicas. A contagem de FP considerará apenas os apontamentos classificados como falsos positivos pelas regras comuns.

As respostas integrais e os metadados de coleta serão preservados em arquivos identificados pelo código da execução, incluindo data e horário, configuração utilizada, situação da execução e eventuais erros. Para a classificação, serão utilizadas cópias identificadas pelo código da execução, com os nomes dos modelos e demais metadados de identificação ocultados; a correspondência entre execuções e modelos será mantida separada dos materiais apresentados aos avaliadores. Interrupções e falhas técnicas serão tratadas conforme a regra fixada no plano antes da análise.

As métricas serão calculadas conforme as fórmulas e os casos de denominador zero definidos no [plano de testes](../main3.tex). Na aba **Resumo por repetição**, serão somados VP, FP e FN dos dez códigos antes do cálculo das métricas de cada rodada completa, por modelo e repetição. Na aba **Comparação dos modelos**, serão apresentadas as médias entre as rodadas completas e o desvio padrão de F1 por modelo. Os identificadores registrados permitirão recuperar o tipo de cada problema para a comparação da QP3.

### Frequência de detecção por problema

Na aba **Comparação dos modelos**, será calculada uma tabela com **72 linhas**, uma por combinação de problema esperado e modelo, com as colunas **Modelo**, **Problema**, **Tipo**, **Detecções**, **Execuções avaliadas** e **Frequência**. O tipo será o registrado na referência individual do problema.

Para cada item, serão contadas as execuções avaliadas do arquivo correspondente nas quais seu identificador aparecerá em Problemas detectados. A frequência será a razão entre essa contagem e a quantidade de execuções avaliadas para aquele modelo e arquivo. Somente serão consideradas repetições de 1 a 5 com classificação válida e FP preenchido. Registros duplicados para a mesma combinação de modelo, código e repetição serão excluídos dessa contagem até sua correção.

Sem execuções avaliadas, a frequência ficará em branco. Após cinco avaliações, 5/5 indicará detecção em todas, 0/5 indicará omissão em todas e valores intermediários indicarão variação entre execuções. A tabela apoiará a comparação por tipo da QP3 e a análise da regularidade das detecções da QP4.

## Classificação e contagem

- **VP:** um problema esperado foi identificado conforme seu critério. Cada identificador gera no máximo um VP por resposta.
- **FN:** um problema esperado não foi identificado conforme seu critério.
- **FP:** a resposta atribui ao código um problema de projeto sem fundamento verificável, dentro do escopo de categorias definido. Um apontamento não será classificado como FP somente porque o nome difere ou o item não consta da lista.
- **Achado real não previsto:** outro problema de projeto sustentado, sem VP nem FP na referência fixada. A evidência será registrada, e o denominador da revocação será mantido conforme a referência fixada.
- **Indeterminado:** o julgamento depende de requisitos, contratos ou contexto não fornecidos. A limitação será registrada, sem classificação automática como FP.
- **Fora do escopo:** observação de estilo, segurança, desempenho ou bug funcional sem dimensão de decisão de projeto dentro das categorias avaliadas. Essas observações serão registradas separadamente.

O simples uso de termos condicionais não torna um achado indeterminado: um risco pode decorrer de uma decisão observável. A incerteza relevante é precisar supor informação ausente para afirmar que há o problema. A falta de testes apresentados não prova falta de testes existentes.

Afirmações com mecanismos distintos serão separadas, inclusive quando aparecem no mesmo parágrafo ou título. Uma afirmação composta pode demonstrar dois itens se reconhecer os dois mecanismos e seus elementos. Uma crítica genérica não recebe múltiplos acertos. Repetições, nomes alternativos e consequências de uma causa serão reunidos em uma identificação.

Há itens que compartilham uma classe e ainda assim representam mecanismos diferentes, como saldo exposto, histórico mutável e bloqueio de gastos contornável em C3-A. As distinções em cada referência orientam a contagem. Se a relação ficar ambígua, a divergência será registrada para revisão e consenso.
