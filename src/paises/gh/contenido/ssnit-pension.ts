import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.ssnit-pension",
  h1: "SSNIT pension calculator",
  title: "SSNIT pension calculator: estimate your old age pension",
  description: "Estimate your SSNIT old age pension from your contribution months and the average of your three best years' salaries, from {{gh.pension-min-right}} to {{gh.pension-max-right}}.",
  intro: [
    "Your SSNIT pension depends on how many months you contributed and on the average of your three best years' annual salaries.",
    "With {{gh.pension-min-months}} months you earn a pension right of {{gh.pension-min-right}}, and each extra year adds {{gh.pension-yearly-step}}, up to {{gh.pension-max-right}}.",
  ],
  comoSeCalcula: [
    "Pension right: {{gh.pension-min-right}} for {{gh.pension-min-months}} months of contributions, plus {{gh.pension-yearly-step}} for every additional year, up to {{gh.pension-max-right}}.",
    "Yearly pension: your pension right times the average of your three best years' annual salaries.",
    "The full pension is paid from age {{gh.pension-full-age}}.",
  ],
  ejemplo: ["With 300 months and a best-three-years average of GH₵60,000, the pension right is 48.75% and the pension is about GH₵2,437.50 a month."],
  faq: [
    {
      pregunta: "How many months do I need for a SSNIT pension?",
      respuesta: "At least {{gh.pension-min-months}} months under Act 766, or 240 months under PNDC Law 247 in aggregate.",
    },
    {
      pregunta: "Can I retire before 60?",
      respuesta: "Yes, from 55 with a reduced pension. An early age reduction factor is applied.",
    },
    {
      pregunta: "How long is the pension paid?",
      respuesta: "All eligible pensioners are paid until death.",
    },
  ],
  glosario: [{ termino: "Pension right", definicion: "The share of lost income that the scheme replaces, based on the months you contributed." }],
});
