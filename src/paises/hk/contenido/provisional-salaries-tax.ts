import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.provisional-salaries-tax",
  h1: "Provisional salaries tax calculator",
  title: "Provisional salaries tax calculator Hong Kong",
  description:
    "Estimate your Hong Kong provisional salaries tax for 2026/27 from last year's income, and see how the IRD splits it into January and April instalments.",
  intro: [
    "Provisional salaries tax is the IRD's estimate of this year's tax. It is based on last year's income, with this year's allowances.",
    "It comes on the same demand note as last year's final tax, normally in two instalments: around January and around April.",
  ],
  comoSeCalcula: [
    "Take last year's income. If you worked only part of the year, it is grossed up to 12 months.",
    "Subtract deductions such as MPF mandatory contributions (up to {{hk.deduction-limits[mpf]}}) and this year's allowances. For 2026/27 the basic allowance is {{hk.basic-allowance[2026-27]}}.",
    "Apply the progressive rates, or the standard rate if it gives less.",
    "The first instalment is last year's balance plus 75% of the provisional tax. The other 25% is due around April.",
  ],
  ejemplo: [
    "You earned $40,000 a month from October 2025. For 2026/27 the IRD grosses that up to $480,000, takes off $18,000 of MPF and the $145,000 basic allowance, and charges $35,890 of provisional tax.",
  ],
  faq: [
    {
      pregunta: "Is provisional tax paying tax in advance?",
      respuesta:
        "Not really. The IRD explains that by January you have already earned 9 months of the year's income, and by April all 12. The amount is credited against your final tax.",
    },
    {
      pregunta: "Can I pay less provisional tax?",
      respuesta:
        "Yes, if you apply to hold it over. One ground is that this year's net chargeable income is likely to be less than 90% of last year's. Others include a new allowance, such as a newborn child.",
    },
    {
      pregunta: "When do I have to apply for a holdover?",
      respuesta: "At least 28 days before the due date, or within 14 days after the notice is issued, whichever is later.",
    },
    {
      pregunta: "Does the one-off tax reduction apply to provisional tax?",
      respuesta: "No. The IRD applies it only to the final tax of the year it covers.",
    },
  ],
  glosario: [
    { termino: "Provisional salaries tax (PST)", definicion: "An estimate of this year's salaries tax, worked out from last year's income." },
    { termino: "Holdover", definicion: "A request to the IRD to pay less provisional tax, or none, for a reason the law accepts." },
  ],
});
