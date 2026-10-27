import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm-en.salaire-net-en-brut",
  h1: "Net to gross salary calculator",
  title: "Net to gross salary Cameroon: what gross to ask for",
  description:
    "Know the net pay you want? Find the gross salary that gives it, with IRPP, the {{cm.cnps-pension[salarie]}} CNPS pension and the other deductions.",
  intro: [
    "In a job offer or a pay talk, people often think in net pay. Employers set a gross salary.",
    "Enter the monthly net pay you want. The calculator finds the gross pay that leaves that net after every payslip deduction.",
  ],
  comoSeCalcula: [
    "The deductions are the same as in the net salary calculator: IRPP and council tax, CNPS pension, Housing Loan Fund, broadcasting fee and local development tax.",
    "The gross is found by trial, to the nearest franc. It assumes all gross pay is basic salary with no non-taxable allowance.",
  ],
  ejemplo: ["To take home 423,550 F, you need a gross salary of about 500,000 F."],
  faq: [
    {
      pregunta: "Why is the net sometimes a little above what I asked for?",
      respuesta: "The broadcasting fee and the local development tax change in steps. One more franc of gross pay can move you into the next band.",
    },
    {
      pregunta: "Are family allowances included?",
      respuesta: "No. They are not taxed and are added to net pay. Take them off the net you want before you start.",
    },
    {
      pregunta: "How much does this gross cost the employer?",
      respuesta: "Add the employer charges. The employer cost calculator works them out from the gross.",
    },
  ],
  glosario: [{ termino: "Gross salary", definicion: "Pay before tax and social deductions." }],
});
