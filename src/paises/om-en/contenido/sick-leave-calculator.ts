import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.sick-leave-calculator",
  h1: "Oman sick leave pay calculator",
  title: "Sick leave pay in Oman by number of days",
  description:
    "Work out your sick leave pay in Oman: {{om.sick-leave[0].tasa}} of the total wage at first, then lower shares up to {{om.sick-leave-days}} a year, and who pays each part.",
  intro: [
    "A worker who proves illness gets up to {{om.sick-leave-days}} of sick leave a year, with a share of pay that goes down the longer the leave lasts.",
    "Enter your total wage and the sick days already taken and taken now in the same year to see the pay owed and who pays it.",
  ],
  comoSeCalcula: [
    "For the first {{om.sick-leave[0].hasta}} of leave in the year: {{om.sick-leave[0].tasa}} of the wage.",
    "After that, until leave reaches {{om.sick-leave[1].hasta}}: {{om.sick-leave[1].tasa}}.",
    "After that, until it reaches {{om.sick-leave[2].hasta}}: {{om.sick-leave[2].tasa}}, then {{om.sick-leave[3].tasa}} up to the yearly limit.",
    "For Omani workers the employer pays the first {{om.sick-employer-days}} in full and the Social Protection Fund pays the rest at the same shares.",
  ],
  ejemplo: [
    "An Omani worker on a total wage of OMR 600 off sick for 10 days earns OMR 20 a day. The employer pays OMR 140 for the first seven days and the Fund pays OMR 60.",
  ],
  faq: [
    {
      pregunta: "How many sick days does Oman Labour Law give?",
      respuesta: "Up to {{om.sick-leave-days}} a year, with a share of the total wage that starts at {{om.sick-leave[0].tasa}} and ends at {{om.sick-leave[3].tasa}}.",
    },
    {
      pregunta: "Who pays sick leave?",
      respuesta: "For Omani workers the employer pays the first seven days in full and the rest comes from the sick leave branch of the Social Protection Fund. For non-Omanis the employer pays under the Labour Law.",
    },
    {
      pregunta: "How do I prove I am ill?",
      respuesta: "With a medical certificate, under article 47 of the Labour Law.",
    },
  ],
  glosario: [
    { termino: "Total wage", definicion: "The basic wage plus all allowances." },
  ],
});
