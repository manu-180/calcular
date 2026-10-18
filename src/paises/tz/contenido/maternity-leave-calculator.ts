import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.maternity-leave-calculator",
  "h1": "Maternity leave calculator Tanzania",
  "title": "Maternity leave calculator Tanzania: when your leave ends",
  "description": "Find the last day of your leave: {{tz.maternity-days}} of paid maternity leave, {{tz.maternity-days-multiple}} for twins, or {{tz.paternity-days}} of paternity leave.",
  "intro": [
    "Enter the first day of your leave to see when it ends.",
    "Maternity and paternity leave are paid under the Employment and Labour Relations Act."
  ],
  "comoSeCalcula": [
    "Maternity leave is at least {{tz.maternity-days}} of paid leave, or {{tz.maternity-days-multiple}} if you have more than one baby at the same birth.",
    "Paternity leave is at least {{tz.paternity-days}} of paid leave, taken within seven days of the birth.",
    "The calculator counts calendar days from the first day of leave."
  ],
  "ejemplo": [
    "Maternity leave that starts on 1 November 2026 ends on 23 January 2027."
  ],
  "faq": [
    {
      "pregunta": "When must I tell my employer?",
      "respuesta": "At least three months before the expected date of birth, with a medical certificate."
    },
    {
      "pregunta": "When can I start maternity leave?",
      "respuesta": "From four weeks before the expected date of birth, or earlier if a doctor says it is needed."
    },
    {
      "pregunta": "What if the baby dies in its first year?",
      "respuesta": "You are entitled to another {{tz.maternity-days}} of paid maternity leave within the leave cycle."
    }
  ],
  "glosario": [
    {
      "termino": "Leave cycle",
      "definicion": "For maternity leave, a period of 36 months with the same employer."
    }
  ]
});
