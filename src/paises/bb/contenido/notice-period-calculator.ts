import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.notice-period-calculator",
  h1: "Barbados notice period calculator {{anio}}",
  title: "Notice period calculator {{anio}}: minimum statutory notice",
  description:
    "Find the minimum notice an employer or employee must give in Barbados, from one week up to {{bb.notice-weekly-paid[15-plus]}} or {{bb.notice-monthly-paid[15-plus]}}, and the pay in lieu.",
  intro: [
    "Section 22 of the Employment Rights Act, 2012-9 sets the shortest notice that can be given to end a contract once a worker has been continuously employed for a year. The length depends on how you are paid and how long you have served.",
    "Choose your pay frequency, say who is giving notice and enter your years of service. If you add your pay for one period, the calculator also shows what payment in lieu of notice would come to.",
  ],
  comoSeCalcula: [
    "Weekly, daily or hourly paid: {{bb.notice-weekly-paid[under-2]}} week under 2 years, {{bb.notice-weekly-paid[2-5]}} weeks from 2 to 5 years, {{bb.notice-weekly-paid[5-10]}} weeks from 5 to 10, {{bb.notice-weekly-paid[10-15]}} weeks from 10 to 15 and {{bb.notice-weekly-paid[15-plus]}} weeks from 15 years.",
    "Fortnightly paid: {{bb.notice-fortnightly-paid[under-5]}} weeks under 5 years, then {{bb.notice-fortnightly-paid[5-10]}}, {{bb.notice-fortnightly-paid[10-15]}} and {{bb.notice-fortnightly-paid[15-plus]}} weeks at the same service breaks.",
    "Monthly paid: {{bb.notice-monthly-paid[under-10]}} month under 10 years, {{bb.notice-monthly-paid[10-15]}} months from 10 to 15 years and {{bb.notice-monthly-paid[15-plus]}} months from 15 years.",
    "An employee resigning gives {{bb.employee-notice-weeks[weekly]}} week if paid weekly, {{bb.employee-notice-weeks[fortnightly]}} weeks if paid fortnightly and {{bb.employee-notice-months}} month if paid monthly.",
  ],
  ejemplo: [
    "A monthly paid accountant earning Bds$5,000 has 6 years of service. Her employer must give at least 1 month of notice, so payment in lieu is Bds$5,000.00. After 16 years the minimum becomes 2.5 months, and the same pay in lieu would be Bds$12,500.00.",
  ],
  faq: [
    {
      pregunta: "How much notice must my employer give me in Barbados?",
      respuesta:
        "Section 22 of the Employment Rights Act, 2012-9 sets it by pay frequency and service. A monthly paid worker with under 10 years gets {{bb.notice-monthly-paid[under-10]}} month, and a weekly paid worker with 5 to 10 years gets {{bb.notice-weekly-paid[5-10]}} weeks.",
    },
    {
      pregunta: "How much notice do I give if I resign?",
      respuesta: "Section 22(4) asks for {{bb.employee-notice-weeks[weekly]}} week from weekly paid staff, {{bb.employee-notice-weeks[fortnightly]}} weeks from fortnightly paid staff and {{bb.employee-notice-months}} month from monthly paid staff.",
    },
    {
      pregunta: "Can a contract give less notice than the Act?",
      respuesta: "No. Section 22(5) makes any shorter notice in the contract invalid for an employee with at least one year of continuous employment. Longer notice is allowed.",
    },
    {
      pregunta: "Can I be paid instead of working the notice?",
      respuesta: "Section 22(6) lets either side accept payment in lieu of notice. The calculator values it as your pay for one period multiplied by the notice, counted in pay periods.",
    },
  ],
  glosario: [
    { termino: "Notice", definicion: "The warning one side gives before a contract of employment ends." },
    { termino: "Payment in lieu", definicion: "A payment that replaces the working of the notice period." },
    { termino: "Continuous employment", definicion: "Service with the same employer without a break, counted in years." },
    { termino: "Employment Rights Act", definicion: "Act 2012-9, the main law on termination and employee rights in Barbados." },
  ],
});
