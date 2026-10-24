import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.nssf-contribution-calculator",
  "h1": "NSSF contribution calculator Tanzania",
  "title": "NSSF contribution calculator Tanzania: 20% of wages",
  "description": "Work out the monthly NSSF contribution: {{tz.nssf-rate}} of the wage, with the employee paying at most {{tz.nssf-employee-max}} and the employer the rest.",
  "intro": [
    "Every registered employer pays a contribution to NSSF for each employee. Enter the wage and how it is split to see each share.",
    "The employer can also choose to pay the full amount without deducting anything from the employee."
  ],
  "comoSeCalcula": [
    "The total contribution is {{tz.nssf-rate}} of the employee's wage.",
    "The employee's share is at most {{tz.nssf-employee-max}}: either 10% employee and 10% employer, or 5% employee and 15% employer.",
    "If a contribution is paid late, NSSF adds {{tz.nssf-late-penalty}} of the unpaid amount for each month or part of a month."
  ],
  "ejemplo": [
    "On a wage of TSh 1,000,000, NSSF is TSh 200,000: TSh 100,000 from the employee and TSh 100,000 from the employer."
  ],
  "faq": [
    {
      "pregunta": "Can my employer deduct more than 10%?",
      "respuesta": "No. The employee's share should not exceed {{tz.nssf-employee-max}} of the monthly wage."
    },
    {
      "pregunta": "Is NSSF deducted before tax?",
      "respuesta": "Yes. The employee's contribution comes off gross pay before PAYE."
    },
    {
      "pregunta": "What is the penalty for paying late?",
      "respuesta": "{{tz.nssf-late-penalty}} of the unpaid amount for each month or part of a month."
    }
  ],
  "glosario": [
    {
      "termino": "NSSF",
      "definicion": "National Social Security Fund, the pension fund for private sector employees."
    }
  ]
});
