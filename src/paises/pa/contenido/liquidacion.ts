import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.liquidacion",
  h1: "Calculadora de liquidación laboral en Panamá",
  title: "Liquidación laboral en Panamá: calcula tus prestaciones",
  description:
    "Calcula tu liquidación en Panamá: prima de antigüedad, indemnización si el despido fue injustificado, vacaciones proporcionales y décimo tercer mes.",
  intro: [
    "Cuando termina tu relación de trabajo, el empleador te paga las prestaciones laborales. Lo que incluye depende de cómo terminó y del tipo de contrato.",
    "Escribe tu salario, las fechas y el motivo de salida. Te mostramos cada parte y el total.",
  ],
  comoSeCalcula: [
    "Prima de antigüedad: {{pa.prima-antiguedad-semanas}} semana de salario por año trabajado, en todo contrato por tiempo indefinido.",
    "Indemnización, solo si el despido fue injustificado: {{pa.indemnizacion-semanas[primeros-10-anios]}} semanas por año en los diez primeros años y {{pa.indemnizacion-semanas[desde-anio-11]}} por cada año siguiente.",
    "Vacaciones proporcionales: tu salario por los meses trabajados desde tus últimas vacaciones, dividido entre los {{pa.vacaciones-meses}} del período.",
    "Décimo proporcional: lo ganado desde el inicio de la partida en curso, con las vacaciones que te pagan al salir, dividido entre {{pa.decimo-divisor}}.",
  ],
  ejemplo: [
    "Con B/. 1,300 al mes, 5 años justos y despido injustificado el 30 de septiembre, sin vacaciones pendientes: prima B/. 1,500, indemnización B/. 5,100 y décimo de B/. 162.50. Total B/. 6,762.50.",
  ],
  faq: [
    {
      pregunta: "¿Qué me pagan si renuncio?",
      respuesta: "La prima de antigüedad (si tu contrato era por tiempo indefinido), las vacaciones pendientes y el décimo proporcional.",
    },
    {
      pregunta: "¿Qué me pagan si me despiden sin causa?",
      respuesta: "Lo mismo que al renunciar más la indemnización del artículo 225.",
    },
    {
      pregunta: "¿La liquidación lleva descuentos?",
      respuesta: "Las vacaciones y el décimo llevan descuentos de Seguro Social. La calculadora te muestra los montos brutos.",
    },
    {
      pregunta: "¿Dónde reclamo si no me pagan la liquidación?",
      respuesta: "En el Ministerio de Trabajo y Desarrollo Laboral (MITRADEL), que atiende las quejas y conflictos laborales.",
    },
  ],
  glosario: [
    { termino: "Prestaciones laborales", definicion: "Los pagos que te corresponden al terminar la relación: prima, vacaciones, décimo y, si aplica, indemnización." },
    { termino: "Vacaciones proporcionales", definicion: "La parte de vacaciones que ganaste y no alcanzaste a tomar." },
  ],
});
