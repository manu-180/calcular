import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.national-insurance-calculator",
  h1: "National Insurance calculator 2026/27",
  title: "National Insurance calculator 2026/27 for employees",
  description:
    "See how much Class 1 National Insurance you pay in 2026/27: {{gb.ni-employee-main-rate}} between {{gb.ni-primary-threshold}} and {{gb.ni-upper-earnings-limit}}, {{gb.ni-employee-upper-rate}} above.",
  intro: [
    "If you are employed, National Insurance comes out of your pay along with Income Tax. It builds your record for the State Pension and some benefits.",
    "Enter your yearly salary to see what you pay a year, a month and a week, and what your employer pays on top.",
  ],
  comoSeCalcula: [
    "Nothing on the first {{gb.ni-primary-threshold}} a year.",
    "{{gb.ni-employee-main-rate}} on earnings from {{gb.ni-primary-threshold}} up to {{gb.ni-upper-earnings-limit}}.",
    "{{gb.ni-employee-upper-rate}} on everything above {{gb.ni-upper-earnings-limit}}.",
    "Your employer pays {{gb.ni-employer-rate}} on your earnings above {{gb.ni-secondary-threshold}}. That is not taken from your pay.",
  ],
  ejemplo: ["On £30,000 you pay £1,394.40 a year, about £116.20 a month. Your employer pays another £3,750."],
  faq: [
    {
      pregunta: "Is National Insurance worked out yearly?",
      respuesta:
        "For employees it is worked out each pay period, with weekly or monthly thresholds. If your pay is the same every month the yearly total matches this calculator. A one-off bonus can push one month above the limit, so the total can differ a little.",
    },
    {
      pregunta: "Do I pay National Insurance after State Pension age?",
      respuesta: "No employee National Insurance once you reach State Pension age, even if you keep working. Your employer still pays its part.",
    },
    {
      pregunta: "What do I get for my National Insurance?",
      respuesta:
        "Each year you pay, or earn above the Lower Earnings Limit, counts as a qualifying year for the State Pension. You need 35 for the full new State Pension.",
    },
    {
      pregunta: "Does a pension contribution reduce my National Insurance?",
      respuesta: "Only if it is paid through salary sacrifice. Normal workplace pension contributions reduce Income Tax but not National Insurance.",
    },
  ],
  glosario: [
    { termino: "Class 1", definicion: "The National Insurance paid by employees and their employers through PAYE." },
    { termino: "Primary Threshold", definicion: "The level of earnings where employees start paying National Insurance." },
    { termino: "Upper Earnings Limit", definicion: "The level of earnings above which the employee rate drops to {{gb.ni-employee-upper-rate}}." },
  ],
});
