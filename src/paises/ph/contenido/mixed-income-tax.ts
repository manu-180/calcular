import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.mixed-income-tax",
  h1: "Mixed income earner tax calculator",
  title: "Mixed income earner tax: salary plus freelance income",
  description:
    "Have a salary and a side business or freelance work? Compare the 8% option on your business receipts with graduated rates on your combined income.",
  intro: [
    "A mixed income earner has a salary and also earns from a business or a profession. Your salary is always taxed at graduated rates. For the business part you can choose.",
    "Enter both incomes and see which choice gives the lower total tax for the year.",
  ],
  comoSeCalcula: [
    "Your taxable compensation is taxed with the graduated rates of the Tax Code.",
    "8% option: you add {{ph.eight-percent-rate}} of all your gross business receipts. There is no ₱250,000 exclusion, because that amount is already in the 0% bracket of your salary.",
    "Graduated option: your net business income is added to your compensation and taxed together, plus a percentage tax of {{ph.percentage-tax-rate}} on your gross receipts.",
  ],
  ejemplo: [
    "With ₱400,000 of taxable salary and ₱600,000 of receipts (₱150,000 of expenses), the 8% option costs ₱70,500 in total. Graduated rates cost ₱133,000.",
  ],
  faq: [
    {
      pregunta: "Why can't I deduct ₱250,000 from my business receipts?",
      respuesta:
        "The rules say the ₱250,000 is already built into the 0% bracket that applies to your salary. Only people who earn purely from a business or profession get it under the 8% option.",
    },
    {
      pregunta: "Can I use the 8% option if my receipts are above {{ph.vat-threshold}}?",
      respuesta: "No. Above the VAT threshold your business income is taxed at graduated rates together with your salary.",
    },
    {
      pregunta: "How is the total tax worked out with the 8% option?",
      respuesta: "It is the tax on your compensation at graduated rates plus {{ph.eight-percent-rate}} of your gross business receipts and other non-operating income.",
    },
  ],
  glosario: [
    { termino: "Mixed income earner", definicion: "A person with both compensation income and income from a business or profession." },
    { termino: "Non-operating income", definicion: "Income outside your main business activity. The rules add it to your gross receipts for the 8% option." },
  ],
});
