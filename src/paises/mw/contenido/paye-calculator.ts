import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.paye-calculator",
  h1: "PAYE calculator Malawi",
  title: "PAYE calculator Malawi 2026: tax on your monthly pay",
  description:
    "Work out PAYE on your monthly pay with the MRA bands in force since 30 December 2025. The first {{mw.paye-bands[0].hasta}} is tax free and the top rate is {{mw.paye-bands[-1].tasa}}.",
  intro: [
    "Enter your gross pay for the month and see how much PAYE your employer should deduct, band by band.",
    "The bands come from the Taxation (Amendment) Act 2025, as published by the Malawi Revenue Authority.",
  ],
  comoSeCalcula: [
    "The first {{mw.paye-bands[0].hasta}} of your monthly pay is taxed at {{mw.paye-bands[0].tasa}}.",
    "Pay from {{mw.paye-bands[1].desde}} to {{mw.paye-bands[1].hasta}} is taxed at {{mw.paye-bands[1].tasa}}.",
    "Pay from {{mw.paye-bands[2].desde}} to {{mw.paye-bands[2].hasta}} is taxed at {{mw.paye-bands[2].tasa}}.",
    "Anything above {{mw.paye-bands[3].desde}} is taxed at {{mw.paye-bands[3].tasa}}.",
    "Each rate only applies to the slice of pay inside its band, so a pay rise never leaves you with less.",
  ],
  ejemplo: [
    "On MK 500,000 a month the first MK 170,000 is tax free and the other MK 330,000 is taxed at 30%. PAYE is MK 99,000 and you keep MK 401,000, the same figures the MRA calculator gives.",
  ],
  faq: [
    {
      pregunta: "When did these bands start?",
      respuesta: "The MRA says the new PAYE rates apply from 30 December 2025, when the Taxation (Amendment) Act 2025 took effect.",
    },
    {
      pregunta: "What are the annual bands?",
      respuesta: "The first MK 2,040,000 a year is tax free, the next MK 16,800,000 is taxed at 30%, the next MK 101,160,000 at 35% and anything above MK 120,000,000 at 40%. They are the monthly bands times twelve.",
    },
    {
      pregunta: "Is my pension contribution taken off before PAYE?",
      respuesta: "This calculator follows the MRA online PAYE calculator, which applies the bands to gross pay. If your employer runs an approved scheme, check your payslip for how it treats the contribution.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn: income tax your employer takes off your pay each month and sends to the MRA." },
    { termino: "Marginal rate", definicion: "The rate charged on the last kwacha you earn." },
  ],
});
