import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.contractor-tax",
  h1: "Contractor tax calculator Liberia",
  title: "Liberia contractor tax: what you keep from a contract",
  description: "See the tax withheld from a contract or a service invoice in Liberia and what you keep, with the LRA flat rates for contractors and service providers.",
  intro: [
    "Enter the amount of your contract or invoice to see the tax your client withholds and what you receive.",
    "Contractors are not taxed on the employee PIT table. A contract for services rendered has {{lr.withholding-rates[contracts]}} withheld, and a payment for services {{lr.withholding-rates[services]}}.",
  ],
  comoSeCalcula: [
    "Contracts on services rendered: {{lr.withholding-rates[contracts]}} of the amount.",
    "Payments for services: {{lr.withholding-rates[services]}} of the amount.",
    "What you receive: the amount minus the tax withheld.",
  ],
  ejemplo: ["On a L$100,000 contract, your client withholds L$10,000 and pays you L$90,000."],
  faq: [
    {
      pregunta: "Do contractors use the PIT table?",
      respuesta: "No. The LRA says the PIT table applies only to employees in the public and private sectors. Contractors in both sectors keep paying a flat rate.",
    },
    {
      pregunta: "Who pays the tax to the LRA?",
      respuesta: "Your client withholds it and pays it to the LRA by the 10th day of the following month.",
    },
    {
      pregunta: "Does it matter if I am paid in US dollars?",
      respuesta: "No. The rate is the same, so enter the amount in the currency of the contract and read the result in that currency.",
    },
  ],
  glosario: [
    { termino: "Contractor", definicion: "A person paid under a contract for services, not as an employee on the payroll." },
  ],
});
