import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.minimum-wage",
  "h1": "Minimum wage in Tanzania 2026",
  "title": "Minimum wage Tanzania 2026 by sector",
  "description": "Find the 2026 minimum wage for your sector in Tanzania. Sectors not listed have a minimum of {{tz.minimum-wage-monthly[other]}} a month.",
  "intro": [
    "A new minimum wage order for the private sector took effect on 1 January 2026. It sets a monthly, daily and hourly minimum for each sector.",
    "Choose your sector to see the minimum, and enter your wage if you want to compare."
  ],
  "comoSeCalcula": [
    "The order lists 16 sectors, most of them split into types of employer or activity.",
    "Each one has a minimum per hour, day, week, fortnight and month. Sectors that are not listed use the general rate of {{tz.minimum-wage-monthly[other]}} a month.",
    "An employer can always pay more than the minimum, and existing better terms stay in place."
  ],
  "ejemplo": [
    "A worker in a sector not listed must earn at least TSh 175,000 a month, TSh 6,731 a day or TSh 897 an hour."
  ],
  "faq": [
    {
      "pregunta": "When did the new minimum wages start?",
      "respuesta": "On 1 January 2026, when the 2025 order replaced the one from 2022."
    },
    {
      "pregunta": "What is the lowest minimum wage?",
      "respuesta": "{{tz.minimum-wage-monthly[domestic-other]}} a month, for domestic workers other than those employed by diplomats, major businessmen or entitled officers, or who live outside the household."
    },
    {
      "pregunta": "Does the order apply to the public sector?",
      "respuesta": "No. It applies to employees and employers in the private sector."
    }
  ],
  "glosario": [
    {
      "termino": "Private sector",
      "definicion": "Any sector other than the public sector."
    }
  ]
});
