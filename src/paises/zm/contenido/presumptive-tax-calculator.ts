import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.presumptive-tax-calculator",
  h1: "Presumptive tax calculator for buses and taxis",
  title: "Presumptive tax Zambia: buses, minibuses and taxis",
  description:
    "Work out the presumptive tax on public service vehicles, from {{zm.presumptive-tax[under-12]}} a year for a taxi to {{zm.presumptive-tax[36-49]}} for a 36 to 49 seater bus.",
  intro: [
    "Presumptive tax is a fixed yearly amount per vehicle that replaces income tax for individuals and partnerships running buses, minibuses and taxis.",
    "Choose the seating capacity and the number of vehicles to see the tax for the year and what it comes to each quarter or month.",
  ],
  comoSeCalcula: [
    "Fewer than 12 seats, taxis included: {{zm.presumptive-tax[under-12]}} a year per vehicle.",
    "12 to 17 seats: {{zm.presumptive-tax[12-17]}}. 18 to 21 seats: {{zm.presumptive-tax[18-21]}}.",
    "22 to 35 seats: {{zm.presumptive-tax[22-35]}}. 36 to 49 seats: {{zm.presumptive-tax[36-49]}}.",
  ],
  ejemplo: ["An 18-seater minibus pays K5,184 a year, which is K1,296 a quarter or K432 a month."],
  faq: [
    {
      pregunta: "Who pays presumptive tax?",
      respuesta: "Individuals and partnerships that run public service vehicles. Limited companies, luxury and semi-luxury coaches and vehicles with 50 seats or more are outside the scheme.",
    },
    {
      pregunta: "Do I need to keep books?",
      respuesta: "No. There are no returns to file and no audits, because the tax is a fixed levy per vehicle.",
    },
    {
      pregunta: "Why does it matter for my road licence?",
      respuesta: "You need a tax clearance certificate from ZRA before RTSA will license the vehicle.",
    },
    {
      pregunta: "What if I pay late?",
      respuesta: "A penalty of 5% of the unpaid amount plus interest at the Bank of Zambia discount rate plus 2%.",
    },
  ],
  glosario: [{ termino: "Public service vehicle", definicion: "A bus, minibus or taxi that carries paying passengers." }],
});
