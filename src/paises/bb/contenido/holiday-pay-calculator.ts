import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.holiday-pay-calculator",
  h1: "Barbados holiday pay calculator {{anio}}",
  title: "Holiday pay calculator {{anio}}: {{bb.holiday-weeks-under-5}} or {{bb.holiday-weeks-5-plus}} paid",
  description:
    "Find your paid holiday under the Holidays with Pay Act, {{bb.holiday-weeks-under-5}} at first and {{bb.holiday-weeks-5-plus}} from the fifth year, and what it is worth in pay.",
  intro: [
    "The Holidays with Pay Act 2017-3 gives workers in Barbados {{bb.holiday-weeks-under-5}} weeks of paid holiday a year at the start. From the fifth year of service the entitlement rises to {{bb.holiday-weeks-5-plus}} weeks.",
    "Enter your normal weekly pay and your years of continuous service. The calculator shows the weeks you are owed and the pay that goes with them.",
  ],
  comoSeCalcula: [
    "Weeks of holiday: {{bb.holiday-weeks-under-5}} weeks for a worker in the first four years of service, {{bb.holiday-weeks-5-plus}} weeks from the fifth year on.",
    "Holiday pay: the number of weeks multiplied by your normal weekly pay.",
    "Pay for a single working day is shown as one fifth of the weekly pay, which suits a five day week.",
    "The result is the entitlement for a full year of service. Part years, shift patterns and pay that varies week to week can change the exact figure.",
  ],
  ejemplo: [
    "A hotel front desk clerk has worked for 3 years and earns Bds$800 a week. Her entitlement is 3 weeks, so her holiday pay is 3 × Bds$800, or Bds$2,400.00. One day off costs her employer Bds$160.00. After her fifth year the entitlement becomes 4 weeks, worth Bds$3,200.00 at the same pay.",
  ],
  faq: [
    {
      pregunta: "How many weeks of paid holiday do I get in Barbados?",
      respuesta:
        "The Labour Department fact sheet on the Holidays with Pay Act 2017-3 gives {{bb.holiday-weeks-under-5}} weeks for a worker with less than 5 years of service and {{bb.holiday-weeks-5-plus}} weeks from the fifth year.",
    },
    {
      pregunta: "When does the longer holiday start?",
      respuesta: "The fact sheet ties the {{bb.holiday-weeks-5-plus}} week entitlement to the fifth year of employment. This calculator counts the fifth year as already covered.",
    },
    {
      pregunta: "Does holiday pay come out of NIS?",
      respuesta: "No. Holiday pay is paid by your employer as ordinary wages. NIS and PAYE are deducted from it in the usual way.",
    },
  ],
  glosario: [
    { termino: "Holidays with Pay Act", definicion: "The law that gives workers in Barbados a minimum paid holiday each year." },
    { termino: "Continuous service", definicion: "Time with the same employer without a break, which sets how long your holiday is." },
    { termino: "Normal weekly pay", definicion: "What you usually earn in a week, used to value each week of holiday." },
  ],
});
