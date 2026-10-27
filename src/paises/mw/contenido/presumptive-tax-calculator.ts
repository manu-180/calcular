import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.presumptive-tax-calculator",
  h1: "Presumptive tax calculator Malawi",
  title: "Presumptive tax calculator Malawi for small businesses",
  description:
    "Find your presumptive tax from your annual turnover: nothing below {{mw.presumptive-tax[0].hasta}}, then a fixed amount a year up to {{mw.presumptive-tax[-1].hasta}}.",
  intro: [
    "Enter your business turnover for the year to see the presumptive tax you owe and the quarterly instalment.",
    "Presumptive tax replaced turnover tax for micro, small and medium businesses. The MRA started it on 1 April 2023.",
  ],
  comoSeCalcula: [
    "Turnover up to {{mw.presumptive-tax[0].hasta}}: no tax.",
    "Above {{mw.presumptive-tax[1].desde}} and up to {{mw.presumptive-tax[1].hasta}}: {{mw.presumptive-tax[1].cuotaFija}} a year.",
    "Above {{mw.presumptive-tax[2].desde}} and up to {{mw.presumptive-tax[2].hasta}}: {{mw.presumptive-tax[2].cuotaFija}} a year.",
    "Above {{mw.presumptive-tax[3].desde}} and up to {{mw.presumptive-tax[3].hasta}}: {{mw.presumptive-tax[3].cuotaFija}} a year.",
    "You pay it in four quarterly instalments, due by the 14th of the month after each quarter.",
  ],
  ejemplo: ["A shop with a turnover of K8,000,000 a year pays K170,000, or K42,500 each quarter."],
  faq: [
    {
      pregunta: "Which income is left out?",
      respuesta: "Rental income, management, professional or training fees, the income of incorporated companies and any income already taxed by a final withholding tax.",
    },
    {
      pregunta: "Can I choose the normal income tax rules instead?",
      respuesta: "Yes. You can write to the Commissioner General to say you do not want to be under presumptive tax, and the other rules of the Taxation Act will apply to you.",
    },
    {
      pregunta: "How do I register?",
      respuesta: "Registration is free. You can do it through Msonkho Online or at the nearest MRA Domestic Taxes office with your national ID and business registration certificate.",
    },
  ],
  glosario: [
    { termino: "Turnover", definicion: "All the money your business takes from sales in the year, before costs." },
    { termino: "TPIN", definicion: "Taxpayer Identification Number, the number the MRA gives you when you register." },
  ],
});
