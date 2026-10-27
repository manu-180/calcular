import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.net-salary-calculator",
  h1: "Net salary calculator Zambia",
  title: "Net salary calculator Zambia 2026: gross to take-home pay",
  description:
    "See your take-home pay after PAYE, NAPSA at {{zm.napsa-rate}} and NHIMA at {{zm.nhima-rate}} of basic pay. Uses the 2026 ZRA tax bands.",
  intro: [
    "Enter your basic pay and allowances and see what lands in your account, with every statutory deduction on its own line.",
    "The calculator applies the 2026 PAYE bands, your NAPSA pension contribution and your NHIMA health insurance contribution.",
  ],
  comoSeCalcula: [
    "PAYE: the ZRA monthly bands apply to your gross pay, basic pay plus allowances.",
    "NAPSA: {{zm.napsa-rate}} of gross pay, up to the monthly earnings ceiling of {{zm.napsa-ceiling}}.",
    "NHIMA: {{zm.nhima-rate}} of your basic pay.",
    "Take-home pay is gross pay less PAYE, NAPSA and NHIMA.",
  ],
  ejemplo: [
    "Basic pay of K10,000 plus K5,000 in allowances gives gross pay of K15,000. PAYE is K3,176, NAPSA K750 and NHIMA K100, so you take home K10,974.",
  ],
  faq: [
    {
      pregunta: "Why is NHIMA worked out on basic pay only?",
      respuesta: "NHIMA charges formal sector members {{zm.nhima-rate}} of basic salary, matched by the employer. Allowances are left out.",
    },
    {
      pregunta: "Does NAPSA lower my PAYE?",
      respuesta: "No. Since 2018 pension contributions are not deducted before PAYE is worked out.",
    },
    {
      pregunta: "Why is my payslip different?",
      respuesta: "Your employer may also deduct union dues, loans or a private pension. Those are not statutory, so the calculator leaves them out.",
    },
  ],
  glosario: [
    { termino: "NAPSA", definicion: "National Pension Scheme Authority, which runs the national pension scheme." },
    { termino: "NHIMA", definicion: "National Health Insurance Management Authority, which runs the national health insurance scheme." },
    { termino: "Basic pay", definicion: "Your salary before allowances, overtime and bonuses." },
  ],
});
