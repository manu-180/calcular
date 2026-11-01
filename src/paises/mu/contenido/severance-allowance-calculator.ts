import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.severance-allowance-calculator",
  h1: "Severance allowance calculator Mauritius",
  title: "Severance allowance Mauritius: {{mu.severance-months}} a year",
  description:
    "Estimate the severance allowance for an unjustified termination in Mauritius: {{mu.severance-months}} of pay for every year of service under the Workers' Rights Act.",
  intro: [
    "When a termination is found unjustified, the Workers' Rights Act 2019 gives the worker a severance allowance based on length of service.",
    "Enter your dates and pay to see the amount, before and after what the employer can deduct.",
  ],
  comoSeCalcula: [
    "For every 12 months of continuous employment you get {{mu.severance-months}} of remuneration.",
    "For extra months, you get one twelfth of that yearly amount for each month.",
    "A month's remuneration is the higher of your last complete month and your average over the last 12 months, overtime and regular bonuses included.",
    "The employer can deduct any gratuity it paid and its contributions to a pension fund or to the PRGF.",
  ],
  ejemplo: ["After 6 years and 3 months on Rs 30,000 a month, severance is Rs 562,500."],
  faq: [
    {
      pregunta: "When is severance allowance due?",
      respuesta: "After at least 12 months of continuous employment, when the Court finds the termination was unjustified, for example in breach of the protections in section 64.",
    },
    {
      pregunta: "Can I ask to get my job back instead?",
      respuesta: "Yes. Instead of claiming severance, you can register a complaint for reinstatement with the supervising officer, normally within 15 days of the termination.",
    },
    {
      pregunta: "Can interest be added?",
      respuesta: "Yes. The Court may order interest of up to 12 per cent a year from the date of termination to the date of payment.",
    },
  ],
  glosario: [{ termino: "Severance allowance", definicion: "The compensation for losing your job when the termination is unjustified." }],
});
