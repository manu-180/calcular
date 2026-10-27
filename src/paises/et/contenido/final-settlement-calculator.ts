import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.final-settlement-calculator",
  h1: "Final settlement calculator Ethiopia",
  title: "Final settlement calculator Ethiopia: what you are owed",
  description:
    "Add up everything owed when a job ends in Ethiopia: severance pay, compensation, pay for leave not taken and salary still unpaid, under the Labour Proclamation.",
  intro: [
    "When your employment ends you may be owed several amounts at once. Enter your salary, service, the reason the job ended and your untaken leave to see the full final settlement.",
  ],
  comoSeCalcula: [
    "Severance pay and any compensation follow Articles 39 to 41 of the Labour Proclamation, as in our severance pay calculator.",
    "Leave not taken is paid when the contract ends (Article 77(4)). Each day is valued at your monthly salary divided by the working days in your month.",
    "Unpaid salary for the last month is the monthly salary divided by 30 for each day worked and not yet paid.",
  ],
  ejemplo: [
    "Made redundant after five years on ETB 9,000, with 10 leave days and 12 unpaid days: ETB 21,000 severance, ETB 18,000 extra, ETB 3,461.54 for leave and ETB 3,600 of salary, ETB 46,061.54 in total.",
  ],
  faq: [
    {
      pregunta: "Is untaken leave always paid when I leave?",
      respuesta: "Yes. A worker whose contract ends is entitled to pay for the annual leave not taken, whatever the reason the job ended.",
    },
    {
      pregunta: "Is tax taken from the final settlement?",
      respuesta: "Salary and leave pay are employment income. Ask your employer how the severance part is taxed, since this calculator shows gross amounts.",
    },
    {
      pregunta: "What if I am still on probation?",
      respuesta: "Severance pay is only for workers who have completed probation. A worker on probation may also leave without notice.",
    },
  ],
  glosario: [
    { termino: "Final settlement", definicion: "Everything the employer pays when employment ends." },
    { termino: "Probation", definicion: "A trial period agreed in writing, of up to {{et.probation-days}}, counted in working days." },
  ],
});
