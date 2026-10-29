import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.sickness-benefit-calculator",
  h1: "Barbados NIS sickness benefit calculator {{anio}}",
  title: "Sickness benefit calculator {{anio}}: NIS pays {{bb.sickness-benefit-rate}}",
  description:
    "Estimate your NIS sickness benefit in Barbados: {{bb.sickness-benefit-rate}} of average insurable weekly earnings for up to {{bb.sickness-max-weeks}} weeks, limited to the {{bb.nis-ceiling-weekly}} weekly ceiling.",
  intro: [
    "When an insured worker in Barbados cannot work because of illness, the National Insurance Scheme can pay a sickness benefit of {{bb.sickness-benefit-rate}} of average insurable weekly earnings. It runs for a maximum of {{bb.sickness-max-weeks}} weeks.",
    "Enter your average insurable weekly earnings and the weeks you expect to be off. The calculator shows the weekly benefit and the total.",
  ],
  comoSeCalcula: [
    "Insurable earnings: your average weekly earnings, limited to the NIS weekly ceiling of {{bb.nis-ceiling-weekly}}.",
    "Weekly benefit: {{bb.sickness-benefit-rate}} of those earnings, which is two thirds.",
    "Weeks counted: the weeks you enter, up to the maximum of {{bb.sickness-max-weeks}}.",
    "Total benefit: the weekly benefit multiplied by the weeks counted. NISSS checks medical evidence and contribution conditions before it pays.",
  ],
  ejemplo: [
    "A bus driver averages Bds$900 of insurable earnings a week and is off for 10 weeks after surgery. His weekly benefit is two thirds of Bds$900, or Bds$600.00, so the 10 weeks bring Bds$6,000.00. A worker on Bds$1,000 a week who is off for 30 weeks is paid for 26 of them, a total of Bds$17,333.33.",
  ],
  faq: [
    {
      pregunta: "How much is NIS sickness benefit in Barbados?",
      respuesta: "The NISSS Sickness Benefit page gives {{bb.sickness-benefit-rate}} of the insured person's average insurable weekly earnings.",
    },
    {
      pregunta: "For how long is sickness benefit paid?",
      respuesta: "NISSS pays it for a maximum of {{bb.sickness-max-weeks}} weeks according to the same page.",
    },
    {
      pregunta: "Is there a limit on the earnings used?",
      respuesta: "Yes. Insurable earnings stop at the weekly ceiling, {{bb.nis-ceiling-weekly}} in the current schedule published by NISSS.",
    },
  ],
  glosario: [
    { termino: "Sickness benefit", definicion: "A weekly payment from NIS to an insured worker who is unable to work through illness." },
    { termino: "Average insurable earnings", definicion: "The average of the pay on which you paid NIS, used to size the benefit." },
    { termino: "Weekly ceiling", definicion: "The most weekly pay that counts for NIS contributions and benefits." },
  ],
});
