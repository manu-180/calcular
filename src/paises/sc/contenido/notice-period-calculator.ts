import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.notice-period-calculator",
  h1: "Seychelles notice period calculator {{anio}}",
  title: "Seychelles notice period {{anio}}: {{sc.notice-months-standard}} month by law",
  description: "The Employment Act sets {{sc.notice-months-standard}} month of notice for most workers, {{sc.notice-days-probation}} days on probation and {{sc.notice-days-casual}} day for casual workers.",
  intro: [
    "Under the Employment Act both the employer and the worker give the same notice. A Seychellois worker on a regular contract gives or receives {{sc.notice-months-standard}} month.",
    "Pick the type of worker and the day the notice is given. The calculator shows the last day and the pay that replaces the notice.",
  ],
  comoSeCalcula: [
    "A worker on a regular contract needs {{sc.notice-months-standard}} month of notice.",
    "A worker on probation needs {{sc.notice-days-probation}} days and a casual worker needs {{sc.notice-days-casual}} day.",
    "Notice can be paid instead of worked. The payment matches the period, or the part of it that is not worked.",
  ],
  ejemplo: [
    "Notice is given on 2 November 2026 to a worker earning SCR 20,000 a month. The month of notice ends on 1 December 2026. If the employer pays in lieu, the payment is SCR 20,000.",
  ],
  faq: [
    {
      pregunta: "Does the same notice apply to a non-Seychellois worker?",
      respuesta: "No. Sections 59(d) and 60(1)(d) say a non-Seychellois worker is given the notice stated in the contract, or one month where the contract does not state one.",
    },
    {
      pregunta: "How long can probation last?",
      respuesta: "Section 70 says an employer cannot keep a worker on probation for more than 6 months without the competent officer's authorisation.",
    },
    {
      pregunta: "Can a worker leave without giving notice?",
      respuesta: "A worker other than a casual worker can, where the employer is in breach of the contract or the Act and the breach justifies it (section 60(2)). The worker must tell the employer in writing and ask for a certificate of employment.",
    },
  ],
  glosario: [
    { termino: "Notice", definicion: "Advance warning that a contract of employment will end." },
    { termino: "Payment in lieu", definicion: "Money paid instead of working the notice period." },
    { termino: "Competent officer", definicion: "The labour official who oversees the negotiation procedure and approves terminations." },
  ],
});
