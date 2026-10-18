import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.inflation-calculator",
  "h1": "Inflation calculator Tanzania",
  "title": "Inflation calculator Tanzania: prices against last year",
  "description": "See what something that cost a given amount a year ago costs today, with Tanzania's annual headline inflation of {{tz.inflation}}.",
  "intro": [
    "Enter a price from a year ago to see the same basket of goods at today's prices.",
    "The latest annual headline inflation rate is {{tz.inflation}}, for the month starting {{tz.inflation#desde}}."
  ],
  "comoSeCalcula": [
    "The calculator adds the annual headline inflation rate published by the National Bureau of Statistics to the amount.",
    "It is the average for the whole basket. A single product can rise more or less."
  ],
  "ejemplo": [
    "With inflation of 4.3%, TSh 100,000 a year ago equals TSh 104,300 today."
  ],
  "faq": [
    {
      "pregunta": "Who publishes inflation in Tanzania?",
      "respuesta": "The National Bureau of Statistics, each month."
    },
    {
      "pregunta": "What is headline inflation?",
      "respuesta": "The change in the consumer price index over 12 months, for the whole basket of goods and services."
    },
    {
      "pregunta": "Can I go back more than a year?",
      "respuesta": "This calculator compares with the same month a year earlier."
    }
  ],
  "glosario": [
    {
      "termino": "Headline inflation",
      "definicion": "The overall rise in consumer prices over 12 months."
    }
  ]
});
