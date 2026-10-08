import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.isv",
  h1: "Calculadora del ISV en Honduras",
  title: "Calcular el ISV en Honduras: agregar o quitar el {{hn.isv[general]}}",
  description:
    "Agregue o quite el Impuesto Sobre Ventas a un precio: {{hn.isv[general]}} general o {{hn.isv[especial]}} para cerveza, licores, cigarrillos y boletos aéreos en clase ejecutiva.",
  intro: [
    "El ISV en Honduras es del {{hn.isv[general]}} sobre la venta de bienes y servicios. La cerveza, los licores y otras bebidas alcohólicas, los cigarrillos y los boletos aéreos en clase ejecutiva o primera clase pagan {{hn.isv[especial]}}.",
    "Escriba el precio y elija si quiere agregarle el impuesto o sacarlo de un precio final.",
  ],
  comoSeCalcula: [
    "Para agregar el ISV: precio sin impuesto × tasa, y el resultado se suma al precio.",
    "Para quitarlo de un precio final: precio con impuesto / (1 + tasa). La diferencia es el ISV.",
  ],
  ejemplo: ["Un producto de L1,000 con la tasa general paga L150 de ISV. Precio final: L1,150."],
  faq: [
    {
      pregunta: "¿Cuál es la tasa del ISV en Honduras?",
      respuesta: "{{hn.isv[general]}} la general y {{hn.isv[especial]}} la especial para bebidas alcohólicas, cigarrillos y boletos aéreos en clase ejecutiva.",
    },
    {
      pregunta: "¿Cómo saco el ISV de un precio que ya lo incluye?",
      respuesta: "Divida el precio entre 1 más la tasa. Con la tasa general de {{hn.isv[general]}}, divida entre 1.15. El resultado es el precio sin impuesto y la diferencia es el ISV.",
    },
    {
      pregunta: "¿Cómo le agrego el ISV a un precio?",
      respuesta: "Con la tasa general, multiplique el precio sin impuesto por 1.15. Por ejemplo, L1,000 queda en L1,150.",
    },
    {
      pregunta: "¿Todo paga ISV?",
      respuesta: "No. Hay bienes y servicios exentos, como los productos de la canasta básica que fija la ley. El SAR publica la lista.",
    },
  ],
  glosario: [{ termino: "ISV", definicion: "Impuesto Sobre Ventas, el impuesto al consumo de Honduras." }],
});
