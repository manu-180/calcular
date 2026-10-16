import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.post-office-mis-calculator",
  h1: "Post Office MIS calculator",
  title: "Post Office MIS calculator: monthly income scheme",
  description: "Work out the monthly income from a Post Office Monthly Income Scheme deposit at {{in.small-savings-rates[mis]}} a year.",
  intro: [
    "The Post Office Monthly Income Scheme pays you interest every month on a lump sum. Enter the amount to see your monthly and yearly income.",
  ],
  comoSeCalcula: [
    "Monthly income = deposit × {{in.small-savings-rates[mis]}} ÷ 12.",
    "The interest is paid out each month, so it does not compound inside the account.",
  ],
  ejemplo: ["A deposit of ₹9 lakh at 7.4% pays ₹5,550 a month, or ₹66,600 a year."],
  faq: [
    {
      pregunta: "Who sets the MIS rate?",
      respuesta: "The Ministry of Finance, every quarter, for all small savings schemes. For October to December 2026 the rate is {{in.small-savings-rates[mis]}}.",
    },
    {
      pregunta: "Is the monthly income taxable?",
      respuesta: "Yes. It is added to your income and taxed at your slab rate in the regime you choose.",
    },
    {
      pregunta: "Can I reinvest the monthly interest?",
      respuesta: "Not inside the account, since it is paid out. You can put it into a post office recurring deposit yourself; the RD calculator shows what that adds up to.",
    },
  ],
  glosario: [
    { termino: "MIS", definicion: "Monthly Income Scheme, a post office deposit that pays interest every month." },
    { termino: "Lump sum", definicion: "A single amount deposited at the start." },
  ],
});
