import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.take-home-pay",
  h1: "UAE salary calculator: take-home pay",
  title: "Take-home pay UAE: salary after GPSSA and ILOE",
  description:
    "See your monthly take-home pay in the UAE, with the {{ae.gpssa[employee]}} GPSSA pension contribution for Emiratis and the unemployment insurance premium.",
  intro: [
    "For expatriates, this calculator only takes off the unemployment insurance premium. Emiratis also pay a pension contribution.",
    "Enter your salary and basic salary to see what reaches your account each month.",
  ],
  comoSeCalcula: [
    "Emiratis registered with GPSSA pay {{ae.gpssa[employee]}} of their salary as a pension contribution. The employer pays {{ae.gpssa[employer]}} and the government {{ae.gpssa[government]}}.",
    "Workers pay an unemployment insurance premium of up to {{ae.iloe[premium-low]}} a month if the basic salary is below {{ae.iloe[threshold]}}, and up to {{ae.iloe[premium-high]}} above it.",
    "Take-home pay is the salary less those amounts.",
  ],
  ejemplo: ["An Emirati earning AED 30,000 a month pays AED 1,500 to GPSSA and AED 10 of insurance, taking home AED 28,490."],
  faq: [
    {
      pregunta: "Do expatriates pay pension contributions in the UAE?",
      respuesta: "The GPSSA contribution described by MoHRE is for Emiratis in the private sector. Foreign workers get an end-of-service gratuity instead.",
    },
    {
      pregunta: "How much is the unemployment insurance premium?",
      respuesta: "No more than {{ae.iloe[premium-low]}} a month if your basic salary is below {{ae.iloe[threshold]}}, and no more than {{ae.iloe[premium-high]}} above it.",
    },
    {
      pregunta: "Who has to join the unemployment insurance?",
      respuesta: "Employees in the federal government and the private sector, except investors, domestic workers, temporary contract workers, under-18s and Emirati retirees on a pension.",
    },
  ],
  glosario: [
    { termino: "GPSSA", definicion: "General Pension and Social Security Authority, the pension fund for Emiratis." },
    { termino: "ILOE", definicion: "Involuntary Loss of Employment, the UAE unemployment insurance scheme." },
  ],
});
