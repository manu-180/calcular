import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.gross-salary",
  h1: "Net to gross salary calculator Liberia",
  title: "Net to gross salary Liberia: what gross gives your net",
  description: "Find the gross monthly salary in Liberia that leaves the take-home pay you want after NASSCORP and personal income tax. Useful to negotiate a net salary.",
  intro: [
    "Enter the take-home pay you want each month to see the gross salary an employer has to offer.",
    "The calculation reverses NASSCORP's {{lr.nasscorp-employee}} and the LRA income tax bands.",
  ],
  comoSeCalcula: [
    "We look for the gross salary whose net, after {{lr.nasscorp-employee}} NASSCORP and PIT on the yearly bands, equals the amount you enter.",
    "PIT is charged on 12 times the gross salary, with the first {{lr.pit-bands[0].hasta}} a year tax-free.",
  ],
  ejemplo: ["To take home L$34,358.33 a month you need a gross salary of L$40,000."],
  faq: [
    {
      pregunta: "Why is the gross much higher than the net at high salaries?",
      respuesta: "Because income above {{lr.pit-bands[-1].desde}} a year is taxed at {{lr.pit-bands[-1].tasa}}, plus the NASSCORP contribution on the whole salary.",
    },
    {
      pregunta: "Does this include non-cash benefits?",
      respuesta: "No. It assumes a cash salary only. Use the take-home pay calculator to add housing, a vehicle or fuel.",
    },
    {
      pregunta: "My offer is in US dollars. Can I use this?",
      respuesta: "Yes. Convert your target net to Liberian dollars at the rate your employer uses, then convert the gross back.",
    },
  ],
  glosario: [
    { termino: "Gross salary", definicion: "Pay before NASSCORP and income tax are deducted." },
    { termino: "Net salary", definicion: "What you receive after the deductions, also called take-home pay." },
  ],
});
