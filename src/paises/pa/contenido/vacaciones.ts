import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.vacaciones",
  h1: "Calculadora de vacaciones en Panamá",
  title: "Vacaciones en Panamá: calcula tus días y tu pago",
  description:
    "Calcula tus vacaciones: {{pa.vacaciones-dias}} por cada {{pa.vacaciones-meses}} de trabajo, con los descuentos de Seguro Social y seguro educativo.",
  intro: [
    "En Panamá tienes {{pa.vacaciones-dias}} de vacaciones pagadas por cada {{pa.vacaciones-meses}} continuos de trabajo.",
    "Si te vas antes de completar el período, te pagan la parte proporcional.",
  ],
  comoSeCalcula: [
    "Si cobras por mes, las vacaciones de un período completo son un mes de salario.",
    "Si tu salario varía, se usa el promedio de los últimos once meses o tu último salario base, el que te convenga más.",
    "Para un período incompleto: salario por meses trabajados, dividido entre los {{pa.vacaciones-meses}} del período.",
    "Se descuenta el {{pa.css-trabajador}} de Seguro Social y el {{pa.seguro-educativo-trabajador}} de seguro educativo.",
  ],
  ejemplo: [
    "Con un salario de B/. 1,100 y el período completo, cobras B/. 1,100 brutos. Después de los descuentos recibes B/. 979.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días de vacaciones me tocan al año?",
      respuesta: "{{pa.vacaciones-dias}} por cada {{pa.vacaciones-meses}} de trabajo. Es un día de vacaciones por cada once días trabajados.",
    },
    {
      pregunta: "¿Me pueden dividir las vacaciones?",
      respuesta: "Solo en dos partes iguales, si lo permite la convención colectiva y estás de acuerdo cada vez.",
    },
    {
      pregunta: "¿Qué pasa si me enfermo durante las vacaciones?",
      respuesta: "Si te hospitalizan, esos días no cuentan como vacaciones. Avisa al empleador dentro de los cinco días siguientes.",
    },
    {
      pregunta: "¿Cuándo me deben avisar la fecha de mis vacaciones?",
      respuesta: "El empleador te avisa con dos meses de anticipación.",
    },
  ],
  glosario: [
    { termino: "Período de vacaciones", definicion: "Los {{pa.vacaciones-meses}} continuos de trabajo que dan derecho al descanso completo." },
    { termino: "Seguro educativo", definicion: "Un aporte sobre el salario que financia programas de educación." },
  ],
});
