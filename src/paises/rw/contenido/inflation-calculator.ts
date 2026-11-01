import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.inflation-calculator",
  h1: "Inflation calculator Rwanda",
  title: "Inflation calculator Rwanda: francs then and now",
  description: "See what an amount of Rwandan francs from any month since 2009 is worth today, using the NISR urban consumer price index. Latest index: {{rw.cpi-urban}}.",
  intro: [
    "Prices rise over time, so a franc buys less each year. Enter an amount and the month it is from to see its value in today's francs.",
  ],
  comoSeCalcula: [
    "The calculator uses the urban consumer price index (CPI) published every month by the National Institute of Statistics of Rwanda (NISR).",
    "Amount today = amount × latest index ÷ index of the month you chose. The latest index is {{rw.cpi-urban}}, for {{rw.cpi-urban#desde}}.",
  ],
  ejemplo: ["RWF 100,000 in January 2020 had the buying power of about RWF 181,134 in September 2026."],
  faq: [
    {
      pregunta: "Why the urban CPI?",
      respuesta: "The headline inflation rate in the NISR monthly release is the year-on-year change of the urban CPI.",
    },
    {
      pregunta: "When is new data published?",
      respuesta: "The NISR publishes each month's CPI early in the following month: the September 2026 figures came out on 10 October. The calculator updates when they do.",
    },
    {
      pregunta: "Can I use it to update a rent or a salary?",
      respuesta: "It shows how much prices rose. A contract may name a different index or a fixed rate, so check what yours says.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer price index: the cost of a fixed basket of goods and services over time." },
    { termino: "NISR", definicion: "National Institute of Statistics of Rwanda." },
  ],
});
