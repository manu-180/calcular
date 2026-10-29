import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.foreign-card-tax-calculator",
  h1: "Tax on international card payments",
  title: "Tax on international card payments: {{pk.wht-foreign-card}} from July {{anio}}",
  description: "Advance tax on payments with credit, debit or prepaid cards abroad or in foreign currency is {{pk.wht-foreign-card}} from 1 July {{anio}}.",
  intro: ["When you pay abroad or online in foreign currency with a Pakistani card, the bank collects advance tax. Enter the amount to see it."],
  comoSeCalcula: [
    "Advance tax = amount × {{pk.wht-foreign-card}}.",
    "The Finance Act 2026 cut this rate from 5% to {{pk.wht-foreign-card}}.",
  ],
  ejemplo: ["Spending Rs. 100,000 abroad adds Rs. 500 of advance tax."],
  faq: [
    {
      pregunta: "Is it charged on payments in Pakistan in rupees?",
      respuesta: "No. It applies to payments made abroad or in foreign currency with an international card.",
    },
    {
      pregunta: "Can I adjust this tax?",
      respuesta: "Advance tax collected by your bank can generally be adjusted against your income tax when you file your return.",
    },
    {
      pregunta: "Does it apply to prepaid cards?",
      respuesta: "Yes. The rule covers international credit, debit and prepaid cards.",
    },
  ],
  glosario: [{ termino: "Advance tax", definicion: "Tax collected during the year that counts towards your final tax." }],
});
