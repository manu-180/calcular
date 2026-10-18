import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.ssnit-contribution",
  h1: "SSNIT contribution calculator",
  title: "SSNIT contribution calculator: 5.5% and 13% split",
  description: "Work out SSNIT contributions on a basic salary: {{gh.ssnit-employee-rate}} from the worker, {{gh.ssnit-employer-rate}} from the employer, and the Tier 1 and Tier 2 split.",
  intro: [
    "Every month the employer deducts {{gh.ssnit-employee-rate}} of the worker's basic salary and adds {{gh.ssnit-employer-rate}}, for a total of 18.5%.",
    "Of that total, {{gh.ssnit-tier1-rate}} goes to SSNIT (Tier 1) and {{gh.ssnit-tier2-rate}} to the Tier 2 scheme.",
  ],
  comoSeCalcula: [
    "Worker: {{gh.ssnit-employee-rate}} of basic salary.",
    "Employer: {{gh.ssnit-employer-rate}} of basic salary.",
    "Split of the total: {{gh.ssnit-tier1-rate}} to SSNIT within 14 days of the following month, {{gh.ssnit-tier2-rate}} to Tier 2.",
  ],
  ejemplo: ["On a basic salary of GH₵5,000, the worker pays GH₵275 and the employer GH₵650. SSNIT gets GH₵675 and Tier 2 gets GH₵250."],
  faq: [
    {
      pregunta: "How much is SSNIT contribution?",
      respuesta: "18.5% of basic salary: {{gh.ssnit-employee-rate}} deducted from the worker and {{gh.ssnit-employer-rate}} added by the employer.",
    },
    {
      pregunta: "When must employers pay SSNIT?",
      respuesta: "Within 14 days of the following month, with a contribution report listing each worker's name, social security number and contribution.",
    },
    {
      pregunta: "Is SSNIT based on gross pay?",
      respuesta: "No. The rates apply to the basic salary, not to allowances.",
    },
  ],
  glosario: [
    { termino: "Tier 1", definicion: "The basic national social security scheme managed by SSNIT." },
    { termino: "Tier 2", definicion: "The second tier of the pension system, which receives 5% of basic salary." },
  ],
});
