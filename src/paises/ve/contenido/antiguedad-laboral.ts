import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.antiguedad-laboral",
  h1: "Calculadora de antigüedad laboral en Venezuela",
  title: "Antigüedad laboral en Venezuela: calcula tu tiempo",
  description:
    "Calcula tu antigüedad en años, meses y días, y lo que te da la LOTTT por ella: días de vacaciones, bono vacacional y días de prestaciones acumulados.",
  intro: [
    "Tu antigüedad es el tiempo que llevas trabajando para la misma empresa. De ella dependen tus días de vacaciones, tu bono vacacional y tus prestaciones sociales.",
    "Escribe tu fecha de ingreso y te mostramos el tiempo exacto y los días que te tocan por ley.",
  ],
  comoSeCalcula: [
    "Contamos años, meses y días desde tu ingreso hasta la fecha elegida, con ese último día incluido.",
    "Vacaciones: {{ve.vacaciones-dias-base}} hábiles al cumplir el primer año, uno más por año, hasta {{ve.vacaciones-dias-adicionales-tope}} adicionales.",
    "Bono vacacional: {{ve.bono-vacacional-dias-base}} el primer año, uno más por año, hasta {{ve.bono-vacacional-dias-tope}}.",
    "Prestaciones: {{ve.prestaciones-garantia-dias}} por trimestre más días adicionales desde el segundo año, o {{ve.prestaciones-retroactivo-dias}} por año en el cálculo retroactivo.",
  ],
  ejemplo: ["Si entraste el 1 de enero de 2020, al 31 de diciembre de 2026 tienes 7 años. En tu octavo aniversario te tocan 22 días de vacaciones y 22 de bono."],
  faq: [
    {
      pregunta: "¿Cómo se calcula la antigüedad laboral?",
      respuesta: "Se cuenta el tiempo desde el primer día de trabajo hasta el último, sin cortes. Los descansos pre y postnatal, la licencia de paternidad y el permiso por adopción también cuentan.",
    },
    {
      pregunta: "¿Cuántos días de vacaciones me tocan según mi antigüedad?",
      respuesta: "{{ve.vacaciones-dias-base}} hábiles al cumplir el primer año y uno más por cada año siguiente, hasta 30 en total.",
    },
    {
      pregunta: "¿Se pierde la antigüedad si cambia el dueño de la empresa?",
      respuesta: "No. Si la empresa pasa a otro dueño, la relación sigue y tu antigüedad se mantiene. Además puedes retirarte con causa justificada si el cambio te perjudica.",
    },
  ],
  glosario: [
    { termino: "Antigüedad", definicion: "Tiempo de servicio continuo para la misma empresa." },
    { termino: "Aniversario", definicion: "La fecha en que cumples cada año de trabajo." },
  ],
});
