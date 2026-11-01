import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.nssf-calculator",
  h1: "NSSF contribution calculator Uganda",
  title: "NSSF calculator Uganda: 5% employee and 10% employer",
  description: "Work out your NSSF contributions in Uganda: {{ug.nssf-employee}} deducted from your gross wage and {{ug.nssf-employer}} added by your employer.",
  intro: ["Every month your employer pays 15% of your gross wage into your NSSF savings. Enter your wage to see both shares."],
  comoSeCalcula: [
    "Your employer deducts {{ug.nssf-employee}} from your total gross monthly wage.",
    "The employer adds {{ug.nssf-employer}} of the same wage, for a total of 15%.",
    "The money must reach NSSF by the 15th day of the following month.",
  ],
  ejemplo: ["On Ushs 1,500,000 a month, Ushs 75,000 comes from you and Ushs 150,000 from your employer."],
  faq: [
    {
      pregunta: "Is NSSF worked out on basic pay or gross pay?",
      respuesta: "On your total gross monthly wage, according to NSSF.",
    },
    {
      pregunta: "When must my employer pay?",
      respuesta: "By the 15th day of the month after the wage was paid.",
    },
    {
      pregunta: "Can I save more than 15%?",
      respuesta: "NSSF offers voluntary saving products on top of the mandatory contribution, such as Smartlife Flexi.",
    },
  ],
  glosario: [{ termino: "NSSF", definicion: "National Social Security Fund, Uganda's retirement savings fund for private sector workers." }],
});
