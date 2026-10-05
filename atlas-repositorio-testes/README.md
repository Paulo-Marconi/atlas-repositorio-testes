# Repositório de testes do ATLAS

Este repositório de testes reúne os exemplos de código, os critérios de avaliação e a documentação do estudo experimental do ATLAS. Seu intuito é **verificar se o conjunto de instruções definido no prompt de comportamento da análise arquitetural é eficaz na detecção de problemas arquiteturais**, quando utilizado pelos modelos de linguagem avaliados. Os materiais estão organizados na pasta `deteccao-arquitetural` e apoiarão essa avaliação no contexto do TCC.

O ATLAS é um assistente de programação integrado ao Visual Studio Code, com um modo de análise arquitetural que examina decisões de projeto presentes no código. A avaliação utilizará esse modo para comparar como os modelos identificam os problemas ao seguir as mesmas instruções de comportamento.

## Aspecto avaliado

Com o RAG desativado, a resposta completa de cada execução será comparada à referência de avaliação previamente definida para o arquivo analisado.

A avaliação investigará:

- a eficácia na identificação dos problemas esperados, considerando precisão, revocação e a medida F1;
- a ocorrência de falsos positivos, isto é, apontamentos sem fundamento verificável no escopo avaliado;
- a variação dos resultados conforme o tipo de problema arquitetural;
- a consistência das detecções entre diferentes execuções do mesmo código.

Um problema poderá ser reconhecido com termos diferentes dos usados na referência, desde que a resposta identifique o mecanismo e o elemento afetado, com evidência verificável no código. A pontuação será atribuída à detecção; explicações e sugestões serão consideradas apenas quando fornecerem essa evidência.

## Modelos avaliados

Serão avaliados dois modelos locais e um modelo em nuvem:

| Identificador | Modelo              | Execução | Quantização local |
| ------------- | ------------------- | -------- | ----------------- |
| M1            | gemma-4-E4B-it-GGUF | Local    | Q4                |
| M2            | Qwen3.6-27B-GGUF    | Local    | Q4_K_M            |
| M3            | GPT-5.6 Luna        | Nuvem    | —                 |

O GPT-5.6 Luna será utilizado como referência em nuvem para investigar o quanto os modelos locais se aproximam de um possível teto de desempenho na detecção. As diferenças na medida F1, acompanhadas de precisão, revocação e contagem de falsos positivos, permitirão comparar os resultados obtidos com as mesmas entradas e instruções. A hipótese de que o modelo em nuvem represente esse teto será examinada na análise dos resultados.

### Configurações padrão e ambiente de execução

Serão utilizadas as **configurações padrão do ATLAS para cada ambiente**: as de execução local para M1 e M2 e as de execução em nuvem para M3. A versão do ATLAS e as configurações de partida serão mantidas ao longo da coleta. Os parâmetros efetivamente aplicados, incluindo ajustes automáticos da ferramenta e eventuais restrições do provedor em nuvem, serão registrados nos metadados das execuções.

Para M1 e M2, serão utilizados os seguintes **parâmetros locais de partida**, definidos em [AtlasLocalModelDefaults.ts](../src/services/AtlasLocalModelDefaults.ts):

| Parâmetro | Valor padrão |
| --- | --- |
| Temperatura (`temperature`) | `0.4` |
| Amostragem por probabilidade acumulada (`topP`) | `0.95` |
| Limite de geração (`maxTokens`) | `8192` tokens |
| Janela de contexto inicial (`contextWindow`) | `8192` tokens |
| Camadas na GPU (`gpuLayers`) | `0` (automático) |
| Threads (`threads`) | `0` (automático) |
| Tamanho do lote (`batchSize`) | `0` (automático) |
| Tamanho do microlote (`microBatchSize`) | `0` (automático) |
| Flash Attention (`flashAttention`) | `auto` |
| Tipo do cache de chaves e valores (`kvCacheType`) | `auto` |
| Modo de carregamento (`loadMode`) | `auto` |

Também serão mantidas as opções padrão da execução local definidas em [AtlasConfigDefaults.ts](../src/repository/AtlasConfigDefaults.ts): ajuste automático de contexto (`dynamicContextWindow = true`), preparação da engine ao abrir o ATLAS (`prepareOnAtlasOpen = true`), resposta em streaming (`stream = true`) e timeout configurado de `30` segundos (`timeout = 30`).

Nos parâmetros `gpuLayers`, `threads`, `batchSize` e `microBatchSize`, **`0` representa o modo automático (`auto`)**: o ATLAS deixa os argumentos correspondentes sem definição explícita, e a engine instalada define os valores utilizados. As opções `auto` de Flash Attention, cache e carregamento também seguem os padrões da engine. A janela de contexto poderá aumentar automaticamente quando a requisição exceder sua capacidade inicial. A janela efetiva e os demais parâmetros aplicados serão registrados por execução.

