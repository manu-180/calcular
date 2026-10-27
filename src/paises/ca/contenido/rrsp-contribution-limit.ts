import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.rrsp-contribution-limit",
  h1: "RRSP contribution limit calculator {{anio}}",
  title: "RRSP contribution limit {{anio}}: how much can I put in?",
  description: "Work out your RRSP deduction limit: {{ca.rrsp-earned-income-rate}} of last year's earned income up to {{ca.rrsp-dollar-limit}}, less your pension adjustment, plus unused room.",
  intro: [
    "Enter last year's earned income, your pension adjustment and any unused room to see how much you can contribute to your RRSP and deduct this year.",
    "The yearly dollar limit and the {{ca.rrsp-earned-income-rate}} rule come from the Canada Revenue Agency.",
  ],
  comoSeCalcula: [
    "New room is the lower of {{ca.rrsp-earned-income-rate}} of your earned income from the previous year and the dollar limit for this year ({{ca.rrsp-dollar-limit}} in 2026).",
    "Your pension adjustment from a workplace pension plan is taken off that new room.",
    "Unused room from earlier years is added on top. The total is your RRSP deduction limit.",
  ],
  ejemplo: [
    "With $80,000 of earned income last year, no pension plan and $5,000 of unused room, your new room is $14,400 and your limit is $19,400.",
  ],
  faq: [
    {
      pregunta: "What is the RRSP limit for 2026?",
      respuesta: "The dollar limit is {{ca.rrsp-dollar-limit}}. You reach it with earned income of about $187,834 in 2025.",
    },
    {
      pregunta: "What if I contribute more than my limit?",
      respuesta: "Contributions that go more than $2,000 over your deduction limit are taxed at 1% a month until you remove them.",
    },
    {
      pregunta: "Where do I find my exact limit?",
      respuesta: "Your notice of assessment and CRA My Account show your RRSP deduction limit for the year.",
    },
  ],
  glosario: [
    { termino: "Earned income", definicion: "The income the CRA uses for RRSP room, mainly employment and self-employment income." },
    { termino: "Pension adjustment", definicion: "The value of the benefits you earned in a workplace pension plan, which reduces your RRSP room." },
    { termino: "Unused room", definicion: "RRSP room from earlier years that you did not use. It is added to your new room." },
  ],
});
