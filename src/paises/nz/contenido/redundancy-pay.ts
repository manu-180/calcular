import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.redundancy-pay",
  h1: "Redundancy pay calculator NZ",
  title: "Redundancy pay NZ: work out what your agreement gives",
  description:
    "New Zealand has no legal minimum redundancy pay. Enter the formula in your employment agreement and see your redundancy compensation and notice pay.",
  intro: [
    "In New Zealand there's no minimum redundancy payment set by law. You're only entitled to redundancy compensation if your employment agreement says so.",
    "An agreement may set a number of weeks of pay for the first year of service and another for each year after. Enter those numbers and your weekly pay to see what you would get.",
  ],
  comoSeCalcula: [
    "Weeks of pay = weeks for the first year + weeks for each extra year × the extra years you've worked.",
    "If your agreement has a maximum number of weeks, the total stops there.",
    "Multiply the weeks by your weekly pay. Notice paid instead of worked is added on top.",
  ],
  ejemplo: ["With 6 years' service, an agreement of 4 weeks for the first year and 2 for each extra year gives 14 weeks. At $1,300 a week that's $18,200 before tax."],
  faq: [
    {
      pregunta: "Is there a minimum redundancy payment in New Zealand?",
      respuesta: "No. If your employment agreement doesn't mention redundancy pay, there's no compensation. You and your employer can still negotiate.",
    },
    {
      pregunta: "Do I still get notice if I'm made redundant?",
      respuesta: "Yes. Your employer has to give you notice and pay it. That is separate from redundancy compensation.",
    },
    {
      pregunta: "Where do I find my redundancy terms?",
      respuesta: "Look in your employment agreement. If it doesn't provide for redundancy pay, there's no compensation unless you negotiate it.",
    },
  ],
  glosario: [
    { termino: "Redundancy", definicion: "When your job ends because the employer no longer needs the role, not because of anything you did." },
    { termino: "Notice pay", definicion: "Pay for the notice period, when you're paid instead of working it." },
  ],
});
