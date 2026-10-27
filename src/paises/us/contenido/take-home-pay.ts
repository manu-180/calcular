import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.take-home-pay",
  h1: "Take-home pay calculator",
  title: "Take-Home Pay Calculator {{anio}}: paycheck after taxes",
  description:
    "See your paycheck after federal income tax, Social Security and Medicare for {{anio}}, with 401(k) and pre-tax health benefits. Weekly, biweekly or monthly.",
  intro: [
    "Enter your salary and how often you get paid to see what lands in your bank account after federal taxes.",
    "The result uses the 2026 tax brackets, the standard deduction for your filing status and the current Social Security wage base of {{us.social-security-wage-base}}.",
  ],
  comoSeCalcula: [
    "Pre-tax health premiums come out first. They lower both your income tax and your FICA taxes.",
    "Your traditional 401(k) contribution comes out next, up to the yearly limit of {{us.401k-limit}}. It lowers income tax but not FICA.",
    "Federal income tax is figured on the yearly salary left after those deductions and the standard deduction of {{us.standard-deduction[single]}} for single filers or {{us.standard-deduction[mfj]}} for married couples filing jointly.",
    "Social Security takes {{us.social-security-rate}} of wages up to {{us.social-security-wage-base}}. Medicare takes {{us.medicare-rate}} of all wages, plus {{us.additional-medicare-rate}} above {{us.additional-medicare-threshold[single]}} for single filers ({{us.additional-medicare-threshold[mfj]}} on a joint return).",
    "Each yearly amount is divided by the number of paychecks.",
  ],
  ejemplo: [
    "A single worker earning $60,000 a year, paid every two weeks and saving 5% in a 401(k), takes home about $1,836.54 per paycheck. Each check has $179.23 of federal income tax, $143.08 of Social Security and $33.46 of Medicare.",
  ],
  faq: [
    {
      pregunta: "Why is my real paycheck a little different?",
      respuesta:
        "Employers withhold with the IRS percentage method in Publication 15-T and your Form W-4, which spreads the tax evenly across the year. This calculator shows your actual yearly federal tax divided by your paychecks, so the two numbers end up close.",
    },
    {
      pregunta: "Are state taxes included?",
      respuesta: "No. State and local income taxes depend on where you live and work. Nine states have no tax on wages, while others take several percent more.",
    },
    {
      pregunta: "When does Social Security tax stop?",
      respuesta: "Once your wages for the year pass {{us.social-security-wage-base}}, no more Social Security tax is taken. Medicare tax has no cap.",
    },
    {
      pregunta: "Does a Roth 401(k) lower my taxes?",
      respuesta: "No. Roth contributions come out after tax. Enter only traditional (pre-tax) contributions in the 401(k) field.",
    },
  ],
  glosario: [
    { termino: "FICA", definicion: "The Social Security and Medicare taxes taken from every paycheck." },
    { termino: "Gross pay", definicion: "Your pay before any tax or deduction." },
    { termino: "Pre-tax deduction", definicion: "Money taken from your pay before taxes are figured, such as traditional 401(k) contributions." },
  ],
});
