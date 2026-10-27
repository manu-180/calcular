import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.rssb-contribution-calculator",
  h1: "RSSB contribution calculator",
  title: "RSSB contribution calculator {{anio}}: pension, maternity, CBHI",
  description:
    "Split RSSB contributions between employee and employer: pension at {{rw.pension-employee}} each, maternity at {{rw.maternity-employee}} each, CBHI and RAMA.",
  intro: [
    "Enter a gross monthly salary and see every RSSB contribution, who pays it and the total the employer declares.",
    "Useful for payroll and for checking your own payslip.",
  ],
  comoSeCalcula: [
    "Pension: {{rw.pension-employee}} of gross salary from the employee and {{rw.pension-employer}} from the employer.",
    "Maternity leave scheme: {{rw.maternity-employee}} from the employee and {{rw.maternity-employer}} from the employer, also on gross salary.",
    "RAMA medical scheme: {{rw.medical-employee}} of basic salary from each side, only if the employee is a member.",
    "CBHI: {{rw.cbhi-rate}} of the employee's net salary (pay after PAYE, pension and maternity). The employer deducts it and pays it over.",
  ],
  ejemplo: [
    "On a gross salary of RWF 300,000 the employee pays RWF 20,036 and the employer RWF 18,900, so RWF 38,936 goes to RSSB.",
  ],
  faq: [
    {
      pregunta: "Who declares RSSB contributions?",
      respuesta: "The employer. It can file them with PAYE in the unified declaration on the RRA system, or file each one separately.",
    },
    {
      pregunta: "Is CBHI paid by the employer too?",
      respuesta: "No. CBHI is paid by the employee alone. The employer only deducts it from pay and remits it.",
    },
    {
      pregunta: "Why is occupational hazards cover missing?",
      respuesta: "We could not confirm its current rate in an official RSSB or RRA source, so it is left out for now.",
    },
  ],
  glosario: [
    { termino: "RSSB", definicion: "Rwanda Social Security Board." },
    { termino: "RAMA", definicion: "The RSSB medical insurance scheme, worked out on basic salary." },
    { termino: "CBHI", definicion: "Community-Based Health Insurance (Mutuelle de santé)." },
  ],
});
