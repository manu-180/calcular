import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.sip-calculator",
  h1: "SIP calculator",
  title: "SIP calculator: mutual fund returns on a monthly SIP",
  description: "Estimate what a monthly SIP in a mutual fund can grow to, with an expected return and an optional yearly step-up.",
  intro: [
    "A systematic investment plan (SIP) puts a fixed amount into a mutual fund every month. Enter your SIP, the return you expect and the number of years.",
    "The result is an estimate. Mutual fund returns are not fixed and can be lower or even negative in some years.",
  ],
  comoSeCalcula: [
    "Each instalment is invested at the start of the month and grows at the monthly rate, which is the yearly return divided by 12.",
    "Future value = P × ((1 + i)^n − 1) / i × (1 + i), where P is the SIP, i the monthly rate and n the number of months.",
    "With a step-up, the SIP rises by the percentage you choose at the start of each new year.",
  ],
  ejemplo: [
    "₹10,000 a month for 10 years at 12% a year grows to about ₹23.23 lakh. You put in ₹12 lakh and the rest is the return.",
  ],
  faq: [
    {
      pregunta: "What return should I assume?",
      respuesta: "Use a figure you consider realistic for the type of fund, and try a lower one too. Past returns do not guarantee future ones.",
    },
    {
      pregunta: "Is the gain taxed?",
      respuesta: "Yes, when you redeem units. For equity funds the capital gains tax calculator shows the short-term and long-term rates.",
    },
    {
      pregunta: "SIP or lump sum?",
      respuesta: "A SIP spreads your buying over time, so you buy more units when prices are low. A lump sum is fully invested from day one.",
    },
  ],
  glosario: [
    { termino: "SIP", definicion: "Systematic investment plan: a fixed amount invested in a mutual fund at regular intervals." },
    { termino: "Step-up", definicion: "Raising the SIP amount every year, usually with your salary." },
    { termino: "NAV", definicion: "Net asset value: the price of one unit of a mutual fund." },
  ],
});
