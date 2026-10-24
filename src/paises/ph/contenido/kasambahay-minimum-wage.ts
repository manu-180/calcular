import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.kasambahay-minimum-wage",
  h1: "Kasambahay minimum wage by region",
  title: "Kasambahay minimum wage 2026 by region",
  description: "Check the monthly minimum wage for domestic workers (kasambahay) in your region, set by the regional wage boards.",
  intro: [
    "Domestic workers have their own monthly minimum wage, set region by region. Pick the region where the kasambahay works.",
    "In NCR the minimum is {{ph.kasambahay-wage-high@ncr}} a month.",
  ],
  comoSeCalcula: [
    "The calculator shows the monthly minimum set by the latest wage order for domestic workers in the region.",
    "Some regions set different amounts by area. In that case you see the lowest and the highest.",
  ],
  faq: [],
  glosario: [{ termino: "Kasambahay", definicion: "A domestic worker employed in a household." }],
});
