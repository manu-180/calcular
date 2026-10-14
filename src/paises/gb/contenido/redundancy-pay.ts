import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.redundancy-pay",
  h1: "Statutory redundancy pay calculator",
  title: "Redundancy pay calculator 2026: statutory minimum",
  description:
    "Work out your statutory redundancy pay from your age, years of service and weekly pay, with the {{gb.redundancy-weekly-pay-cap}} weekly cap from 6 April 2026.",
  intro: [
    "If you are made redundant after at least 2 years with your employer, you have a legal right to statutory redundancy pay. Your contract can give you more, but never less.",
    "Enter your age, your full years of service and your weekly pay to see the minimum you are owed.",
  ],
  comoSeCalcula: [
    "Half a week's pay for each full year you were under 22.",
    "One week's pay for each full year you were 22 or older, but under 41.",
    "One and a half weeks' pay for each full year you were 41 or older.",
    "Weekly pay is capped at {{gb.redundancy-weekly-pay-cap}} and only the last {{gb.redundancy-max-years}} years count, counting back from the date you are made redundant.",
  ],
  ejemplo: [
    "At 30, with 10 years of service and £500 a week, you get 9 weeks of pay: £4,500.",
    "The most you can get is 20 years at one and a half weeks with weekly pay at the cap: £22,530.",
  ],
  faq: [
    {
      pregunta: "Do I get redundancy pay with less than 2 years of service?",
      respuesta: "Not statutory redundancy pay. You still get your notice pay, any holiday you have not taken and anything your contract promises.",
    },
    {
      pregunta: "Is redundancy pay taxed?",
      respuesta: "Statutory redundancy pay under £30,000 is not taxable. Notice pay and holiday pay are taxed like normal wages.",
    },
    {
      pregunta: "What counts as a week's pay?",
      respuesta:
        "Your normal weekly pay before tax. If your hours or pay vary, it is the average over the 12 weeks before you were given notice. The amount used is capped at {{gb.redundancy-weekly-pay-cap}}.",
    },
    {
      pregunta: "Does this apply in Northern Ireland?",
      respuesta: "Northern Ireland has the same formula but sets its own weekly pay limit, so check nidirect for the current cap.",
    },
  ],
  glosario: [
    { termino: "Statutory redundancy pay", definicion: "The legal minimum an employer must pay when a role is no longer needed and you have at least 2 years of service." },
    { termino: "Continuous employment", definicion: "Working for the same employer without a break. Only full years count." },
  ],
});
