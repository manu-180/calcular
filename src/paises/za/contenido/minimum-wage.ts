import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.minimum-wage",
  h1: "National minimum wage calculator {{anio}}",
  title: "Minimum wage {{anio}}: {{za.minimum-wage[general]}} an hour",
  description: "The national minimum wage is {{za.minimum-wage[general]}} an hour from 1 March {{anio}}. Work out the weekly and monthly minimum, including domestic and farm workers.",
  intro: [
    "Choose the type of work and your ordinary hours to see the legal minimum an hour, a week and a month. Add what you earn to check that it meets the minimum.",
    "The national minimum wage is {{za.minimum-wage[general]}} for each ordinary hour since {{za.minimum-wage#desde}}. Domestic and farm workers get the same rate.",
  ],
  comoSeCalcula: [
    "The weekly minimum is the hourly rate times your ordinary hours a week.",
    "The monthly minimum is the weekly figure times {{za.weeks-per-month}}, the number of weeks in a month the Department of Employment and Labour uses.",
    "Workers on the Expanded Public Works Programme have a lower minimum of {{za.minimum-wage[epwp]}} an hour. Contract cleaners have their own rates: {{za.minimum-wage-contract-cleaning[area-a]}} in Area A and {{za.minimum-wage-contract-cleaning[area-c]}} in the rest of the country.",
  ],
  ejemplo: ["A domestic worker on 40 hours a week must earn at least R1 209,20 a week, or R5 239,46 a month."],
  faq: [
    {
      pregunta: "Does the minimum wage apply to domestic workers?",
      respuesta: "Yes. Since 1 March 2026 domestic workers and farm workers are entitled to {{za.minimum-wage[domestic]}} an hour, the same as everyone else.",
    },
    {
      pregunta: "Which areas count as Area A for contract cleaning?",
      respuesta:
        "The metros of Cape Town, Ekurhuleni (Greater East Rand), Johannesburg, Tshwane and Nelson Mandela Bay, and the local councils of Emfuleni, Merafong, Mogale City, Metsimaholo, Randfontein, Stellenbosch and Westonaria. In KwaZulu-Natal the bargaining council rates apply.",
    },
    {
      pregunta: "When does the minimum wage change?",
      respuesta: "The Minister of Employment and Labour publishes the new rates in the Government Gazette. The current rates have been binding since {{za.minimum-wage#desde}}.",
    },
    {
      pregunta: "Are learners on a learnership paid the minimum wage?",
      respuesta: "No. Learners under a learnership agreement get the weekly allowances in Schedule 2 of the National Minimum Wage Act, which depend on their NQF level and credits.",
    },
  ],
  glosario: [
    { termino: "Ordinary hours", definicion: "Your normal working hours, not counting overtime. The legal maximum is 45 hours a week." },
    { termino: "EPWP", definicion: "Expanded Public Works Programme, a government job creation programme with its own minimum rate." },
  ],
});
