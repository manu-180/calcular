import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.zakat-calculator",
  h1: "Zakat calculator Pakistan",
  title: "Zakat calculator 2026 with the official nisab",
  description: "Work out zakat at {{pk.zakat-rate}} on your cash, gold, silver and savings, with the official nisab of {{pk.nisab}} for Zakat Year 1446-1447.",
  intro: [
    "Add up your cash, bank balances, gold, silver and investments, take off what you owe, and see whether you reach the nisab and how much zakat to pay.",
  ],
  comoSeCalcula: [
    "Zakatable wealth is your assets minus the debts you owe now.",
    "If it is at or above the nisab of {{pk.nisab}}, zakat is {{pk.zakat-rate}} of it.",
    "The nisab is the one notified by the Administrator General Zakat for Zakat Year 1446-1447 A.H.",
  ],
  ejemplo: ["With Rs. 600,000 in the bank and no debts, zakat is Rs. 15,000."],
  faq: [
    {
      pregunta: "Does my bank deduct zakat automatically?",
      respuesta: "Savings and profit-and-loss sharing accounts with a balance at or above the nisab on the first day of Ramazan have zakat deducted at source, unless you are exempt under the Zakat and Ushr Ordinance. Current accounts are not included.",
    },
    {
      pregunta: "Who sets the nisab?",
      respuesta: "The Administrator General Zakat notifies it for each zakat year. For Zakat Year 1446-1447 it is {{pk.nisab}}.",
    },
    {
      pregunta: "Is this calculator a religious ruling?",
      respuesta: "No. It applies the official rate and nisab. For your own situation, ask a scholar you trust.",
    },
  ],
  glosario: [
    { termino: "Nisab", definicion: "The minimum wealth on which zakat becomes due." },
    { termino: "Zakat year", definicion: "The year that runs from one first of Ramazan to the next for deduction at source." },
  ],
});
