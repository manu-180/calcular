import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.minimum-wage-in-nepal",
  h1: "Minimum wage in Nepal {{anio}}",
  title: "Minimum wage in Nepal {{anio}}: monthly, daily and hourly",
  description: "The current minimum remuneration in Nepal: {{np.minimum-wage[month-basic]}} basic pay plus {{np.minimum-wage[month-allowance]}} dearness allowance a month. Compare your own pay.",
  intro: [
    "The Ministry of Labour, Employment and Social Security set the minimum remuneration that has applied since {{np.minimum-wage#desde}}. It is made up of basic pay and a dearness allowance, and the two together are the legal minimum.",
    "Enter your own monthly pay to see whether it reaches the minimum. The monthly, daily and hourly figures come straight from the Ministry's table.",
  ],
  comoSeCalcula: [
    "Monthly: basic pay of {{np.minimum-wage[month-basic]}} plus a dearness allowance of {{np.minimum-wage[month-allowance]}}.",
    "Daily: {{np.minimum-wage[day-basic]}} basic plus {{np.minimum-wage[day-allowance]}} allowance. Hourly: {{np.minimum-wage[hour-basic]}} basic plus {{np.minimum-wage[hour-allowance]}} allowance. Part-time workers have a single hourly minimum of {{np.minimum-wage[part-time-hour]}}.",
    "The figures apply to every worker except those on tea estates. The Labour Act, 2074, requires the Ministry to review the minimum every two years, so a new figure is due about two years after the current one took effect.",
  ],
  ejemplo: ["A full-time worker earning NPR 18,000 a month is NPR 1,550 below the minimum of NPR 19,550. The employer has to raise the pay at least to the minimum."],
  faq: [
    {
      pregunta: "What is the minimum wage in Nepal?",
      respuesta: "NPR 19,550 a month, made up of NPR 12,170 basic pay and NPR 7,380 dearness allowance, from 1 Shrawan 2082 (17 July 2025), according to the Ministry of Labour press release.",
    },
    {
      pregunta: "Does the minimum include allowances?",
      respuesta: "The Ministry's table adds a dearness allowance of NPR 7,380 to basic pay of NPR 12,170, and the total of NPR 19,550 is the minimum a month.",
    },
    {
      pregunta: "How often is the minimum reviewed?",
      respuesta: "Section 106 of the Labour Act, 2074, tells the Ministry to set the minimum remuneration on the advice of a committee every two years.",
    },
  ],
  glosario: [
    { termino: "Dearness allowance", definicion: "A fixed allowance added to basic pay to offset living costs. It counts toward the minimum." },
    { termino: "Remuneration", definicion: "Basic pay plus allowances. The minimum is set on this total." },
  ],
});
