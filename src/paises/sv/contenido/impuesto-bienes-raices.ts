import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.impuesto-bienes-raices",
  h1: "Calculadora del impuesto de transferencia de bienes raíces",
  title: "Impuesto al comprar casa o terreno en El Salvador {{anio}}",
  description: "Calcule el impuesto de transferencia de bienes raíces: {{sv.bienes-raices-tasa}} sobre lo que el valor del inmueble pase de {{sv.bienes-raices-exento}}.",
  intro: [
    "Al comprar una casa, un terreno o un local se paga el impuesto sobre transferencia de bienes raíces. Es el {{sv.bienes-raices-tasa}} sobre la parte del valor que pasa de {{sv.bienes-raices-exento}}; por debajo de ese monto no se paga.",
    "Ponga el valor del inmueble y le decimos cuánto es el impuesto.",
  ],
  comoSeCalcula: [
    "Al valor del inmueble se le resta {{sv.bienes-raices-exento}}.",
    "Sobre lo que queda se aplica el {{sv.bienes-raices-tasa}}.",
  ],
  ejemplo: ["Una casa de $100,000: (100,000 − 28,571.43) × 3 % = $2,142.86."],
  faq: [
    {
      pregunta: "¿Quién paga el impuesto de transferencia?",
      respuesta: "Lo paga quien adquiere el inmueble, sea persona o empresa. Presenta la declaración en Hacienda dentro de los 60 días, con el testimonio de la escritura. Aunque esté exento, igual tiene que presentarla.",
    },
    {
      pregunta: "¿Por qué el límite es un número tan raro?",
      respuesta: "La ley lo fijó en 250,000 colones. Al cambio fijo de {{sv.colones-por-dolar}} colones por dólar son {{sv.bienes-raices-exento}}.",
    },
    {
      pregunta: "¿Hay otros costos al comprar?",
      respuesta: "Sí: los honorarios del notario y los derechos de inscripción en el Centro Nacional de Registros. Esta calculadora muestra solo el impuesto.",
    },
  ],
  glosario: [{ termino: "Bien raíz", definicion: "Un inmueble: casa, terreno, apartamento o local." }],
});