Os identificadores exatos dos modelos e os ambientes de execução serão registrados antes da coleta, incluindo o arquivo GGUF e a variante de quantização de cada modelo local. Os campos abaixo compõem um **template que será preenchido antes das execuções**:

| Campo | Valor a registrar |
| --- | --- |
| Versão ou commit do ATLAS | `[PREENCHER: versão ou commit utilizado]` |
| Versão do llama.cpp | `[PREENCHER: tag da release ou commit utilizado]` |
| Engine local | `[PREENCHER: CPU, CUDA ou Vulkan]` |
| Release da engine no GitHub | `[PREENCHER: URL da release utilizada]` |
| Pacote da engine | `[PREENCHER: nome do arquivo baixado do GitHub]` |
| Provedor de execução em nuvem de M3 | `[PREENCHER: provedor utilizado]` |

Os dados da engine local serão associados a M1 e M2. Caso utilizem a mesma instalação, esse uso compartilhado será registrado; caso utilizem versões ou engines diferentes, os dados de cada modelo serão documentados separadamente.

## Tipos de teste

### Avaliação comparativa da detecção

Serão realizados experimentos controlados com os mesmos arquivos, a mesma solicitação e as mesmas instruções do modo de análise arquitetural para todos os modelos. Cada combinação de modelo e código será executada **cinco vezes**, com o arquivo submetido integralmente em uma sessão nova a cada execução.

Na análise arquitetural, o ATLAS envia o código **com numeração de linhas**, no formato `<linha> | conteúdo`. Os números correspondem às linhas originais do arquivo integral, a partir de 1, preservando o conteúdo e a ordem, inclusive as linhas em branco. Os prefixos são metadados de localização e não integram o código-fonte. A mesma representação numerada será utilizada para todos os modelos e repetições.

Com **dez códigos, três modelos e cinco repetições**, serão realizadas **150 execuções**. Cada problema esperado será avaliado cinco vezes por modelo, totalizando **15 avaliações por problema** entre os três modelos. Os problemas presentes no mesmo código serão avaliados juntos em cada execução.

Para cada problema esperado, será verificado se houve uma identificação correta ou uma omissão. Também serão examinados os apontamentos adicionais para identificar falsos positivos e registrar os demais casos previstos nas regras de classificação.

As contagens de verdadeiros positivos, falsos positivos e falsos negativos permitirão calcular as métricas e comparar os resultados por modelo, código, cenário e tipo de problema.

### Verificação técnica dos exemplos

A verificação técnica dos exemplos será feita por compilação e execução dos comportamentos documentados nas referências de avaliação. Essa etapa permitirá conferir a correspondência entre os códigos e os problemas descritos.

## Registro das informações

As informações serão organizadas em **uma planilha com três abas**:

- **Execuções:** 150 linhas de registro, uma por execução, com a identificação, o modelo, o código analisado, a repetição (de 1 a 5), os problemas detectados, as contagens, as métricas e as observações.
- **Resumo por repetição:** resultados de cada rodada completa dos dez códigos, separados por modelo e repetição.
- **Comparação dos modelos:** médias das métricas entre as rodadas completas, desvio padrão de F1 por modelo e frequência de detecção de cada problema esperado.

Na aba **Execuções**, serão utilizadas as seguintes colunas:

Exemplo ilustrativo de preenchimento:

| Execução | Modelo                   | Código | Repetição | Problemas detectados | VP  | FP  | FN  | Precisão | Revocação | F1   | Observações                                   |
| -------- | ------------------------ | ------ | --------- | -------------------- | --- | --- | --- | -------- | --------- | ---- | --------------------------------------------- |
| EXEC-001 | M1 — gemma-4-E4B-it-GGUF | C1-A   | 1         | C1-A-01; C1-A-03     | 2   | 1   | 1   | 0,67     | 0,67      | 0,67 | Omissão de C1-A-02 e um apontamento indevido. |

A coluna **Problemas detectados** listará os identificadores únicos dos problemas esperados corretamente identificados, conforme a referência do arquivo. A quantidade desses identificadores corresponderá à contagem de VP.

A coluna **Observações** reunirá anotações relevantes sobre a execução e a classificação dos apontamentos, como justificativas de falsos positivos, omissões, achados reais não previstos e casos indeterminados. Também serão anotadas interrupções ou falhas técnicas.

As respostas integrais e os metadados de coleta serão preservados em arquivos identificados pelo código da execução, incluindo data e horário, configuração utilizada, situação da execução e eventuais erros.

