import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.vacaciones",
  h1: "Calculadora de vacaciones en Bolivia",
  title: "Vacaciones Bolivia 2026: calcule días y pago por antigüedad",
  description: "Calcule cuántos días de vacación le corresponden ({{bo.vacaciones-dias[hasta-5]}}, {{bo.vacaciones-dias[hasta-10]}} o {{bo.vacaciones-dias[mas-10]}} hábiles) y cuánto vale la fracción si deja el trabajo.",
  intro: [
    "En Bolivia le corresponden {{bo.vacaciones-dias[hasta-5]}} hábiles de vacación por año de 1 a 5 años de trabajo, {{bo.vacaciones-dias[hasta-10]}} de 5 a 10 años y {{bo.vacaciones-dias[mas-10]}} desde los 10 años. Se ganan al cumplir cada año de trabajo continuo.",
    "Escriba su fecha de ingreso. Si agrega su sueldo promedio, le decimos cuánto vale cada parte.",
  ],
  comoSeCalcula: [
    "De 1 a 5 años de trabajo: {{bo.vacaciones-dias[hasta-5]}} hábiles. De 5 a 10 años: {{bo.vacaciones-dias[hasta-10]}}. De 10 años en adelante: {{bo.vacaciones-dias[mas-10]}}.",
    "Si deja el trabajo después del primer año, le pagan la fracción del año en curso: los días del año divididos 12 por cada mes, y divididos 360 por cada día.",
    "Cada día de vacación vale el promedio del total ganado de los 3 meses dividido 30.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días de vacaciones me corresponden en Bolivia?",
      respuesta: "{{bo.vacaciones-dias[hasta-5]}} hábiles de 1 a 5 años de trabajo, {{bo.vacaciones-dias[hasta-10]}} de 5 a 10 años y {{bo.vacaciones-dias[mas-10]}} desde los 10 años.",
    },
    {
      pregunta: "¿Cómo se calcula el pago de las vacaciones?",
      respuesta: "Cada día vale el promedio del total ganado de los últimos 3 meses dividido 30. Si deja el trabajo después del primer año, también le pagan la fracción del año en curso.",
    },
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
