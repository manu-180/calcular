import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.periodo-de-prueba",
  h1: "Calculadora del período de prueba en Ecuador",
  title: "Período de prueba en Ecuador: calcula cuándo termina",
  description: "Calcula el último día de tu período de prueba: hasta {{ec.periodo-prueba-dias}} en un contrato indefinido y {{ec.periodo-prueba-domestico-dias}} en el trabajo del hogar.",
  intro: [
    "El período de prueba es el tiempo al inicio de un contrato indefinido en el que tú o tu empleador pueden terminar la relación sin indemnización.",
    "Pon tu primer día de trabajo y te decimos hasta cuándo dura la prueba y cuántos días te quedan.",
  ],
  comoSeCalcula: [
    "En un contrato indefinido que se firma por primera vez, la prueba dura como máximo {{ec.periodo-prueba-dias}}.",
    "En el trabajo remunerado del hogar, el máximo es {{ec.periodo-prueba-domestico-dias}}.",
    "Se cuentan días corridos desde tu primer día de trabajo, ese día incluido.",
  ],
  ejemplo: ["Si empezaste el 1 de octubre de 2026 con un contrato indefinido, la prueba termina el 29 de diciembre de 2026."],
  faq: [
    {
      pregunta: "¿Cuánto dura el período de prueba en Ecuador?",
      respuesta: "Hasta {{ec.periodo-prueba-dias}} en un contrato indefinido y hasta {{ec.periodo-prueba-domestico-dias}} en el trabajo del hogar.",
    },
    {
      pregunta: "¿Me pueden despedir durante la prueba?",
      respuesta: "Sí. Durante la prueba cualquiera de las dos partes puede terminar el contrato libremente, sin indemnización por despido. Igual te pagan los días trabajados y los proporcionales.",
    },
    {
      pregunta: "¿Pueden ponerme otro período de prueba?",
      respuesta: "No. Con el mismo empleador solo puede haber un período de prueba, sea cual sea el tipo de contrato.",
    },
    {
      pregunta: "¿Tengo seguro del IESS durante la prueba?",
      respuesta: "Sí. Te tienen que afiliar desde el primer día de trabajo.",
    },
  ],
  glosario: [
    { termino: "Período de prueba", definicion: "Los primeros días de un contrato indefinido en los que se puede terminar sin indemnización." },
    { termino: "Contrato indefinido", definicion: "El contrato que no tiene fecha de fin. Es el contrato común en Ecuador." },
  ],
});
