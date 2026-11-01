import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "bz.final-pay-calculator",
  "h1": "Final pay calculator Belize {{anio}}",
  "title": "Belize final pay {{anio}}: severance, notice and holiday pay",
  "description": "Add up what you are owed when a job ends in Belize: severance pay, pay in lieu of notice and unused holiday pay under the Labour Act.",
  "intro": [
    "When a job ends in Belize, the employer may owe three things on top of unpaid wages: severance pay (from {{bz.severance-min-years}} years of service), pay in place of notice and pay for an annual holiday that was not taken.",
    "Enter your pay, your dates, why the job ended, whether full notice was given and the months worked since your last holiday. The calculator adds the three parts."
  ],
  "comoSeCalcula": [
    "Severance pay is {{bz.severance-weeks-mid}} week per complete year from {{bz.severance-min-years}} years of service, and {{bz.severance-weeks-long}} weeks per complete year above {{bz.severance-long-years}} years.",
    "Notice pay applies when the employer ends the job without the full notice. Notice runs from {{bz.notice-weeks[short]}} to {{bz.notice-weeks[senior]}}, depending on service.",
    "Holiday pay is one {{bz.average-pay-divisor}}th of basic wages for the months worked since the last holiday. If you worked less than {{bz.holiday-pay-minimum-months}} months in the holiday year, none is due.",
    "A week of pay is monthly pay times 12, divided by 52. Unpaid wages for the last pay period are not included."
  ],
  "ejemplo": [
    "An employee on BZ$2,000 a month, with service from 2 February 2015 to 29 October 2026, is let go with no notice and six months since the last holiday.",
    "Severance is BZ$10,153.85, notice for more than five years is 8 weeks or BZ$3,692.31, and holiday pay is BZ$461.54. The total is BZ$14,307.70."
  ],
  "faq": [
    {
      "pregunta": "What am I owed when I am made redundant in Belize?",
      "respuesta": "Severance pay after five years of service, pay in place of any notice not given, and holiday pay for time not taken, under sections 37, 38, 130 and 183 of the Labour Act."
    },
    {
      "pregunta": "Is holiday pay due if I am dismissed for cause?",
      "respuesta": "Yes. Section 130(2) says that dismissal for cause without notice does not remove the duty to pay holiday pay."
    },
    {
      "pregunta": "Are unpaid wages included?",
      "respuesta": "No. Add any wages for days already worked, and any pay owed for overtime."
    }
  ],
  "glosario": [
    {
      "termino": "Pay in lieu of notice",
      "definicion": "The wages for the notice period, paid when the employer does not let the worker serve it."
    },
    {
      "termino": "Average pay",
      "definicion": "One twenty-sixth of basic wages for the period, used for holiday pay."
    }
  ]
});
