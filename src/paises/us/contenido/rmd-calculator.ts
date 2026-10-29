import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.rmd-calculator",
  h1: "Required minimum distribution (RMD) calculator",
  title: "RMD Calculator {{anio}}: required minimum distribution",
  description:
    "Figure the required minimum distribution from your IRA or 401(k) with the IRS Uniform Lifetime Table. RMDs start at age {{us.rmd-age}}.",
  intro: [
    "Once you reach age {{us.rmd-age}}, the IRS requires you to take a minimum amount out of traditional IRAs and workplace retirement plans every year.",
    "Enter your age and last year's ending balance to see this year's RMD.",
  ],
  comoSeCalcula: [
    "Take the account balance on December 31 of last year.",
    "Find the distribution period for the age you reach this year in the Uniform Lifetime Table. At 73 it is {{us.rmd-uniform-table[73]}}, at 80 it is {{us.rmd-uniform-table[80]}} and at 90 it is {{us.rmd-uniform-table[90]}}.",
    "Divide the balance by that number. The result is the least you must withdraw by December 31.",
  ],
  ejemplo: ["At 75 with $500,000 in an IRA, the distribution period is 24.6, so the RMD is $20,325.20, about 4.1% of the balance."],
  faq: [
    {
      pregunta: "When do I have to take my first RMD?",
      respuesta: "In the year you turn {{us.rmd-age}}. You can delay that first one until April 1 of the next year, but then you take two RMDs in that year.",
    },
    {
      pregunta: "What happens if I miss an RMD?",
      respuesta: "You owe an excise tax of 25% of the amount you didn't take, cut to 10% if you correct it in time. File Form 5329 to report it or ask for a waiver.",
    },
    {
      pregunta: "Do Roth IRAs have RMDs?",
      respuesta: "Not while the original owner is alive. Heirs who inherit a Roth IRA do have distribution rules.",
    },
    {
      pregunta: "I have several IRAs. Do I take an RMD from each?",
      respuesta: "You figure an RMD for each IRA, add them up and can take the total from any one or more of your IRAs. Workplace plans follow their own rules, so check with each plan.",
    },
  ],
  glosario: [
    { termino: "Distribution period", definicion: "The number from the IRS table that you divide your balance by." },
    { termino: "Uniform Lifetime Table", definicion: "Table III in IRS Publication 590-B, used by most IRA owners." },
  ],
});
