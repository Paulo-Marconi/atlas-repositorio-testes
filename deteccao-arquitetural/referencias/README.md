# Referência de avaliação da detecção

O conjunto contém **30 problemas em dez arquivos**, três por arquivo e seis por cenário. Os mecanismos foram verificados tecnicamente; a revisão independente da equipe e a fixação do commit para coleta ainda deverão ocorrer.

O [inventário](../inventario.json) contém os identificadores, mecanismos, critérios, fontes e âncoras das evidências. As referências individuais são geradas por `pnpm references`; `pnpm references:check` detecta divergências entre elas, o inventário e o código. O [planejamento do experimento](../planejamento-experimento.md) apresenta as decisões de construção dos cenários.

Cada referência abre com os mecanismos do Code Smells Catalog utilizados, os fundamentos complementares e a adaptação construída para o cenário, indicando quais itens cada fonte apoia. Os nomes das fontes são links para os textos correspondentes; o resumo não atribui automaticamente as construções do experimento aos exemplos originais.

## Referências por arquivo

| Código | Referência | Categoria principal | Problemas |
| --- | --- | --- | ---: |
| [C1-A](../codigos/C1-A.ts) | [C1-A.md](C1-A.md) | Responsabilidades e coesão | 3 |
| [C1-B](../codigos/C1-B.ts) | [C1-B.md](C1-B.md) | Responsabilidades e coesão | 3 |
| [C2-A](../codigos/C2-A.ts) | [C2-A.md](C2-A.md) | Acoplamento a implementações concretas | 3 |
| [C2-B](../codigos/C2-B.ts) | [C2-B.md](C2-B.md) | Acoplamento a implementações concretas | 3 |
| [C3-A](../codigos/C3-A.ts) | [C3-A.md](C3-A.md) | Encapsulamento de regras e estado | 3 |
| [C3-B](../codigos/C3-B.ts) | [C3-B.md](C3-B.md) | Encapsulamento de regras e estado | 3 |
| [C4-A](../codigos/C4-A.ts) | [C4-A.md](C4-A.md) | Dificuldade de extensão | 3 |
| [C4-B](../codigos/C4-B.ts) | [C4-B.md](C4-B.md) | Dificuldade de extensão | 3 |
| [C5-A](../codigos/C5-A.ts) | [C5-A.md](C5-A.md) | Estado global e dependências ocultas | 3 |
| [C5-B](../codigos/C5-B.ts) | [C5-B.md](C5-B.md) | Estado global e dependências ocultas | 3 |
| **Total** | **10 referências** | **Cinco categorias** | **30** |

Os nomes descrevem o mecanismo estrutural. Os conceitos de SOLID, GRASP, coesão e acoplamento apoiam a interpretação; nomes de princípios não são, isoladamente, detecções. Os exemplos têm contexto de relatórios, matrícula, folha, entregas, carteira, reservas, exportação, cotações e recibos. O reconhecimento não exige reproduzir a narrativa de negócio.

## Variações de título na classificação

Cada problema apresenta quatro exemplos de títulos que podem descrever a mesma ocorrência. As variações incluem expressões mais gerais e nomes ligados às unidades do código, para ajudar a localizar o item esperado mesmo quando a análise usa outro vocabulário. Elas estão registradas em `titleVariants` no inventário e são reproduzidas nas referências individuais.

O título serve como pista. A classificação considera a resposta completa com base no **critério mínimo de detecção**, nos **elementos e evidências** e na **distinção e contagem**. Um título igual ou semelhante não garante VP. Um título diferente pode demonstrar a mesma ocorrência. A lista é ilustrativa. Nomes genéricos como “baixa coesão”, “acoplamento” ou “dependência oculta” podem se referir a vários itens e exigem a identificação do mecanismo próprio de cada um.

Por exemplo, “Conhecimento de formatos duplicado” pode corresponder a **C4-A-01** quando a análise relaciona `encode`, `contentType` e `extension` ao custo de incluir formatos. “API de ordenação com operações duplicadas” pode corresponder a **C4-A-03** quando o texto reconhece as combinações de chave e direção e seu custo de ampliação. Uma crítica ao contrato posicional da função de preparação conta como FP se a resposta o aponta como problema estrutural distinto e o apontamento não corresponde a nenhum dos três itens de C4-A.

Vários títulos para o mesmo mecanismo geram no máximo um VP por identificador. A análise pode reconhecer a fragilidade no corpo do texto sem incluí-la na visão geral; considerar a mudança adiável não elimina a detecção quando o mecanismo foi reconhecido.

## Detecção, unidade de contagem e formulações equivalentes

Uma ocorrência esperada combina **uma unidade ou relação afetada com um mecanismo estrutural verificável**. Os princípios e os nomes de smells são interpretações dessa ocorrência, não contagens adicionais.

1. Campos públicos relacionados da mesma classe são tratados conjuntamente quando representam a mesma fronteira de escrita externa. O número de campos não define o número de problemas.
2. Efeitos de uma causa, como estado inválido, ausência de registro e dificuldade de teste, não geram itens adicionais.
3. Fronteiras distintas podem sustentar ocorrências diferentes: escrever em um campo, modificar uma referência devolvida e modificar uma entrada retida são caminhos independentes a serem demonstrados.
4. Uma dependência descrita como DIP, OCP e baixo acoplamento gera um acerto, desde que esses rótulos se refiram ao mesmo vínculo.
5. O mesmo mecanismo pode ocorrer em unidades diferentes, mas cada acerto exige localizar sua própria evidência.
6. Uma crítica ao arquivo inteiro não recebe automaticamente os três acertos. Uma frase que localize mais de uma ocorrência pode demonstrar vários itens, sem precisar separar a resposta em tópicos.
7. A revisão verifica se uma alteração localizada trata cada item e mantém os demais observáveis. Essa verificação apoia o julgamento da equipe sobre a independência dos itens.
8. Um construtor, um método estático, um campo público ou um condicional não caracteriza sozinho um problema. A dimensão estrutural é demonstrada pela dependência, pela exposição ou pelo custo de mudança.

