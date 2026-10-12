import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.impuesto-de-renta",
  h1: "Calculadora del impuesto de renta para personas naturales",
  title: "Impuesto de renta personas naturales 2026",
  description:
    "Calcula tu impuesto de renta con la tabla del artículo 241 del Estatuto Tributario y la UVT del año que declaras. Muestra la tarifa marginal y la efectiva.",
  intro: [
    "El impuesto de renta de las personas naturales se calcula con una tabla en UVT: la primera parte de la renta no paga y desde ahí la tarifa sube por tramos.",
    "Escribe tu renta líquida gravable (lo que queda después de restar lo no gravado, las deducciones y las rentas exentas) y elige el año gravable.",
  ],
  comoSeCalcula: [
    "Divide tu renta líquida gravable por la UVT del año gravable. Para 2026, la UVT es {{co.uvt}}.",
    "Busca tu tramo en la tabla del artículo 241 y aplica la tarifa marginal sobre lo que pasa del inicio del tramo, más el valor fijo en UVT del tramo.",
    "Multiplica el resultado en UVT por la UVT del año.",
  ],
  ejemplo: [
    "Con una renta gravable de $100.000.000 en el año gravable 2025, la base es de 2.008 UVT. El impuesto da 202,26 UVT: $10.072.360.",
  ],
  faq: [
    {
      pregunta: "¿Desde cuánto se paga impuesto de renta?",
      respuesta: "Cuando tu renta líquida gravable pasa el primer tramo de la tabla, que no paga nada. Escribe tu renta en la calculadora y te mostramos en qué tramo estás.",
    },
    {
      pregunta: "¿Qué UVT uso para la declaración de 2026?",
      respuesta: "En 2026 se declara el año gravable 2025, así que se usa la UVT de 2025. La calculadora la elige sola según el año que marques.",
    },
    {
      pregunta: "¿Qué es la tarifa marginal?",
      respuesta: "Es la tarifa del tramo más alto que alcanzas. Solo se aplica a la parte de tu renta que cae en ese tramo, no a toda.",
    },
    {
      pregunta: "¿Esta calculadora hace toda la declaración?",
      respuesta: "No. Calcula el impuesto a partir de la renta gravable de la cédula general. Dividendos y ganancias ocasionales tienen reglas propias.",
    },
  ],
  glosario: [
    { termino: "Renta líquida gravable", definicion: "La parte de tus ingresos que paga impuesto, después de restar lo que la ley permite." },
    { termino: "UVT", definicion: "Unidad de Valor Tributario. La fija la DIAN cada año; en 2026 vale {{co.uvt}}." },
  ],
});
