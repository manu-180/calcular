import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.gratuity-calculator",
  h1: "Gratuity calculator Zambia",
  title: "Gratuity calculator Zambia: {{zm.gratuity-rate}} of basic pay",
  description:
    "Work out the gratuity at the end of a long-term contract: at least {{zm.gratuity-rate}} of the basic pay you earned during the contract, prorated if it ends early.",
  intro: [
    "Enter your monthly basic pay and the months you worked on the contract to see the gratuity your employer owes you.",
    "If your contract sets a higher rate, enter it and the calculator uses it instead.",
  ],
  comoSeCalcula: [
    "Add up the basic pay earned during the contract: monthly basic pay times the months worked.",
    "The gratuity is at least {{zm.gratuity-rate}} of that total (section 73 of the Employment Code Act).",
    "If the contract is terminated early under the Code, the gratuity is prorated to the time worked, which is what the months field does.",
  ],
  ejemplo: ["A two-year contract on K8,000 a month earns K192,000 of basic pay, so the gratuity is at least K48,000."],
  faq: [
    {
      pregunta: "Is gratuity taxed?",
      respuesta: "No. ZRA lists gratuity among the payments exempt from PAYE, and gratuities are left out of the Skills Development Levy.",
    },
    {
      pregunta: "Are allowances part of the gratuity?",
      respuesta: "No. The law works it out on basic pay only, so housing, transport and other allowances are left out.",
    },
    {
      pregunta: "Can I get both gratuity and a retirement or separation package?",
      respuesta: "Under the General Order an employee is not entitled to both a separation or retirement package and gratuity.",
    },
  ],
  glosario: [
    { termino: "Long-term contract", definicion: "A contract for more than 12 months that can be renewed, or for a specific task or project with an end date fixed in advance." },
    { termino: "Gratuity", definicion: "A lump sum paid at the end of a long-term contract." },
  ],
});
