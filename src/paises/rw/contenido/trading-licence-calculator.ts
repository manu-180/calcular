import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.trading-licence-calculator",
  h1: "Trading licence calculator Rwanda",
  title: "Trading licence tax Rwanda {{anio}}: amount by turnover",
  description: "Find your yearly trading licence from last year's turnover, from {{rw.trading-licence[0].cuotaFija}} up to {{rw.trading-licence[-1].cuotaFija}}, or the flat amount for your activity.",
  intro: [
    "Every business that opens in a district pays a trading licence tax to that district. Choose your activity, or enter last year's turnover, to see the amount.",
  ],
  comoSeCalcula: [
    "Businesses registered for income tax pay by turnover band, from {{rw.trading-licence[0].cuotaFija}} a year for {{rw.trading-licence[0].desde}} to {{rw.trading-licence[0].hasta}} of turnover up to {{rw.trading-licence[-1].cuotaFija}} for the largest.",
    "Turnover counts EBM sales and other sales from January to December of the previous year.",
    "Businesses not registered for income tax pay a flat amount by location: {{rw.trading-licence-other[urban]}} in urban areas and {{rw.trading-licence-other[rural]}} in rural areas.",
    "Transport: {{rw.trading-licence-other[vehicle]}} per vehicle, {{rw.trading-licence-other[boat]}} per boat and {{rw.trading-licence-other[motorcycle]}} per motorcycle.",
  ],
  ejemplo: ["A company with RWF 50,000,000 of turnover last year pays RWF 280,000, or RWF 70,000 a quarter."],
  faq: [
    {
      pregunta: "When is the trading licence due?",
      respuesta: "Paid in one go, by 31 January. Paid by quarter: 31 January, 30 April, 31 July and 31 October.",
    },
    {
      pregunta: "What does a new business pay?",
      respuesta: "A new business declares and pays on the basis of its starting capital. Micro and small enterprises are exempt for their first two years.",
    },
    {
      pregunta: "Do branches pay separately?",
      respuesta: "Branches in different districts each pay in their district on their own turnover. In the same district, one of them pays on the combined turnover of the same activities.",
    },
  ],
  glosario: [
    { termino: "Trading licence", definicion: "A yearly district tax on running a business." },
    { termino: "EBM", definicion: "Electronic Billing Machine, which records sales for tax." },
  ],
});
