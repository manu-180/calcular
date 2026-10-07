import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.vacaciones",
  h1: "Calculadora de vacaciones en Costa Rica",
  title: "Vacaciones en Costa Rica: calcule días y monto",
  description:
    "Calcule cuántos días de vacaciones lleva acumulados y cuánto valen en dinero, según los artículos 153 y 156 del Código de Trabajo.",
  intro: [
    "Por ley, cada persona trabajadora gana al menos dos semanas de vacaciones pagadas por cada 50 semanas de trabajo.",
    "Escriba su salario y los meses trabajados desde sus últimas vacaciones. Le mostramos los días pendientes y su valor.",
  ],
  comoSeCalcula: [
    "Se cuenta {{cr.vacaciones-dias-por-mes}} de vacaciones por cada mes trabajado, que es el mínimo de ley si el contrato termina antes de las 50 semanas.",
    "A esos días se les restan los que ya disfrutó.",
    "Cada día vale su salario promedio entre {{cr.dias-mes-planilla}}. Es una estimación: según su jornada, las dos semanas pueden contarse como 12 o 14 días.",
  ],
  ejemplo: ["Con 12 meses sin vacaciones y un salario promedio de ₡600.000, le corresponden 12 días. A ₡20.000 por día, valen ₡240.000."],
  faq: [
    {
      pregunta: "¿Me pueden pagar las vacaciones en lugar de darlas?",
      respuesta: "Solo en casos puntuales. Al terminar el contrato se pagan todas las pendientes. Durante el contrato se puede acordar pagar lo que exceda de dos semanas, hasta tres períodos acumulados.",
    },
    {
      pregunta: "¿Quién decide cuándo salgo de vacaciones?",
      respuesta: "El patrono, dentro de las 15 semanas siguientes a cumplir las 50 semanas de trabajo.",
    },
    {
      pregunta: "¿Con qué salario se pagan las vacaciones?",
      respuesta: "Con el promedio de lo ganado en las últimas 50 semanas, incluyendo horas extra (artículo 157 del Código de Trabajo).",
    },
  ],
  glosario: [
    { termino: "Vacaciones proporcionales", definicion: "Los días que se pagan al terminar el contrato antes de completar las 50 semanas." },
    { termino: "Período", definicion: "Cada bloque de 50 semanas de trabajo continuo que da derecho a vacaciones." },
  ],
});
