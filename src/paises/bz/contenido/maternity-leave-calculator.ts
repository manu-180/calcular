import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "bz.maternity-leave-calculator",
  "h1": "Maternity leave calculator Belize {{anio}}",
  "title": "Belize maternity leave {{anio}}: dates and full pay",
  "description": "Find your maternity leave dates in Belize. The Labour Act gives {{bz.maternity-weeks}} weeks on full pay. Enter the expected date and the weeks you want before it.",
  "intro": [
    "A female worker in Belize is entitled to {{bz.maternity-weeks}} weeks of maternity leave on full pay, as long as she worked for the same employer for at least {{bz.maternity-qualifying-days}} days in the twelve months before the birth.",
    "Enter the expected date of confinement and how many weeks you want before it. The calculator shows the first and last day of leave, the day you return and the full pay for the period."
  ],
  "comoSeCalcula": [
    "You can take up to {{bz.maternity-before-max}} weeks before the expected date. The rest of the {{bz.maternity-weeks}} weeks follows the expected date.",
    "Two weeks before and {{bz.maternity-after-mandatory}} weeks after the expected date are mandatory. The calculator will not accept fewer than {{bz.maternity-before-mandatory}} weeks before.",
    "Full pay for the leave is your weekly pay times {{bz.maternity-weeks}}. Payments include Sundays and public holidays.",
    "If you also receive the maternity allowance from the Social Security Board, your employer pays the difference between that allowance and your full pay.",
    "Without {{bz.maternity-qualifying-days}} days with the same employer, the leave is granted without pay."
  ],
  "ejemplo": [
    "The expected date is 10 December 2026 and the worker chooses 4 weeks before. Her leave starts on 12 November 2026 and runs 10 weeks after the date, to 17 February 2027. She returns on 18 February 2027.",
    "On BZ$2,000 a month her full pay for the 14 weeks is BZ$6,461.54, before any Social Security allowance."
  ],
  "faq": [
    {
      "pregunta": "How long is maternity leave in Belize?",
      "respuesta": "{{bz.maternity-weeks}} weeks on full pay, under section 177 of the Labour Act."
    },
    {
      "pregunta": "How much of it must I take?",
      "respuesta": "Two weeks before and {{bz.maternity-after-mandatory}} weeks after the expected date of confinement are mandatory."
    },
    {
      "pregunta": "When do I apply?",
      "respuesta": "At least ten weeks before the expected date, with a medical certificate that states the date."
    },
    {
      "pregunta": "Can I be dismissed during maternity leave?",
      "respuesta": "Section 178 stops an employer from giving notice of dismissal during the absence, or in a way that the notice would expire during it."
    }
  ],
  "glosario": [
    {
      "termino": "Confinement",
      "definicion": "The birth of a child. The expected date is the one given on the medical certificate."
    },
    {
      "termino": "Maternity allowance",
      "definicion": "A benefit paid by the Social Security Board to an insured mother."
    }
  ]
});
