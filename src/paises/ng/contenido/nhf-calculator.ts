import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.nhf-calculator",
  h1: "NHF contribution calculator",
  title: "NHF calculator: National Housing Fund contributions",
  description: "Work out your National Housing Fund contribution: {{ng.nhf-rate}} of your basic monthly salary, paid to the Federal Mortgage Bank of Nigeria.",
  intro: [
    "The National Housing Fund collects a small share of workers' pay to fund home loans. Enter your basic salary to see what you contribute.",
  ],
  comoSeCalcula: [
    "Your contribution is {{ng.nhf-rate}} of your basic monthly salary. Your employer deducts it and remits it to the Federal Mortgage Bank of Nigeria within one month.",
    "Contributions earn interest of 4% a year under the Act. This calculator shows the amounts paid in, before interest.",
  ],
  ejemplo: ["On a basic salary of ₦250,000, you contribute ₦6,250 a month, or ₦75,000 a year."],
  faq: [
    {
      pregunta: "Is NHF deducted from taxable income?",
      respuesta: "Yes. Contributions under the National Housing Fund are an eligible deduction under the Nigeria Tax Act, 2025.",
    },
    {
      pregunta: "Do self-employed people contribute?",
      respuesta: "The Act extends the scheme to self-employed people, who set aside the same share of their monthly income and remit it themselves.",
    },
    {
      pregunta: "Who receives the money?",
      respuesta: "The Federal Mortgage Bank of Nigeria, which manages the Fund.",
    },
  ],
  glosario: [
    { termino: "NHF", definicion: "National Housing Fund, set up by the National Housing Fund Act." },
    { termino: "FMBN", definicion: "Federal Mortgage Bank of Nigeria, which runs the Fund." },
  ],
});
