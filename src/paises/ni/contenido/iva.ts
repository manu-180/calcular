import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.iva",
  h1: "Calculadora de IVA en Nicaragua",
  title: "Calcular IVA en Nicaragua: sumá o sacá el {{ni.iva}}",
  description: "Sumá el IVA a un precio o sacalo de un precio que ya lo incluye. En Nicaragua la alícuota general es del {{ni.iva}}, según la Ley de Concertación Tributaria.",
  intro: [
    "El IVA en Nicaragua es del {{ni.iva}} en la alícuota general. Se cobra sobre la venta de bienes y servicios, y las exportaciones van con alícuota cero.",
    "Elegí si querés sumar el IVA o sacarlo, y poné el monto.",
  ],
  comoSeCalcula: [
    "Para sumar el IVA, se multiplica el precio sin IVA por {{ni.iva}}.",
    "Para sacarlo de un precio que ya lo incluye, se divide el precio entre (1 + {{ni.iva}}). Lo que sobra es el IVA.",
    "Las exportaciones van con alícuota cero y hay bienes y servicios exentos. Esta calculadora usa la alícuota general.",
  ],
  ejemplo: ["Un producto de C$1,000 sin IVA cuesta C$1,150 con IVA. Al revés, de C$1,150 con IVA, C$150 son de impuesto."],
  faq: [
    {
      pregunta: "¿Cuánto es el IVA en Nicaragua?",
      respuesta: "La alícuota general es del {{ni.iva}}. Las exportaciones van con alícuota cero.",
    },
    {
      pregunta: "¿Cómo le sumo el IVA a un precio?",
      respuesta: "Multiplicá el precio sin IVA por {{ni.iva}} y sumalo. Un producto de C$1,000 queda en C$1,150 con IVA.",
    },
    {
      pregunta: "¿Cómo saco el IVA de un precio?",
      respuesta: "Dividí el precio entre (1 + {{ni.iva}}). El resultado es el precio sin IVA y lo que sobra es el impuesto.",
    },
    {
      pregunta: "¿Todo paga IVA?",
      respuesta: "No. La ley tiene una lista de bienes y servicios exentos, como parte de la canasta básica. Revisá si tu caso está en la lista antes de cobrarlo.",
    },
  ],
  glosario: [
    { termino: "IVA", definicion: "Impuesto al valor agregado. Lo regula la Ley 822, Ley de Concertación Tributaria." },
    { termino: "Alícuota", definicion: "El porcentaje del impuesto." },
  ],
});
