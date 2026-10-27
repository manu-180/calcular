import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.severance-pay-calculator",
  h1: "Severance pay calculator Ethiopia",
  title: "Severance pay calculator Ethiopia 2026",
  description:
    "Work out severance pay under Articles 39 to 41 of the Labour Proclamation, with the extra pay for closure, redundancy or leaving because of the employer.",
  intro: [
    "When a job ends for one of the reasons in Article 39 of the Labour Proclamation, the worker is owed severance pay. Some reasons add compensation on top. Enter your salary, your years of service and why the job ended.",
  ],
  comoSeCalcula: [
    "First year of service: {{et.severance-first-year}} of wages. With less than a year, a proportional part.",
    "Each additional completed year adds one third of the first-year amount. Part of a year after the first is not counted here.",
    "Severance pay may not exceed {{et.severance-cap}} of wages.",
    "Closure of the business or a reduction of workforce adds {{et.severance-closure-extra}} of wages. Leaving without notice because of the employer adds {{et.compensation-no-notice}}, or {{et.compensation-harassment}} in a case of sexual harassment or violence.",
    "For a monthly salary the calculator takes a day's wage as the salary divided by 30, so 30 days' wages equal one month.",
  ],
  ejemplo: [
    "A worker on ETB 9,000 made redundant after five years gets 70 days of severance (ETB 21,000) plus 60 days (ETB 18,000): ETB 39,000 in total.",
  ],
  faq: [
    {
      pregunta: "Who has a right to severance pay?",
      respuesta: "A worker who has finished probation and is not eligible for a pension, when the job ends for a reason listed in Article 39: closure, redundancy, unlawful dismissal, disability, the employer's misconduct, or resignation after at least {{et.severance-min-years-resign}} years.",
    },
    {
      pregunta: "Do I get severance if I resign?",
      respuesta: "Only after at least {{et.severance-min-years-resign}} years of service and if you have no training commitment to serve the employer. The same applies when the job ends because of sickness or death.",
    },
    {
      pregunta: "What if the worker dies before being paid?",
      respuesta: "The severance pay goes to the worker's dependants.",
    },
    {
      pregunta: "Can a labour tribunal award more?",
      respuesta: "Yes. In an unlawful dismissal the tribunal can order reinstatement or compensation on top of severance pay. This calculator does not estimate that amount.",
    },
  ],
  glosario: [
    { termino: "Severance pay", definicion: "The payment owed under Article 40 when employment ends for a reason in Article 39." },
    { termino: "Reduction of workforce", definicion: "Termination of a number of workers for the reasons in Article 28(3), as defined in Article 29." },
  ],
});
