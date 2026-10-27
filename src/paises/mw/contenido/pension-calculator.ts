import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.pension-calculator",
  h1: "Pension contribution calculator Malawi",
  title: "Pension contribution calculator Malawi: 5% and 10%",
  description:
    "Work out the minimum pension contributions under the Pension Act: {{mw.pension-employee}} from you and {{mw.pension-employer}} from your employer, each month.",
  intro: [
    "Enter your pensionable pay to see how much goes into your pension fund each month, and who pays what.",
    "The minimum rates come from section 12 of the Pension Act, 2023.",
  ],
  comoSeCalcula: [
    "You contribute at least {{mw.pension-employee}} of your pensionable pay. It comes off your salary.",
    "Your employer contributes at least {{mw.pension-employer}} on top of your salary.",
    "Both amounts go into the mandatory occupational pension scheme.",
  ],
  ejemplo: ["On pensionable pay of K500,000 you put in K25,000 and your employer K50,000, K75,000 a month in total."],
  faq: [
    {
      pregunta: "Can the rates be higher?",
      respuesta: "Yes. You and your employer can agree to higher rates, and the Registrar has to be told about the change.",
    },
    {
      pregunta: "Can my employer pay my share?",
      respuesta: "Yes. An employer can choose to carry all or part of your contribution, as long as the total is not below the two minimums added together.",
    },
    {
      pregunta: "Is a house or car from my employer pensionable?",
      respuesta: "No. The Pension Act leaves a house or a motor vehicle provided by the employer out of pensionable emoluments, together with investment income and capital gains.",
    },
  ],
  glosario: [
    { termino: "Pensionable emoluments", definicion: "Guaranteed wages and other earnings, without investment income, capital gains or a house or car from your employer." },
    { termino: "Occupational pension scheme", definicion: "The pension fund your employer has to run for its staff." },
  ],
});
