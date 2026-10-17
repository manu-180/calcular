import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.emi-calculator",
  h1: "EMI calculator for home, car and personal loans",
  title: "EMI calculator: home loan, car loan and personal loan",
  description:
    "Work out the monthly EMI, total interest and total payment of any loan. Enter the amount, interest rate and tenure in years and months.",
  intro: [
    "An EMI (equated monthly instalment) is the fixed amount you pay the bank every month until the loan is repaid. Part of it is interest and part is principal.",
    "Use this for a home loan, car loan, two-wheeler loan, education loan or personal loan. It works with the reducing-balance method that Indian lenders use.",
  ],
  comoSeCalcula: [
    "The monthly rate r is the yearly rate divided by 12, and n is the number of months.",
    "EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the loan amount.",
    "Each month, interest is charged on the balance still owed. The rest of the EMI repays principal, so interest falls and principal repaid rises over time.",
  ],
  ejemplo: [
    "A ₹10 lakh personal loan at 9% for 5 years has an EMI of ₹20,758.36. Over 60 months you pay ₹2,45,501.31 of interest.",
    "In the first year alone, ₹83,270.24 of your EMIs goes to interest.",
  ],
  faq: [
    {
      pregunta: "Does the EMI include processing fees or insurance?",
      respuesta: "No. It covers interest and principal only. Processing fees, insurance and GST on fees are extra and change the real cost of the loan.",
    },
    {
      pregunta: "How do I lower my EMI?",
      respuesta: "A longer tenure lowers the EMI but raises the total interest. A lower rate or a bigger down payment lowers both.",
    },
    {
      pregunta: "What happens if the rate changes on a floating-rate loan?",
      respuesta: "Your lender either changes the EMI or keeps it and changes the tenure. Enter the new rate and the remaining balance to see the new EMI.",
    },
    {
      pregunta: "Does prepaying help?",
      respuesta: "Yes. A part-prepayment cuts the balance on which interest is charged, so it saves interest from the next month on.",
    },
  ],
  glosario: [
    { termino: "EMI", definicion: "Equated monthly instalment, the fixed monthly payment of a loan." },
    { termino: "Principal", definicion: "The amount you borrowed and still owe." },
    { termino: "Tenure", definicion: "How long you take to repay the loan." },
  ],
});
