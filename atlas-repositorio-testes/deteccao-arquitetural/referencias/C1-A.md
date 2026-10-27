# Referência de avaliação da detecção — C1-A

- **Arquivo analisado:** [C1-A.ts](../codigos/C1-A.ts).
- **Cenário:** Responsabilidades excessivas e baixa coesão.
- **Problemas esperados:** 3.
- **Mecanismos do Code Smells Catalog:** [Divergent Change][S6] — motivos independentes de mudança concentrados em SalesReport e ReportAccount (01 e 02); [Shotgun Surgery][S7] — mudança da regra de assinatura exige atualizar cotação e cobrança (03).
- **Fundamentos complementares:** [SRP (Martin)][S2] — separação de responsabilidades associadas a políticas independentes (01 e 02).
- **Adaptação do cenário:** O fluxo de relatórios e assinatura e a combinação dos três itens foram construídos para o experimento; não constituem um exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [referência de avaliação da detecção](README.md), [inventário](../inventario.json) e [detalhamento das fontes](../selecao-fontes.md).

## Problemas esperados

### C1-A-01 — Concentração de responsabilidades

**Variações de título (exemplos):**

- “Persistência, regras e apresentação concentradas em SalesReport”
- “Acúmulo de responsabilidades em SalesReport”
- “Baixa coesão entre armazenamento, cálculo e apresentação”
- “Múltiplos motivos de mudança em SalesReport”

**Como confirmar a detecção:**

- **Tipo:** Responsabilidades e coesão.
- **Fundamentação:** [SRP (Martin)][S2], [Divergent Change][S6].
- **Decisão ou fragilidade observável:** SalesReport implementa armazenamento e interpretação de documentos, cálculo de vendas e apresentação textual. Mudanças nessas decisões atingem a mesma classe.
- **Elementos e evidências:** SalesReport: persistência, cálculo e apresentação: [linhas 9–46](../codigos/C1-A.ts#L9-L46).
- **Critério mínimo de detecção:** reconhecer a concentração de pelo menos duas dessas responsabilidades na classe ou operação e relacioná-la à baixa coesão ou a motivos independentes de mudança.
- **Formulações equivalentes aceitas:** SRP, baixa coesão, acúmulo de responsabilidades ou Divergent Change com essa evidência.
- **Afirmações insuficientes:** Quantidade de métodos ou descrição do fluxo sem reconhecer responsabilidades independentes ou a regra dispersa.
- **Distinção e contagem:** separar apresentação ou persistência deixa intactos o acúmulo de políticas da unidade do item 02 e a regra duplicada do item 03. Não pontuar cada responsabilidade como um problema diferente.

### C1-A-02 — Políticas independentes na mesma classe

**Variações de título (exemplos):**

- “Mistura de controle de acesso e cobrança em ReportAccount”
- “Responsabilidades financeiras e de permissão concentradas”
- “Baixa coesão entre acesso e finanças em ReportAccount”
- “Fronteira de ReportAccount reúne políticas independentes”

**Como confirmar a detecção:**

- **Tipo:** Responsabilidades e coesão.
- **Fundamentação:** [SRP (Martin)][S2], [Divergent Change][S6].
- **Decisão ou fragilidade observável:** ReportAccount mantém permissões de leitura e regras financeiras de cobrança/pagamento. Os dois grupos possuem estado e operações próprios na mesma unidade.
- **Elementos e evidências:** ReportAccount: acesso e cobrança: [linhas 48–71](../codigos/C1-A.ts#L48-L71).
- **Critério mínimo de detecção:** reconhecer as duas políticas na mesma unidade e sua concentração como fragilidade de responsabilidade ou coesão. Não exigir discutir autenticação segura ou critérios financeiros.
- **Formulações equivalentes aceitas:** mistura de políticas, baixa coesão, SRP ou responsabilidades independentes acumuladas.
- **Afirmações insuficientes:** Quantidade de métodos ou descrição do fluxo sem reconhecer responsabilidades independentes ou a regra dispersa.
- **Distinção e contagem:** extrair a responsabilidade de acesso mantém o item 01 e a duplicação da política comercial do item 03. Usar a mesma política em um orquestrador por delegação não deve reproduzir o defeito.

### C1-A-03 — Responsabilidade de regra dispersa

**Variações de título (exemplos):**

- “Regra de preço duplicada entre cotação e cobrança”
- “Cálculo da assinatura sem fonte única”
- “Política de assinatura espalhada entre classes”
- “Alterações coordenadas na precificação de quote e chargeSubscription”

**Como confirmar a detecção:**

- **Tipo:** Responsabilidades e coesão.
- **Fundamentação:** [Shotgun Surgery][S7].
- **Decisão ou fragilidade observável:** ReportAccount.chargeSubscription e SubscriptionPreview.quote implementam separadamente a mesma regra de cobrança por assinatura e quantidade de assentos. Uma alteração dessa política exige manter as duas implementações alinhadas.
- **Elementos e evidências:** Cobrança da assinatura: [linhas 56–61](../codigos/C1-A.ts#L56-L61); Previsão da mesma cobrança: [linhas 73–78](../codigos/C1-A.ts#L73-L78).
- **Critério mínimo de detecção:** localizar a regra repetida nas unidades e reconhecer que sua alteração exige atualizações coordenadas ou pode produzir divergência.
- **Formulações equivalentes aceitas:** responsabilidade dispersa, duplicação de regra de negócio, Shotgun Surgery ou ausência de um responsável pela política.
- **Afirmações insuficientes:** Quantidade de métodos ou descrição do fluxo sem reconhecer responsabilidades independentes ou a regra dispersa.
- **Distinção e contagem:** centralizar a regra não separa cobrança de acesso nem reorganiza SalesReport. As cópias e seus efeitos formam um único item. Repetição acidental de sintaxe não basta.

## Fontes

Os conceitos e as adaptações estão detalhados na [seleção das fontes](../selecao-fontes.md).

[S2]: https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html
[S6]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/divergent-change.md
[S7]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/shotgun-surgery.md
