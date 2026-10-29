import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.part-year-tax-calculator",
  h1: "PAYE when you start work mid-year",
  title: "PAYE for a new job mid-year in Botswana",
  description: "Starting your first job part way through the Botswana tax year? Work out the PAYE on only the months you are paid, the way the BURS tax table does it.",
  intro: [
    "When you join the workforce for the first time during the tax year, your employer works out PAYE on what you will earn up to 30 June, not on a full year. That usually means less tax each month.",
    "Enter your monthly salary and how many months you will be paid before the tax year ends.",
  ],
  comoSeCalcula: [
    "Your monthly salary is multiplied by the months left in the tax year.",
    "The tax on that total comes from the annual tax table: nothing on the first {{bw.paye-resident[1].desde}}.",
    "The tax is divided by the same number of months to give your monthly PAYE.",
  ],
  ejemplo: [
    "This is the BURS example: you start on 1 October on P8 000 a month. You earn P72 000 by June, which carries P1 200 of tax, so your PAYE is P133.33 a month instead of P275 on a full year.",
  ],
  faq: [
    {
      pregunta: "Does this apply when I change jobs?",
      respuesta: "The BURS example is for an employee who joins the service for the first time during the year. If you already worked earlier in the same tax year, ask your employer or BURS how that pay is counted.",
    },
    {
      pregunta: "What happens on 1 July?",
      respuesta: "A new tax year starts and your PAYE is worked out on a full year of salary again, so it goes up.",
    },
    {
      pregunta: "I start in April. Do I pay tax?",
      respuesta: "Not if your pay up to June stays under {{bw.paye-resident[1].desde}}. In the BURS example, P6 000 a month from April adds up to P18 000 and pays no tax.",
    },
  ],
  glosario: [
    { termino: "Tax year", definicion: "1 July to 30 June in Botswana." },
  ],
});
