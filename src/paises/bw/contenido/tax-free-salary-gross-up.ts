import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.tax-free-salary-gross-up",
  h1: "Tax-free salary gross-up calculator",
  title: "Gross-up calculator Botswana: PAYE on a tax-free salary",
  description: "When an employer pays a salary free of tax in Botswana, work out the grossed-up salary and the PAYE it has to pay to BURS on top, with the 2026 rates.",
  intro: [
    "Some contracts promise a net salary and leave the employer to pay the tax. The tax itself then counts as pay, so the PAYE is worked out on a grossed-up amount.",
    "Enter the net salary promised to see the PAYE the employer pays each month.",
  ],
  comoSeCalcula: [
    "The net salary is turned into a yearly amount.",
    "The calculator finds the gross salary that leaves exactly that net after PAYE, the same result as the BURS grossing-up table.",
    "The PAYE on that gross salary, divided by 12, is what the employer pays each month on top of the net salary.",
  ],
  ejemplo: [
    "BURS uses this example: a resident paid P7 500 a month tax-free. The yearly net of P90 000 grosses up to P92 914.29, and the PAYE is P2 914.29 a year or P242.86 a month.",
  ],
  faq: [
    {
      pregunta: "Why can't the employer just pay the tax on the net salary?",
      respuesta: "Because the tax it pays for you is also income. Paying tax on the net alone would leave that extra income untaxed, so BURS requires the salary to be grossed up.",
    },
    {
      pregunta: "Where does the grossing-up table come from?",
      respuesta: "It is part of the Tax Table and Guidance Notes that BURS publishes for employers, with one version for residents and one for non-residents.",
    },
    {
      pregunta: "Does the employee pay anything?",
      respuesta: "No. The employee receives the promised net salary and the employer pays the PAYE on the grossed-up amount to BURS.",
    },
  ],
  glosario: [
    { termino: "Gross-up", definicion: "Working back from a net amount to the gross amount that leaves that net after tax." },
  ],
});
