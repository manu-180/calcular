import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.net-to-gross",
  h1: "Net to gross salary calculator for The Gambia",
  title: "Net to gross salary calculator Gambia",
  description: "Agreed a net salary? Find the basic salary in The Gambia that leaves that take-home pay after PAYE and the {{gm.npf-employee-rate}} NPF contribution.",
  intro: [
    "When a job is offered as a net amount, the employer still has to know the gross salary for the payroll. Enter the take-home pay to find it.",
    "The calculator works backwards from the GRA PAYE bands and the employee's {{gm.npf-employee-rate}} National Provident Fund contribution, assuming no allowances.",
  ],
  comoSeCalcula: [
    "Take-home pay = basic salary − PAYE − NPF.",
    "PAYE uses the yearly bands, with the first {{gm.paye-bands[0].hasta}} a year tax-free and {{gm.paye-bands[-1].tasa}} above {{gm.paye-bands[-1].desde}}.",
    "The calculator tries salaries until the take-home pay matches the one you entered.",
  ],
  ejemplo: ["To take home D15,166.67 a month in the NPF, the basic salary has to be D20,000."],
  faq: [
    {
      pregunta: "Why does each extra dalasi of net pay cost more than a dalasi?",
      respuesta: "Because every extra dalasi of salary carries PAYE at your top band rate and the NPF contribution, so the gross has to rise faster than the net.",
    },
    {
      pregunta: "What if part of the pay is allowances?",
      respuesta: "Allowances are taxed like salary but do not carry the NPF contribution, so with allowances the gross needed is a little lower.",
    },
    {
      pregunta: "Does the employer pay more than the gross?",
      respuesta: "Yes. On top of it come the employer's NPF share and the injuries fund. The employer cost calculator adds them.",
    },
  ],
  glosario: [
    { termino: "Gross salary", definicion: "Pay before PAYE and the employee's pension contribution." },
    { termino: "Net salary", definicion: "What reaches the employee's account after deductions." },
  ],
});
