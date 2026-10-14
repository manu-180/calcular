import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.salario-liquido",
  h1: "Calculadora de salário líquido 2026",
  title: "Salário líquido 2026: calcule INSS e IRRF",
  description:
    "Descubra quanto cai na conta a partir do salário bruto, com a tabela do INSS de 2026, o IRRF e a redução para quem ganha até {{br.reducao-mensal-isencao}}.",
  intro: [
    "O salário líquido é o que sobra do bruto depois dos descontos obrigatórios: a contribuição ao INSS e o imposto de renda retido na fonte (IRRF).",
    "Informe o salário bruto e, se tiver, os dependentes e a pensão alimentícia. A conta usa as tabelas oficiais de 2026 e já aplica a redução do imposto da Lei nº 15.270/2025.",
  ],
  comoSeCalcula: [
    "Primeiro sai o INSS. A tabela é progressiva: cada faixa do salário paga a sua alíquota (7,5 %, 9 %, 12 % e 14 %) e nada é cobrado acima do teto de {{br.teto-inss}}.",
    "Depois vem a base do imposto de renda: o bruto menos o INSS, {{br.irrf-dependente}} por dependente e a pensão alimentícia. Se o desconto simplificado de {{br.irrf-desconto-simplificado}} for maior, ele entra no lugar dessas deduções.",
    "Sobre a base se aplica a tabela mensal do IRRF: alíquota da faixa menos a parcela a deduzir.",
    "Por último entra a redução de 2026. Com rendimento tributável de até {{br.reducao-mensal-isencao}}, o imposto zera. Entre esse valor e {{br.reducao-mensal-limite}}, o desconto diminui aos poucos. A redução olha o salário bruto, não a base.",
    "O líquido é o bruto menos INSS, IRRF, pensão e os outros descontos que você informar.",
  ],
  ejemplo: [
    "Com salário bruto de R$ 6.000 e sem dependentes, o INSS fica em R$ 641,51. A base do imposto é R$ 5.358,49 e a tabela dá R$ 564,85 de IRRF.",
    "A redução de 2026 é de R$ 978,62 menos 0,133145 × 6.000, ou seja, R$ 179,75. O IRRF cai para R$ 385,10 e o salário líquido fica em R$ 4.973,39.",
  ],
  faq: [
    {
      pregunta: "Quem ganha até {{br.reducao-mensal-isencao}} ainda paga imposto de renda?",
      respuesta:
        "Na fonte, não. Desde janeiro de 2026 a redução da Lei nº 15.270/2025 zera o imposto de quem tem rendimento tributável mensal de até {{br.reducao-mensal-isencao}}. O INSS continua sendo descontado.",
    },
    {
      pregunta: "O desconto simplificado é sempre melhor?",
      respuesta:
        "Não. A empresa compara as deduções legais (INSS, dependentes e pensão) com o desconto simplificado de {{br.irrf-desconto-simplificado}} e usa o que for maior. A calculadora faz essa escolha sozinha.",
    },
    {
      pregunta: "Vale-transporte e plano de saúde diminuem o imposto?",
      respuesta:
        "Não. Eles reduzem o que cai na conta, mas não entram na base do IRRF. Por isso ficam no campo de outros descontos.",
    },
    {
      pregunta: "Por que o meu holerite mostra um valor um pouco diferente?",
      respuesta:
        "Horas extras, adicionais, faltas, adiantamentos e benefícios mudam a conta. A calculadora considera um mês cheio com o salário informado.",
    },
  ],
  glosario: [
    { termino: "INSS", definicion: "Contribuição à Previdência Social descontada do salário de quem trabalha com carteira assinada." },
    { termino: "IRRF", definicion: "Imposto de renda retido na fonte: a empresa desconta do salário e repassa à Receita Federal." },
    { termino: "Desconto simplificado", definicion: "Valor fixo que pode substituir as deduções legais no cálculo mensal do imposto." },
  ],
});
