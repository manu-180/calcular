import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.vacaciones-proporcionales",
  h1: "Calculadora de vacaciones proporcionales en Chile",
  title: "Calculadora de vacaciones proporcionales 2026 en Chile",
  description:
    "Calcula los días y el monto de tus vacaciones proporcionales al terminar el contrato: {{cl.feriado-anual}} hábiles por año, con el método de la Dirección del Trabajo.",
  intro: [
    "Las vacaciones proporcionales son 1,25 días hábiles por cada mes trabajado desde tu ingreso o tu último aniversario. Te las pagan al terminar el contrato, sin importar el motivo.",
    "Salen de los {{cl.feriado-anual}} hábiles al año ({{cl.feriado-anual-austral}} en Magallanes, Aysén y Palena). En la ley se llaman feriado proporcional, y esos días se pasan a días corridos y se pagan con tu sueldo diario.",
  ],
  comoSeCalcula: [
    "Se dividen los días de vacaciones del año ({{cl.feriado-anual}}, o {{cl.feriado-anual-austral}} en Magallanes, Aysén y Palena) por 12. Eso da los días hábiles por mes trabajado.",
    "Se multiplica por los meses desde tu ingreso o tu último aniversario. Los días sueltos suman un treintavo de ese valor cada uno.",
    "Los días hábiles se cuentan en el calendario desde el día siguiente a tu salida. Se suman los sábados, domingos y festivos que caen en medio.",
    "Cada día corrido se paga a un treintavo de tu sueldo mensual.",
  ],
  ejemplo: [
    "Es el ejemplo de la Dirección del Trabajo: si entraste el 15 de marzo de 2021 y saliste el 17 de noviembre de 2021, son 8 meses y 2 días. Eso da 10,08 días hábiles. Contando desde el 18 de noviembre se suman 4 días de fin de semana, en total 14,08 días corridos.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calculan las vacaciones proporcionales?",
      respuesta: "En la mayor parte del país, multiplica 1,25 días hábiles por los meses trabajados desde tu último aniversario. Esos días se pasan a días corridos sumando los fines de semana, y cada día se paga a un treintavo de tu sueldo.",
    },
    {
      pregunta: "¿Me pagan vacaciones si renuncio?",
      respuesta: "Sí. Las vacaciones proporcionales y las pendientes se pagan siempre, sin importar el motivo del término.",
    },
    {
      pregunta: "¿Por qué se suman sábados y domingos?",
      respuesta: "Así lo indica la Dirección del Trabajo: los días hábiles se cuentan en el calendario y los fines de semana que caen en medio también se pagan. Para el feriado, el sábado es siempre inhábil.",
    },
    {
      pregunta: "¿Qué pasa con los festivos?",
      respuesta: "También se suman. La calculadora te muestra hasta qué día se cuenta; si en ese período cae un festivo en día hábil, súmale un día más.",
    },
    {
      pregunta: "¿Qué sueldo se usa?",
      respuesta: "Tu remuneración íntegra. Si es fija, el sueldo. Si es variable, el promedio de los últimos tres meses.",
    },
  ],
  glosario: [
    { termino: "Feriado", definicion: "Así llama la ley a las vacaciones pagadas." },
    { termino: "Días hábiles", definicion: "De lunes a viernes, sin festivos. El sábado no cuenta para el feriado." },
    { termino: "Días corridos", definicion: "Todos los días del calendario, incluidos fines de semana y festivos." },
  ],
});
