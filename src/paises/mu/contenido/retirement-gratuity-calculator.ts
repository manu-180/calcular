import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.retirement-gratuity-calculator",
  h1: "Retirement gratuity calculator Mauritius",
  title: "Retirement gratuity Mauritius: {{mu.gratuity-days}} per year worked",
  description:
    "Work out the lump sum you get on retirement in Mauritius: {{mu.gratuity-days}} of pay for every year of service, on a {{mu.gratuity-days-in-month}} month.",
  intro: [
    "When you retire after at least 12 months with the same employer, the Workers' Rights Act 2019 gives you a gratuity in one lump sum.",
    "Enter your dates and monthly remuneration to see the minimum amount.",
  ],
  comoSeCalcula: [
    "One day's remuneration is your monthly remuneration divided by {{mu.gratuity-days-in-month}}.",
    "You get {{mu.gratuity-days}} of remuneration for every 12 months of continuous employment, and one twelfth of that for each extra month.",
    "Your employer can deduct part of what a pension fund it pays into gives you on retirement.",
  ],
  ejemplo: ["After 26 years and 9 months on Rs 39,000 a month, the gratuity is Rs 601,875."],
  faq: [
    {
      pregunta: "Who pays the gratuity?",
      respuesta: "If you are in the Portable Retirement Gratuity Fund, the fund pays what is in your account and your employer pays any shortfall up to this amount. Otherwise your employer pays it directly.",
    },
    {
      pregunta: "When can I get it?",
      respuesta: "When you retire voluntarily at 60 or later, when your employer asks you to retire at retirement age, or earlier on grounds of incapacity certified by a Government medical practitioner.",
    },
    {
      pregunta: "Can I get it early at 60 if I keep working?",
      respuesta: "Yes, if you and your employer agree. The advance is the gratuity due at 60, paid when you reach that age.",
    },
  ],
  glosario: [{ termino: "Gratuity", definicion: "A lump sum paid for your years of service when you retire." }],
});
