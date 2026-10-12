import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.impuesto-a-la-transferencia",
  h1: "Calculadora del impuesto a la transferencia de inmuebles y vehículos",
  title: "Impuesto a la transferencia de casa o auto: calcúlelo",
  description: "Calcule el IMT por la venta de un inmueble o vehículo: {{bo.imt}} sobre el precio o la base imponible municipal, la que sea mayor.",
  intro: [
    "Quien vende un inmueble o un vehículo de forma eventual (no como negocio) paga el Impuesto Municipal a las Transferencias (IMT) en su municipio.",
    "Escriba el precio de venta y, si la conoce, la base imponible del impuesto anual a la propiedad.",
  ],
  comoSeCalcula: [
    "La base es el precio pagado o la base imponible del impuesto a la propiedad de la última gestión vencida, la que sea mayor.",
    "Sobre esa base se aplica el {{bo.imt}}.",
    "Se paga dentro de los 10 días hábiles de la transferencia.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el impuesto por vender una casa en Bolivia?",
      respuesta: "El {{bo.imt}} del precio o de la base imponible municipal, la que sea mayor. Lo paga quien vende.",
    },
    {
      pregunta: "¿Y si vendo mi auto?",
      respuesta: "Es el mismo impuesto y la misma alícuota: {{bo.imt}} sobre el precio o la base imponible del impuesto a la propiedad del vehículo.",
    },
    {
      pregunta: "¿Las comisiones de la inmobiliaria entran en la base?",
      respuesta: "No. Las comisiones de intermediarios no forman parte de la base del impuesto; el intermediario debe facturarlas aparte.",
    },
  ],
  glosario: [
    { termino: "IMT", definicion: "Impuesto Municipal a las Transferencias de inmuebles y vehículos automotores." },
    { termino: "Base imponible", definicion: "El valor sobre el que se calcula un impuesto." },
  ],
});
