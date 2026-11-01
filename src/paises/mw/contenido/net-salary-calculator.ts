import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.net-salary-calculator",
  h1: "Net salary calculator Malawi",
  title: "Net salary calculator Malawi {{anio}}: take-home pay",
  description:
    "Work out your take-home pay in Malawi after PAYE and the {{mw.pension-employee}} pension contribution, with the MRA bands in force since 30 December 2025.",
  intro: [
    "Enter your gross monthly pay to see what lands in your account after PAYE and your pension contribution.",
    "PAYE uses the bands published by the Malawi Revenue Authority. The pension uses the minimum employee rate in the Pension Act.",
  ],
  comoSeCalcula: [
    "PAYE: the first {{mw.paye-bands[0].hasta}} is tax free, then {{mw.paye-bands[1].tasa}}, {{mw.paye-bands[2].tasa}} and {{mw.paye-bands[3].tasa}} on each slice above it.",
    "Pension: {{mw.pension-employee}} of your pay if you belong to your employer's scheme. Your employer adds its own share on top, which does not come out of your pay.",
    "Take-home pay is gross pay less PAYE and the pension contribution.",
  ],
  ejemplo: ["On MK 500,000 a month PAYE is MK 99,000 and the pension contribution is MK 25,000. You take home MK 376,000."],
  faq: [
    {
      pregunta: "How much does my employer put into my pension?",
      respuesta: "At least {{mw.pension-employer}} of your pensionable pay, on top of your own {{mw.pension-employee}}. Your employer can agree to pay more, or to pay your share too.",
    },
    {
      pregunta: "What counts as pensionable pay?",
      respuesta: "The Pension Act defines it as guaranteed wages and other earnings. It leaves out investment income, capital gains and a house or car your employer provides.",
    },
    {
      pregunta: "Are other deductions taken from my pay?",
      respuesta: "Loans, union dues or medical scheme payments can also appear on your payslip. They depend on your employer and are not part of this calculation.",
    },
  ],
  glosario: [
    { termino: "Gross pay", definicion: "Your pay before any deductions." },
    { termino: "Take-home pay", definicion: "What you receive after PAYE and your pension contribution." },
  ],
});
