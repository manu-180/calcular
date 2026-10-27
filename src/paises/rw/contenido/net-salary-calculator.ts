import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.net-salary-calculator",
  h1: "Net salary calculator Rwanda",
  title: "Net salary calculator Rwanda {{anio}}: gross to net pay",
  description:
    "See your take-home pay after PAYE, RSSB pension at {{rw.pension-employee}}, maternity at {{rw.maternity-employee}} and CBHI. Uses the current RRA bands.",
  intro: [
    "Enter your gross monthly salary and see what reaches your account. Every deduction is listed the way it shows on your payslip.",
    "If you are on the RSSB medical scheme (RAMA), add your basic salary and the calculator takes that contribution off too.",
  ],
  comoSeCalcula: [
    "PAYE: the RRA bands apply to your gross pay. The first {{rw.paye-bands[1].desde}} is tax free and the top rate is {{rw.paye-bands[3].tasa}} above {{rw.paye-bands[3].desde}}.",
    "RSSB pension: {{rw.pension-employee}} of gross pay. Maternity leave scheme: {{rw.maternity-employee}} of gross pay. Your employer pays the same again on top.",
    "RAMA, if you are on it: {{rw.medical-employee}} of your basic salary.",
    "CBHI: {{rw.cbhi-rate}} of your net salary, taken here as pay after PAYE, pension and maternity.",
  ],
  ejemplo: [
    "A gross salary of RWF 300,000 leaves RWF 225,964. The deductions are PAYE of RWF 54,000, pension of RWF 18,000, maternity of RWF 900 and CBHI of RWF 1,136.",
  ],
  faq: [
    {
      pregunta: "Why is my payslip different?",
      respuesta: "Your employer may take off other things, such as a loan repayment or a SACCO saving. Benefits in kind that are taxed but not paid in cash also change the figures.",
    },
    {
      pregunta: "Does pension come off before PAYE?",
      respuesta: "No. The RRA works out PAYE on gross pay, so your pension contribution does not lower your tax.",
    },
    {
      pregunta: "How is RAMA split?",
      respuesta: "The contribution is {{rw.medical-employee}} of basic salary from you and {{rw.medical-employer}} from your employer. Allowances are left out of the base.",
    },
    {
      pregunta: "Can I declare PAYE and RSSB together?",
      respuesta: "Your employer can. The RRA and RSSB run a unified declaration that covers PAYE and every RSSB contribution except voluntary pension.",
    },
  ],
  glosario: [
    { termino: "Gross salary", definicion: "Your pay before any deduction, allowances included." },
    { termino: "RSSB", definicion: "Rwanda Social Security Board, which runs the pension, maternity, medical and CBHI schemes." },
    { termino: "CBHI", definicion: "Community-Based Health Insurance, also called Mutuelle de santé." },
  ],
});
