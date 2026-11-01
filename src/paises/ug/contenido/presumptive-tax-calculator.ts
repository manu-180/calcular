import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.presumptive-tax-calculator",
  h1: "Presumptive tax calculator Uganda (small business tax)",
  title: "Presumptive tax calculator Uganda: small business",
  description: "Work out small business (presumptive) tax in Uganda for turnover up to {{ug.presumptive-ceiling}}, with or without business records, using the URA rates.",
  intro: [
    "If your business sells more than Ushs 10 million but not more than {{ug.presumptive-ceiling}} a year, URA taxes you as a small business taxpayer.",
    "Enter your turnover for the year to see the tax with records and without them.",
  ],
  comoSeCalcula: [
    "With records you pay a share of turnover above Ushs 10 million: {{ug.presumptive-records[1].tasa}} up to Ushs 30 million, then {{ug.presumptive-records[2].tasa}}, {{ug.presumptive-records[3].tasa}} and {{ug.presumptive-records[4].tasa}} on each higher slice.",
    "Without records you pay a fixed amount per band: {{ug.presumptive-no-records[1].cuotaFija}}, {{ug.presumptive-no-records[2].cuotaFija}}, {{ug.presumptive-no-records[3].cuotaFija}} or {{ug.presumptive-no-records[4].cuotaFija}}.",
    "The tax is final: no deductions for expenses and no further tax on that business income.",
  ],
  ejemplo: ["A shop with Ushs 60 million of sales pays Ushs 240,000 if it keeps records, or Ushs 400,000 if it does not."],
  faq: [
    {
      pregunta: "What counts as turnover?",
      respuesta: "Your total sales in the year from all the businesses you own, before any costs.",
    },
    {
      pregunta: "What if my turnover goes above Ushs 150 million?",
      respuesta: "You no longer qualify as a small business taxpayer and must file a normal income tax return.",
    },
    {
      pregunta: "How do I pay?",
      respuesta: "Register a payment on the URA portal under income tax for small business. Registering the payment also counts as filing the return.",
    },
  ],
  glosario: [
    { termino: "Presumptive tax", definicion: "A simplified income tax on small businesses based on turnover instead of profit." },
    { termino: "Turnover", definicion: "Total sales in a year." },
  ],
});
