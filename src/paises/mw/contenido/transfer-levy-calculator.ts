import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.transfer-levy-calculator",
  h1: "Mobile money and bank transfer levy calculator",
  title: "Mobile money levy Malawi: 0.05% transfer levy",
  description:
    "Work out the {{mw.transfer-levy-rate}} levy on mobile money transfers above {{mw.transfer-levy-threshold}} and on every bank transfer, in force since 30 December 2025.",
  intro: [
    "Enter how much you are sending and how, and see the levy that comes on top.",
    "The levy was introduced by the Taxation (Amendment) Act 2025 and is paid by the sender.",
  ],
  comoSeCalcula: [
    "Mobile money: transfers above {{mw.transfer-levy-threshold}} pay {{mw.transfer-levy-rate}} of the amount sent. Smaller transfers pay nothing.",
    "Bank transfers: every transfer through a bank's electronic system pays {{mw.transfer-levy-rate}} of the amount.",
  ],
  ejemplo: ["Sending MK 250,000 by mobile money costs MK 125 of levy. Sending MK 50,000 by bank costs MK 25."],
  faq: [
    {
      pregunta: "Who pays the levy, the sender or the receiver?",
      respuesta: "The sender. The MRA notice says the levy is payable by the sender on the transaction amount.",
    },
    {
      pregunta: "Is a mobile money transfer of exactly MK 100,000 charged?",
      respuesta: "No. Only mobile money transfers in excess of {{mw.transfer-levy-threshold}} are charged.",
    },
    {
      pregunta: "Does the levy include the operator's fee?",
      respuesta: "No. The levy is worked out on the amount you send. Your mobile money operator or bank may charge its own fee as well.",
    },
  ],
  glosario: [
    { termino: "Levy", definicion: "A charge set by law and collected for the government." },
    { termino: "Mobile money operator", definicion: "A company that runs a mobile money service." },
  ],
});
