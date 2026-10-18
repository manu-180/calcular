import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.casual-worker-tax",
  h1: "Casual worker tax calculator",
  title: "Tax on casual workers in Ghana ({{gh.casual-worker-rate}})",
  description: "When you pay a casual worker in Ghana, deduct {{gh.casual-worker-rate}} tax and pay it to the GRA. See the tax and the net amount to pay.",
  intro: [
    "Payments to casual workers are not taxed with the PAYE bands. The payer deducts a flat {{gh.casual-worker-rate}} and pays it to the GRA.",
  ],
  comoSeCalcula: ["Tax to deduct: {{gh.casual-worker-rate}} of the payment. The worker receives the rest."],
  ejemplo: ["On a payment of GH₵1,000, deduct GH₵50 and pay the worker GH₵950."],
  faq: [
    {
      pregunta: "Who is a casual worker?",
      respuesta: "A worker engaged on seasonal or intermittent work, not for a continuous period of more than six months, whose pay is calculated daily, as defined in the Labour Act, 2003 (Act 651).",
    },
    {
      pregunta: "How are temporary workers taxed?",
      respuesta: "A resident temporary worker is taxed like any other employee, with the PAYE bands.",
    },
    {
      pregunta: "Who pays the tax to the GRA?",
      respuesta: "The person who makes the payment deducts the tax and pays it to the Ghana Revenue Authority.",
    },
  ],
  glosario: [{ termino: "Temporary worker", definicion: "A worker employed for a continuous period of at least one month who is not permanent or seasonal." }],
});
