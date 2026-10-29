import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.maternity-allowance-calculator",
  h1: "Maternity allowance calculator Antigua and Barbuda {{anio}}",
  title: "Maternity allowance calculator {{anio}}: 13 weeks",
  description: "Estimate your Social Security maternity allowance: {{ag.maternity-allowance-rate}} of average weekly insurable earnings, up to {{ag.maternity-allowance-weeks}}.",
  intro: [
    "Enter your insurable earnings and the weeks you worked in the qualifying period. The calculator shows the weekly allowance and the total for the full period.",
    "The Antigua and Barbuda Social Security Board pays Maternity Allowance to an insured woman who has given birth to a living child. It is paid for up to {{ag.maternity-allowance-weeks}}.",
  ],
  comoSeCalcula: [
    "The Board adds up your insurable earnings over the 52 weeks before the 6-week period that comes before the birth, within the weekly ceiling of {{ag.ss-ceiling-weekly}}.",
    "It divides that total by the weeks you worked, which cannot be fewer than {{ag.maternity-min-weeks-averaged}}, to get your average weekly earnings.",
    "The allowance is {{ag.maternity-allowance-rate}} of that average. It can start up to six weeks before the confinement and no later than the week of the birth.",
  ],
  ejemplo: [
    "A woman earned EC$41,600 over 52 weeks, so her average is EC$800 a week. The allowance is 60% of that, EC$480 a week, and 13 weeks come to EC$6,240.",
  ],
  faq: [
    {
      pregunta: "How much is the maternity allowance?",
      respuesta: "{{ag.maternity-allowance-rate}} of the insured person's average insurable weekly earnings, according to the Social Security Board.",
    },
    {
      pregunta: "How long is it paid?",
      respuesta: "For up to {{ag.maternity-allowance-weeks}}, starting as early as 6 weeks before the confinement or as late as the week of the birth.",
    },
    {
      pregunta: "Is there a maternity grant as well?",
      respuesta: "Yes. The Board also pays a one-time Maternity Grant if the mother or her husband has paid 26 weekly contributions since joining and 26 in the year before the birth. This calculator does not estimate the grant.",
    },
  ],
  glosario: [
    { termino: "Confinement", definicion: "The birth of the child." },
    { termino: "Insurable weekly earnings", definicion: "Weekly pay on which Social Security contributions are charged, up to the ceiling." },
    { termino: "Maternity Grant", definicion: "A one-time payment separate from the weekly allowance." },
  ],
});
