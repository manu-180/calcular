import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.unemployment-insurance",
  h1: "UAE unemployment insurance calculator (ILOE)",
  title: "ILOE calculator UAE: premium and compensation",
  description:
    "Work out your UAE unemployment insurance (ILOE): the monthly premium and the compensation of 60% of your basic salary for 3 months if you lose your job.",
  intro: [
    "Employees in the UAE private sector and federal government must join the unemployment insurance scheme, known as ILOE.",
    "Enter your basic salary to see your premium and what you'd get if you lost your job.",
  ],
  comoSeCalcula: [
    "If your basic salary is below {{ae.iloe[threshold]}}, you're in the first category and the premium is no more than {{ae.iloe[premium-low]}} a month. Above it, no more than {{ae.iloe[premium-high]}}.",
    "If you lose your job, you get 60% of your basic salary for up to 3 months.",
    "The monthly compensation is capped at {{ae.iloe[cap-low]}} in the first category and {{ae.iloe[cap-high]}} in the second.",
  ],
  ejemplo: ["With a basic salary of AED 12,000 you pay up to AED 5 a month. If you lose your job, you'd get AED 7,200 a month for 3 months."],
  faq: [
    {
      pregunta: "When can I claim ILOE compensation?",
      respuesta: "After at least 12 continuous months of subscription with all premiums paid, if you lose your job for reasons other than resignation or a disciplinary dismissal.",
    },
    {
      pregunta: "How long do I have to claim?",
      respuesta: "30 days from the end of the job, or from the resolution of a labour dispute.",
    },
    {
      pregunta: "What if I don't subscribe?",
      respuesta: "A worker who doesn't subscribe, or doesn't pay the premiums, is fined AED 400.",
    },
  ],
  glosario: [
    { termino: "ILOE", definicion: "Involuntary Loss of Employment, the UAE unemployment insurance scheme." },
    { termino: "Subscription salary", definicion: "The basic salary used to work out the premium category and compensation." },
  ],
});
