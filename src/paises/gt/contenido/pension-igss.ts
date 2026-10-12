import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.pension-igss",
  h1: "Calculadora de pensión por vejez del IGSS",
  title: "Pensión del IGSS: calcule su jubilación por vejez",
  description:
    "Estime su pensión por vejez del IGSS con su salario promedio y los meses que cotizó. Le decimos también si ya cumple la edad y las cuotas.",
  intro: [
    "Para la pensión por vejez del IGSS necesita {{gt.igss-vejez-edad}} de edad y {{gt.igss-vejez-contribuciones}} de cotización.",
    "La pensión se calcula sobre el promedio de su salario de los últimos {{gt.igss-vejez-meses-promedio}}, con un máximo de {{gt.igss-remuneracion-base-maxima}} al mes.",
  ],
  comoSeCalcula: [
    "Base: {{gt.igss-vejez-base}} del salario promedio por los primeros {{gt.igss-vejez-meses-base}} cotizados.",
    "Se suma {{gt.igss-vejez-incremento}} por cada seis meses cotizados después de esos {{gt.igss-vejez-meses-base}}.",
    "Si tiene familiares a su cargo, se agrega una asignación del {{gt.igss-vejez-asignacion}} de la pensión por cada uno.",
    "La pensión con asignaciones no puede pasar el {{gt.igss-vejez-tope}} del salario promedio.",
  ],
  ejemplo: ["Con Q6,000 de promedio, 300 meses cotizados y su esposa a cargo: pensión de Q3,900 más Q390 de asignación, Q4,290 al mes."],
  faq: [
    {
      pregunta: "¿A qué edad me puedo jubilar con el IGSS?",
      respuesta: "A los {{gt.igss-vejez-edad}}, siempre que tenga {{gt.igss-vejez-contribuciones}} de cotización.",
    },
    {
      pregunta: "¿Qué pasa si no tengo todas las cuotas?",
      respuesta: "No recibe pensión por vejez hasta completarlas. Puede seguir cotizando si vuelve a trabajar, o pedir en el IGSS seguir pagando las cuotas por su cuenta.",
    },
    {
      pregunta: "¿Cuánto es lo máximo que paga el IGSS?",
      respuesta: "El salario que se toma tiene un máximo de {{gt.igss-remuneracion-base-maxima}} al mes, y la pensión con asignaciones no pasa del {{gt.igss-vejez-tope}} de ese salario.",
    },
    {
      pregunta: "¿Dónde veo mis cuotas registradas?",
      respuesta: "En los servicios en línea del IGSS o en cualquier agencia con su DPI y número de afiliación.",
    },
  ],
  glosario: [
    { termino: "Contribución", definicion: "Cada mes en que usted y su patrono pagaron la cuota al IGSS." },
    { termino: "Asignación familiar", definicion: "Monto adicional que se suma a la pensión por cada familiar que depende de usted." },
  ],
});
