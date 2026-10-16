import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.kiwisaver-government-contribution",
  h1: "KiwiSaver government contribution calculator",
  title: "KiwiSaver government contribution: how much you'll get",
  description:
    "The government adds {{nz.kiwisaver-government-rate}} of what you put into KiwiSaver between 1 July and 30 June, up to {{nz.kiwisaver-government-max}}. See what you'll get and what's left to contribute.",
  intro: [
    "Each year the government adds money to your KiwiSaver based on what you contributed between 1 July and 30 June.",
    "You get {{nz.kiwisaver-government-rate}} of every dollar you put in, up to {{nz.kiwisaver-government-max}}, if you're 16 to 65 and your taxable income is {{nz.kiwisaver-government-income-cap}} or less.",
  ],
  comoSeCalcula: [
    "Add up your own contributions between 1 July and 30 June. Employer contributions don't count.",
    "Multiply by {{nz.kiwisaver-government-rate}}. If the result is over {{nz.kiwisaver-government-max}}, you get {{nz.kiwisaver-government-max}}.",
    "To get the full amount you need to contribute at least {{nz.kiwisaver-government-full-contribution}} of your own money in the year.",
  ],
  ejemplo: ["You've put in $800 since 1 July. The government adds $200. Contribute another $242.86 before 30 June to get the full $260.72."],
  faq: [
    {
      pregunta: "When is the government contribution paid?",
      respuesta: "It's paid in July or August each year, so make sure your contributions are in by 30 June.",
    },
    {
      pregunta: "Do employer contributions count?",
      respuesta: "No. Only your own money counts. Employer contributions, past government contributions and money moved from Australian schemes don't.",
    },
    {
      pregunta: "Can 16 and 17 year olds get it?",
      respuesta: "Yes. Since 1 July 2025 members aged 16 and 17 can get the government contribution if they meet the other rules.",
    },
  ],
  glosario: [
    { termino: "Government contribution", definicion: "A yearly payment from the government into your KiwiSaver account." },
    { termino: "KiwiSaver year", definicion: "For the government contribution, the year runs from 1 July to 30 June." },
  ],
});
