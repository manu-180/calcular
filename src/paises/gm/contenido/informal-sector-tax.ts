import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.informal-sector-tax",
  h1: "Informal sector income tax by trade",
  title: "Informal sector tax Gambia: yearly amount by trade",
  description: "Find the yearly informal sector income tax for your trade in The Gambia, from barbers and tailors to taxi drivers, as listed by the Gambia Revenue Authority.",
  intro: [
    "Small self-employed people without proper business records or a permanent place of business pay a fixed income tax each year. The amount depends on the trade.",
    "Choose your trade to see what you pay. A barber pays {{gm.informal-sector-tax[barbers]}} a year, a taxi or van driver {{gm.informal-sector-tax[drivers]}} and a corner shop {{gm.informal-sector-tax[corner-shops]}}.",
  ],
  comoSeCalcula: [
    "The amount for each trade comes from the Informal Sector Regulation of 2007, amended in 2015, as published by the GRA.",
    "Trades not on the list pay {{gm.informal-sector-tax[others]}} a year.",
  ],
  ejemplo: ["A tailor working with two machines pays {{gm.informal-sector-tax[tailors-2]}} a year. With three machines or more the amount is {{gm.informal-sector-tax[tailors-3]}}."],
  faq: [
    {
      pregunta: "When is it due?",
      respuesta: "On or before 31 March each year, as a single payment at the nearest GRA tax office. Instalments may be accepted if you ask.",
    },
    {
      pregunta: "Do I have to file a tax return?",
      respuesta: "No annual income tax return is needed, and nobody is exempt from paying.",
    },
    {
      pregunta: "Is it a final tax?",
      respuesta: "Yes, unless your turnover is above D100,000. Then the GRA can tax your business under the normal rules.",
    },
  ],
  glosario: [
    { termino: "Informal sector", definicion: "Small self-employed people with no proper business records or permanent place of business." },
    { termino: "DTD", definicion: "Domestic Taxes Department of the GRA, whose offices take these payments." },
  ],
});