A coluna **Modelo** na planilha de coleta apresentará o identificador e o nome: **M1 — gemma-4-E4B-it-GGUF**, **M2 — Qwen3.6-27B-GGUF** e **M3 — GPT-5.6 Luna**. Para a classificação, serão utilizadas cópias identificadas pelo código da execução, com os nomes dos modelos e demais metadados de identificação ocultados. A correspondência entre execuções e modelos será mantida separada dos materiais apresentados aos avaliadores.

Precisão, revocação e F1 serão calculadas automaticamente a partir das contagens, conforme as regras do plano. A aba **Resumo por repetição** reunirá a soma de VP, FP e FN dos dez códigos e as métricas de cada rodada completa. A aba **Comparação dos modelos** apresentará as médias entre essas rodadas e a variação de F1. As regras de preenchimento estão detalhadas na [referência de avaliação da detecção](deteccao-arquitetural/referencias/README.md#registro-das-execucoes).

### Frequência de detecção por problema

Na aba **Comparação dos modelos**, também será apresentada uma tabela com **72 linhas**, uma para cada combinação dos 24 problemas esperados com os três modelos. Serão utilizadas as colunas **Modelo**, **Problema**, **Tipo**, **Detecções**, **Execuções avaliadas** e **Frequência**.

As contagens serão calculadas automaticamente a partir da aba Execuções. **Detecções** indicará em quantas execuções avaliadas o identificador do problema aparecerá em Problemas detectados. **Execuções avaliadas** indicará quantas das cinco análises do arquivo correspondente estarão classificadas para aquele modelo. A frequência corresponderá à divisão entre essas duas contagens, apresentada em percentual.

Somente serão consideradas execuções com modelo, código, repetição de 1 a 5 e classificação válida, incluindo o preenchimento de FP. Registros duplicados para a mesma combinação de modelo, código e repetição serão excluídos dessa contagem até sua correção. Sem execuções avaliadas, a frequência ficará em branco. Após cinco avaliações, 100% indicará detecção em todas, 0% indicará omissão em todas e valores intermediários indicarão variação.

O tipo principal de cada problema será obtido de sua referência individual. A tabela permitirá filtrar os resultados por tipo para a QP3 e acompanhar a regularidade da detecção de cada item para a QP4, complementando as métricas agregadas.

## Cenários e exemplos

O conjunto contém **dez arquivos TypeScript independentes**, distribuídos em cinco cenários, com dois códigos por cenário:

1. responsabilidades excessivas e baixa coesão;
2. acoplamento a implementações concretas;
3. encapsulamento inadequado de regras e estado do domínio;
4. dificuldade de extensão;
5. estado global e baixa testabilidade.

Cada código contém pelo menos dois problemas esperados, todos com tipo principal correspondente ao cenário do arquivo. As referências individuais documentam **24 problemas esperados**, com identificadores, evidências e critérios mínimos de detecção. A construção concentra os mecanismos no cenário correspondente para facilitar a comparação por tipo e reduzir a mistura de fatores na avaliação. Consequências relacionadas a outros princípios não geram novos itens automaticamente.

Os exemplos foram construídos a partir de conceitos e exemplos didáticos do _Code Smells Catalog_, mantido no repositório Luzkan/smells. As adaptações para TypeScript e as justificativas de seleção estão documentadas na [seleção das fontes](deteccao-arquitetural/selecao-fontes.md).

## Justificativa da abordagem

A detecção constitui uma tarefa delimitada, com resultados que podem ser comparados por meio de critérios previamente definidos. Concentrar a avaliação nesse aspecto torna a coleta e a classificação viáveis no escopo do TCC e permite relacionar as questões de pesquisa a medidas concretas.

Os exemplos autocontidos permitem localizar as evidências no próprio arquivo submetido. A padronização das entradas e a manutenção do mesmo conjunto de instruções de comportamento favorecem a comparação entre os modelos, enquanto as repetições permitem observar a estabilidade das respostas. A documentação prévia dos problemas orientará a classificação e manterá os critérios definidos antes da coleta.

As conclusões descreverão a eficácia da detecção obtida com esse conjunto de instruções nos modelos, códigos e configurações avaliados. Os cenários construídos permitirão uma comparação exploratória dos resultados, sem estabelecer superioridade universal de um modelo para qualquer projeto.

## Organização dos materiais

- [Plano de testes](deteccao-arquitetural/main3.tex): protocolo, questões de pesquisa e métricas.
- [Planilha de registro](deteccao-arquitetural/outputs/registro-deteccao/registro-execucoes.xlsx): abas de execuções, resumo por repetição e comparação dos modelos, com listas suspensas e cálculos automáticos.
- [Códigos dos cenários](deteccao-arquitetural/codigos): arquivos que serão submetidos aos modelos.
- [Referência de avaliação da detecção](deteccao-arquitetural/referencias/README.md): regras comuns e um Markdown por código.
- [Seleção das fontes](deteccao-arquitetural/selecao-fontes.md): origem dos conceitos, adaptações e justificativas.
