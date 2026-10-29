import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.nasscorp-contribution",
  h1: "NASSCORP contribution calculator",
  title: "NASSCORP contribution calculator: employee and employer",
  description: "Work out the monthly NASSCORP contributions on a salary in Liberia: {{lr.nasscorp-employee}} from the worker, plus the employer's pension and employment injury shares.",
  intro: [
    "Enter gross monthly earnings to see what goes to NASSCORP each month and who pays it.",
    "The National Pension Scheme takes {{lr.nasscorp-employee}} from the worker and {{lr.nasscorp-employer}} from the employer. The employer also pays {{lr.nasscorp-injury}} for the Employment Injury Scheme.",
  ],
  comoSeCalcula: [
    "Employee pension contribution: {{lr.nasscorp-employee}} of monthly earnings, deducted by the employer.",
    "Employer pension contribution: {{lr.nasscorp-employer}} of monthly earnings.",
    "Employment Injury Scheme: {{lr.nasscorp-injury}} of monthly earnings, paid only by the employer.",
  ],
  ejemplo: ["On L$40,000 a month, the worker pays L$1,600 and the employer L$2,400, so NASSCORP receives L$4,000."],
  faq: [
    {
      pregunta: "Who pays the Employment Injury Scheme contribution?",
      respuesta: "Only the employer. Registered employers contribute {{lr.nasscorp-injury}} monthly for each insured employee.",
    },
    {
      pregunta: "How much goes to my pension?",
      respuesta: "Your {{lr.nasscorp-employee}} and the employer's {{lr.nasscorp-employer}}, so 8% of your monthly earnings in total.",
    },
    {
      pregunta: "What do my contributions pay for?",
      respuesta: "The National Pension Scheme pays retirement and invalidity pensions or grants, and pays your contributions to your dependants if you die before 60. The Employment Injury Scheme covers injuries at work.",
    },
  ],
  glosario: [
    { termino: "National Pension Scheme", definicion: "The NASSCORP scheme that pays retirement and invalidity pensions and grants." },
    { termino: "Employment Injury Scheme", definicion: "The NASSCORP scheme, funded by employers, that compensates injuries at work." },
  ],
});
