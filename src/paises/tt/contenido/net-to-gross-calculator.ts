import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.net-to-gross-calculator",
  h1: "Net to gross salary calculator Trinidad and Tobago",
  title: "Net to gross salary calculator Trinidad and Tobago 2026",
  description: "Know the take-home pay you need? Find the gross monthly salary to ask for once PAYE, NIS and Health Surcharge come off.",
  intro: [
    "Job offers in Trinidad and Tobago are usually quoted gross. If you know what you need in your account each month, this works backwards to the salary that gets you there.",
    "It uses the same rules as our salary calculator: the 2026 NIS table, Health Surcharge and PAYE with the {{tt.personal-allowance}} personal allowance.",
  ],
  comoSeCalcula: [
    "The calculator tries gross salaries until the take-home pay matches the amount you entered.",
    "NIS comes from your earnings class, Health Surcharge is {{tt.health-surcharge-high}} a week on most salaries, and PAYE is {{tt.income-tax-rate}} of chargeable income up to {{tt.income-tax-higher-band}} a year.",
    "The result is the lowest gross salary that gives you at least that take-home pay.",
  ],
  ejemplo: ["To take home TT$12,483.29 in an average month you need a gross salary of TT$15,000."],
  faq: [
    {
      pregunta: "Why does the gross amount jump in some places?",
      respuesta: "NIS rises in steps from one earnings class to the next, so a small raise can move you into a class with a higher weekly contribution.",
    },
    {
      pregunta: "Does it include my employer's costs?",
      respuesta: "No. It works from your side of the payslip. Use the employer cost calculator to see the employer's NIS on top.",
    },
    {
      pregunta: "What if I am 60 or older?",
      respuesta: "You do not pay Health Surcharge, so you need slightly less gross pay. This calculator assumes you pay it.",
    },
  ],
  glosario: [{ termino: "Gross salary", definicion: "Your pay before PAYE, NIS, Health Surcharge and any other deduction." }],
});
