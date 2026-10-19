import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.employer-cost-calculator",
  "h1": "Employer cost calculator Tanzania",
  "title": "Employer cost calculator Tanzania: salary, NSSF, SDL and WCF",
  "description": "See what an employee costs in Tanzania: salary plus the employer's NSSF share, SDL at {{tz.sdl-rate}} and WCF at {{tz.wcf-rate}}.",
  "intro": [
    "Hiring costs more than the salary. This calculator adds the statutory contributions the employer pays.",
    "Enter the gross salary, how NSSF is split and how many employees you have in total."
  ],
  "comoSeCalcula": [
    "Employer NSSF: {{tz.nssf-rate}} of the wage less the employee's share.",
    "SDL: {{tz.sdl-rate}} of the salary, if you have {{tz.sdl-min-employees}} or more employees.",
    "WCF: {{tz.wcf-rate}} of the salary."
  ],
  "ejemplo": [
    "An employee on TSh 1,000,000 in a business with 12 staff costs TSh 1,140,000 a month."
  ],
  "faq": [
    {
      "pregunta": "Is PAYE an employer cost?",
      "respuesta": "No. PAYE comes out of the employee's salary. The employer only withholds and pays it."
    },
    {
      "pregunta": "Does SDL apply to every business?",
      "respuesta": "No. Only to employers with {{tz.sdl-min-employees}} or more employees."
    },
    {
      "pregunta": "Are there other costs?",
      "respuesta": "Leave travel allowance, overtime, medical cover or bonuses add to the cost."
    }
  ],
  "glosario": [
    {
      "termino": "Statutory costs",
      "definicion": "Contributions an employer must pay by law on top of salaries."
    }
  ]
});
