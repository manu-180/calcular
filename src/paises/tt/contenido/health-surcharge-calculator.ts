import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.health-surcharge-calculator",
  h1: "Health Surcharge calculator",
  title: "Health Surcharge calculator Trinidad and Tobago {{anio}}",
  description: "See how much Health Surcharge comes off your pay: {{tt.health-surcharge-high}} or {{tt.health-surcharge-low}} a week, depending on what you earn.",
  intro: [
    "Health Surcharge is a small fixed charge on employment income. Your employer deducts it with PAYE and sends both to the Board of Inland Revenue.",
    "Enter your pay to see the rate that applies and what it adds up to for the month and the year.",
  ],
  comoSeCalcula: [
    "If you earn more than {{tt.health-surcharge-threshold-monthly}} a month or {{tt.health-surcharge-threshold-weekly}} a week, the rate is {{tt.health-surcharge-high}} a week.",
    "Everyone else who is employed pays {{tt.health-surcharge-low}} a week.",
    "For monthly pay, the weekly rate is counted once for each Monday in the month.",
  ],
  ejemplo: ["On TT$8,000 a month, a month with four Mondays costs TT$33 of Health Surcharge, or TT$429 over a year."],
  faq: [
    {
      pregunta: "Who is exempt from Health Surcharge?",
      respuesta: "Employees under 16, people aged 60 and over, and people whose only income is a pension.",
    },
    {
      pregunta: "Is Health Surcharge the same as NIS?",
      respuesta: "No. NIS goes to the National Insurance Board and depends on your earnings class. Health Surcharge goes to the Board of Inland Revenue and has only two rates.",
    },
    {
      pregunta: "When does my employer pay it over?",
      respuesta: "With the PAYE for the month, on or before the 15th of the following month.",
    },
  ],
  glosario: [{ termino: "Emoluments", definicion: "Salary, wages, commissions and other pay from employment." }],
});
