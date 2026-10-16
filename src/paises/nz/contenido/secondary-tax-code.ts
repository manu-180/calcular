import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.secondary-tax-code",
  h1: "Secondary tax code calculator",
  title: "Secondary tax code NZ: SB, S, SH, ST or SA",
  description: "Find your secondary tax code for a second job in New Zealand and see the PAYE and student loan taken from that pay. Based on Inland Revenue's IR330 and IR340.",
  intro: [
    "If you have more than one job, your main job uses a main tax code and every other job uses a secondary code.",
    "The code depends on how much you expect to earn from all your jobs in the year. Inland Revenue's tax code declaration (IR330) uses the same steps.",
  ],
  comoSeCalcula: [
    "Add up what you expect to earn from all your jobs this tax year.",
    "$15,600 or less is SB, $15,601 to $53,500 is S, $53,501 to $78,100 is SH, $78,101 to $180,000 is ST, and above that is SA.",
    "Your second job's pay is taxed at that code's rate plus the ACC earners' levy of {{nz.acc-earners-levy-rate}}. With a student loan, add SL and {{nz.student-loan-rate}} of all that pay goes to the loan.",
  ],
  ejemplo: ["You expect $50,000 from both jobs, so your code is S. On $1,500 from the second job, Inland Revenue's tables take $288.75 PAYE."],
  faq: [
    {
      pregunta: "Which job is my main job?",
      respuesta: "It's your main or highest source of salary or wages. You can use only one main tax code at a time. If you already use it for a job, a taxable pension, a main benefit or a student allowance, any other job needs a secondary code.",
    },
    {
      pregunta: "Why is so much tax taken from my second job?",
      respuesta: "A secondary code taxes all of that pay at one flat rate, set by your expected total income. It doesn't start at the lower bands, because your main job's tax code already uses them.",
    },
    {
      pregunta: "How do I change my tax code?",
      respuesta: "Fill in a tax code declaration (IR330) and give it to your employer.",
    },
  ],
  glosario: [
    { termino: "Secondary tax code", definicion: "The tax code for any job, pension or benefit other than your main source of income." },
    { termino: "IR330", definicion: "Inland Revenue's tax code declaration form." },
  ],
});
