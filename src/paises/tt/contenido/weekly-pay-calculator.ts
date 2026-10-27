import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.weekly-pay-calculator",
  h1: "Weekly pay calculator Trinidad and Tobago",
  title: "Weekly wages after tax in Trinidad and Tobago {{anio}}",
  description: "Paid by the week? See your weekly take-home pay after NIS, Health Surcharge and PAYE, with the current NIS earnings classes.",
  intro: [
    "If you are paid by the week, enter your gross weekly wages to see what you take home.",
    "NIS and Health Surcharge are weekly amounts by law, so a weekly pay packet shows them exactly.",
  ],
  comoSeCalcula: [
    "NIS: the weekly contribution for your earnings class. The lowest class starts at {{tt.nis-employee-weekly[0].desde}} a week.",
    "Health Surcharge: {{tt.health-surcharge-high}} if you earn more than {{tt.health-surcharge-threshold-weekly}} a week, otherwise {{tt.health-surcharge-low}}.",
    "PAYE: 52 weeks of wages less the {{tt.personal-allowance}} allowance and {{tt.nis-deductible-share}} of your NIS, taxed at {{tt.income-tax-rate}} and divided by 52.",
  ],
  ejemplo: ["On TT$3,000 a week you pay NIS of TT$163.60, Health Surcharge of TT$8.25 and PAYE of TT$288.68. You take home TT$2,539.47."],
  faq: [
    {
      pregunta: "Do I pay income tax on weekly wages?",
      respuesta: "Only if 52 weeks of your wages, after deductions, come to more than the {{tt.personal-allowance}} personal allowance.",
    },
    {
      pregunta: "How is my NIS class worked out when I am paid weekly?",
      respuesta: "From the weekly earnings column of the NIBTT table. Each class has a fixed weekly amount, so your NIS only changes when your wages cross into another class.",
    },
    {
      pregunta: "What if my hours change from week to week?",
      respuesta: "Your NIS class and Health Surcharge follow the wages of each week. This calculator shows PAYE as if every week paid the same, so use your usual wages.",
    },
  ],
  glosario: [{ termino: "Pay packet", definicion: "Your wages for the week after deductions, with the slip that lists them." }],
});
