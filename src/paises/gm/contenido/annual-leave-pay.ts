import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.annual-leave-pay",
  h1: "Annual leave pay calculator for The Gambia",
  title: "Annual leave pay calculator Gambia: unused leave",
  description: "Work out how much annual leave you have built up in The Gambia and what your employer owes you for unused days when your job ends, under the Labour Act, 2023.",
  intro: [
    "Under the Labour Act, 2023 your annual leave comes from your contract, a collective agreement or a Joint Industrial Council agreement. It builds up month by month.",
    "Enter your yearly entitlement, the months worked and the days taken to see the leave you have left and its value.",
  ],
  comoSeCalcula: [
    "Leave built up: yearly days × months worked ÷ 12, as section 109(2) spreads the entitlement over each month of employment.",
    "Unused leave: leave built up minus days taken.",
    "Pay: unused days × daily rate. The daily rate is your normal pay without bonus or overtime, here your monthly salary divided by the working days in a month.",
  ],
  ejemplo: ["With 24 days a year, eight months worked and five days taken, you have 11 days left. On D11,000 a month and 22 working days, that is D5,500."],
  faq: [
    {
      pregunta: "Is unused leave paid when I leave?",
      respuesta: "Yes. Section 109(4) says leave built up but not used when employment ends must be paid to the employee.",
    },
    {
      pregunta: "What if a public holiday falls during my leave?",
      respuesta: "Your leave is extended by one working day with full pay for each public holiday that would have been a normal working day.",
    },
    {
      pregunta: "Who decides when I take my leave?",
      respuesta: "The employer sets the dates in consultation with you.",
    },
  ],
  glosario: [
    { termino: "Joint Industrial Council", definicion: "A body of employers and workers in a sector that agrees pay and conditions, including leave." },
    { termino: "Daily rate", definicion: "What you normally earn for one working day, without bonus or overtime." },
  ],
});
