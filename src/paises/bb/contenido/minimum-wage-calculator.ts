import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.minimum-wage-calculator",
  h1: "Barbados minimum wage calculator {{anio}}",
  title: "Minimum wage calculator {{anio}}: hourly and weekly pay",
  description:
    "Check the Barbados minimum wage of {{bb.minimum-wage-hourly}} an hour and {{bb.minimum-wage-weekly}} a week, and compare it with your own hourly pay.",
  intro: [
    "The Ministry of Labour sets the national minimum wage through a Minimum Wage Order. The current figure is {{bb.minimum-wage-hourly}} an hour, which comes to {{bb.minimum-wage-weekly}} for a 40 hour week.",
    "Enter the hours you work in a week and, if you like, your own hourly pay. The calculator shows the legal minimum for your hours and tells you whether you are paid above it.",
  ],
  comoSeCalcula: [
    "Minimum per hour: {{bb.minimum-wage-hourly}}, as stated in the First Schedule of the Order.",
    "Minimum per week for your hours: the hourly minimum multiplied by your weekly hours. At 40 hours the Order itself gives {{bb.minimum-wage-weekly}}.",
    "Minimum per month: the weekly figure multiplied by 52 and divided by 12.",
    "Comparison: your hourly pay minus the minimum. A negative number means you are paid below the minimum.",
  ],
  ejemplo: [
    "A cleaner works 40 hours a week. The minimum for her hours is the hourly minimum times 40, which matches the weekly figure in the Order, and the monthly equivalent is that weekly figure times 52 divided by 12. If she is paid Bds$9.00 an hour, that is Bds$1.50 below the Bds$10.50 minimum that applied from June 2025.",
  ],
  faq: [
    {
      pregunta: "What is the minimum wage in Barbados?",
      respuesta: "The Minimum Wage (National and Sectoral Minimum Wage) Order, 2025 sets {{bb.minimum-wage-hourly}} an hour and {{bb.minimum-wage-weekly}} a week.",
    },
    {
      pregunta: "Are there sector minimums?",
      respuesta: "Yes. The Order has a national minimum and sectoral minimums. This calculator covers the national figure only.",
    },
    {
      pregunta: "Will the minimum wage change?",
      respuesta: "The Ministry of Labour has issued notices of intention to make new minimum wage orders. Check labour.gov.bb for the order in force before you rely on the figure.",
    },
  ],
  glosario: [
    { termino: "Minimum Wage Order", definicion: "The legal instrument under which the Ministry of Labour sets the lowest legal pay." },
    { termino: "National minimum wage", definicion: "The lowest hourly pay that applies across sectors that have no higher sector rate." },
    { termino: "Sectoral minimum", definicion: "A higher minimum set for a particular sector of the economy." },
  ],
});
