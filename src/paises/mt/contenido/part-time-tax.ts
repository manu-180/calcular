import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.part-time-tax",
  h1: "Part-time tax calculator Malta",
  title: "Part-time tax Malta: {{mt.part-time-tax-rate}} flat rate calculator",
  description:
    "Work out the {{mt.part-time-tax-rate}} flat tax on part-time income in Malta, up to {{mt.part-time-limits[employment]}} from employment or {{mt.part-time-limits[self-employed]}} from self-employment.",
  intro: [
    "If you have a full-time job, a pension, or you study full-time, you can pay a flat {{mt.part-time-tax-rate}} on the income from a part-time job or activity.",
    "Enter your part-time income and say whether it is employment or self-employment. You get the tax and the part taxed normally.",
  ],
  comoSeCalcula: [
    "Part-time income up to the limit pays {{mt.part-time-tax-rate}}: {{mt.part-time-limits[employment]}} for part-time employment and {{mt.part-time-limits[self-employed]}} for part-time self-employment.",
    "Income above the limit is added to your other income and taxed at your normal rates.",
  ],
  ejemplo: ["A full-time worker who earns €6,000 from a weekend job pays {{mt.part-time-tax-rate}}, which is €600."],
  faq: [
    {
      pregunta: "Who can use the flat rate?",
      respuesta:
        "Residents who also have a full-time job registered with Jobsplus, receive a pension taxable in Malta, or are in full-time education or an apprenticeship.",
    },
    {
      pregunta: "What conditions apply to part-time self-employment?",
      respuesta:
        "The activity has to be registered with Jobsplus, employ no more than two part-time workers, keep proper accounts, be for someone other than your full-time employer and be registered for VAT where required.",
    },
    {
      pregunta: "Can I choose to be taxed normally?",
      respuesta: "Yes. You can declare all your part-time income in your tax return, and any flat-rate tax already paid is credited or refunded.",
    },
  ],
  glosario: [
    { termino: "Part-time work", definicion: "Work done on top of a full-time job, a pension or full-time studies." },
    { termino: "Jobsplus", definicion: "Malta's public employment service, where jobs and part-time activities are registered." },
  ],
});
