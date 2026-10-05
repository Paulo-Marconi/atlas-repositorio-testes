# Referência de avaliação da detecção — C5-A

- **Arquivo analisado:** [C5-A.ts](../codigos/C5-A.ts).
- **Cenário de origem:** 5 — Estado global e baixa testabilidade.
- **Problemas esperados:** 3.
- **Fonte do mecanismo principal:** [Global Data](https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/global-data.md). Os mecanismos adicionais são construções da adaptação dentro do mesmo cenário, documentadas por inspeção do código; não são atribuídos automaticamente ao exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [Referência de avaliação da detecção](README.md).

A correspondência será verificada na resposta completa. O reconhecimento da tensão ou do risco com evidência concreta poderá contar como detecção, mesmo quando o modelo considera o desenho aceitável ou recomenda adiar uma refatoração. Não será exigido nome exato do smell nem reprodução de uma resposta ideal.

## Problemas esperados

### C5-A-01 — Checkout depende do cliente global compartilhado

- **Tipo:** Estado global e dependências ocultas.
- **Decisão ou fragilidade observável:** Cada `Checkout` consulta `currentCustomer` no momento da cotação. Criar outra sessão por `startCheckout` altera o cliente de instâncias anteriores e torna as operações sensíveis à ordem de seleção.
- **Elementos e evidências:** `currentCustomer` pertence ao módulo (linha 4); `selectCustomer` o substitui (linhas 7–11); `quote` lê seus dados e `startCheckout` seleciona o cliente global (linha 22; linhas 41–43).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica a dependência de `Checkout` no cliente global mutável e seu efeito sobre isolamento de instâncias ou ordem de execução.
- **Variações de nome:**
  - Cliente atual compartilhado entre checkouts.
  - Contexto global de cliente na cotação.
  - Sessões de checkout sem isolamento de cliente.
- **Formulações equivalentes aceitas:** Global Data, dependência oculta, estado compartilhado ou acoplamento temporal na seleção do cliente.
- **Afirmações insuficientes:** “Variáveis globais são ruins”; alegar que o objeto pode ser alterado diretamente por importação; afirmar que instâncias guardam clientes próprios.
- **Distinção e contagem:** Identidade e desconto do cliente integram o mesmo contexto e um único item. O estado tributário e o relógio exigem evidências próprias.

### C5-A-02 — Tributação global altera cotações de instâncias existentes

- **Tipo:** Estado global e dependências ocultas.
- **Decisão ou fragilidade observável:** `configureTax` modifica `taxPercent` compartilhado. `Checkout.quote` não recebe a política tributária, então mudar a configuração altera qualquer checkout e pode contaminar execuções ou testes posteriores.
- **Elementos e evidências:** `taxPercent` pertence ao módulo e `configureTax` o modifica (linha 5; linhas 14–16); `quote` lê o percentual global (linha 25).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica a configuração tributária global como dependência implícita das cotações e relaciona sua alteração ao isolamento ou à ordem dos testes/operações.
- **Variações de nome:**
  - Configuração tributária compartilhada entre instâncias.
  - Cotação dependente de imposto global mutável.
  - Estado tributário que contamina testes de checkout.
- **Formulações equivalentes aceitas:** Global Data, dependência oculta de configuração, estado compartilhado ou baixo acoplamento.
- **Afirmações insuficientes:** Criticar apenas o cliente global; declarar percentual errado sem requisito; pedir injeção de modo genérico.
- **Distinção e contagem:** O cliente pode permanecer igual enquanto a configuração tributária altera a cotação. Esse estado é independente de C5-A-01; uma menção genérica a globais não gera ambos os acertos.

### C5-A-03 — Prazo da cotação depende diretamente do relógio do ambiente

- **Tipo:** Estado global e dependências ocultas.
- **Decisão ou fragilidade observável:** `reserveQuote` chama `Date.now` sem receber relógio ou instante. Mesmas entradas e configurações não fixam a validade temporal da cotação, dificultando testes determinísticos do prazo.
- **Elementos e evidências:** `reserveQuote` define `expiresAtMillis` com `Date.now()` (linhas 36–37).
- **Critério mínimo de detecção:** Será verificado se a resposta identifica a leitura direta de `Date.now` na reserva da cotação e relaciona essa dependência oculta à dificuldade de controlar o tempo ou repetir testes de validade.
- **Variações de nome:**
  - Relógio do sistema como dependência oculta.
  - Validade de cotação sem controle do tempo em testes.
  - Acoplamento temporal ao ambiente de execução.
- **Formulações equivalentes aceitas:** Hidden Dependencies, relógio não substituível, baixa testabilidade ou proteção contra variações do ambiente.
- **Afirmações insuficientes:** “O prazo deveria ser diferente”; dizer que qualquer horário é um problema; criticar apenas cliente ou imposto.
- **Distinção e contagem:** O item é a dependência implícita do relógio, distinta dos dois estados mutáveis do módulo. A diferença natural entre horários só demonstra a fragilidade quando relacionada ao controle dessa dependência.

