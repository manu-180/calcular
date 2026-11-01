import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "bz.employer-cost-calculator",
  "h1": "Employer cost of an employee in Belize {{anio}}",
  "title": "Belize employer cost {{anio}}: pay plus Social Security",
  "description": "See what an employee costs you each month in Belize: gross pay plus the employer Social Security share. The total rate is {{bz.ssb-total-rate}}, split by band.",
  "intro": [
    "The main statutory cost of an employee in Belize, on top of gross pay, is the employer share of Social Security. The total contribution is {{bz.ssb-total-rate}} of insurable earnings, split between the employer and the employee.",
    "Enter the gross monthly pay and any other monthly cost you carry. The calculator adds the employer share and shows the monthly and yearly cost."
  ],
  "comoSeCalcula": [
    "Gross monthly pay is turned into weekly pay (times 12, divided by 52) and matched to a Social Security band.",
    "The employer share for that band is added to the gross pay. At the top band the employer pays {{bz.ssb-employer-weekly[-1].cuotaFija}} a week and the employee pays {{bz.ssb-employee-weekly[-1].cuotaFija}}.",
    "The employer sends both shares to the Social Security Board and takes the employee share out of pay. It is therefore shown in the total sent to the Board, but it is not an added cost to you.",
    "Only the employer share and the extra costs you enter are counted. Add any other costs your business carries for the role."
  ],
  "ejemplo": [
    "An employee earns BZ$2,000 a month. The employer share is BZ$27.14 a week, which is BZ$117.61 a month.",
    "The monthly cost is BZ$2,117.61 and the yearly cost is BZ$25,411.32, about 5.9% above gross pay. The Board receives BZ$208.00 a month in total."
  ],
  "faq": [
    {
      "pregunta": "What does an employer pay on top of salary in Belize?",
      "respuesta": "The statutory cost covered here is the employer share of Social Security, set by band of weekly earnings. The total rate is {{bz.ssb-total-rate}} of insurable earnings."
    },
    {
      "pregunta": "Does the employer pay the employee share too?",
      "respuesta": "The employer pays it to the Board, but takes it out of the employee's pay, so it is not an extra cost."
    },
    {
      "pregunta": "Is there a ceiling?",
      "respuesta": "Yes. Insurable earnings stop at BZ$520 a week, so the employer share stops rising at {{bz.ssb-employer-weekly[-1].cuotaFija}} a week."
    }
  ],
  "glosario": [
    {
      "termino": "Employer share",
      "definicion": "The part of the Social Security contribution that the employer owes for each employee."
    },
    {
      "termino": "Gross pay",
      "definicion": "Pay before any deduction."
    }
  ]
});
