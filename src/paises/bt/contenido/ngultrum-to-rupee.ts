import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.ngultrum-to-rupee",
  h1: "Ngultrum to rupee converter",
  title: "Ngultrum to Indian rupee: pegged at par, {{bt.inr-per-btn}} to 1",
  description: "Convert ngultrum to Indian rupees and back. The Royal Monetary Authority keeps the ngultrum pegged to the rupee at par: {{bt.inr-per-btn}}. Enter an amount.",
  intro: [
    "One ngultrum is worth one Indian rupee. The Royal Monetary Authority of Bhutan describes this in its Monetary Policy Statement 2026 as the longstanding peg of the ngultrum to the Indian rupee at par.",
    "Enter an amount to convert it. The number stays the same, at a rate of {{bt.inr-per-btn}}, and the calculator shows it so you can see it plainly.",
  ],
  comoSeCalcula: [
    "Multiply ngultrum by {{bt.inr-per-btn}} to get rupees, or divide rupees by {{bt.inr-per-btn}} to get ngultrum.",
    "Because the rupee floats against other currencies, the ngultrum moves with it against the dollar. See the dollar to ngultrum calculator for that rate.",
  ],
  ejemplo: ["Nu. 1,000 is Rs 1,000. If you carry Rs 2,500 across the border at Phuentsholing, it is worth Nu. 2,500 in Bhutan. A bank or money changer may charge its own fee, which is not part of this rate."],
  faq: [
    {
      pregunta: "Is the ngultrum the same value as the Indian rupee?",
      respuesta: "Yes. The Royal Monetary Authority states the ngultrum is pegged to the Indian rupee at par (Monetary Policy Statement 2026).",
    },
    {
      pregunta: "Why does the ngultrum fall against the dollar when the rupee does?",
      respuesta: "The RMA explains that the rupee follows a managed float against the main international currencies, and the ngultrum tracks those moves under the peg.",
    },
    {
      pregunta: "Can I exchange rupee cash at the RMA?",
      respuesta: "The RMA has a separate service and forms for Indian rupee cash exchange, for individuals and for exporters. Check its website for the current conditions.",
    },
  ],
  glosario: [
    { termino: "Ngultrum (Nu.)", definicion: "The currency of Bhutan, issued by the Royal Monetary Authority." },
    { termino: "Peg", definicion: "A fixed exchange rate between one currency and another." },
    { termino: "At par", definicion: "At a rate of one to one." },
  ],
});
