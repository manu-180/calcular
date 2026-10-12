import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.periodo-de-prueba",
  h1: "Calculadora del período de prueba en Panamá",
  title: "Período de prueba en Panamá: cuándo termina el tuyo",
  description:
    "En Panamá el período de prueba dura como máximo {{pa.periodo-prueba-meses}} y tiene que estar en el contrato escrito. Calcula el último día de tu prueba y cuántos días faltan.",
  intro: [
    "El período de prueba permite que tú o el empleador terminen la relación sin pagar indemnización. Dura como máximo {{pa.periodo-prueba-meses}} y solo vale si está escrito en el contrato.",
    "Escribe tu primer día de trabajo y te decimos cuándo termina la prueba y cuántos días te quedan.",
  ],
  comoSeCalcula: [
    "Trabajo en general: desde el primer día, {{pa.periodo-prueba-meses}} como máximo.",
    "Trabajo doméstico: las primeras {{pa.periodo-prueba-domestico-semanas}} semanas.",
    "Si el contrato pacta un plazo menor, vale el del contrato.",
  ],
  ejemplo: ["Si empezaste el 1 de octubre de 2026, tu prueba termina el 31 de diciembre de 2026."],
  faq: [
    {
      pregunta: "¿Cuánto dura el período de prueba en Panamá?",
      respuesta: "Hasta {{pa.periodo-prueba-meses}}. En el trabajo doméstico, {{pa.periodo-prueba-domestico-semanas}} semanas.",
    },
    {
      pregunta: "¿Me pueden despedir durante la prueba sin pagarme?",
      respuesta: "Sí, sin indemnización. Igual te deben los salarios trabajados, las vacaciones proporcionales y el décimo proporcional.",
    },
    {
      pregunta: "¿Siempre hay período de prueba?",
      respuesta: "No. Tiene que estar escrito en el contrato y el puesto tiene que pedir una habilidad especial. Tampoco vale si ya ocupaste ese mismo puesto en la empresa.",
    },
  ],
  glosario: [
    { termino: "Período probatorio", definicion: "Otro nombre del período de prueba." },
    { termino: "Contrato escrito", definicion: "El documento firmado con las condiciones de tu trabajo." },
  ],
});
