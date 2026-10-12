import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.vacaciones-proporcionales",
  h1: "Calculadora de vacaciones proporcionales en Panamá",
  title: "Vacaciones proporcionales en Panamá: días y pago",
  description:
    "En Panamá ganas un día de vacaciones por cada {{pa.vacaciones-dias-por-dia}} trabajados. Calcula los días que te tocan y cuánto te deben pagar si sales antes de completar el período.",
  intro: [
    "Si dejas el trabajo antes de completar tu período de vacaciones, te pagan los días que ganaste: uno por cada {{pa.vacaciones-dias-por-dia}} de trabajo.",
    "Escribe tu salario y las fechas. Te mostramos los días trabajados, los días de vacaciones y el pago.",
  ],
  comoSeCalcula: [
    "Días trabajados: desde la fecha que cuentas hasta tu último día, ambos incluidos.",
    "Días de vacaciones: días trabajados divididos entre {{pa.vacaciones-dias-por-dia}}.",
    "Pago: salario mensual dividido entre {{pa.vacaciones-dias}}, por los días de vacaciones.",
  ],
  ejemplo: ["Del 1 de enero al 30 de junio de 2026 son 181 días: 16.45 días de vacaciones. Con B/. 1,100 al mes, el pago es B/. 603.33."],
  faq: [
    {
      pregunta: "¿Cómo se calculan las vacaciones proporcionales en Panamá?",
      respuesta: "Un día de vacaciones por cada {{pa.vacaciones-dias-por-dia}} trabajados. Cada día vale un treintavo de tu salario mensual.",
    },
    {
      pregunta: "¿Me pagan vacaciones si renuncio?",
      respuesta: "Sí. Las vacaciones ganadas se pagan al terminar la relación, por cualquier causa.",
    },
    {
      pregunta: "¿Cuántos días de vacaciones tengo al año?",
      respuesta: "{{pa.vacaciones-dias}} por cada once meses de trabajo continuo.",
    },
  ],
  glosario: [
    { termino: "Vacaciones proporcionales", definicion: "La parte de las vacaciones que ganaste sin completar el período." },
    { termino: "Período de vacaciones", definicion: "Once meses de trabajo continuo, que dan derecho a 30 días de descanso pagado." },
  ],
});
