import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.minimum-wage",
  h1: "Minimum wage in the Philippines by region",
  title: "Minimum wage Philippines {{anio}} by region (daily and monthly)",
  description:
    "Check the current daily minimum wage in your region, from NCR at {{ph.minimum-wage-high@ncr}} to BARMM, and what it means a month for the days you work.",
  intro: [
    "Each region sets its own minimum wage through a wage order of its Regional Tripartite Wages and Productivity Board. Pick your region to see the current range.",
    "In Metro Manila the minimum is {{ph.minimum-wage-high@ncr}} a day for non-agriculture workers and {{ph.minimum-wage-low@ncr}} for agriculture, small retail and service shops and small manufacturers.",
  ],
  comoSeCalcula: [
    "The calculator shows the lowest and highest daily minimum in your region, across all sectors and areas.",
    "The monthly figure is the daily rate times the days you work. Daily minimums are for normal work of up to 8 hours a day.",
    "If you enter your own daily wage, it is compared with the lowest minimum of the region.",
  ],
  ejemplo: ["In NCR, 22 working days at {{ph.minimum-wage-high@ncr}} come to ₱16,610 a month."],
  faq: [
    {
      pregunta: "What is the minimum wage in NCR?",
      respuesta:
        "{{ph.minimum-wage-high@ncr}} a day for non-agriculture workers and {{ph.minimum-wage-low@ncr}} for agriculture, retail and service establishments with 15 workers or less, and manufacturers regularly employing less than 10 workers, under Wage Order No. NCR-28.",
    },
    {
      pregunta: "Why does my region show a range?",
      respuesta: "Wage orders set different rates by sector (agriculture or not), by the size of the business and, in some regions, by city or municipality.",
    },
    {
      pregunta: "Do minimum wage earners pay income tax?",
      respuesta: "No. The statutory minimum wage is exempt from income tax, together with the holiday pay, overtime pay, night shift differential and hazard pay of a minimum wage earner.",
    },
    {
      pregunta: "Does the minimum apply to every worker?",
      respuesta: "Wage orders cover all minimum wage earners in the private sector of the region, whatever their position or how they are paid. Domestic workers have their own monthly minimum.",
    },
  ],
  glosario: [
    { termino: "Wage order", definicion: "The decision of a regional wage board that sets the minimum wage in its region." },
    { termino: "RTWPB", definicion: "Regional Tripartite Wages and Productivity Board, with members from government, workers and employers." },
    { termino: "NWPC", definicion: "National Wages and Productivity Commission, which reviews the wage orders of all regions." },
  ],
});
