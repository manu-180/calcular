import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.gpssa-contribution-calculator",
  h1: "GPSSA contribution calculator",
  title: "GPSSA pension contribution calculator UAE",
  description:
    "Work out the GPSSA pension contributions for an Emirati in the private sector: {{ae.gpssa[employee]}} from the employee, {{ae.gpssa[employer]}} from the employer and {{ae.gpssa[government]}} from the government.",
  intro: [
    "Emiratis working in the UAE private sector are part of the pension and social security system run by GPSSA.",
    "Each month, the employee, the employer and the government pay a share of the salary. Enter the salary to see each part.",
  ],
  comoSeCalcula: [
    "The employee pays {{ae.gpssa[employee]}} of the salary.",
    "The employer pays {{ae.gpssa[employer]}}.",
    "The government adds {{ae.gpssa[government]}}.",
  ],
  ejemplo: ["On AED 25,000 a month, the employee pays AED 1,250, the employer AED 3,125 and the government AED 625."],
  faq: [
    {
      pregunta: "How much is the GPSSA contribution in total?",
      respuesta: "20% of the salary, split between the employee, the employer and the government.",
    },
    {
      pregunta: "When must the employer register an Emirati?",
      respuesta: "Within a month from the date the work permit is issued.",
    },
    {
      pregunta: "Which law sets these rates?",
      respuesta: "MoHRE cites Federal Decree-Law No. 7 of 1999 for Pensions and Social Security and its amendments.",
    },
  ],
  glosario: [
    { termino: "GPSSA", definicion: "General Pension and Social Security Authority." },
    { termino: "Contribution salary", definicion: "The salary the pension contributions are worked out on." },
  ],
});
