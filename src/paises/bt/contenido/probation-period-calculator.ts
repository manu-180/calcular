import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.probation-period-calculator",
  h1: "Probation period calculator Bhutan",
  title: "Probation period in Bhutan: end date and notice",
  description: "Find when your probation ends in Bhutan. The Act allows up to {{bt.probation-max-days}} and {{bt.probation-notice-days}} of notice. Enter your start date.",
  intro: [
    "A contract of employment in Bhutan can include a probation period of up to {{bt.probation-max-days}}. During it, either side can end the contract with {{bt.probation-notice-days}} of notice.",
    "The rule is in section 72 of the Labour and Employment Act of Bhutan 2007. Enter your start date and the probation in your contract to see the last day.",
  ],
  comoSeCalcula: [
    "Probation is only allowed in a contract of {{bt.probation-min-contract-months}} or more. A shorter contract has none.",
    "The probation in your contract counts up to a maximum of {{bt.probation-max-days}}. Anything longer is cut back to that limit.",
    "We count your first day of work as day one, so the last day is the start date plus the probation days minus one.",
    "An employer may not make you repeat probation for the same work or for materially similar work (section 73).",
  ],
  ejemplo: [
    "You start on 1 March 2026 on a two-year contract with 180 days of probation. Counting 1 March as day one, probation ends on 27 August 2026. If you leave before then, you give {{bt.probation-notice-days}} of notice.",
  ],
  faq: [
    {
      pregunta: "How long can probation last in Bhutan?",
      respuesta: "Up to {{bt.probation-max-days}}, and only in a contract of {{bt.probation-min-contract-months}} or more (section 72 of the Labour and Employment Act of Bhutan 2007).",
    },
    {
      pregunta: "How much notice applies during probation?",
      respuesta: "{{bt.probation-notice-days}}, for either party. After probation the normal minimum of 30 days in section 68 applies.",
    },
    {
      pregunta: "Can my employer extend my probation?",
      respuesta: "Section 73 says an employer shall not require an employee to repeat a probationary period for the same or materially similar work. Sections 72 and 73 do not apply to a training agreement (section 74).",
    },
  ],
  glosario: [
    { termino: "Probation", definicion: "A trial period at the start of a contract during which either side may leave on short notice." },
    { termino: "Training agreement", definicion: "A contract made to train a person. The probation sections do not apply to it." },
  ],
});
