import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.prsi-calculator",
  h1: "PRSI calculator for employees",
  title: "PRSI calculator 2026: Class A employee PRSI",
  description: "Work out your Class A employee PRSI at {{ie.prsi-employee-rate}}, including the PRSI Credit on weekly pay between {{ie.prsi-weekly-thresholds[employee-starts]}} and {{ie.prsi-weekly-thresholds[credit-ends]}}.",
  intro: [
    "Pay Related Social Insurance (PRSI) builds your entitlement to the State Pension (Contributory), Jobseeker's Benefit, Illness Benefit and other payments.",
    "Most employees pay Class A PRSI. Enter your pay to see how much comes out each week, month and year.",
  ],
  comoSeCalcula: [
    "PRSI is worked out on weekly pay. If you are paid monthly, your pay is turned into a weekly figure (times 12, divided by 52).",
    "Up to {{ie.prsi-weekly-thresholds[employee-starts]}} a week you pay no employee PRSI.",
    "Above that you pay {{ie.prsi-employee-rate}} on all your weekly pay, not just the part over the threshold.",
    "Between {{ie.prsi-weekly-thresholds[employee-starts]}} and {{ie.prsi-weekly-thresholds[credit-ends]}} a week a PRSI Credit applies. It starts at {{ie.prsi-credit-max}} and drops by one-sixth of what you earn over €352.01, and it comes off your PRSI.",
  ],
  ejemplo: [
    "On €377 a week at 4.2%, PRSI is €15.83. The credit is €12 less one-sixth of €24.99 (€4.17), so €7.83. You pay €8.00 a week.",
  ],
  faq: [
    {
      pregunta: "Why did my PRSI go up in October?",
      respuesta: "The Class A employee rate rose from 4.2% to 4.35% on 1 October 2026. All PRSI rates had already gone up by 0.1 points on 1 October 2025.",
    },
    {
      pregunta: "Does my employer pay PRSI too?",
      respuesta: "Yes. Employers pay their own PRSI on top of your pay. The employer PRSI calculator shows that cost.",
    },
    {
      pregunta: "Who pays Class A PRSI?",
      respuesta:
        "Employees aged 16 to 66 in industrial, commercial and service employment with reckonable pay of €38 or more a week, and civil and public servants recruited from 6 April 1995.",
    },
  ],
  glosario: [
    { termino: "PRSI", definicion: "Pay Related Social Insurance. Contributions that fund social welfare benefits and the State Pension (Contributory)." },
    { termino: "PRSI Credit", definicion: "A reduction in employee PRSI for weekly pay between €352.01 and €424." },
  ],
});
