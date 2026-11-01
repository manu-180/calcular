import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.mileage-reimbursement",
  h1: "Mileage reimbursement calculator",
  title: "Mileage Reimbursement Calculator {{anio}}: IRS rate per mile",
  description:
    "Turn miles into dollars with the IRS standard mileage rates for {{anio}}: {{us.mileage-business}} per business mile now, plus medical and charity rates.",
  intro: [
    "The IRS sets standard mileage rates that employers use to reimburse driving and that self-employed people use to deduct it.",
    "In 2026 the IRS raised the business and medical rates from July 1 because of fuel prices, so the date of your trips matters.",
  ],
  comoSeCalcula: [
    "Pick the purpose and the date of the trips to get the right rate.",
    "Business miles are worth {{us.mileage-business}} each today. Medical and military moving miles are worth {{us.mileage-medical}}. Charity miles are worth {{us.mileage-charity}}, a rate fixed by law.",
    "Multiply the miles by the rate.",
  ],
  ejemplo: ["1,000 business miles driven in March 2026 are worth $725. The same miles driven in August 2026 are worth $760."],
  faq: [
    {
      pregunta: "What is the IRS mileage rate for 2026?",
      respuesta:
        "Since {{us.mileage-business#desde}} it is {{us.mileage-business}} per business mile and {{us.mileage-medical}} per medical or moving mile. Both rates were lower in the first half of the year. Charity stays at {{us.mileage-charity}}.",
    },
    {
      pregunta: "Does my employer have to pay the IRS rate?",
      respuesta: "Federal law doesn't require it. Many employers use it anyway because reimbursements up to that rate under an accountable plan aren't taxed. A few states have their own reimbursement rules.",
    },
    {
      pregunta: "Can I deduct commuting miles?",
      respuesta: "No. Driving between your home and your regular workplace is personal commuting, not business travel.",
    },
  ],
  glosario: [
    { termino: "Standard mileage rate", definicion: "A fixed amount per mile that covers gas, wear, insurance and depreciation." },
    { termino: "Accountable plan", definicion: "An employer reimbursement plan that requires you to document your miles and return any excess." },
  ],
});
