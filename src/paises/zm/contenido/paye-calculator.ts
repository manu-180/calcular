import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.paye-calculator",
  h1: "PAYE calculator Zambia",
  title: "PAYE calculator Zambia 2026: tax on your monthly pay",
  description:
    "Work out the PAYE on your monthly pay with the 2026 ZRA tax bands. The first {{zm.paye-bands[0].hasta}} is tax free and the top rate is {{zm.paye-bands[-1].tasa}}.",
  intro: [
    "Enter your gross pay for the month and see how much PAYE your employer should deduct, band by band.",
    "The calculator uses the monthly tax bands the Zambia Revenue Authority publishes for 2026.",
  ],
  comoSeCalcula: [
    "The first {{zm.paye-bands[0].hasta}} of your monthly pay is taxed at {{zm.paye-bands[0].tasa}}.",
    "Pay from {{zm.paye-bands[1].desde}} to {{zm.paye-bands[1].hasta}} is taxed at {{zm.paye-bands[1].tasa}}, and pay from {{zm.paye-bands[2].desde}} to {{zm.paye-bands[2].hasta}} at {{zm.paye-bands[2].tasa}}.",
    "Everything above {{zm.paye-bands[3].desde}} is taxed at {{zm.paye-bands[3].tasa}}.",
    "Each rate applies only to the slice of pay inside its band, so a pay rise never lowers your take-home pay.",
  ],
  ejemplo: [
    "ZRA's own example: on taxable pay of K15,000 the tax is K0 + K400 + K630 + K2,146 = K3,176, which leaves K11,824.",
  ],
  faq: [
    {
      pregunta: "Is my NAPSA contribution deducted before PAYE?",
      respuesta: "No. Since 1 January 2018 pension contributions are no longer deducted before working out chargeable income, so PAYE is charged on your gross emoluments.",
    },
    {
      pregunta: "Are allowances taxed?",
      respuesta: "Yes. Cash allowances such as housing, transport, education, utility and settling-in allowances are taxable. So are bills your employer pays for you, like rent, electricity or school fees.",
    },
    {
      pregunta: "Which payments are exempt from PAYE?",
      respuesta: "Pension, gratuity, redundancy pay, severance pay, salary in lieu of notice and repatriation allowance are exempt. So are medical expenses, funeral expenses, Labour Day awards and per diem or travel allowances.",
    },
    {
      pregunta: "When does my employer pay the PAYE to ZRA?",
      respuesta: "By the 10th day of the month after the month of the deduction, together with the PAYE return.",
    },
  ],
  glosario: [
    { termino: "Emoluments", definicion: "Everything you earn from employment: wages, salary, overtime, leave pay, commissions, bonuses and allowances." },
    { termino: "Chargeable income", definicion: "The part of your pay that the tax bands apply to." },
    { termino: "Marginal rate", definicion: "The rate charged on the last kwacha you earn." },
  ],
});
