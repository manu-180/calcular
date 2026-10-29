import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.take-home-pay",
  h1: "Take-home pay calculator for The Gambia",
  title: "Take-home pay calculator Gambia: salary after PAYE",
  description: "See your net salary in The Gambia after PAYE and your {{gm.npf-employee-rate}} National Provident Fund contribution, with allowances included.",
  intro: [
    "Enter your basic salary and allowances to see what reaches your bank account after PAYE and your pension contribution.",
    "In the National Provident Fund you pay {{gm.npf-employee-rate}} of your basic salary. In the Federated Pension Scheme your employer pays the whole contribution, so nothing comes off your pay.",
  ],
  comoSeCalcula: [
    "Gross pay: basic salary plus allowances.",
    "PAYE: the GRA bands applied to 12 times your gross monthly pay, divided by 12. The first {{gm.paye-bands[0].hasta}} a year is tax-free.",
    "NPF: {{gm.npf-employee-rate}} of your basic salary only, deducted by your employer.",
    "Take-home pay: gross pay minus PAYE and your NPF contribution.",
  ],
  ejemplo: ["On a basic salary of D20,000 in the NPF, PAYE is D3,833.33 and your NPF contribution is D1,000, so you take home D15,166.67 a month."],
  faq: [
    {
      pregunta: "Does my NPF contribution reduce my PAYE?",
      respuesta: "No. The GRA says no deductions are allowed for PAYE, so tax is worked out on your full employment income.",
    },
    {
      pregunta: "Are allowances taxed?",
      respuesta: "Yes. The GRA counts allowances, bonuses, overtime and commissions as employment income. The NPF contribution, though, is worked out on basic salary.",
    },
    {
      pregunta: "How much does my employer add to my pension?",
      respuesta: "In the NPF your employer adds {{gm.npf-employer-rate}} of your basic salary on top of your {{gm.npf-employee-rate}}. In the Federated Pension Scheme the employer pays {{gm.fps-rate}} of gross salary on its own.",
    },
  ],
  glosario: [
    { termino: "NPF", definicion: "National Provident Fund, the savings scheme run by the SSHFC for most private sector workers." },
    { termino: "SSHFC", definicion: "Social Security and Housing Finance Corporation, which runs the NPF, the Federated Pension Scheme and the injuries fund." },
  ],
});
