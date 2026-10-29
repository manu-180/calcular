import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.sickness-benefit-calculator",
  h1: "Sickness benefit calculator Antigua and Barbuda {{anio}}",
  title: "Sickness benefit calculator {{anio}}: Social Security",
  description: "Estimate the Social Security sickness benefit: {{ag.sickness-benefit-rate}} of your average weekly insurable earnings, for up to {{ag.sickness-benefit-max-weeks}}.",
  intro: [
    "Enter your average weekly earnings and the weeks you expect to be off sick. The calculator shows the weekly benefit and the total.",
    "The Antigua and Barbuda Social Security Board pays sickness benefit to private-sector employees and self-employed people aged 16 or over and under pension age.",
  ],
  comoSeCalcula: [
    "The benefit is {{ag.sickness-benefit-rate}} of your average weekly insurable earnings over the three months before the illness. Earnings above the weekly ceiling of {{ag.ss-ceiling-weekly}} are not counted.",
    "No benefit is paid for the first three days of illness, and Sundays are excluded. Those days are not lost if you fall ill again within eight weeks.",
    "Benefit runs for up to {{ag.sickness-benefit-max-weeks}} of continuous illness. If you are still ill, the Board may refer you to a designated doctor and pay for 13 more weeks.",
  ],
  ejemplo: [
    "An employee averaging EC$800 a week is ill for 4 weeks. The weekly benefit is 60% of 800, which is EC$480, and 4 weeks come to EC$1,920 before the unpaid first days are taken off.",
  ],
  faq: [
    {
      pregunta: "How much is the sickness benefit?",
      respuesta: "{{ag.sickness-benefit-rate}} of your average weekly insurable earnings, according to the Social Security Board's sickness page.",
    },
    {
      pregunta: "Who can claim?",
      respuesta: "Private-sector employees and self-employed people who are 16 or over and under pensionable age, were employed the day before the illness and worked at least eight weeks in the previous three months, and have paid at least 26 weekly contributions.",
    },
    {
      pregunta: "How is this different from sick leave pay?",
      respuesta: "Sick leave pay comes from your employer under section C17 of the Labour Code for the first 12 days. Sickness benefit is paid by Social Security and covers longer illnesses.",
    },
  ],
  glosario: [
    { termino: "Insurable earnings", definicion: "The pay on which Social Security contributions are charged, up to a ceiling." },
    { termino: "Waiting days", definicion: "The first three days of an illness, for which no benefit is paid." },
    { termino: "Pensionable age", definicion: "The age at which an insured person can claim an age pension." },
  ],
});
