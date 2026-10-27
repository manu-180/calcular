import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.maternity-leave-calculator",
  h1: "Maternity leave calculator Ethiopia",
  title: "Maternity leave calculator Ethiopia: dates and pay",
  description:
    "Plan your maternity leave: {{et.maternity-prenatal}} of paid prenatal leave and {{et.maternity-postnatal}} after the birth under the Labour Proclamation 1156/2019.",
  intro: [
    "A pregnant worker in Ethiopia has a right to paid leave before and after the birth. Enter the expected date of birth to see when the leave starts and ends.",
  ],
  comoSeCalcula: [
    "Prenatal leave: {{et.maternity-prenatal}} in a row with pay, ending on the expected date of birth.",
    "Postnatal leave: {{et.maternity-postnatal}} in a row with pay. The calculator counts them from the day after the expected date.",
    "The salary shown is your monthly salary divided by 30 for each day of leave.",
  ],
  ejemplo: [
    "With a baby expected on 1 March 2027, prenatal leave starts on 30 January 2027 and postnatal leave runs to 30 May 2027.",
  ],
  faq: [
    {
      pregunta: "What if the baby comes late?",
      respuesta: "If you have not given birth by the end of prenatal leave, you are entitled to more leave until the birth, on a doctor's recommendation.",
    },
    {
      pregunta: "What if the baby comes early?",
      respuesta: "If the birth happens before prenatal leave ends, the {{et.maternity-postnatal}} of postnatal leave start then.",
    },
    {
      pregunta: "Can I be dismissed while pregnant?",
      respuesta: "No. An employer may not end the contract during pregnancy and until four months after the birth, except for the reasons in Article 87(7) that have nothing to do with the pregnancy.",
    },
    {
      pregunta: "How much leave does the father get?",
      respuesta: "A male employee is entitled to {{et.paternity-leave}} of paternity leave in a row with full pay.",
    },
  ],
  glosario: [
    { termino: "Prenatal leave", definicion: "Paid leave before the birth." },
    { termino: "Postnatal leave", definicion: "Paid leave after the birth." },
  ],
});
