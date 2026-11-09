# Repositório de testes do ATLAS

Este repositório reúne os códigos e a referência da avaliação experimental de detecção de problemas estruturais pelo modo arquitetural do ATLAS. O estudo compara modelos sob as mesmas instruções e entradas, com RAG desativado. A referência utiliza SOLID, GRASP, coesão, acoplamento e mecanismos do Code Smells Catalog quando pertinentes.

## Conjunto de avaliação

São **dez arquivos TypeScript independentes, três ocorrências por arquivo e 30 problemas esperados**. O [planejamento do experimento](deteccao-arquitetural/planejamento-experimento.md) apresenta as decisões de construção e avaliação; o [inventário](deteccao-arquitetural/inventario.json) contém os mecanismos, critérios e evidências dos 30 itens.

| Cenário   | Categoria                                               | Arquivos        | Problemas |
| --------- | ------------------------------------------------------- | --------------- | --------: |
| C1        | Responsabilidades excessivas e baixa coesão             | C1-A e C1-B     |         6 |
| C2        | Acoplamento a implementações concretas                  | C2-A e C2-B     |         6 |
| C3        | Encapsulamento inadequado de regras e estado do domínio | C3-A e C3-B     |         6 |
| C4        | Dificuldade de extensão                                 | C4-A e C4-B     |         6 |
| C5        | Estado global e baixa testabilidade                     | C5-A e C5-B     |         6 |
| **Total** | **Cinco categorias**                                    | **Dez códigos** |    **30** |

Os nomes dos itens descrevem mecanismos gerais. O reconhecimento de um problema esperado exige identificar a fragilidade e localizar a unidade afetada com evidência no arquivo. Formulações equivalentes são aceitas, sem exigir uma consequência específica de negócio, nome exato de smell, severidade ou recomendação de refatoração. Uma causa com vários efeitos continua sendo um item.

C1 inclui concentração e dispersão de responsabilidades; C3 distingue escrita direta, referências devolvidas e referências recebidas; C5 agrupa os campos de um mesmo contexto global e distingue esse contexto do cache e das dependências ambientais. As [referências de avaliação](deteccao-arquitetural/referencias/README.md) especificam a contagem.

## Experimento

O [protocolo](deteccao-arquitetural/protocolo.md) detalha questões de pesquisa, modelos, ambiente documentado, coleta, falhas técnicas, classificação e métricas. Estão previstas **150 execuções**: dez códigos × três modelos × cinco repetições, em sessões sem histórico. Cada arquivo é enviado integralmente, com numeração original das linhas e sem categoria ou referência de avaliação.

O M1 é o Gemma 4 E4B (`unsloth/gemma-4-E4B-it-GGUF`), executado localmente com quantização Q4_K_M. O M2 é o GPT-OSS-20B (`unsloth/gpt-oss-20b-GGUF`), executado localmente com quantização MXFP4. O M3 é o GPT-6 Luna (`gpt-6-luna`), executado em nuvem. O protocolo documenta os parâmetros de partida e as versões declaradas e prevê o registro dos valores efetivos por execução.

A classificação inicial é revisada pela equipe, com identificação dos modelos disponível, conforme o capítulo orientador. No escopo da avaliação, FP indica um apontamento distinto de problema estrutural sem correspondência com os três problemas esperados para o arquivo. A validade desses apontamentos no código não é avaliada separadamente. Por isso, a precisão e a medida F1 expressam o desempenho em relação à referência.

O resumo agrega os dez códigos por modelo e repetição. A comparação usa rodadas completas e o desvio padrão de F1. Não se mede a contribuição causal isolada do prompt, a qualidade das explicações ou a correção das soluções sugeridas.

## Planilha de coleta

A [planilha de registro](deteccao-arquitetural/outputs/registro-deteccao/registro-execucoes.xlsx) mantém as abas Execuções, Resumo por repetição e Comparação dos modelos. Há 150 linhas, oito combinações de seleção por código e 90 combinações problema/modelo para frequência. Os identificadores registrados em Problemas detectados determinam VP. FN é 3 − VP. O campo FP registra o total de apontamentos distintos sem correspondência com a referência do arquivo. O valor zero indica a ausência desses apontamentos.

O arquivo foi preparado para importação no **Google Planilhas**, com menus de problemas baseados em intervalos auxiliares por linha e validação explícita de FP inteiro não negativo. O [guia de importação e preenchimento](deteccao-arquitetural/outputs/registro-deteccao/README.md) explica o uso e a conferência após a importação.

As métricas são automáticas. A precisão é indefinida quando VP e FP são ambos zero. A revocação e a medida F1 são zero quando nenhum problema esperado é detectado em uma execução classificada. Duplicações são excluídas da frequência e impedem uma rodada completa até correção. O protocolo prevê a preservação das respostas e dos metadados integrais de cada execução.

## Materiais e estágio

- [Códigos dos cenários](deteccao-arquitetural/codigos): somente os arquivos submetidos aos modelos.
- [Referência de avaliação](deteccao-arquitetural/referencias/README.md): critérios e documentos por código.
- [Seleção das fontes](deteccao-arquitetural/selecao-fontes.md): fundamentos e adaptações.
- [Protocolo](deteccao-arquitetural/protocolo.md): regras operacionais da avaliação.
- [Verificação técnica](deteccao-arquitetural/verificacao-tecnica.md): testes realizados, cálculos da planilha e limites da conferência.
- [Planejamento do experimento](deteccao-arquitetural/planejamento-experimento.md): decisões de construção dos cenários e critérios de avaliação.
