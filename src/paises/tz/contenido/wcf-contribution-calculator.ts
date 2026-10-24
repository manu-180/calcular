import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.wcf-contribution-calculator",
  "h1": "WCF contribution calculator",
  "title": "WCF contribution calculator Tanzania: {{tz.wcf-rate}} of earnings",
  "description": "Work out the Workers Compensation Fund contribution: {{tz.wcf-rate}} of employees' monthly earnings, for public and private sector employers alike.",
  "intro": [
    "Employers pay a contribution to the Workers Compensation Fund, which compensates workers for injuries and diseases at work.",
    "Enter the monthly earnings of all your employees to see the contribution."
  ],
  "comoSeCalcula": [
    "The contribution is {{tz.wcf-rate}} of the monthly earnings of your employees.",
    "The rate is the same for the public and the private sector."
  ],
  "ejemplo": [
    "A payroll of TSh 20 million a month means a WCF contribution of TSh 100,000."
  ],
  "faq": [
    {
      "pregunta": "Who pays WCF?",
      "respuesta": "The employer. It is not deducted from salaries."
    },
    {
      "pregunta": "Is the rate the same for all sectors?",
      "respuesta": "Yes. WCF shows {{tz.wcf-rate}} for both the public and the private sector."
    },
    {
      "pregunta": "What does WCF cover?",
      "respuesta": "Compensation for employees injured or made ill by their work."
    }
  ],
  "glosario": [
    {
      "termino": "WCF",
      "definicion": "Workers Compensation Fund."
    }
  ]
});
