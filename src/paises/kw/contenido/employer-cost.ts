import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kw.employer-cost",
  h1: "Employer cost calculator Kuwait",
  title: "Employer cost Kuwait: salary plus PIFSS contributions",
  description: "Work out the monthly and yearly cost of an employee in Kuwait: salary plus the employer's PIFSS share for Kuwaiti staff and any other costs.",
  intro: [
    "Enter the salary to see what an employee really costs each month, including the employer's PIFSS contribution for Kuwaiti nationals.",
    "Add allowances, insurance, visa or housing costs in their own field.",
  ],
  comoSeCalcula: [
    "Employer Basic Insurance: {{kw.pifss-basic-employer-rate}} of the salary up to {{kw.pifss-basic-max}}.",
    "Employer Supplementary Insurance: {{kw.pifss-supplementary-employer-rate}} of the salary above {{kw.pifss-basic-max}}, up to {{kw.pifss-supplementary-max}} more.",
    "Employer Pension Increase: {{kw.pifss-increase-employer-rate}} on up to {{kw.pifss-increase-max}}.",
    "Other costs are added as entered.",
  ],
  ejemplo: ["For a Kuwaiti employee on KD 1,200, the employer pays KD 132 to PIFSS, so the cost is KD 1,332 a month."],
  faq: [
    {
      pregunta: "Does the employer pay PIFSS for expatriate staff?",
      respuesta: "This calculator applies the PIFSS contributions for insured Kuwaitis. For other employees, add any costs you pay under the other costs field.",
    },
    {
      pregunta: "Is there a ceiling on the employer's contribution?",
      respuesta: "Yes. The salary counts up to {{kw.pifss-increase-max}} in total, so above that the employer's PIFSS share stays the same.",
    },
    {
      pregunta: "Does the employer pay the Unemployment Insurance Fund?",
      respuesta: "No. The PIFSS guide deducts that contribution from the insured person only.",
    },
  ],
  glosario: [
    { termino: "Employer contribution", definicion: "The share of PIFSS funds the employer pays on top of the salary." },
    { termino: "Supplementary salary", definicion: "The part of the salary above the basic ceiling, with its own limit." },
  ],
});
