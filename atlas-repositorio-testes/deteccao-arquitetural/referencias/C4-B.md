# Referência de avaliação da detecção — C4-B

- **Arquivo analisado:** [C4-B.ts](../codigos/C4-B.ts).
- **Cenário de origem:** 4 — Dificuldade de extensão.
- **Problemas esperados:** 2.
- **Fonte do mecanismo principal:** [Combinatorial Explosion](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/combinatorial-explosion.md). Os mecanismos adicionais são construções da adaptação dentro do mesmo cenário, documentadas por inspeção do código; não são atribuídos automaticamente ao exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [Referência de avaliação da detecção](README.md).

A correspondência será verificada na resposta completa. O reconhecimento da tensão ou do risco com evidência concreta poderá contar como detecção, mesmo quando o modelo considera o desenho aceitável ou recomenda adiar uma refatoração. Não será exigido nome exato do smell nem reprodução de uma resposta ideal.

## Problemas esperados

### C4-B-01 — Métodos multiplicados por combinações de modalidade e região

- **Tipo:** Dificuldade de extensão.
- **Decisão ou fragilidade observável:** `DeliveryPricing` implementa cada combinação de modalidade e região em um método. A adição de uma modalidade ou região exige ampliar a matriz e as chamadas de composição.
- **Elementos e evidências:** Os seis métodos standard/express × local/regional/remote repetem cálculo (linhas 6–31); `quoteDeliveryOptions` chama explicitamente todas as combinações (linhas 51–62).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica a multiplicação de métodos por modalidade/região e relaciona essa organização à necessidade de criar ou alterar vários pontos para novas combinações.
- **Variações de nome:**
  - Explosão combinatória de tarifas de entrega.
  - Matriz de modalidades e regiões codificada em métodos.
  - Extensão de frete com multiplicação de operações.
- **Formulações equivalentes aceitas:** Combinatorial Explosion, OCP, proteção contra variações ou falta de composição de políticas independentes.
- **Afirmações insuficientes:** “Há duplicação” sem localizar os eixos ou o custo de extensão; apontar apenas seis métodos; dizer que a tarifa base é pública.
- **Distinção e contagem:** Repetição do cálculo e enumeração em `quoteDeliveryOptions` são consequências da mesma matriz. Não serão pontuadas separadamente.

### C4-B-02 — Política de descontos fechada nos níveis de cliente existentes

- **Tipo:** Dificuldade de extensão.
- **Decisão ou fragilidade observável:** `ShippingDiscount.apply` concentra descontos dos níveis bronze/silver/gold em um switch. Incluir outro nível ou uma política substituível requer modificar a união e o método central.
- **Elementos e evidências:** `CustomerTier` lista os níveis (linha 1); `ShippingDiscount.apply` fixa as três políticas (linhas 41–46).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica o despacho fixo dos descontos em `ShippingDiscount` e reconhece seu custo de extensão para novos níveis/políticas.
- **Variações de nome:**
  - Descontos de frete sem ponto de extensão.
  - Níveis de cliente fixados no cálculo de desconto.
  - Política de desconto central fechada a variações.
- **Formulações equivalentes aceitas:** OCP, proteção contra variações ou Conditional Complexity aplicada à política de desconto.
- **Afirmações insuficientes:** “Um switch é ruim”; afirmar que os percentuais estão incorretos sem requisito; criticar apenas modalidades e regiões.
- **Distinção e contagem:** Nível de cliente é um eixo independente da matriz de modalidade/região. Alterar a estrutura de tarifas não torna automaticamente extensível o desconto.

