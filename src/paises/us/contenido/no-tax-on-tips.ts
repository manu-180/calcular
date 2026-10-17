import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.no-tax-on-tips",
  h1: "No tax on tips calculator",
  title: "No Tax on Tips Calculator: deduction up to {{us.tips-deduction-max}}",
  description:
    "Estimate your federal deduction for qualified tips, up to {{us.tips-deduction-max}} a year from 2025 through 2028, and how much income tax it saves you.",
  intro: [
    "Servers, bartenders, hairstylists and other tipped workers can deduct their reported tips from federal taxable income, up to {{us.tips-deduction-max}} a year.",
    "Enter your tips and income to see your deduction and an estimate of the tax you save.",
  ],
  comoSeCalcula: [
    "The deduction is your qualified tips, up to {{us.tips-deduction-max}}. The cap is the same for single and joint returns.",
    "If your MAGI is over {{us.tips-overtime-threshold[other]}} ({{us.tips-overtime-threshold[mfj]}} on a joint return), the cap drops by {{us.tips-overtime-phaseout-step}} for each full $1,000 over.",
    "The tax saved is the difference between the tax on your taxable income with and without the deduction.",
  ],
  ejemplo: ["A server with $12,000 in tips and $28,900 of taxable income deducts all of it and saves $1,440 of federal income tax."],
  faq: [
    {
      pregunta: "Which tips qualify?",
      respuesta:
        "Cash and card tips paid voluntarily by customers in a job the IRS lists as customarily tipped. Mandatory service charges don't count. Tips must be reported on a W-2, a 1099 or Form 4137.",
    },
    {
      pregunta: "Do I still pay Social Security and Medicare on tips?",
      respuesta: "Yes. The deduction only lowers federal income tax. Payroll taxes and most state income taxes still apply.",
    },
    {
      pregunta: "Can married couples filing separately claim it?",
      respuesta: "No. If you are married, you must file a joint return, and the person who earned the tips needs a valid Social Security number.",
    },
  ],
  glosario: [
    { termino: "Qualified tips", definicion: "Voluntary tips received in a customarily tipped occupation and properly reported." },
    { termino: "Schedule 1-A", definicion: "The IRS form where you claim the tips, overtime, car loan interest and senior deductions." },
  ],
});
