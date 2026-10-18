import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.annual-leave-calculator",
  "h1": "Annual leave calculator Tanzania",
  "title": "Annual leave calculator Tanzania: {{tz.annual-leave-days}} days a year",
  "description": "Work out your annual leave in Tanzania: at least {{tz.annual-leave-days}} consecutive days of paid leave in each 12-month leave cycle.",
  "intro": [
    "Enter the months you have completed in this leave cycle and the days you already took.",
    "For a full cycle the result is the legal minimum. For part of a cycle it is an estimate in proportion to the months worked."
  ],
  "comoSeCalcula": [
    "Each leave cycle lasts 12 months from the start of the job or the end of the last cycle.",
    "You are entitled to at least {{tz.annual-leave-days}} consecutive days of paid leave, public holidays inside the period included.",
    "Leave already granted at your request during the cycle can be taken off."
  ],
  "ejemplo": [
    "After a full cycle with 10 days taken, 18 days are still due."
  ],
  "faq": [
    {
      "pregunta": "Do public holidays count as leave?",
      "respuesta": "Yes. The 28 days include any public holiday that falls within the leave."
    },
    {
      "pregunta": "Is leave paid on my basic wage?",
      "respuesta": "Yes. Paid leave under the Act is calculated on the employee's basic wage."
    },
    {
      "pregunta": "Is there an allowance for travel?",
      "respuesta": "The 2025 minimum wage order adds a leave travel allowance once every two years of continuous service."
    }
  ],
  "glosario": [
    {
      "termino": "Leave cycle",
      "definicion": "A period of 12 months of employment with the same employer."
    }
  ]
});
