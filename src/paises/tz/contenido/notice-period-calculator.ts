import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.notice-period-calculator",
  "h1": "Notice period calculator Tanzania",
  "title": "Notice period calculator Tanzania: days and pay in lieu",
  "description": "Find the minimum notice to end a job in Tanzania: {{tz.notice-first-month}} in the first month, {{tz.notice-daily-weekly}} for daily or weekly pay, {{tz.notice-monthly}} for monthly pay.",
  "intro": [
    "Notice of termination must be in writing and give the reasons and the date. Choose how you are employed to see the minimum.",
    "Your employer can pay you instead of letting you work the notice period."
  ],
  "comoSeCalcula": [
    "In the first month of employment the notice is at least {{tz.notice-first-month}}.",
    "After that it is {{tz.notice-daily-weekly}} if you are employed daily or weekly, and {{tz.notice-monthly}} if you are employed monthly.",
    "An agreement can set a longer period, as long as it is the same for both sides."
  ],
  "ejemplo": [
    "On a monthly wage of TSh 1,000,000, the notice is 28 days, or TSh 1,000,000 in lieu."
  ],
  "faq": [
    {
      "pregunta": "Can notice be given during my leave?",
      "respuesta": "No. Notice cannot be given during leave or run at the same time as it."
    },
    {
      "pregunta": "Can my employer pay me instead?",
      "respuesta": "Yes. The employer can pay what you would have earned during the notice period."
    },
    {
      "pregunta": "What if I refuse to work my notice?",
      "respuesta": "Your employer can deduct what you would have earned in that period from the money due to you."
    }
  ],
  "glosario": [
    {
      "termino": "Pay in lieu of notice",
      "definicion": "Money paid instead of working the notice period."
    }
  ]
});
