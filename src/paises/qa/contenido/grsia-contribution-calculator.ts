import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.grsia-contribution-calculator",
  h1: "GRSIA contribution calculator",
  title: "GRSIA contribution calculator for Qataris",
  description:
    "Work out the monthly GRSIA social insurance contribution: {{qa.social-insurance[employee]}} from the employee and {{qa.social-insurance[employer]}} from the employer, with the legal caps.",
  intro: [
    "Qatari employees and their employers pay social insurance to the General Retirement and Social Insurance Authority (GRSIA) every month.",
    "Enter the basic salary and the allowances that count to see each share.",
  ],
  comoSeCalcula: [
    "The contribution salary is the basic salary plus the social allowance and the housing allowance.",
    "Housing counts up to {{qa.social-insurance-caps[housing-cap]}} a month, and the whole contribution salary up to {{qa.social-insurance-caps[cap]}}.",
    "The employee pays {{qa.social-insurance[employee]}} of it and the employer {{qa.social-insurance[employer]}}. Both are paid to the fund by the fifth day of the next month.",
  ],
  ejemplo: [
    "With a basic salary of QAR 25,000, a social allowance of QAR 3,000 and a housing allowance of QAR 7,000, the contribution salary is QAR 34,000. The employee pays QAR 2,380 and the employer QAR 4,760.",
  ],
  faq: [
    {
      pregunta: "Who has to pay GRSIA contributions?",
      respuesta: "Qatari employees in the government and private sectors who are 18 or over and hold a permanent job of at least one year.",
    },
    {
      pregunta: "What if my employer gives me housing instead of an allowance?",
      respuesta: "The law counts housing provided by the employer as if it were paid in cash, up to {{qa.social-insurance-caps[housing-cap]}} a month.",
    },
    {
      pregunta: "Can my employer make me pay its share?",
      respuesta: "No. The law punishes an employer that makes insured workers bear the contributions, and the court orders it to pay the money back.",
    },
    {
      pregunta: "What happens if the employer pays late?",
      respuesta: "A fine of 2% a month on the late amount runs from the due date until it's paid.",
    },
  ],
  glosario: [
    { termino: "Contribution salary", definicion: "The basic salary plus the social and housing allowances used to work out the contribution." },
    { termino: "GRSIA", definicion: "General Retirement and Social Insurance Authority." },
  ],
});
