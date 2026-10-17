import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.housing-levy-calculator",
  h1: "Housing Levy calculator",
  title: "Affordable Housing Levy calculator: {{ke.housing-levy-rate}} of pay",
  description: "Employees and employers each pay {{ke.housing-levy-rate}} of gross monthly salary as the Affordable Housing Levy. See both shares and the total to remit.",
  intro: [
    "The Affordable Housing Levy comes out of every salary. Your employer pays the same amount on top.",
    "Enter your gross salary to see your deduction, your employer's share and the total sent each month.",
  ],
  comoSeCalcula: [
    "The employee pays {{ke.housing-levy-rate}} of gross monthly salary.",
    "The employer pays another {{ke.housing-levy-rate}} and sends both within nine working days after the end of the month.",
    "The levy you pay is deductible when your PAYE is worked out.",
  ],
  ejemplo: ["On KSh 80,000 a month you pay KSh 1,200, your employer pays KSh 1,200 and KSh 2,400 goes to the levy."],
  faq: [
    {
      pregunta: "Is the Housing Levy taken before tax?",
      respuesta: "Yes. KRA lists the levy deducted under the Affordable Housing Act as an allowable deduction for PAYE.",
    },
    {
      pregunta: "Is there a cap?",
      respuesta: "No cap appears in the rate KRA publishes: it is {{ke.housing-levy-rate}} of gross monthly salary.",
    },
    {
      pregunta: "Who pays the employer share?",
      respuesta: "Your employer pays it on top of your salary. KRA sets the levy at {{ke.housing-levy-rate}} for each employee and {{ke.housing-levy-rate}} for the employer.",
    },
  ],
  glosario: [{ termino: "Gross monthly salary", definicion: "Your pay for the month before any deduction." }],
});
