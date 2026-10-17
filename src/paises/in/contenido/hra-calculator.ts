import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.hra-calculator",
  h1: "HRA exemption calculator 2026-27",
  title: "HRA calculator 2026-27: how much of your HRA is tax free",
  description:
    "Work out your HRA exemption under rule 279: the least of HRA received, {{in.hra-salary-percent[metro]}} or {{in.hra-salary-percent[other]}} of salary, and rent minus {{in.hra-rent-excess}} of salary.",
  intro: [
    "If you live in a rented home and your salary includes house rent allowance, part of it can be tax free. Enter your numbers and see how much.",
    "The HRA exemption only works in the old tax regime. In the new regime the whole HRA is taxed.",
  ],
  comoSeCalcula: [
    "The tax-free part is the lowest of three amounts, worked out for the months you paid rent.",
    "First, the HRA you actually receive.",
    "Second, rent paid minus {{in.hra-rent-excess}} of your salary.",
    "Third, {{in.hra-salary-percent[metro]}} of salary if you live in Mumbai, Kolkata, Delhi, Chennai, Hyderabad, Pune, Ahmedabad or Bengaluru, and {{in.hra-salary-percent[other]}} anywhere else.",
    "Salary here means basic plus dearness allowance when your terms of employment include it. Other allowances and perquisites do not count.",
  ],
  ejemplo: [
    "You earn a basic of ₹50,000, get ₹20,000 of HRA and pay ₹18,000 rent in Pune. Half your salary is ₹25,000 and rent minus 10% of salary is ₹13,000.",
    "The lowest is ₹13,000, so ₹1,56,000 a year is tax free and ₹84,000 of HRA is taxed.",
  ],
  faq: [
    {
      pregunta: "Can I claim HRA in the new tax regime?",
      respuesta: "No. The new regime under section 202 does not allow the HRA exemption. If HRA is a big part of your pay, compare both regimes with the income tax calculator.",
    },
    {
      pregunta: "Which cities get the 50% limit?",
      respuesta:
        "From tax year 2026-27, Mumbai, Kolkata, Delhi, Chennai, Hyderabad, Pune, Ahmedabad and Bengaluru. What counts is where you live, not where your employer is.",
    },
    {
      pregunta: "Can I claim HRA if I live in my own house?",
      respuesta: "No. The home you live in must not be owned by you, and you must actually pay rent for it.",
    },
    {
      pregunta: "What if I paid rent for only part of the year?",
      respuesta: "The limits are worked out only for the months you lived in the rented home. Enter that number of months and the calculator scales the exemption.",
    },
  ],
  glosario: [
    { termino: "HRA", definicion: "House rent allowance: a part of salary paid to cover rent." },
    { termino: "DA", definicion: "Dearness allowance, an addition to basic pay linked to prices." },
    { termino: "Rule 279", definicion: "The rule in the Income-tax Rules, 2026 that sets the HRA limits." },
  ],
});