Uma detecção exige reconhecer a fragilidade e localizar seu mecanismo. Não exige reproduzir todas as consequências descritas, empregar um termo específico, fornecer um ataque ou caso de falha, nem propor uma técnica de correção. Uma análise que reconheça o custo estrutural e considere o desenho aceitável no momento ainda pode demonstrar detecção.

| Resposta ilustrativa | Tratamento |
| --- | --- |
| “O serviço chama diretamente a consulta estática de WorkLedger, dificultando substituí-la.” | Demonstra o mecanismo de acoplamento estático no consumidor. |
| “DIP violado.” | Insuficiente sem localizar a dependência na resposta completa. |
| “Wallet permite alterar seu estado diretamente, contornando as operações da classe.” | Pode demonstrar a exposição de campos se o contexto da resposta localizar esse caminho; não precisa detalhar todas as regras financeiras. |
| “O histórico devolve a coleção interna e permite alterá-la por fora.” | Demonstra o vazamento pelo retorno quando a operação estiver localizada. |
| “Todo switch é ruim.” | Insuficiente para demonstrar custo de extensão. |
| “Ao adicionar outro formato, é preciso alterar encode, contentType e extension.” | Demonstra o custo coordenado da seleção repetida de formato, com localização da classe na resposta. |

## Classificação dos apontamentos

- **VP:** ocorrência esperada reconhecida conforme seu critério mínimo. Cada identificador gera no máximo um acerto por resposta.
- **FN:** ocorrência esperada não reconhecida. Para uma classificação concluída, VP + FN = 3 por código, 6 por cenário e 30 por rodada completa.
- **FP (falso positivo em relação à referência):** apontamento distinto de problema estrutural sem correspondência com nenhum dos três problemas esperados para o arquivo.

Após a comparação com a referência, os apontamentos sem correspondência não foram avaliados separadamente para verificar se descreviam problemas reais no código. A contagem de FP pode, portanto, incluir tanto apontamentos sem fundamento quanto problemas reais ausentes da referência.

A classificação considera a resposta completa. Uma proposta de técnica ou uma descrição neutra do que a classe faz só demonstra detecção quando o texto também reconhece o mecanismo da fragilidade. Não se exige linha exata, título, severidade, solução ou refatoração imediata.

Uma mesma afirmação pode reconhecer vários itens quando localizar suas evidências próprias. Nomes diferentes para uma mesma causa são reunidos. Compartilhar uma classe não obriga agrupar todos os itens: em C3-A, escrita direta, retorno da coleção e retenção de uma entrada são fronteiras distintas. Saldo e bloqueio públicos, por sua vez, compõem juntos C3-A-01. Cliente e tributação globais compõem juntos C5-A-01.

## Registro e métricas

A [planilha](../outputs/registro-deteccao/registro-execucoes.xlsx) mantém três abas: Execuções, Resumo por repetição e Comparação dos modelos. São 150 linhas de coleta: dez arquivos × três modelos × cinco repetições. A coluna Problemas detectados recebe identificadores únicos separados por ponto e vírgula, ou o travessão quando não houver detecção esperada. O campo FP registra o total de apontamentos distintos sem correspondência com a referência. O valor zero indica ausência desses apontamentos. FP em branco indica classificação incompleta.

O arquivo foi adaptado para importação no Google Planilhas. O [guia de uso](../outputs/registro-deteccao/README.md) explica a importação, os menus dependentes do código e a conferência dos resultados antes da coleta.

A precisão é a proporção dos apontamentos contabilizados que correspondem à referência. A revocação é a proporção dos problemas esperados que foram reconhecidos. A medida F1 combina as duas pela média harmônica. A precisão e a medida F1 expressam o desempenho em relação à referência, pois a validade dos apontamentos sem correspondência não foi avaliada separadamente.

Precisão sem VP nem FP é indefinida. Revocação e F1 são zero quando nenhum dos três itens é detectado, inclusive sem apontamentos. O resumo soma as contagens dos dez códigos antes de calcular as métricas. Apenas rodadas completas, sem duplicação, alimentam a comparação dos modelos. O desvio padrão amostral de F1 exige duas rodadas completas.

A tabela de frequência contém **90 combinações problema/modelo**. Somente execuções classificadas, com FP preenchido, modelo/código válidos e repetição de 1 a 5 são consideradas. Duplicações da combinação modelo/código/repetição são excluídas até correção. Sem execuções avaliadas, a frequência permanece em branco. Uma frequência de 5/5 significa detecção nas cinco repetições; 0/5 significa omissão em todas.

O [protocolo](../protocolo.md) detalha entradas, ambiente, respostas, falhas técnicas e classificação. Conforme o capítulo orientador, a identificação dos modelos permanece disponível à pessoa que classifica e à equipe revisora. O protocolo prevê a preservação das respostas, dos metadados e de eventuais tentativas técnicas por identificador de execução.
