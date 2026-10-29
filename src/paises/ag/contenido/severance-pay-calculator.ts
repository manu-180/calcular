import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.severance-pay-calculator",
  h1: "Severance pay calculator Antigua and Barbuda {{anio}}",
  title: "Severance pay calculator {{anio}}: redundancy pay",
  description: "Work out the minimum severance pay under the Labour Code: {{ag.severance-days-per-month}} day of basic wage for each month of service after the first year.",
  intro: [
    "Enter your latest basic pay and your length of service. The calculator shows the minimum severance pay due if your employer ends your job for redundancy.",
    "Part 4 of Division C of the Antigua and Barbuda Labour Code gives severance pay to an employee whose service has exceeded {{ag.severance-min-years}} year when the employer ends the job for reasons of redundancy.",
  ],
  comoSeCalcula: [
    "Section C41 says severance pay is at least {{ag.severance-days-per-month}} day's pay at the latest basic wage for each month, or major fraction of a month, of service with the employer and any predecessor employer.",
    "Turn your monthly pay into a day's pay by dividing it by the working days in your pay month, then multiply by the months of service.",
    "Section C42 requires the employer to pay it at the moment the job ends. Section C44 removes it where the employer goes out of business and a successor offers the same job without a break.",
  ],
  ejemplo: [
    "An employee earning EC$3,300 a month on a 22-day month has 5 years of service. A day's pay is EC$150 and 60 months count, so the minimum severance pay is EC$9,000.",
  ],
  faq: [
    {
      pregunta: "Who gets severance pay?",
      respuesta: "An employee whose service with the employer and its predecessors has exceeded one year and whose job is ended for reasons of redundancy, under section C40 of the Labour Code.",
    },
    {
      pregunta: "How is severance pay worked out?",
      respuesta: "At least {{ag.severance-days-per-month}} day's pay at the latest basic wage for each month or major fraction of a month of service, under section C41.",
    },
    {
      pregunta: "When must it be paid?",
      respuesta: "At the same time as the employment ends, under section C42(1). Interest is payable on late severance pay.",
    },
  ],
  glosario: [
    { termino: "Redundancy", definicion: "A job that ends because the employer no longer needs it, not because of the employee's conduct." },
    { termino: "Major fraction", definicion: "More than half of a month, counted as a full month for severance." },
    { termino: "Predecessor employer", definicion: "A former owner of the business whose service counts toward yours." },
  ],
});
