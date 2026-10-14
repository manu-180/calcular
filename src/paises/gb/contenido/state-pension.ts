import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.state-pension",
  h1: "New State Pension calculator 2026/27",
  title: "State Pension calculator 2026/27: {{gb.state-pension-full-weekly}} a week",
  description:
    "The full new State Pension is {{gb.state-pension-full-weekly}} a week in 2026/27. See what you get with your qualifying years, from {{gb.state-pension-min-years}} up to {{gb.state-pension-full-years}}.",
  intro: [
    "The new State Pension is for people who reach State Pension age on or after 6 April 2016. How much you get depends on your National Insurance record.",
    "Enter your qualifying years to see your weekly, four-weekly and yearly State Pension at the 2026/27 rate.",
  ],
  comoSeCalcula: [
    "The full rate is {{gb.state-pension-full-weekly}} a week, and you need {{gb.state-pension-full-years}} of qualifying years to get it.",
    "With fewer years you get a share: each qualifying year is worth the full rate divided by the number of years needed for it.",
    "You need at least {{gb.state-pension-min-years}} of qualifying years to get anything.",
  ],
  ejemplo: ["With 20 qualifying years you get £137.89 a week, about £7,170 a year."],
  faq: [
    {
      pregunta: "What is a qualifying year?",
      respuesta:
        "A tax year in which you paid National Insurance, were treated as paying it (for example while working above the Lower Earnings Limit), or got National Insurance credits, for instance while claiming Child Benefit for a child under 12 or caring for someone.",
    },
    {
      pregunta: "My record started before April 2016. Does this apply?",
      respuesta:
        "Not exactly. Your starting amount was worked out in 2016 from your old record, and it can be more or less than this simple calculation. Your State Pension forecast on GOV.UK shows your real figure.",
    },
    {
      pregunta: "Can I fill gaps in my record?",
      respuesta: "Often yes, by paying voluntary National Insurance contributions. Check your forecast first to see whether a gap would actually increase your pension.",
    },
    {
      pregunta: "Does the State Pension go up every year?",
      respuesta: "Yes. It is increased each April. The current rule is the triple lock: the highest of earnings growth, CPI inflation or 2.5%.",
    },
  ],
  glosario: [
    { termino: "State Pension age", definicion: "The age you can start claiming the State Pension. It depends on your date of birth." },
    { termino: "National Insurance credits", definicion: "Credits that fill your record when you cannot work, for example while caring for a child or claiming some benefits." },
  ],
});
