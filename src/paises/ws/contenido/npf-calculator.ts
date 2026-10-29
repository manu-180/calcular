import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.npf-calculator",
  h1: "NPF contribution calculator Samoa {{anio}}",
  title: "NPF contribution calculator Samoa {{anio}}: 20% a month",
  description: "Work out the Samoa National Provident Fund contribution: {{ws.npf-employee-rate}} from the employee and {{ws.npf-employer-rate}} from the employer.",
  intro: [
    "Every employee in Samoa is a member of the National Provident Fund, and every employer must register with it. The contribution is {{ws.npf-employee-rate}} of gross wages from the employee and a matching {{ws.npf-employer-rate}} from the employer.",
    "Enter the month's gross wages to see the amount to send to NPF. You can add a voluntary extra rate, or an estimate of the surcharge if the payment is late.",
  ],
  comoSeCalcula: [
    "The employee share is {{ws.npf-employee-rate}} of gross wages. NPF counts overtime, allowances, bonuses and any other payment in money as part of wages.",
    "The employer share is {{ws.npf-employer-rate}} of the same wages. The employer remits both shares together as one payment.",
    "A member who wants to pay more than the minimum tells the employer in writing, and the employer deducts and pays the extra amount with the normal contribution.",
    "Payments are due by the {{ws.npf-due-day}}th day after month end. A payment still outstanding 21 days after month end attracts a surcharge of {{ws.npf-late-surcharge}} a month.",
  ],
  ejemplo: [
    "On monthly wages of WS$3,000, the employee share is WS$300 and the employer share is WS$300. The employer sends WS$600 to NPF by the 7th of the next month, together with the monthly schedule listing each employee.",
  ],
  faq: [
    {
      pregunta: "How much does the employer pay to NPF?",
      respuesta: "The NPF Employers Guide sets the employer match at {{ws.npf-employer-rate}} of wages, on top of the {{ws.npf-employee-rate}} deducted from the employee, so {{ws.npf-employee-rate}} and {{ws.npf-employer-rate}} together make 20% of wages.",
    },
    {
      pregunta: "When is the payment due?",
      respuesta: "By the {{ws.npf-due-day}}th day after the end of each month, for example 7 September for August. After 21 days the {{ws.npf-late-surcharge}} monthly surcharge applies, according to the same guide.",
    },
    {
      pregunta: "Is every employee covered?",
      respuesta: "The guide covers professional, clerical and manual work, domestic work such as gardening, fishing crews, drivers, wharf and farm gangs and any other type of service. An employer must not employ someone who is not registered with the Fund.",
    },
  ],
  glosario: [
    { termino: "NPF", definicion: "The Samoa National Provident Fund, set up under the SNPF Act 1972." },
    { termino: "Schedule", definicion: "The monthly list of employees, NPF numbers and contributions that goes with the payment." },
    { termino: "Surcharge", definicion: "The monthly penalty on contributions paid late." },
  ],
});
