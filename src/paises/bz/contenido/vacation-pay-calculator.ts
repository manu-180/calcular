import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "bz.vacation-pay-calculator",
  "h1": "Vacation pay calculator Belize {{anio}}",
  "title": "Belize vacation pay {{anio}}: annual holiday and leaving pay",
  "description": "Find your holiday pay in Belize. Each full year earns {{bz.annual-leave-weeks}} working weeks of annual holiday, paid at your average pay. Check what you are owed on leaving.",
  "intro": [
    "After each full year of employment, a worker in Belize is entitled to an annual holiday of at least {{bz.annual-leave-weeks}} working weeks, paid at average pay. If you leave before taking it, the employer pays you for it.",
    "Enter your basic monthly pay and the months you worked in the holiday year. The calculator shows your holiday pay, whether you are taking the holiday or your job has ended."
  ],
  "comoSeCalcula": [
    "Section 126 of the Labour Act defines average pay as one {{bz.average-pay-divisor}}th of total remuneration for the period. Total remuneration is basic wages and does not include overtime, commissions or bonuses.",
    "For a full year, one twenty-sixth of 12 months of wages is the pay for two weeks. For a shorter period, the same fraction is applied to the wages actually earned.",
    "A worker whose job ends after at least {{bz.holiday-pay-minimum-months}} months, before a full year, gets the average pay for the period worked, under section 130.",
    "The employer decides the start date and must give seven days' notice. The holiday must be taken within six months of the date it is earned."
  ],
  "ejemplo": [
    "An employee on BZ$2,000 a month completes a full year. Total remuneration is BZ$24,000, so the holiday pay is 24,000 divided by 26, or BZ$923.08. That is two weeks at BZ$461.54 a week.",
    "A worker on the same pay whose job ends after 6 months, without a holiday, is owed 12,000 divided by 26, or BZ$461.54."
  ],
  "faq": [
    {
      "pregunta": "How many days of annual leave do I get in Belize?",
      "respuesta": "At least {{bz.annual-leave-weeks}} working weeks after each year of employment, under section 127 of the Labour Act."
    },
    {
      "pregunta": "What if I leave before a full year?",
      "respuesta": "If you have worked at least {{bz.holiday-pay-minimum-months}} months, the employer pays your average pay for the period you worked, under section 130."
    },
    {
      "pregunta": "Do public holidays shorten my leave?",
      "respuesta": "No. If a public holiday, Sunday or rest day falls in the holiday, the holiday is lengthened by one day for each."
    },
    {
      "pregunta": "Is holiday pay paid before or after the holiday?",
      "respuesta": "Before. When the holiday is taken in one period, the average pay is paid no later than the day before it starts."
    }
  ],
  "glosario": [
    {
      "termino": "Average pay",
      "definicion": "One twenty-sixth of total remuneration for the period, used to pay for holidays."
    },
    {
      "termino": "Total remuneration",
      "definicion": "Basic wages and the cash value of board or lodging, without overtime, commission or bonuses."
    }
  ]
});
