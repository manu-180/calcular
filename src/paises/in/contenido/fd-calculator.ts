import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.fd-calculator",
  h1: "FD calculator",
  title: "FD calculator: fixed deposit maturity and interest",
  description: "Work out the maturity amount and interest of a bank fixed deposit with quarterly, monthly, half-yearly or yearly compounding.",
  intro: [
    "Enter the amount, the rate your bank offers and the tenure in months. You get the maturity amount and the interest earned.",
    "For a post office time deposit, use the post office FD calculator, which already has the government rates.",
  ],
  comoSeCalcula: [
    "Interest is added to the deposit at set intervals and then earns interest itself. Your FD receipt says how often; quarterly is the default here.",
    "Maturity = P × (1 + r / k)^(k × t), where P is the deposit, r the yearly rate, k the times interest is added in a year and t the years.",
    "The effective yield is what the rate is worth over a full year once compounding is counted.",
  ],
  ejemplo: [
    "₹1 lakh for one year at 7% compounded quarterly matures at ₹1,07,185.90, an effective yield of about 7.19%.",
  ],
  faq: [
    {
      pregunta: "Is FD interest taxed?",
      respuesta: "Yes. It is added to your income and taxed at your slab rate. The bank may also deduct TDS when the interest passes the threshold.",
    },
    {
      pregunta: "Why does my bank show a slightly different figure?",
      respuesta: "Banks count days exactly and may round each quarter. For tenures that are not whole quarters the result can differ by a few rupees.",
    },
    {
      pregunta: "What about senior citizens?",
      respuesta: "Enter the rate your bank quotes you. If it offers a separate senior citizen rate, use that one.",
    },
  ],
  glosario: [
    { termino: "FD", definicion: "Fixed deposit: money left with a bank for a fixed time at a fixed rate." },
    { termino: "Compounding", definicion: "Adding interest to the deposit so it earns interest too." },
    { termino: "TDS", definicion: "Tax deducted at source by the bank on the interest it pays." },
  ],
});
