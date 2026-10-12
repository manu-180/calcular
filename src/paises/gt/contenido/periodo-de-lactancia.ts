import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.periodo-de-lactancia",
  h1: "Calculadora del período de lactancia en Guatemala",
  title: "Período de lactancia en Guatemala: hasta cuándo dura",
  description:
    "Calcule hasta qué fecha tiene derecho a la hora de lactancia pagada después de regresar al trabajo y cuánto vale ese tiempo.",
  intro: [
    "Al regresar de su descanso por maternidad, tiene derecho a {{gt.lactancia-horas}} al día para alimentar a su bebé durante {{gt.lactancia-meses}}. Ese tiempo se paga como trabajado.",
    "Escriba el día en que regresó (o regresa) y le mostramos hasta cuándo dura su período de lactancia.",
  ],
  comoSeCalcula: [
    "Fin del período = día de regreso + {{gt.lactancia-meses}}.",
    "Valor de una hora = salario mensual / 30 / horas de su jornada.",
    "Valor diario de la lactancia = valor de una hora × {{gt.lactancia-horas}}.",
  ],
  ejemplo: ["Si regresó el 8 de febrero de 2027, su período de lactancia dura hasta el 8 de diciembre de 2027."],
  faq: [
    {
      pregunta: "¿Cómo puedo tomar la hora de lactancia?",
      respuesta: "En dos medias horas durante la jornada, o junta para entrar una hora después o salir una hora antes. Lo acuerda con su patrono.",
    },
    {
      pregunta: "¿Me pueden descontar la hora de lactancia?",
      respuesta: "No. La ley la cuenta como tiempo trabajado y se paga completa.",
    },
    {
      pregunta: "¿Se puede alargar el período de lactancia?",
      respuesta: "Sí, si su médico certifica que hace falta por la salud suya o de su bebé.",
    },
    {
      pregunta: "¿Me pueden despedir durante la lactancia?",
      respuesta: "No sin una causa justificada y la autorización de un juez de trabajo. La protección que tenía durante el embarazo sigue durante la lactancia.",
    },
  ],
  glosario: [{ termino: "Período de lactancia", definicion: "Tiempo después del descanso por maternidad en que la madre tiene una hora pagada al día para alimentar a su bebé." }],
});
