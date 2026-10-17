import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.stamp-duty-on-transfers",
  h1: "Stamp duty on bank transfers",
  title: "{{ng.stamp-duty-transfer}} stamp duty on transfers: how much you pay",
  description:
    "See how much stamp duty you pay on electronic transfers: a fixed {{ng.stamp-duty-transfer}} on transfers of {{ng.stamp-duty-transfer-threshold}} or more, with the exemptions.",
  intro: [
    "Under the Nigeria Tax Act, 2025, an electronic transfer or receipt of money carries a fixed stamp duty of {{ng.stamp-duty-transfer}}. Enter your usual transfers to see what it adds up to.",
  ],
  comoSeCalcula: [
    "The duty is a fixed {{ng.stamp-duty-transfer}} per transfer, paid by the person who sends the money.",
    "Transfers below {{ng.stamp-duty-transfer-threshold}} are exempt, and so are transfers for salary payment and transfers between your own accounts in the same bank.",
  ],
  ejemplo: ["Twenty transfers of ₦50,000 in a month cost ₦1,000 in stamp duty, or ₦12,000 a year."],
  faq: [
    {
      pregunta: "Who pays the stamp duty?",
      respuesta: "For an electronic transfer, the person sending the money.",
    },
    {
      pregunta: "Is a transfer of exactly ₦10,000 charged?",
      respuesta: "Yes. Only transfers below {{ng.stamp-duty-transfer-threshold}} are exempt.",
    },
    {
      pregunta: "Do I pay it when I move money between my own accounts?",
      respuesta: "Not if both accounts are in the same bank. Moving money to your own account in another bank is not listed as exempt.",
    },
  ],
  glosario: [
    { termino: "Stamp duty", definicion: "A tax charged on documents and transactions, here a fixed amount per transfer." },
    { termino: "Intra-bank transfer", definicion: "A transfer between accounts at the same bank." },
  ],
});
