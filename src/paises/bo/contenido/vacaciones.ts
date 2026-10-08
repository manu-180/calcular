import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.vacaciones",
  h1: "Calculadora de vacaciones",
  title: "Vacaciones en Bolivia: días y pago según su antigüedad",
  description: "Vea cuántos días de vacación le corresponden ({{bo.vacaciones-dias[hasta-5]}}, {{bo.vacaciones-dias[hasta-10]}} o {{bo.vacaciones-dias[mas-10]}} hábiles) y cuánto vale la fracción si deja el trabajo.",
  intro: [
    "Las vacaciones se ganan al cumplir cada año de trabajo continuo. La cantidad de días hábiles depende de su antigüedad.",
    "Escriba su fecha de ingreso. Si agrega su sueldo promedio, le decimos cuánto vale cada parte.",
  ],
  comoSeCalcula: [
    "De 1 a 5 años de trabajo: {{bo.vacaciones-dias[hasta-5]}} hábiles. De 5 a 10 años: {{bo.vacaciones-dias[hasta-10]}}. De 10 años en adelante: {{bo.vacaciones-dias[mas-10]}}.",
    "Si deja el trabajo después del primer año, le pagan la fracción del año en curso: los días del año divididos 12 por cada mes, y divididos 360 por cada día.",
    "Cada día de vacación vale el promedio del total ganado de los 3 meses dividido 30.",
  ],
  faq: [
    {
      pregunta: "¿Me pueden pagar las vacaciones en lugar de tomarlas?",
      respuesta: "Mientras dure el trabajo, no. Se pagan al terminar la relación laboral, o si el empleador no hizo el rol de turnos o no le dejó tomarlas.",
    },
    {
      pregunta: "¿Puedo dividir mis vacaciones?",
      respuesta: "Sí, de forma excepcional y por escrito: en hasta tres períodos por gestión, o en medias jornadas que no pasen de cinco días al año.",
    },
    {
      pregunta: "¿Se pueden acumular las vacaciones?",
      respuesta: "Sí. Las vacaciones no tomadas se acumulan a su favor y se pagan al terminar el trabajo.",
    },
  ],
  glosario: [
    { termino: "Días hábiles", definicion: "Los días de trabajo: no cuentan domingos ni feriados." },
    { termino: "Rol de turnos", definicion: "El calendario que arma el empleador para que cada trabajador tome sus vacaciones." },
  ],
});
