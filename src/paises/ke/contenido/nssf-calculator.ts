import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.nssf-calculator",
  h1: "NSSF calculator 2026",
  title: "NSSF calculator 2026: Tier I and Tier II contributions",
  description:
    "Work out your NSSF deduction with the Year 4 limits: {{ke.nssf-rate}} of pay up to {{ke.nssf-lel}} in Tier I and up to {{ke.nssf-uel}} in Tier II.",
  intro: [
    "Enter your gross monthly pay to see your NSSF deduction, split into Tier I and Tier II, and what your employer pays on top.",
    "The rates follow the Third Schedule of the NSSF Act. Year 4 of the schedule started in February 2026.",
  ],
  comoSeCalcula: [
    "You and your employer each pay {{ke.nssf-rate}} of your pensionable earnings: your pay, up to the upper earnings limit of {{ke.nssf-uel}}.",
    "Tier I is the part up to the lower earnings limit of {{ke.nssf-lel}}. Tier II is the part between {{ke.nssf-lel}} and {{ke.nssf-uel}}.",
    "Your employer deducts your share from your pay, adds the same amount and pays both to NSSF by the 9th day of the next month.",
  ],
  ejemplo: [
    "On KSh 50,000 a month, Tier I is KSh 540 and Tier II is KSh 2,460. You pay KSh 3,000 and your employer pays another KSh 3,000.",
  ],
  faq: [
    {
      pregunta: "What is the most I can pay?",
      respuesta: "With pay at or above {{ke.nssf-uel}}, you pay the maximum: KSh 540 in Tier I and KSh 5,940 in Tier II, KSh 6,480 in all. Your employer matches it.",
    },
    {
      pregunta: "What happens after Year 4?",
      respuesta: "From Year 5 the NSSF Act ties the lower limit to the average statutory minimum wage and the upper limit to four times national average earnings. We update the calculator when NSSF publishes the new figures.",
    },
    {
      pregunta: "Is NSSF deductible for PAYE?",
      respuesta: "Yes. It counts as a pension contribution, deductible together with any other scheme up to KSh 30,000 a month.",
    },
  ],
  glosario: [
    { termino: "Lower earnings limit", definicion: "The pay level up to which contributions go to Tier I." },
    { termino: "Upper earnings limit", definicion: "The highest pay that NSSF contributions are worked out on." },
    { termino: "Pensionable earnings", definicion: "Your monthly pay, up to the upper earnings limit." },
  ],
});
