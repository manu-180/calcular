import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.income-tax-calculator",
  h1: "Income tax calculator Jamaica",
  title: "Income tax calculator Jamaica 2026: tax for the year",
  description:
    "Work out your income tax for the year with the {{jm.income-tax-threshold}} threshold, the {{jm.income-tax-rate}} and {{jm.income-tax-higher-rate}} rates and the pension and age exemptions.",
  intro: [
    "See how much income tax you owe for the whole year of assessment, which in Jamaica runs from January to December.",
    "It helps when you file a return, check your P24 at the end of the year, or receive a pension and want to know what the exemptions save you.",
  ],
  comoSeCalcula: [
    "Statutory income: salary less NIS and approved pension contributions, plus any pension you receive.",
    "Exemptions: {{jm.pension-exemption}} if you receive a pension from an approved scheme, and {{jm.age-exemption}} if you are 65 or over. Under 55, the pension exemption only covers your pension income.",
    "The first {{jm.income-tax-threshold}} is tax free. That is the effective threshold for the year, because the annual threshold goes up every April 1.",
    "From the threshold up to {{jm.income-tax-higher-band}} of statutory income the rate is {{jm.income-tax-rate}}. Above {{jm.income-tax-higher-band}} it is {{jm.income-tax-higher-rate}}.",
  ],
  ejemplo: [
    "A salary of J$3,000,000 in 2026 with no pension plan gives NIS of J$90,000 and statutory income of J$2,910,000. Income tax is 25% of J$1,033,386, which is J$258,346.50.",
  ],
  faq: [
    {
      pregunta: "Why is the 2026 threshold not the same as the April figure?",
      respuesta:
        "The annual threshold rose to J$1,902,360 on April 1, 2026, but January to March still used the old one. TAJ blends the two, so the effective threshold for 2026 is {{jm.income-tax-threshold}}.",
    },
    {
      pregunta: "When does the 30% rate apply?",
      respuesta: "Only on the part of your statutory income above {{jm.income-tax-higher-band}} a year. Everything below that, after the threshold, is taxed at {{jm.income-tax-rate}}.",
    },
    {
      pregunta: "Who gets the pension exemption?",
      respuesta:
        "Anyone who receives a pension from an approved superannuation fund or retirement scheme. From age 55 you can set it against any income. Under 55 it only applies to the pension itself.",
    },
  ],
  glosario: [
    { termino: "Year of assessment", definicion: "The calendar year, January 1 to December 31, for which your income tax is worked out." },
    { termino: "Effective threshold", definicion: "The tax-free amount for a whole year when the threshold changes part way through it." },
  ],
});
