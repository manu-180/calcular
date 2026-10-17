import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.eis-calculator",
  h1: "EIS contribution calculator",
  title: "EIS calculator: Employment Insurance System contributions",
  description: "Check the EIS contribution for any monthly wage. Employer and employee each pay the same amount from the PERKESO Act 800 table.",
  intro: [
    "Enter the monthly wages to see the EIS contribution. You and your employer each pay the amount shown.",
    "The amounts come from the Act 800 contribution table published by PERKESO.",
  ],
  comoSeCalcula: [
    "The wages fall into a band of the table. Up to RM500 the bands are uneven; above that they are RM100 wide.",
    "Each band has a fixed contribution, the same for employer and employee.",
    "Wages above {{my.socso-wage-ceiling}} pay the same as the ceiling.",
  ],
  ejemplo: ["On RM2,500 a month, EIS is RM4.90 from you and RM4.90 from your employer: RM9.80 in total."],
  faq: [
    {
      pregunta: "How much EIS do I pay?",
      respuesta: "Roughly 0.2% of your wages, read from the band in the PERKESO table. On RM3,000 it is RM5.90.",
    },
    {
      pregunta: "Is there a maximum EIS contribution?",
      respuesta: "Yes. Wages are counted up to {{my.socso-wage-ceiling}} a month, so the highest contribution is RM11.90 each.",
    },
    {
      pregunta: "Does my employer pay EIS too?",
      respuesta: "Yes, the same amount as you. The table has one column for the employer and one for the employee, and they match on every row.",
    },
  ],
  glosario: [
    { termino: "EIS / SIP", definicion: "Employment Insurance System (Sistem Insurans Pekerjaan), set up by Act 800 and run by PERKESO." },
    { termino: "Wage band", definicion: "A range of wages that shares the same contribution in the table." },
  ],
});
