# Referência de avaliação da detecção — C1-B

- **Arquivo analisado:** [C1-B.ts](../codigos/C1-B.ts).
- **Cenário:** Responsabilidades excessivas e baixa coesão.
- **Problemas esperados:** 3.
- **Mecanismos do Code Smells Catalog:** [Divergent Change][S6] — motivos independentes de mudança concentrados em AdmissionOffice e StudentAccount (01 e 02); [Shotgun Surgery][S7] — mudança da mensalidade com bolsa exige atualizar cotação e cobrança (03).
- **Fundamentos complementares:** [SRP (Martin)][S2] — separação de responsabilidades de admissão, apresentação, finanças e acesso (01 e 02).
- **Adaptação do cenário:** O fluxo de matrícula e mensalidades e a combinação dos três itens foram construídos para o experimento; não constituem um exemplo original do catálogo.
- **Regras comuns, categorias e inventário:** [referência de avaliação da detecção](README.md), [inventário](../inventario.json) e [detalhamento das fontes](../selecao-fontes.md).

## Problemas esperados

### C1-B-01 — Concentração de responsabilidades

**Variações de título (exemplos):**

- “Regras, matrículas, notificações e apresentação concentradas em AdmissionOffice”
- “Acúmulo de responsabilidades em AdmissionOffice”
- “Baixa coesão entre admissão e apresentação da carteirinha”
- “Múltiplos motivos de mudança em AdmissionOffice”

**Como confirmar a detecção:**

- **Tipo:** Responsabilidades e coesão.
- **Fundamentação:** [SRP (Martin)][S2], [Divergent Change][S6].
- **Decisão ou fragilidade observável:** AdmissionOffice implementa regras de admissão e bolsa, mantém matrículas e notificações e apresenta a carteirinha do aluno. Essas responsabilidades estão implementadas na própria classe.
- **Elementos e evidências:** AdmissionOffice: [linhas 11–56](../codigos/C1-B.ts#L11-L56).
- **Critério mínimo de detecção:** identificar a unidade, pelo menos duas responsabilidades e a concentração ou baixa coesão decorrente.
- **Formulações equivalentes aceitas:** SRP, baixa coesão, Divergent Change ou mistura de regras e infraestrutura/apresentação.
- **Afirmações insuficientes:** Quantidade de métodos ou descrição do fluxo sem reconhecer responsabilidades independentes ou a regra dispersa.
- **Distinção e contagem:** separar apresentação ou persistência não elimina os itens de StudentAccount e da política duplicada. A coordenação simples de colaboradores não será pontuada como esse item.

### C1-B-02 — Políticas independentes na mesma classe

**Variações de título (exemplos):**

- “Mistura de finanças e autenticação em StudentAccount”
- “Responsabilidades de cobrança e acesso concentradas”
- “Baixa coesão entre mensalidades e credenciais”
- “Fronteira de StudentAccount reúne políticas independentes”

**Como confirmar a detecção:**

- **Tipo:** Responsabilidades e coesão.
- **Fundamentação:** [SRP (Martin)][S2], [Divergent Change][S6].
- **Decisão ou fragilidade observável:** StudentAccount reúne saldo de mensalidades e operações de cobrança/pagamento com credenciais, tentativas de autenticação e bloqueio de acesso.
- **Elementos e evidências:** StudentAccount: finanças e acesso: [linhas 58–94](../codigos/C1-B.ts#L58-L94).
- **Critério mínimo de detecção:** reconhecer a concentração das responsabilidades financeiras e de acesso nessa unidade. Não exigir localizar todas as operações, avaliar criptografia ou provar uma falha funcional.
- **Formulações equivalentes aceitas:** políticas independentes reunidas, baixa coesão, SRP ou mistura de finanças e autenticação.
- **Afirmações insuficientes:** Quantidade de métodos ou descrição do fluxo sem reconhecer responsabilidades independentes ou a regra dispersa.
- **Distinção e contagem:** extrair autenticação deixa a regra de mensalidade duplicada do item 03 e o desenho de AdmissionOffice presentes.

### C1-B-03 — Responsabilidade de regra dispersa

**Variações de título (exemplos):**

- “Regra de mensalidade duplicada entre cotação e cobrança”
- “Cálculo de bolsa sem fonte única”
- “Política de mensalidade espalhada entre classes”
- “Alterações coordenadas em chargeTuition e EnrollmentQuote.quote”

**Como confirmar a detecção:**

- **Tipo:** Responsabilidades e coesão.
- **Fundamentação:** [Shotgun Surgery][S7].
- **Decisão ou fragilidade observável:** StudentAccount.chargeTuition e EnrollmentQuote.quote calculam a mesma mensalidade com bolsa em implementações distintas. A regra compartilhada não possui um único responsável.
- **Elementos e evidências:** Cobrança da mensalidade: [linhas 65–69](../codigos/C1-B.ts#L65-L69); Previsão da mensalidade: [linhas 96–101](../codigos/C1-B.ts#L96-L101).
- **Critério mínimo de detecção:** localizar as duas implementações e reconhecer duplicação da política, necessidade de alterações coordenadas ou risco de divergência entre elas.
- **Formulações equivalentes aceitas:** regra espalhada, duplicação de negócio, Shotgun Surgery ou responsabilidade de cálculo distribuída inadequadamente.
- **Afirmações insuficientes:** Quantidade de métodos ou descrição do fluxo sem reconhecer responsabilidades independentes ou a regra dispersa.
- **Distinção e contagem:** extrair o cálculo comum deixa a mistura financeira/autenticação e o acúmulo de AdmissionOffice. Não converter cada cópia ou consequência em outro item.

## Fontes

Os conceitos e as adaptações estão detalhados na [seleção das fontes](../selecao-fontes.md).

[S2]: https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html
[S6]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/divergent-change.md
[S7]: https://github.com/Luzkan/smells/blob/7f3f7dae09d487fbe68ad38e132135118155f30a/content/smells/shotgun-surgery.md
