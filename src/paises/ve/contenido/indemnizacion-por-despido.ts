import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.indemnizacion-por-despido",
  h1: "Calculadora de indemnización por despido en Venezuela",
  title: "Indemnización por despido injustificado en Venezuela",
  description:
    "Si te despiden sin causa y no pides el reenganche, cobras tus prestaciones sociales dos veces: una como prestaciones y otra como indemnización. Calcúlala aquí.",
  intro: [
    "En Venezuela, si te despiden sin una causa justificada y decides no pedir el reenganche, la empresa te debe una indemnización igual a tus prestaciones sociales. En la práctica cobras tus prestaciones dos veces.",
    "Lo mismo pasa si te retiras por una causa justificada (por ejemplo, si te bajan el salario o te maltratan) o si la relación termina por causas ajenas a tu voluntad.",
  ],
  comoSeCalcula: [
    "Primero calculamos tus prestaciones sociales: el mayor entre la garantía ({{ve.prestaciones-garantia-dias}} por trimestre más días adicionales) y el retroactivo ({{ve.prestaciones-retroactivo-dias}} por año con tu último salario integral).",
    "La indemnización es igual a ese monto.",
    "Sumamos las dos: es lo que cobras por prestaciones e indemnización.",
  ],
  ejemplo: ["Con $300 al mes y tres años justos, tus prestaciones estimadas dan $2.107,38. La indemnización es igual, así que cobras $4.214,76 entre las dos."],
  faq: [
    {
      pregunta: "¿Cuánto me pagan si me despiden sin justa causa?",
      respuesta: "Tus prestaciones sociales más una indemnización por el mismo monto. Además te pagan vacaciones, bono vacacional y utilidades pendientes.",
    },
    {
      pregunta: "¿Qué es el reenganche?",
      respuesta: "Pedir ante la Inspectoría del Trabajo que te devuelvan tu puesto y te paguen los salarios caídos. Si lo pides, no cobras esta indemnización: recuperas el trabajo.",
    },
    {
      pregunta: "¿Me toca si renuncio?",
      respuesta: "Si renuncias sin causa, no. Cobras tus prestaciones, pero no la indemnización. Si te retiras por una causa justificada del artículo 80 de la LOTTT, sí te toca.",
    },
    {
      pregunta: "¿Y si me despiden con causa justificada?",
      respuesta: "Cobras tus prestaciones sociales y lo demás que te deban, pero no la indemnización.",
    },
    {
      pregunta: "¿Hay preaviso en Venezuela?",
      respuesta: "La empresa no tiene que darte preaviso para despedirte, pero el despido sin causa le cuesta esta indemnización. El preaviso de la LOTTT es para quien renuncia.",
    },
  ],
  glosario: [
    { termino: "Indemnización", definicion: "Pago por el despido sin causa, igual a las prestaciones sociales (art. 92 de la LOTTT)." },
    { termino: "Prestaciones sociales", definicion: "El ahorro que la empresa acumula a tu nombre y te paga al terminar la relación." },
  ],
});
