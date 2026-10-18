import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.net-salary-calculator",
  "h1": "Net salary calculator Tanzania",
  "title": "Net salary calculator Tanzania: gross to take-home pay",
  "description": "See your take-home pay in Tanzania after PAYE, NSSF and, if you have one, your HESLB student loan deduction of {{tz.heslb-rate}} of basic salary.",
  "intro": [
    "Enter your gross monthly salary to see what reaches your account, with every deduction shown.",
    "If you repay a HESLB loan, turn it on to include the {{tz.heslb-rate}} deduction."
  ],
  "comoSeCalcula": [
    "NSSF: usually 10% of your wage, unless your employer pays a bigger share.",
    "PAYE: worked out on your pay after NSSF, with the TRA bands for Tanzania Mainland.",
    "HESLB: {{tz.heslb-rate}} of your basic salary while you have a loan to repay."
  ],
  "ejemplo": [
    "A gross salary of TSh 1,000,000 leaves TSh 797,000 after NSSF of TSh 100,000 and PAYE of TSh 103,000."
  ],
  "faq": [
    {
      "pregunta": "Why is my payslip different?",
      "respuesta": "Your employer may deduct other items such as a SACCO, a loan or union dues. Taxable benefits also change the PAYE."
    },
    {
      "pregunta": "Who pays SDL and WCF?",
      "respuesta": "The employer. They are not deducted from your salary."
    },
    {
      "pregunta": "What is the HESLB deduction based on?",
      "respuesta": "On your basic salary, at {{tz.heslb-rate}} each month."
    }
  ],
  "glosario": [
    {
      "termino": "Take-home pay",
      "definicion": "What you receive after all deductions."
    },
    {
      "termino": "HESLB",
      "definicion": "Higher Education Students' Loans Board, which lends to students and collects repayments through employers."
    }
  ]
});
