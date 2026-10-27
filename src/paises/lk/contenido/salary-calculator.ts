import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.salary-calculator",
  h1: "Salary calculator Sri Lanka",
  title: "Salary calculator Sri Lanka {{anio}}: take-home pay after APIT",
  description:
    "Work out your take-home pay from your gross salary. Uses the IRD APIT Table 1 for 2025/26 and EPF at {{lk.epf-employee}} of your earnings.",
  intro: [
    "Enter your gross monthly salary and see what reaches your bank account. The calculator takes off APIT and your EPF contribution, the two deductions every employer has to make.",
    "If your payslip has other deductions, such as a staff loan or welfare society, add them and they come off at the end.",
  ],
  comoSeCalcula: [
    "EPF: {{lk.epf-employee}} of your total earnings for the month. Your employer adds {{lk.epf-employer}} and pays ETF on top, but those do not come out of your salary.",
    "APIT: your employer applies Tax Table No. 01 of the Inland Revenue Department to your full monthly pay. Nothing is paid on the first {{lk.apit-table-1[1].desde}}, and the rate then rises from {{lk.apit-table-1[1].tasa}} to {{lk.apit-table-1[-1].tasa}}.",
    "EPF is not taken off before APIT. The table already includes the personal relief, so it works on the gross figure.",
    "Take-home pay is gross salary less APIT, EPF and any other deductions you entered.",
  ],
  ejemplo: [
    "A gross salary of Rs. 250,000 leaves Rs. 222,000. EPF is Rs. 20,000 and APIT is 18% of 250,000 less Rs. 37,000, which is Rs. 8,000.",
  ],
  faq: [
    {
      pregunta: "How much salary is tax free in Sri Lanka?",
      respuesta: "The personal relief is {{lk.personal-relief}} for the year of assessment, which is {{lk.apit-table-1[1].desde}} a month. Below that your employer deducts no APIT.",
    },
    {
      pregunta: "Does EPF reduce my APIT?",
      respuesta: "No. The IRD says the tax table is applied to profits from employment without deducting any sum from them, so APIT is worked out on your gross pay.",
    },
    {
      pregunta: "Why is my APIT different from this result?",
      respuesta: "Bonuses and other one-off payments use a different IRD table. Benefits such as a vehicle or housing are added to your pay at their value. If you started or left a job during the year, your employer uses Table No. 05.",
    },
  ],
  glosario: [
    { termino: "APIT", definicion: "Advance Personal Income Tax: the income tax your employer deducts from your salary each month." },
    { termino: "EPF", definicion: "Employees' Provident Fund, the retirement fund managed by the Central Bank of Sri Lanka." },
    { termino: "Take-home pay", definicion: "What you receive after statutory and other deductions." },
  ],
});
