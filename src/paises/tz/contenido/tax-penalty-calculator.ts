import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.tax-penalty-calculator",
  "h1": "TRA late filing penalty calculator",
  "title": "TRA late filing penalty calculator: 2.5% or currency points",
  "description": "See the TRA penalty for filing a return late: the higher of {{tz.late-filing-rate}} of the tax or a fixed number of currency points, for each month.",
  "intro": [
    "If you file a tax return late, TRA charges a penalty for each month or part of a month. Enter the tax and how late you are.",
    "Interest on tax paid late is charged on top and is not included here."
  ],
  "comoSeCalcula": [
    "For each month or part of a month, the penalty is the higher of {{tz.late-filing-rate}} of the tax assessed (less tax already paid) and a fixed minimum.",
    "The minimum is {{tz.late-filing-points-individual}} currency points for an individual and {{tz.late-filing-points-company}} for a company.",
    "One currency point is {{tz.currency-point}}."
  ],
  "ejemplo": [
    "An individual with TSh 2 million due who files two months late pays TSh 200,000."
  ],
  "faq": [
    {
      "pregunta": "What is a currency point?",
      "respuesta": "A fixed amount used to set penalties. One currency point is {{tz.currency-point}}."
    },
    {
      "pregunta": "Are provisional and final returns separate?",
      "respuesta": "Yes. The penalty applies separately to each return filed late."
    },
    {
      "pregunta": "Is there interest too?",
      "respuesta": "Yes. Unpaid tax carries interest at the statutory rate."
    }
  ],
  "glosario": [
    {
      "termino": "Currency point",
      "definicion": "A unit TRA uses to set fixed penalties."
    }
  ]
});
