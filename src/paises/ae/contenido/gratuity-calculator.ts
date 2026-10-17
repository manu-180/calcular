import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.gratuity-calculator",
  h1: "UAE gratuity calculator",
  title: "Gratuity calculator UAE: end of service benefits",
  description:
    "Work out your end-of-service gratuity under the UAE Labour Law: {{ae.gratuity[first-5-years]}} of basic wage a year for five years, then {{ae.gratuity[after-5-years]}} a year.",
  intro: [
    "Foreign full-time workers in the UAE private sector earn an end-of-service gratuity once they complete one year of continuous service.",
    "Enter your last basic wage and your years of service to see what you should get when your job ends.",
  ],
  comoSeCalcula: [
    "For each of the first five years you get {{ae.gratuity[first-5-years]}} of basic wage. Each year after that adds {{ae.gratuity[after-5-years]}}.",
    "Parts of a year count in proportion, once you've completed one full year. Days of unpaid absence don't count as service.",
    "The gratuity uses your last basic wage, without allowances such as housing or transport.",
    "The total can't be more than two years' wage.",
  ],
  ejemplo: ["With a basic wage of AED 12,000 and 8 years of service, you get 105 days for the first five years and 90 for the next three: 195 days. At AED 400 a day, that's AED 78,000."],
  faq: [
    {
      pregunta: "Do I get gratuity if I resign?",
      respuesta: "Article 51 of the current Labour Law gives the gratuity to foreign full-time workers who complete one year of continuous service. It doesn't make the amount depend on who ends the contract.",
    },
    {
      pregunta: "Is gratuity worked out on basic or total salary?",
      respuesta: "On the last basic wage. Allowances such as housing, transport, utilities or furniture aren't included.",
    },
    {
      pregunta: "When must my employer pay it?",
      respuesta: "With all outstanding wages and other entitlements, within 14 days of the end of the contract.",
    },
    {
      pregunta: "Do Emiratis get gratuity?",
      respuesta: "Emiratis receive their end-of-service benefits under the pensions and social security legislation, not this formula.",
    },
  ],
  glosario: [
    { termino: "Gratuity", definicion: "The lump sum a foreign worker gets at the end of service under Article 51 of the Labour Law." },
    { termino: "Basic wage", definicion: "The wage in your contract before allowances such as housing or transport." },
  ],
});
