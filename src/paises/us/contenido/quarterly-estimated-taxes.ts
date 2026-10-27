import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.quarterly-estimated-taxes",
  h1: "Quarterly estimated tax calculator",
  title: "Quarterly Estimated Tax Calculator {{anio}} (Form 1040-ES)",
  description:
    "Figure your {{anio}} estimated tax payments with the IRS safe harbor rules: {{us.safe-harbor-current}} of this year's tax or {{us.safe-harbor-prior}} to {{us.safe-harbor-prior-high}} of last year's.",
  intro: [
    "If you are self-employed or have income without withholding, the IRS expects you to pay tax during the year in four installments.",
    "Enter this year's expected tax, your withholding and last year's return to see the smallest payments that avoid an underpayment penalty.",
  ],
  comoSeCalcula: [
    "You need estimated payments if you expect to owe at least {{us.estimated-tax-min}} after withholding and credits.",
    "To be safe, your withholding plus payments should cover the smaller of {{us.safe-harbor-current}} of this year's tax or {{us.safe-harbor-prior}} of last year's tax.",
    "If last year's AGI was over {{us.safe-harbor-agi[other]}} ({{us.safe-harbor-agi[mfs]}} if married filing separately), use {{us.safe-harbor-prior-high}} of last year's tax instead.",
    "Subtract your withholding and split the rest into four equal payments.",
  ],
  ejemplo: [
    "You expect $20,000 of tax, $5,000 is withheld and last year's tax was $16,000. Paying $16,000 in total is enough, so you send $11,000 in four payments of $2,750.",
  ],
  faq: [
    {
      pregunta: "When are estimated taxes due?",
      respuesta:
        "For 2026: April 15, June 15 and September 15, 2026, and January 15, 2027. You can skip the January payment if you file your 2026 return and pay the balance by February 1, 2027.",
    },
    {
      pregunta: "What happens if I pay too little?",
      respuesta: "The IRS charges a penalty on each underpayment for the days it stays unpaid. The instructions for Form 2210 explain how it is figured and when it can be waived.",
    },
    {
      pregunta: "Can I raise my withholding instead?",
      respuesta: "Yes. If you also have a job, tax withheld from your paychecks counts toward the safe amount. The IRS Tax Withholding Estimator helps you pick the right Form W-4.",
    },
  ],
  glosario: [
    { termino: "Safe harbor", definicion: "A payment level that protects you from the underpayment penalty even if you owe more when you file." },
    { termino: "Form 1040-ES", definicion: "The IRS form with the worksheet and vouchers for estimated tax payments." },
  ],
});
