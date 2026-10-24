import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.heslb-loan-repayment",
  "h1": "HESLB loan repayment calculator",
  "title": "HESLB loan repayment calculator: monthly deduction",
  "description": "Work out your monthly HESLB student loan deduction: {{tz.heslb-rate}} of your basic salary, and how many months it takes to clear the balance.",
  "intro": [
    "If you have a loan from the Higher Education Students' Loans Board, your employer deducts a share of your basic salary each month.",
    "Enter your basic salary and, if you know it, the balance still to repay."
  ],
  "comoSeCalcula": [
    "The monthly deduction is {{tz.heslb-rate}} of your basic salary.",
    "Dividing the balance by the deduction gives the months left, if your salary and the balance stay the same."
  ],
  "ejemplo": [
    "On a basic salary of TSh 1,200,000, the deduction is TSh 180,000 a month."
  ],
  "faq": [
    {
      "pregunta": "Who makes the deduction?",
      "respuesta": "Your employer, through the HESLB employer repayment system."
    },
    {
      "pregunta": "Is it based on gross or basic salary?",
      "respuesta": "On basic salary."
    },
    {
      "pregunta": "Can I repay faster?",
      "respuesta": "HESLB has a repayment portal. Ask HESLB about extra payments."
    }
  ],
  "glosario": [
    {
      "termino": "HESLB",
      "definicion": "Higher Education Students' Loans Board."
    }
  ]
});
