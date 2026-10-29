import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "bz.notice-pay-calculator",
  "h1": "Notice period and notice pay Belize {{anio}}",
  "title": "Belize notice period {{anio}}: weeks and pay in lieu",
  "description": "Find the notice period for your length of service in Belize, from 1 to 8 weeks, and the pay due when notice is not given.",
  "intro": [
    "In Belize, a contract for an indefinite period can be ended by either side giving notice. The length depends on how long the worker has been with the same employer, from {{bz.notice-weeks[short]}} to {{bz.notice-weeks[senior]}}.",
    "Enter your monthly pay, your start date and the date of notice. The calculator finds the notice period and the amount due when the full notice is not given."
  ],
  "comoSeCalcula": [
    "Notice is due after more than two weeks of continuous service. Up to six months it is {{bz.notice-weeks[short]}}, up to two years it is {{bz.notice-weeks[medium]}}, up to five years it is {{bz.notice-weeks[long]}} and beyond five years it is {{bz.notice-weeks[senior]}}.",
    "An employer who gives no notice, or less, must pay wages for the period that was missed. A worker who fails to give notice owes the employer half the wages for that period.",
    "A collective agreement, a longer period agreed by both sides, or a waiver of notice can replace these periods. Notice cannot be given while the employee is on lawful leave.",
    "One week of pay is monthly pay times 12, divided by 52."
  ],
  "ejemplo": [
    "An employee on BZ$2,000 a month started on 2 March 2020 and is dismissed on 29 October 2026 without notice. With more than five years of service the notice is 8 weeks.",
    "One week of pay is BZ$461.54, so the employer owes BZ$3,692.31. If the worker had left without notice instead, the amount due to the employer would be half, BZ$1,846.15."
  ],
  "faq": [
    {
      "pregunta": "How much notice must I give in Belize?",
      "respuesta": "From one week up to eight weeks, depending on service, under section 37 of the Labour Act. The periods are in the table above."
    },
    {
      "pregunta": "Can my employer pay me instead of giving notice?",
      "respuesta": "Yes. Section 38 lets the employer pay the wages and benefits that would have been due up to the end of the notice."
    },
    {
      "pregunta": "What if I do not give notice?",
      "respuesta": "A worker on an indefinite contract who gives no notice is liable for half the wages for the notice period."
    },
    {
      "pregunta": "Does notice apply to a dismissal for cause?",
      "respuesta": "No. The periods do not apply where the employer may dismiss summarily under section 43."
    }
  ],
  "glosario": [
    {
      "termino": "Notice period",
      "definicion": "The time between telling the other side that the job will end and the last day of work."
    },
    {
      "termino": "Pay in lieu",
      "definicion": "Money paid in place of working out the notice."
    }
  ]
});
