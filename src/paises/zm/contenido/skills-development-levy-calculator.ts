import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.skills-development-levy-calculator",
  h1: "Skills Development Levy calculator",
  title: "Skills Development Levy Zambia: work out the levy",
  description: "Work out the Skills Development Levy on your monthly payroll at {{zm.sdl-rate}}, leaving out gratuities and redundancy packages as ZRA does.",
  intro: [
    "The Skills Development Levy is a charge on the employer's payroll. It is not deducted from employees' pay.",
    "Enter the month's total payroll and the gratuities and redundancy packages inside it.",
  ],
  comoSeCalcula: [
    "Take the gross emoluments for the month and subtract gratuities and redundancy packages.",
    "Multiply what is left by {{zm.sdl-rate}}.",
  ],
  ejemplo: [
    "ZRA's example: payments of K1,010,000 include K100,000 gratuity and K300,000 redundancy packages. The levy is 0.5% of K610,000, which is K3,050.",
  ],
  faq: [
    {
      pregunta: "When is the levy due?",
      respuesta: "By the 10th day of the month after the month the emoluments were paid or became payable. It goes on the same return as PAYE.",
    },
    {
      pregunta: "Who is exempt?",
      respuesta: "Employers in the public service or a local authority (state-owned enterprises still pay), businesses with annual turnover below K800,000, approved public benefit organisations, organisations exempt from income tax, and approved donors and diplomats.",
    },
    {
      pregunta: "Can the employer recover the levy from staff?",
      respuesta: "No. The levy is borne by the employer and not by the employee.",
    },
  ],
  glosario: [{ termino: "Gross emoluments", definicion: "All pay due to employees for the month, before deductions." }],
});
