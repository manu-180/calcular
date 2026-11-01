import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.esct-calculator",
  h1: "ESCT calculator",
  title: "ESCT calculator NZ: employer superannuation contribution tax",
  description:
    "Work out the ESCT rate and amount on employer KiwiSaver contributions in New Zealand, with Inland Revenue's rate thresholds for 1 April {{anio}} onwards.",
  intro: [
    "Employer superannuation contribution tax (ESCT) is taken from what an employer pays into an employee's KiwiSaver or complying fund.",
    "The rate depends on the employee's salary or wages plus the employer's gross contributions. Enter both and see the rate, the tax to deduct and what reaches the fund.",
  ],
  comoSeCalcula: [
    "Add the employee's salary or wages for the year to your gross contributions for the same year.",
    "Find the rate for that amount: 10.5% up to $18,720, 17.5% up to $64,200, 30% up to $93,720, 33% up to $216,000 and 39% above.",
    "Multiply your gross contribution by that rate. The rest goes into the employee's fund.",
  ],
  ejemplo: ["An employee on $70,000 gets the compulsory {{nz.kiwisaver-employer-rate}}, or $2,450. The rate amount is $72,450, so ESCT is 30%: $735 tax and $1,715 into the fund."],
  faq: [
    {
      pregunta: "Which year's pay sets the ESCT rate?",
      respuesta: "The previous tax year (1 April to 31 March): the employee's salary or wages plus your gross contributions. For someone who didn't work for you last year, estimate this year's total.",
    },
    {
      pregunta: "Is ESCT paid on top of the employer contribution?",
      respuesta: "No. It comes out of the employer contribution, so the employee's fund gets the contribution less ESCT.",
    },
    {
      pregunta: "Can I use a flat 39%?",
      respuesta: "You can choose a flat 39% if you pay into a defined benefit fund.",
    },
  ],
  glosario: [
    { termino: "ESCT", definicion: "Employer superannuation contribution tax." },
    { termino: "Compulsory employer contribution", definicion: "The minimum an employer must pay into a KiwiSaver member's account, currently {{nz.kiwisaver-employer-rate}} of gross pay." },
  ],
});
