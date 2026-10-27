# Repositório de testes do ATLAS

Este repositório reúne os códigos e a referência da avaliação experimental de detecção de problemas estruturais pelo modo arquitetural do ATLAS. O estudo compara modelos sob as mesmas instruções e entradas, com RAG desativado. A referência utiliza SOLID, GRASP, coesão, acoplamento e mecanismos do Code Smells Catalog quando pertinentes.

## Conjunto de avaliação

São **dez arquivos TypeScript independentes, três ocorrências por arquivo e 30 problemas esperados**. O [planejamento do experimento](deteccao-arquitetural/planejamento-experimento.md) apresenta as decisões de construção e avaliação; o [inventário](deteccao-arquitetural/inventario.json) contém os mecanismos, critérios e evidências dos 30 itens.

| Cenário | Categoria | Arquivos | Problemas |
| --- | --- | --- | ---: |
| C1 | Responsabilidades excessivas e baixa coesão | C1-A e C1-B | 6 |
| C2 | Acoplamento a implementações concretas | C2-A e C2-B | 6 |
| C3 | Encapsulamento inadequado de regras e estado do domínio | C3-A e C3-B | 6 |
| C4 | Dificuldade de extensão | C4-A e C4-B | 6 |
| C5 | Estado global e baixa testabilidade | C5-A e C5-B | 6 |
| **Total** | **Cinco categorias** | **Dez códigos** | **30** |

Os nomes dos itens descrevem mecanismos gerais. Cada detecção exige reconhecer uma fragilidade e localizar a unidade afetada com evidência no arquivo. Formulações equivalentes são aceitas, sem exigir uma consequência específica de negócio, nome exato de smell, severidade ou recomendação de refatoração. Uma causa com vários efeitos continua sendo um item. Um achado real fora da referência não se torna falso positivo por não estar listado.

C1 inclui concentração e dispersão de responsabilidades; C3 distingue escrita direta, referências devolvidas e referências recebidas; C5 agrupa os campos de um mesmo contexto global e distingue esse contexto do cache e das dependências ambientais. As [referências de avaliação](deteccao-arquitetural/referencias/README.md) especificam a contagem.

## Experimento

O [protocolo](deteccao-arquitetural/protocolo.md) detalha questões de pesquisa, modelos, ambiente documentado, coleta, falhas técnicas, classificação e métricas. Estão previstas **150 execuções**: dez códigos × três modelos × cinco repetições, em sessões sem histórico. Cada arquivo é enviado integralmente, com numeração original das linhas e sem categoria ou referência de avaliação.

Modelos documentados no capítulo orientador: M1 — gemma-4-E4B-it-GGUF; M2 — Qwen3.6-27B-GGUF; M3 — GPT-6 Luna (`gpt-6-luna`). Os modelos locais usam Q4_K_M. Os parâmetros de partida e as versões declaradas estão no protocolo; os valores efetivos deverão ser preservados por execução.

A classificação inicial é revisada pela equipe, com identificação dos modelos disponível, conforme o capítulo orientador. As contagens de VP, FP e FN alimentam precisão, revocação, F1 e frequência de detecção. O resumo agrega os dez códigos por modelo/repetição; a comparação usa rodadas completas e desvio padrão de F1. Não se mede a contribuição causal isolada do prompt, a qualidade das explicações ou a correção das soluções sugeridas.

## Verificação técnica

Na raiz do repositório, usar Node.js 22.13 ou superior e pnpm 11.25.0:

```sh
pnpm install --frozen-lockfile
pnpm verify
```

O TypeScript 5.9.3 está fixado no lockfile. Os testes compilam os dez arquivos em modo estrito num diretório temporário e verificam os fluxos e mecanismos observáveis, incluindo cópias temporárias de contraste em C5. Os testes não são enviados aos modelos. Propriedades de responsabilidade e extensão também requerem revisão da estrutura pela equipe.

Para atualizar as regiões de evidência após editar o código, executar `pnpm references`. Para conferir as referências sem modificá-las, executar `pnpm references:check`. O inventário e os códigos são as entradas desse gerador; as dez referências individuais são os documentos resultantes.

## Planilha de coleta

A [planilha de registro](deteccao-arquitetural/outputs/registro-deteccao/registro-execucoes.xlsx) mantém as abas Execuções, Resumo por repetição e Comparação dos modelos. Há 150 linhas, oito combinações de seleção por código e 90 combinações problema/modelo para frequência. Os identificadores registrados em Problemas detectados determinam VP; FN é 3 − VP. FP deve ser preenchido, inclusive com zero, para concluir uma classificação.

O arquivo foi preparado para importação no **Google Planilhas**, com menus de problemas baseados em intervalos auxiliares por linha e validação explícita de FP inteiro não negativo. O [guia de importação e preenchimento](deteccao-arquitetural/outputs/registro-deteccao/README.md) explica o uso e a conferência após a importação.

As métricas são automáticas. Precisão sem VP ou FP permanece indefinida; revocação e F1 são zero sem detecções esperadas. Duplicações são excluídas da frequência e impedem uma rodada completa até correção. Respostas e metadados integrais devem ser preservados por execução, segundo o protocolo.

## Materiais e estágio

- [Códigos dos cenários](deteccao-arquitetural/codigos): somente os arquivos submetidos aos modelos.
- [Referência de avaliação](deteccao-arquitetural/referencias/README.md): critérios e documentos por código.
- [Seleção das fontes](deteccao-arquitetural/selecao-fontes.md): fundamentos e adaptações.
- [Protocolo](deteccao-arquitetural/protocolo.md): regras operacionais da avaliação.
- [Verificação técnica](deteccao-arquitetural/verificacao-tecnica.md): testes realizados, cálculos da planilha e limites da conferência.
- [Planejamento do experimento](deteccao-arquitetural/planejamento-experimento.md): decisões de construção dos cenários e critérios de avaliação.

Os exemplos e os materiais estão implementados e tecnicamente verificados. A revisão independente da equipe, a fixação do commit e das instruções de coleta e as execuções dos modelos ainda precisam ocorrer para produzir os resultados do experimento. A amostra construída permite comparação exploratória; não estabelece superioridade universal ou validação automática das adaptações pelas fontes.
