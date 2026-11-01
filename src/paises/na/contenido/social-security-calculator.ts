import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.social-security-calculator",
  h1: "Social Security contribution calculator",
  title: "Social Security calculator Namibia: SSC contributions",
  description:
    "Work out your monthly Social Security contribution: {{na.ssc-employee-rate}} from you and {{na.ssc-employer-rate}} from your employer, on a basic wage up to {{na.ssc-ceiling}}.",
  intro: [
    "Every employee in Namibia is a member of the Maternity Leave, Sick Leave and Death Benefit Fund run by the Social Security Commission.",
    "Enter your basic wage and see what you pay, what your employer pays and the wage the contribution is based on.",
  ],
  comoSeCalcula: [
    "Take your basic wage for the month. If it is above {{na.ssc-ceiling}}, use {{na.ssc-ceiling}}. If it is below {{na.ssc-floor}}, use {{na.ssc-floor}}.",
    "You pay {{na.ssc-employee-rate}} of that amount and your employer pays another {{na.ssc-employer-rate}}.",
    "Your employer deducts your share from your pay and sends both shares to the SSC.",
  ],
  ejemplo: ["On a basic wage of N$9,000 you pay N$81 and your employer pays N$81, so N$162 goes to the SSC each month."],
  faq: [
    {
      pregunta: "Is the ceiling going up again?",
      respuesta: "Yes. Government Notice 236 of 2026 sets the maximum basic salary at N$14,000 from 1 March 2027, N$15,000 from 1 March 2028 and N$16,000 from 1 March 2029.",
    },
    {
      pregunta: "What does the fund pay out?",
      respuesta: "It pays maternity leave benefits, sick leave benefits once your paid sick leave is used up, and a death benefit. From 1 October 2026 the death benefit is a lump sum of N$15,000.",
    },
    {
      pregunta: "Can my employer deduct both shares from my salary?",
      respuesta: "No. The Social Security Act makes the employer liable for its own share. Only your {{na.ssc-employee-rate}} can come off your pay.",
    },
  ],
  glosario: [
    { termino: "Basic wage", definicion: "Your pay for ordinary hours of work, without allowances, overtime or bonuses." },
    { termino: "MSD Fund", definicion: "The Maternity Leave, Sick Leave and Death Benefit Fund of the Social Security Commission." },
  ],
});
