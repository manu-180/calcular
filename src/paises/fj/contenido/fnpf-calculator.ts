import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.fnpf-calculator",
  h1: "FNPF contribution calculator Fiji {{anio}}",
  title: "FNPF calculator Fiji {{anio}}: employee and employer",
  description: "Work out your FNPF contribution at {{fj.fnpf-employee-rate}} and the employer share at {{fj.fnpf-employer-rate}} for the current 12 month period. Pay by week, fortnight, month or year.",
  intro: [
    "You pay {{fj.fnpf-employee-rate}} of your gross pay into the Fiji National Provident Fund (FNPF), and your employer currently pays {{fj.fnpf-employer-rate}}. Enter your pay to see both amounts and the total that reaches your account.",
    "The employer share is lower than usual for a limited time. The 2026-2027 Budget cut it from 10% for the twelve months from 1 August 2026 to 31 July 2027.",
  ],
  comoSeCalcula: [
    "The calculator multiplies your gross pay for the period by the employee rate of {{fj.fnpf-employee-rate}}, and by the employer rate of {{fj.fnpf-employer-rate}} for the employer share.",
    "The two shares are added to show what goes into your account. The yearly line multiplies that total by the number of pay periods in a year.",
    "The cut applies from 1 August 2026. Before that date the employer rate was 10%, and the calculator is set for the new period only.",
    "An employer can pay more than the mandatory rate, up to 10%. The Budget gives a deduction of {{fj.fnpf-excess-deduction}} of the excess against the company's tax. That choice is the employer's and does not change your own share.",
  ],
  ejemplo: [
    "On a monthly wage of FJ$3,000, you pay FJ$240 (8%) and your employer pays FJ$240 (8%). FJ$480 is paid into your account each month, which is FJ$5,760 over twelve months. Under the earlier 10% rate the employer share would have been FJ$300.",
  ],
  faq: [
    {
      pregunta: "What is the employer FNPF rate from 1 August 2026?",
      respuesta: "The 2026-2027 Budget Supplement sets the mandatory employer contribution at {{fj.fnpf-employer-rate}} for 1 August 2026 to 31 July 2027, down from 10%.",
    },
    {
      pregunta: "Did the employee rate change?",
      respuesta: "No. The Budget Supplement states that the employee contribution rate remains at {{fj.fnpf-employee-rate}}.",
    },
    {
      pregunta: "Can an employer still pay 10%?",
      respuesta: "Yes. An employer that pays above the mandatory rate, up to 10%, can claim {{fj.fnpf-excess-deduction}} of the excess as a tax deduction, according to the FRCS summary of revenue policies for 2026-2027.",
    },
  ],
  glosario: [
    { termino: "FNPF", definicion: "Fiji National Provident Fund, the national retirement savings fund." },
    { termino: "Mandatory contribution", definicion: "The minimum rate an employer must pay for each employee." },
    { termino: "Excess contribution", definicion: "Money an employer pays above the mandatory rate." },
  ],
});
