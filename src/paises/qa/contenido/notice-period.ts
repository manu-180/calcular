import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.notice-period",
  h1: "Notice period calculator for Qatar",
  title: "Notice period in Qatar: how long and what it costs",
  description:
    "Check your notice period under the Qatar Labour Law: {{qa.notice[first-years]}} in the first two years and {{qa.notice[later-years]}} after that, and the pay in lieu.",
  intro: [
    "After probation, either side can end an employment contract without giving a reason, as long as they give written notice.",
    "Enter your years of service to see the notice period and what is owed if it isn't worked.",
  ],
  comoSeCalcula: [
    "Notice is {{qa.notice[first-years]}} during the first two years of service and {{qa.notice[later-years]}} once you've worked more than {{qa.notice-threshold}}.",
    "If the contract ends without that notice, whoever ended it pays the other side the basic salary for the notice period or the part not worked.",
    "This calculator counts 30 days a month and pays each missing day at the monthly basic salary ÷ 30.",
  ],
  ejemplo: [
    "With 3 years of service and a basic salary of QAR 9,000, the notice is two months. Ending the contract without notice costs QAR 18,000.",
  ],
  faq: [
    {
      pregunta: "Is the notice the same for the worker and the employer?",
      respuesta: "Yes. The Labour Law sets the same periods for whichever side ends the contract.",
    },
    {
      pregunta: "Am I paid during my notice period?",
      respuesta: "Yes. If you keep working normally, the employer pays your full wage for the notice period.",
    },
    {
      pregunta: "What happens if an expatriate leaves Qatar without serving notice?",
      respuesta: "The law says they can't be given a new work permit for one year from the date they left.",
    },
  ],
  glosario: [
    { termino: "Pay in lieu of notice", definicion: "The basic salary for the notice period that wasn't given or worked." },
  ],
});
