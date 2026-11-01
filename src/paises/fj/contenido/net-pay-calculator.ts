import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.net-pay-calculator",
  h1: "Net pay calculator Fiji {{anio}}",
  title: "Net pay calculator Fiji {{anio}}: gross to take-home",
  description: "See your take-home pay after PAYE and your {{fj.fnpf-employee-rate}} FNPF contribution. Weekly, fortnightly, monthly or yearly pay, using the current FRCS bands.",
  intro: [
    "Two deductions come out of most Fiji pay packets: PAYE income tax and your {{fj.fnpf-employee-rate}} share of the Fiji National Provident Fund (FNPF). Enter your gross pay to see what is left.",
    "The first {{fj.paye-bands[1].desde}} of a year's income is free of tax, so a low wage may lose only the FNPF share.",
  ],
  comoSeCalcula: [
    "FNPF: the calculator takes {{fj.fnpf-employee-rate}} of your gross pay. Your employer pays its own contribution on top, which never comes out of your wage.",
    "PAYE: your pay is turned into a yearly figure and taxed band by band, starting at {{fj.paye-bands[1].tasa}} above {{fj.paye-bands[1].desde}}. The yearly tax is split back over your pay periods.",
    "Take-home pay is gross pay less PAYE and FNPF. The yearly line works from the full year, so it can differ by a few cents from twelve monthly results.",
    "The result is for a resident with one job. If you have a second job, that pay is taxed at a flat rate, which the secondary employment calculator shows.",
  ],
  ejemplo: [
    "A wage of FJ$5,000 a month is FJ$60,000 a year. PAYE is FJ$5,600 a year, or FJ$466.67 a month. FNPF is FJ$400 a month. You take home FJ$4,133.33 a month, which is FJ$49,600 over the year.",
  ],
  faq: [
    {
      pregunta: "How much FNPF does an employee pay?",
      respuesta: "The employee rate is {{fj.fnpf-employee-rate}}. The 2026-2027 Budget Supplement says it stays unchanged while the employer rate is cut for twelve months from 1 August 2026.",
    },
    {
      pregunta: "Is FNPF taken off before PAYE is worked out?",
      respuesta: "Not in this calculator. The PAYE formula in the FRCS Employer Guide 2026 works from the pay itself, with no FNPF deduction, so PAYE is calculated on gross pay.",
    },
    {
      pregunta: "Why does my payslip show a different amount?",
      respuesta: "Your employer may also take union dues, loan repayments, or insurance. Taxable allowances and bonuses are treated as part of your pay. Check the tax code on your Employee Tax Code Declaration is P for your main job.",
    },
  ],
  glosario: [
    { termino: "Gross pay", definicion: "What you earn before PAYE, FNPF and other deductions." },
    { termino: "FNPF", definicion: "Fiji National Provident Fund, the compulsory retirement savings scheme." },
    { termino: "Take-home pay", definicion: "The amount paid into your account after deductions." },
  ],
});
