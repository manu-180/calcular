import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.periodo-de-prueba",
  h1: "Período de prueba en Costa Rica",
  title: "Período de prueba en Costa Rica: cuándo termina",
  description:
    "Calcule cuándo termina su período de prueba de {{cr.periodo-prueba-meses}} y desde qué día ya tiene derecho a preaviso y cesantía.",
  intro: [
    "En Costa Rica, durante los primeros {{cr.periodo-prueba-meses}} de trabajo el contrato se puede terminar sin preaviso ni cesantía. Es lo que la gente llama período de prueba.",
    "Escriba su fecha de ingreso y le mostramos cuándo termina.",
  ],
  comoSeCalcula: [
    "Se cuentan {{cr.periodo-prueba-meses}} desde el día en que empezó a trabajar.",
    "El día siguiente ya cuenta como trabajo continuo de más de tres meses: desde ahí corresponden preaviso y, si lo despiden sin justa causa, cesantía.",
  ],
  ejemplo: ["Si entró el 12 de octubre de 2026, su período de prueba termina el 11 de enero de 2027."],
  faq: [
    {
      pregunta: "¿Cuánto dura el período de prueba?",
      respuesta: "{{cr.periodo-prueba-meses}}. En trabajo doméstico la ley lo dice expresamente; en los demás contratos sale de los artículos 28 y 29, que dan preaviso y cesantía a partir de los tres meses.",
    },
    {
      pregunta: "¿Me pagan algo si me despiden en el período de prueba?",
      respuesta: "No le corresponden preaviso ni cesantía, pero sí el salario de los días trabajados, las vacaciones proporcionales y el aguinaldo proporcional.",
    },
    {
      pregunta: "¿Se puede pactar un período de prueba más largo?",
      respuesta: "No. Los derechos del Código de Trabajo no se pueden reducir por contrato.",
    },
  ],
  glosario: [{ termino: "Período de prueba", definicion: "Los primeros meses del contrato, en los que se puede terminar sin preaviso ni cesantía." }],
});
