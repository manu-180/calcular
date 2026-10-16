import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.gratuity-calculator",
  h1: "Gratuity calculator",
  title: "Gratuity calculator under the Code on Social Security",
  description:
    "Calculate your gratuity: {{in.gratuity-days}} of wages for each year of service, with a month counted as {{in.gratuity-divisor}} days. Rules for fixed-term jobs included.",
  intro: [
    "Gratuity is a lump sum your employer pays when you leave after years of service. Enter your last wages and your years, and see the amount.",
    "Since 21 November 2025 gratuity follows the Code on Social Security, 2020, which replaced the Payment of Gratuity Act.",
  ],
  comoSeCalcula: [
    "Gratuity for each year is your last monthly wages divided by {{in.gratuity-divisor}} and multiplied by {{in.gratuity-days}}.",
    "That is multiplied by your completed years of service. A last year with more than six months counts as a full year.",
    "On resignation, retirement or termination you need {{in.gratuity-min-years}} of continuous service. On death or disablement no minimum applies.",
    "Fixed-term employees get gratuity in proportion to the time they worked, without the five-year minimum.",
  ],
  ejemplo: [
    "After 8 years with last wages of ₹60,000, each year is worth ₹34,615.38 and your gratuity is ₹2,76,923.08.",
  ],
  faq: [
    {
      pregunta: "Which wages are used?",
      respuesta: "The wages you last drew. For most salaried people that is basic pay plus dearness allowance.",
    },
    {
      pregunta: "Is there a maximum gratuity?",
      respuesta:
        "The Code lets the central government set a cap by notification. This calculator does not apply one, so check your employer's policy if your amount is large.",
    },
    {
      pregunta: "Can I lose my gratuity?",
      respuesta:
        "Only in limited cases: it can be reduced to cover damage you caused to the employer's property, or forfeited if you are dismissed for violent conduct or an offence involving moral turpitude.",
    },
    {
      pregunta: "Can my employer pay more?",
      respuesta: "Yes. The Code sets the minimum. An agreement, award or contract can give you better terms.",
    },
  ],
  glosario: [
    { termino: "Gratuity", definicion: "A lump sum paid by the employer at the end of employment for years of service." },
    { termino: "Fixed-term employment", definicion: "A job for a set period written in the contract." },
    { termino: "Continuous service", definicion: "Service without breaks other than leave, sickness, lay-off and similar." },
  ],
});
