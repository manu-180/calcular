import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.illness-benefit",
  h1: "Illness Benefit calculator Ireland {{anio}}",
  title: "Illness Benefit Ireland {{anio}}: weekly rates",
  description: "See your weekly Illness Benefit for {{anio}} from your average earnings, using the graduated rates in the Department of Social Protection booklet.",
  intro: [
    "Illness Benefit is a weekly payment for people who cannot work because they are ill and have enough PRSI contributions.",
    "The personal rate depends on your average gross weekly earnings. Enter yours to see your rate and what you would get over the weeks you are off.",
  ],
  comoSeCalcula: [
    "Find your average gross weekly earnings, before tax, PRSI or other deductions, in the relevant tax year.",
    "The Department pays one of four graduated rates: €114 under €150 a week, €163.70 from €150, €198.90 from €220 and €254 from €300.",
    "Multiply the weekly rate by the weeks you are off sick to see the total.",
  ],
  ejemplo: ["Someone who earned €450 a week on average gets the full personal rate of €254 a week, or €1,016 over 4 weeks."],
  faq: [
    {
      pregunta: "Can I get more for my family?",
      respuesta:
        "Yes. You may get an increase for a qualified adult if your partner's income is below a set level, and a Child Support Payment for each child. This calculator shows the personal rate only.",
    },
    {
      pregunta: "Is Illness Benefit the same as sick pay from my employer?",
      respuesta: "No. Illness Benefit is a social welfare payment from the Department of Social Protection, separate from any pay you get from your employer.",
    },
    {
      pregunta: "Which year's earnings count?",
      respuesta: "Your earnings in the relevant tax year. The Department checks them when it decides your rate.",
    },
  ],
  glosario: [
    { termino: "Relevant tax year", definicion: "The tax year whose PRSI record and earnings are used to decide a social welfare payment." },
    { termino: "Qualified adult", definicion: "An adult, such as your partner, for whom your payment can be increased if their income is low enough." },
  ],
});
