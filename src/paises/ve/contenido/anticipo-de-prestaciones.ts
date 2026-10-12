import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.anticipo-prestaciones",
  h1: "Calculadora de anticipo de prestaciones sociales",
  title: "Anticipo de prestaciones sociales: hasta el {{ve.anticipo-prestaciones-tope}}",
  description:
    "Calcula cuánto puedes pedir como anticipo de tus prestaciones sociales: hasta el {{ve.anticipo-prestaciones-tope}} de la garantía depositada, menos lo que ya adelantaste.",
  intro: [
    "Mientras trabajas puedes pedir un adelanto de tus prestaciones sociales. La ley lo permite hasta el {{ve.anticipo-prestaciones-tope}} de lo depositado como garantía.",
    "Escribe tu garantía y los anticipos que ya recibiste. Te decimos cuánto puedes pedir hoy.",
  ],
  comoSeCalcula: [
    "Tope: {{ve.anticipo-prestaciones-tope}} de la garantía depositada.",
    "Anticipo disponible: el tope menos los anticipos que ya recibiste.",
    "Lo que adelantes se descuenta de tus prestaciones al final de la relación.",
  ],
  ejemplo: ["Con $1.000 de garantía y sin anticipos previos puedes pedir hasta $750."],
  faq: [
    {
      pregunta: "¿Para qué puedo pedir un anticipo de prestaciones?",
      respuesta: "Para comprar, construir, mejorar o reparar tu vivienda, liberar una hipoteca, pagar estudios o atención médica tuya o de tu familia.",
    },
    {
      pregunta: "¿Cuánto puedo pedir?",
      respuesta: "Hasta el {{ve.anticipo-prestaciones-tope}} de lo depositado como garantía. Si ya pediste antes, se descuenta de ese tope.",
    },
    {
      pregunta: "¿Dónde veo cuánto tengo de garantía?",
      respuesta: "En el estado de cuenta de tu fideicomiso o en el informe que la empresa te debe dar cada trimestre.",
    },
    {
      pregunta: "¿Y si la empresa lleva mis prestaciones en su contabilidad?",
      respuesta: "En ese caso la empresa te tiene que dar un crédito o un aval por el saldo a tu favor, para los mismos fines.",
    },
  ],
  glosario: [
    { termino: "Anticipo", definicion: "Adelanto de las prestaciones mientras sigue la relación de trabajo (art. 144 de la LOTTT)." },
    { termino: "Garantía", definicion: "Lo que la empresa deposita cada trimestre a tu nombre como prestaciones." },
  ],
});
