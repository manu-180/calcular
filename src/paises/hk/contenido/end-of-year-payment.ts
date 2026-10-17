import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.end-of-year-payment",
  h1: "End of year payment calculator Hong Kong",
  title: "Double pay and end of year payment Hong Kong",
  description:
    "Check your end of year payment (double pay or 13th month) under the Employment Ordinance, with the pro rata amount if you joined or were dismissed.",
  intro: [
    "If your contract gives an end of year payment, such as double pay or a 13th month, the Employment Ordinance protects it.",
    "Enter the amount in your contract (or your monthly wages) and your situation to see what you're owed.",
  ],
  comoSeCalcula: [
    "If you worked the whole payment period, you get the amount in your contract. If it doesn't say, you get your average monthly wages over the last 12 months.",
    "If you joined during the period and are still employed at its end, or were dismissed (not for serious misconduct), you get a pro rata amount once you have at least 3 months in the period.",
    "Up to 3 months of probation don't count towards those 3 months, but once you qualify the whole time worked counts.",
  ],
  ejemplo: ["With double pay of $24,000 and 8 months worked before a dismissal, the pro rata payment is $16,000."],
  faq: [
    {
      pregunta: "Is double pay required by law in Hong Kong?",
      respuesta: "No. The law protects it only when your contract provides for it. A bonus paid at the employer's discretion isn't covered.",
    },
    {
      pregunta: "What is the payment period if my contract doesn't say?",
      respuesta: "The lunar year.",
    },
    {
      pregunta: "Do I get a pro rata payment if I resign?",
      respuesta: "Not under the Employment Ordinance. It's only for people still employed after the payment period or dismissed for reasons other than serious misconduct.",
    },
    {
      pregunta: "When is it paid?",
      respuesta: "On the day set in the contract, or else on the last day of the payment period or within 7 days after it. If your job ends early and you qualify, within 7 days of the end.",
    },
  ],
  glosario: [
    { termino: "End of year payment", definicion: "An annual payment of a contractual nature, such as double pay, a 13th month or an end of year bonus." },
    { termino: "Payment period", definicion: "The period the payment covers: the one in your contract, or the lunar year." },
  ],
});
