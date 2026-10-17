import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.no-tax-on-overtime",
  h1: "No tax on overtime calculator",
  title: "No Tax on Overtime Calculator: your deduction and savings",
  description:
    "Estimate your federal deduction for qualified overtime, up to {{us.overtime-deduction-max[other]}} or {{us.overtime-deduction-max[mfj]}} on a joint return, and the income tax it saves you.",
  intro: [
    "From 2025 through 2028 you can deduct the extra pay you earn for overtime, the half in time and a half, from your federal taxable income.",
    "Enter your overtime pay and your income to see how much you can deduct and roughly how much tax it saves.",
  ],
  comoSeCalcula: [
    "Only the premium counts. At time and a half, that is one third of your total overtime pay.",
    "The deduction is capped at {{us.overtime-deduction-max[other]}} a year, or {{us.overtime-deduction-max[mfj]}} for married couples filing jointly.",
    "If your MAGI is over {{us.tips-overtime-threshold[other]}} ({{us.tips-overtime-threshold[mfj]}} on a joint return), the cap drops by {{us.tips-overtime-phaseout-step}} for each full $1,000 over.",
    "The tax saved is the difference between the tax on your taxable income with and without the deduction.",
  ],
  ejemplo: [
    "A single worker paid $15,000 for overtime has a $5,000 premium. With $63,900 of taxable income in the 22% bracket, deducting it saves $1,100 of federal income tax.",
  ],
  faq: [
    {
      pregunta: "Is all my overtime pay tax free?",
      respuesta: "No. Only the premium above your regular rate can be deducted, and only income tax goes down. Social Security, Medicare and state taxes still apply.",
    },
    {
      pregunta: "Where do I find my qualified overtime?",
      respuesta: "For 2026, employers report it on Form W-2 in box 12 with code TT. Independent contractors may see it on Form 1099.",
    },
    {
      pregunta: "Do I have to itemize to get it?",
      respuesta: "No. You claim it on Schedule 1-A and it works with the standard deduction too.",
    },
    {
      pregunta: "Does overtime under a union contract count?",
      respuesta: "Only the part required by the Fair Labor Standards Act. Extra overtime that a contract or state law adds on top, such as daily overtime or double time, does not qualify.",
    },
  ],
  glosario: [
    { termino: "Qualified overtime compensation", definicion: "The pay above your regular rate that federal law requires for hours over 40 in a workweek." },
    { termino: "MAGI", definicion: "Modified adjusted gross income. For most people it equals AGI." },
  ],
});
