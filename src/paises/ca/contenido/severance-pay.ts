import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.severance-pay",
  h1: "Severance pay calculator for Ontario and federal jobs",
  title: "Severance pay calculator: Ontario ESA and Canada Labour Code",
  description: "Calculate the minimum severance pay under Ontario's ESA (1 week per year, up to 26) or the Canada Labour Code (2 days per year, at least 5 days).",
  intro: [
    "Severance pay compensates long-serving employees whose job ends. It is separate from notice or termination pay and paid on top of it.",
    "Enter your years and months of service and your regular weekly wages to see the legal minimum.",
  ],
  comoSeCalcula: [
    "Ontario: you need at least {{ca.severance-on[min-years]}} years of service and an employer with a payroll of $2.5 million or more (or a closure that ends 50 or more jobs in six months). You get {{ca.severance-on[weeks-per-year]}} week of regular wages per year of service, counting extra months as a fraction, up to {{ca.severance-on[max-weeks]}} weeks.",
    "Canada Labour Code: after {{ca.severance-federal[min-months]}} consecutive months you get {{ca.severance-federal[days-per-year]}} days of wages per full year of service, or {{ca.severance-federal[min-days]}} days if that is more.",
    "Days of wages are your weekly wages divided by the days you normally work in a week.",
  ],
  ejemplo: ["In Ontario, 8 years and 9 months at $1,200 a week gives 8.75 weeks of severance: $10,500."],
  faq: [
    {
      pregunta: "Do I get severance if I quit?",
      respuesta: "No. Severance pay is owed when the employer ends the job, not when you resign.",
    },
    {
      pregunta: "Does BC or Alberta have severance pay?",
      respuesta: "Their employment standards have compensation for length of service or termination pay instead, which works like notice. Use the termination pay calculator for those provinces.",
    },
    {
      pregunta: "Is this all I can get?",
      respuesta: "It is the minimum under employment standards. Your contract may give you more.",
    },
  ],
  glosario: [
    { termino: "Severance pay", definicion: "A lump sum owed to some employees when their job ends, based on years of service." },
    { termino: "Regular wages", definicion: "Your pay for a normal work week, without overtime." },
  ],
});
