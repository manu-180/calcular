import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.calculo-irrf",
  h1: "Cálculo do IRRF {{anio}}",
  title: "Cálculo do IRRF {{anio}} com a redução da Lei 15.270",
  description:
    "Calcule o imposto de renda retido na fonte de {{anio}}: tabela mensal, dependentes, desconto simplificado e a redução para rendimentos até {{br.reducao-mensal-limite}}.",
  intro: [
    "O IRRF é o imposto de renda que a empresa desconta do seu salário todo mês e repassa à Receita Federal.",
    "Esta calculadora segue o passo a passo da Receita para 2026: escolhe entre deduções legais e desconto simplificado, aplica a tabela mensal e depois a redução da Lei nº 15.270/2025.",
  ],
  comoSeCalcula: [
    "Some as deduções legais: INSS, {{br.irrf-dependente}} por dependente, pensão alimentícia judicial e previdência privada.",
    "Compare com o desconto simplificado de {{br.irrf-desconto-simplificado}}. Vale o que for maior.",
    "A base de cálculo é o rendimento tributável menos essa dedução. Sobre ela se aplica a alíquota da faixa e se tira a parcela a deduzir.",
    "Com rendimento tributável de até {{br.reducao-mensal-isencao}}, a redução zera o imposto. Entre esse valor e {{br.reducao-mensal-limite}}, a redução é {{br.reducao-mensal-constante}} menos {{br.reducao-mensal-fator}} vezes o rendimento. Acima disso, não há redução.",
  ],
  ejemplo: [
    "No exemplo 4 da Receita, Rita ganha R$ 6.000 e paga R$ 649,60 de INSS. A base é R$ 5.350,40 e a tabela dá R$ 562,63.",
    "A redução é R$ 978,62 menos 0,133145 × 6.000 = R$ 179,75. O IRRF retido fica em R$ 382,88.",
  ],
  faq: [
    {
      pregunta: "A redução usa o salário bruto ou a base de cálculo?",
      respuesta: "O rendimento tributável bruto. A Receita deixa isso claro nos exemplos de 2026: quem ganha R$ 7.607,20 não tem redução, mesmo que a base fique em R$ 7.000.",
    },
    {
      pregunta: "Quanto vale cada dependente?",
      respuesta: "{{br.irrf-dependente}} por mês. Só vale a pena informar dependentes quando as deduções legais passam do desconto simplificado.",
    },
    {
      pregunta: "E se eu tiver dois empregos?",
      respuesta: "Cada empresa calcula o IRRF só sobre o que paga. A soma dos rendimentos é acertada na declaração anual, e pode sobrar imposto a pagar.",
    },
    {
      pregunta: "O 13º salário entra nessa conta?",
      respuesta: "Não. O 13º tem tributação exclusiva na fonte, calculada à parte. Use a calculadora de 13º salário.",
    },
  ],
  glosario: [
    { termino: "Parcela a deduzir", definicion: "Valor fixo de cada faixa da tabela que se tira do resultado da alíquota." },
    { termino: "Rendimento tributável", definicion: "Tudo o que você recebe no mês e que paga imposto: salário, horas extras, adicionais e comissões." },
    { termino: "Deduções legais", definicion: "Valores que a lei permite tirar da base: INSS, dependentes, pensão alimentícia e previdência privada." },
  ],
});
