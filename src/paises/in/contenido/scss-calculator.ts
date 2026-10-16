import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.scss-calculator",
  h1: "SCSS calculator",
  title: "SCSS calculator: Senior Citizens Savings Scheme interest",
  description: "See the quarterly interest you get from the Senior Citizens Savings Scheme at {{in.small-savings-rates[scss]}} a year, and the total over five years.",
  intro: [
    "The Senior Citizens Savings Scheme pays interest every quarter on a deposit kept for five years. Enter the amount to see your quarterly payout.",
    "You can open it at 60, or from 55 if you have retired and invest your retirement benefits within one month of receiving them.",
  ],
  comoSeCalcula: [
    "Quarterly interest = deposit × {{in.small-savings-rates[scss]}} ÷ 4.",
    "Interest is paid on the first working day of April, July, October and January, and can go straight to your savings account.",
    "The deposit is repaid after five years. You can extend the account, and the extended period earns the rate in force on the date of maturity.",
  ],
  ejemplo: ["A deposit of ₹15 lakh at 8.2% pays ₹30,750 every quarter, ₹1.23 lakh a year and ₹6.15 lakh over five years."],
  faq: [
    {
      pregunta: "Is the interest the same for the full five years?",
      respuesta: "Yes. The rate on the day you open the account stays for the whole term, even if the government changes the rate later.",
    },
    {
      pregunta: "What if I do not withdraw the quarterly interest?",
      respuesta: "Interest you leave unclaimed does not earn further interest, so it is best credited to your savings account.",
    },
    {
      pregunta: "Can I close it early?",
      respuesta: "Yes, with a penalty that depends on how long the account has run. The exact deduction is set in the scheme.",
    },
  ],
  glosario: [
    { termino: "SCSS", definicion: "Senior Citizens Savings Scheme, a five-year deposit for people aged 60 or more." },
    { termino: "Quarterly payout", definicion: "Interest paid four times a year." },
  ],
});
