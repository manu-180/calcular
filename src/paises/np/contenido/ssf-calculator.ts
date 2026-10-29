import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.ssf-calculator",
  h1: "SSF contribution calculator Nepal {{anio}}",
  title: "SSF calculator Nepal {{anio}}: 11% worker and 20% employer",
  description: "Work out the Social Security Fund contribution on basic pay: {{np.ssf-employee-rate}} from the worker and {{np.ssf-employer-rate}} from the employer. See how it splits across the schemes.",
  intro: [
    "Enter basic pay for the month and see what goes into the Social Security Fund: {{np.ssf-employee-rate}} from the worker and {{np.ssf-employer-rate}} from the employer. The calculator shows the worker's deduction, the employer's share and the total deposited.",
    "It also splits the total across the four schemes the Fund runs, so you can see how much goes to old-age savings, medical cover, accidents and dependants.",
  ],
  comoSeCalcula: [
    "The Fund procedure sets the contribution on basic pay only. The employer deducts {{np.ssf-employee-rate}} from the worker's basic pay and adds {{np.ssf-employer-rate}} of that same basic pay.",
    "Of the amount, the provident fund share is {{np.ssf-provident-rate}} from the worker and the same from the employer, and the Labour Act adds {{np.gratuity-rate}} for gratuity. The rest of the total pays for medical cover, accidents and dependants.",
    "The Fund splits the total into {{np.ssf-split[old-age]}} for the old-age scheme, {{np.ssf-split[health]}} for medical, health and maternity, {{np.ssf-split[accident]}} for accident and disability, and {{np.ssf-split[dependants]}} for dependants.",
  ],
  ejemplo: [
    "On basic pay of NPR 40,000, the worker pays NPR 4,400 and the employer pays NPR 8,000. The Fund receives NPR 12,400 a month, or NPR 148,800 a year.",
  ],
  faq: [
    {
      pregunta: "Is the contribution calculated on gross pay?",
      respuesta: "No. The Social Security Operation Procedure calculates both parts on the worker's basic pay. Allowances are left out.",
    },
    {
      pregunta: "Who pays the 20%?",
      respuesta: "The employer pays it on top of the pay. It is not deducted from your salary. The 11% is the only part taken from the worker.",
    },
    {
      pregunta: "Does the employer's share include gratuity?",
      respuesta: "Yes. The Labour Act, 2074, section 53, requires the employer to set aside 8.33% of basic pay each month for gratuity, and for Fund members it is deposited in the Fund as part of the old-age scheme.",
    },
  ],
  glosario: [
    { termino: "SSF", definicion: "Social Security Fund, the body that collects the contributions and pays the benefits." },
    { termino: "Basic pay", definicion: "The fixed pay before allowances. The contribution is worked out on it." },
    { termino: "Gratuity", definicion: "A sum the employer sets aside each month and the worker receives on leaving the job." },
  ],
});
