import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.rent-relief-calculator",
  h1: "Rent relief calculator",
  title: "Rent relief calculator: Nigeria Tax Act 2025",
  description: "Work out your rent relief: {{ng.rent-relief-rate}} of the rent you pay, up to {{ng.rent-relief-cap}} a year, and how much income tax it saves you.",
  intro: [
    "Rent relief is new from 2026. If you rent your home, part of the rent comes off your chargeable income. Enter your yearly rent to see the relief.",
  ],
  comoSeCalcula: [
    "Rent relief is {{ng.rent-relief-rate}} of the annual rent you paid, or {{ng.rent-relief-cap}}, whichever is lower.",
    "Add your chargeable income to see the tax you save: the difference between the tax with and without the relief.",
  ],
  ejemplo: ["On ₦1.8 million of rent the relief is ₦360,000. With ₦5 million of chargeable income, that saves ₦64,800 of tax."],
  faq: [
    {
      pregunta: "What do I need to claim it?",
      respuesta: "Declare the rent you actually paid and the other information the tax authority asks for. Keep your tenancy agreement and receipts.",
    },
    {
      pregunta: "Does it replace the consolidated relief allowance?",
      respuesta: "The consolidated relief allowance is no longer in the law. Rent relief is one of the eligible deductions under the Nigeria Tax Act, 2025.",
    },
    {
      pregunta: "Can I claim it if I own my home?",
      respuesta: "The relief is for rent paid. If you pay no rent, there is nothing to claim, though interest on a loan for your own home is a separate deduction.",
    },
  ],
  glosario: [
    { termino: "Rent relief", definicion: "A deduction of part of the annual rent you pay." },
    { termino: "Chargeable income", definicion: "Income after eligible deductions, on which tax is worked out." },
  ],
});
