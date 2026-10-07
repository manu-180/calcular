import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.finiquito",
  h1: "Calculadora de finiquito",
  title: "Calculadora de finiquito 2026: indemnización y vacaciones",
  description:
    "Calcula tu finiquito: indemnización por años de servicio (tope de {{cl.tope-indemnizacion}}), aviso previo y vacaciones proporcionales, según el Código del Trabajo.",
  intro: [
    "El finiquito es el documento que cierra la relación laboral y detalla lo que te deben pagar.",
    "Si te despiden por necesidades de la empresa, te corresponde la indemnización por años de servicio y, si no te avisaron con 30 días, un mes más por el aviso previo. Siempre se pagan las vacaciones que no tomaste.",
  ],
  comoSeCalcula: [
    "Indemnización por años de servicio: {{cl.indemnizacion-dias-por-anio}} de remuneración por cada año trabajado. Si después del último año trabajaste más de seis meses, cuenta como un año más.",
    "Solo corresponde si el contrato duró un año o más y te despidieron por necesidades de la empresa. Tiene un tope de {{cl.indemnizacion-tope-dias}} (11 años).",
    "Indemnización sustitutiva del aviso previo: una remuneración mensual, si te despidieron sin avisarte con 30 días de anticipación.",
    "Para las dos indemnizaciones, la remuneración se toma con un tope de {{cl.tope-indemnizacion}}. Usamos la UF del día; la ley pide la del último día del mes anterior al pago, así que puede haber una diferencia de pocos pesos.",
    "Vacaciones: {{cl.feriado-anual}} hábiles por año ({{cl.feriado-anual-austral}} en Magallanes, Aysén y Palena), en proporción al tiempo desde tu último aniversario. Se suman los días pendientes de años anteriores.",
    "Esos días hábiles se cuentan en el calendario desde el día siguiente a tu salida, sumando sábados y domingos. Cada día corrido se paga a un treintavo de tu remuneración.",
  ],
  ejemplo: [
    "Entraste el 1 de marzo de 2020 y te despiden el 15 de octubre de 2026 sin aviso, con $1.200.000 de remuneración. Son 6 años y 7 meses: se indemnizan 7 años, o sea $8.400.000, más $1.200.000 por el aviso previo y las vacaciones proporcionales.",
  ],
  faq: [
    {
      pregunta: "¿Me corresponde indemnización si renuncio?",
      respuesta: "No. Con renuncia solo se pagan las vacaciones pendientes y proporcionales, y lo que se te deba del mes.",
    },
    {
      pregunta: "¿Qué cuenta como última remuneración?",
      respuesta: "Todo lo que recibes cada mes por tu trabajo, incluidas las cotizaciones, la colación y la movilización. No cuentan las horas extra ni los bonos que se pagan una vez al año.",
    },
    {
      pregunta: "¿Hay un máximo de años?",
      respuesta: "Sí, 11 años. La excepción son los contratos firmados antes del 14 de agosto de 1981 que seguían vigentes el 1 de diciembre de 1990: no tienen ese tope.",
    },
    {
      pregunta: "¿Los festivos se suman a las vacaciones?",
      respuesta: "Sí. La calculadora suma sábados y domingos y te muestra hasta qué día se cuentan. Si en ese período cae un festivo en día hábil, súmale un día más.",
    },
    {
      pregunta: "¿Y si gano más que el tope?",
      respuesta: "Las indemnizaciones se calculan como si ganaras el tope. Las vacaciones no tienen tope y se pagan con tu remuneración completa.",
    },
  ],
  glosario: [
    { termino: "Finiquito", definicion: "Documento que firma la persona al terminar el contrato, con el detalle de lo que se le paga." },
    { termino: "Indemnización por años de servicio", definicion: "Pago por despido por necesidades de la empresa, según los años trabajados." },
    { termino: "Aviso previo", definicion: "Aviso de despido con 30 días de anticipación. Si no se da, se paga un mes de remuneración." },
    { termino: "Feriado proporcional", definicion: "Las vacaciones que acumulaste desde tu último aniversario y no alcanzaste a tomar." },
  ],
});
