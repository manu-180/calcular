import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.canada-child-benefit",
  h1: "Canada child benefit calculator (July {{anio}} to June 2027)",
  title: "CCB calculator 2026-2027: Canada child benefit",
  description: "Estimate your Canada child benefit for July {{anio}} to June 2027: up to {{ca.ccb-maximum[under-6]}} a year per child under 6 and {{ca.ccb-maximum[6-to-17]}} per child aged 6 to 17.",
  intro: [
    "Enter how many children you have and your adjusted family net income for 2025 to estimate your CCB payments from July 2026 to June 2027.",
    "It follows the amounts and reduction rates published by the Canada Revenue Agency. Provincial child benefits and the child disability benefit are not included.",
  ],
  comoSeCalcula: [
    "Start with the maximum for each child: {{ca.ccb-maximum[under-6]}} a year under 6 and {{ca.ccb-maximum[6-to-17]}} from 6 to 17.",
    "If your family income is over {{ca.ccb-thresholds[first]}}, the benefit is reduced by {{ca.ccb-rates-first[1]}} of the income above it for one child, {{ca.ccb-rates-first[2]}} for two, {{ca.ccb-rates-first[3]}} for three and {{ca.ccb-rates-first[4]}} for four or more.",
    "Over {{ca.ccb-thresholds[second]}} the reduction is a fixed amount ({{ca.ccb-base-reduction[1]}} for one child, {{ca.ccb-base-reduction[2]}} for two, {{ca.ccb-base-reduction[3]}} for three, {{ca.ccb-base-reduction[4]}} for four or more) plus {{ca.ccb-rates-second[1]}}, {{ca.ccb-rates-second[2]}}, {{ca.ccb-rates-second[3]}} or {{ca.ccb-rates-second[4]}} of the income above that threshold.",
    "With shared custody, each parent gets half of the full amount based on their own family income.",
  ],
  ejemplo: [
    "One child under 6 and a family net income of $45,000: the reduction is 7% of $6,763, or $473.41, so the CCB is $7,683.59 for the year, about $640.30 a month.",
  ],
  faq: [
    {
      pregunta: "Which year's income is used?",
      respuesta: "Payments from July 2026 to June 2027 are based on your adjusted family net income for 2025.",
    },
    {
      pregunta: "Is the CCB taxable?",
      respuesta: "No. CCB payments are not taxable and you do not report them on your tax return.",
    },
    {
      pregunta: "What is adjusted family net income?",
      respuesta: "Your net income from line 23600 plus your spouse's or partner's, minus any UCCB and RDSP income received, plus any UCCB and RDSP amounts repaid.",
    },
  ],
  glosario: [
    { termino: "CCB", definicion: "Canada child benefit, a tax-free monthly payment to families with children under 18." },
    { termino: "AFNI", definicion: "Adjusted family net income, the income the CRA uses to calculate the CCB." },
  ],
});
