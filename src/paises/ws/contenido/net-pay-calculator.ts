import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.net-pay-calculator",
  h1: "Net pay calculator Samoa {{anio}}",
  title: "Net pay calculator Samoa {{anio}}: gross to take-home",
  description: "See your take-home pay after PAYE and your {{ws.npf-employee-rate}} NPF contribution. Uses the Ministry for Revenue bands and the NPF Employers Guide.",
  intro: [
    "Type in your gross pay and see what reaches your account. Two things come off in Samoa: PAYE, which your employer pays to the Ministry for Revenue, and your {{ws.npf-employee-rate}} share of the National Provident Fund.",
    "Your employer adds a matching {{ws.npf-employer-rate}} to NPF on top of your pay. That part never touches your payslip.",
  ],
  comoSeCalcula: [
    "PAYE: pay up to {{ws.paye-fortnightly-bands[1].hasta}} a fortnight is not taxed. The next slice is taxed at {{ws.paye-fortnightly-bands[1].tasa}} and the rest at {{ws.paye-fortnightly-bands[2].tasa}}. Monthly pay uses the annual bands in the same way.",
    "NPF: {{ws.npf-employee-rate}} of gross pay, including overtime, allowances and bonuses, is deducted from your wages.",
    "Take-home pay is gross pay less PAYE and your NPF share. PAYE is a final tax, so the NPF contribution does not reduce it.",
  ],
  ejemplo: [
    "A monthly gross pay of WST 4,000 gives PAYE of WST 684.17 and an NPF deduction of WST 400. You take home WST 2,915.83, which is 72.9% of gross pay.",
  ],
  faq: [
    {
      pregunta: "Is my NPF contribution tax free?",
      respuesta: "The National Provident Fund says contributions and benefits are tax free for members. In this calculator PAYE is still worked out on gross pay, because the Ministry for Revenue treats it as a final tax with no deductions.",
    },
    {
      pregunta: "Why is my payslip different?",
      respuesta: "Employers pay PAYE fortnightly using the Ministry's fortnightly table. A monthly figure here uses the annual bands, so it can differ slightly. Loans, advances and union dues are also not included.",
    },
    {
      pregunta: "What if my wage is below the minimum wage?",
      respuesta: "The NPF Employers Guide says an employer paying less than the minimum wage must not deduct the employee share and pays the full contribution alone. Use the minimum wage calculator to check your rate.",
    },
  ],
  glosario: [
    { termino: "Gross pay", definicion: "Pay before any deduction, allowances and overtime included." },
    { termino: "Take-home pay", definicion: "What you receive after PAYE and your NPF contribution." },
    { termino: "NPF", definicion: "The Samoa National Provident Fund, the national retirement savings scheme." },
  ],
});
