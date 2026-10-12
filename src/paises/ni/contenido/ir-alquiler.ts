import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.ir-alquiler",
  h1: "Calculadora del IR por alquiler de casas en Nicaragua",
  title: "IR por alquiler en Nicaragua: calculá cuánto pagás",
  description: "Si alquilás una casa o un local en Nicaragua, pagás IR de rentas de capital: {{ni.ir-rentas-capital}} sobre el alquiler menos una deducción del {{ni.ir-alquiler-deduccion}}.",
  intro: [
    "El alquiler de un inmueble es una renta de capital. Paga IR todos los meses, aunque no tengas un negocio.",
    "Poné cuánto cobrás de alquiler por mes. Te decimos el IR y lo que te queda.",
  ],
  comoSeCalcula: [
    "Al alquiler se le resta una deducción única del {{ni.ir-alquiler-deduccion}}. No se pueden restar otros gastos.",
    "Sobre lo que queda se aplica el {{ni.ir-rentas-capital}}.",
    "El resultado es el IR del mes. La calculadora también te muestra qué parte del alquiler representa.",
  ],
  ejemplo: ["Si cobrás C$20,000 de alquiler, la base es C$16,000 y el IR es C$2,400. Te quedan C$17,600."],
  faq: [
    {
      pregunta: "¿Cuánto IR se paga por alquilar una casa en Nicaragua?",
      respuesta: "El {{ni.ir-rentas-capital}} sobre el alquiler menos una deducción del {{ni.ir-alquiler-deduccion}}.",
    },
    {
      pregunta: "¿Quién paga el IR del alquiler?",
      respuesta: "Vos, como dueño. Si el inquilino es una empresa agente retenedora, te lo retiene y lo entera a la DGI.",
    },
    {
      pregunta: "¿Cuándo hay que pagarlo?",
      respuesta: "Si no te lo retuvieron, lo declarás y pagás cada mes, hasta el quinto día del mes siguiente.",
    },
    {
      pregunta: "¿Puedo restar los gastos de la casa?",
      respuesta: "No. La deducción del {{ni.ir-alquiler-deduccion}} es única y reemplaza cualquier otro gasto.",
    },
  ],
  glosario: [
    { termino: "Renta de capital inmobiliario", definicion: "Lo que ganás por alquilar o ceder el uso de un inmueble." },
    { termino: "Deducción única", definicion: "Un porcentaje fijo que se resta sin necesidad de comprobar gastos." },
  ],
});
