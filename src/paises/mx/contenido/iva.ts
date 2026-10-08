import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.iva",
  h1: "Calculadora de IVA en México: agregar o quitar el IVA",
  title: "Calculadora de IVA México: suma o quita el {{mx.iva-general}}",
  description:
    "Saca el IVA de un precio, agrégalo o quítalo en un clic: tasa general del {{mx.iva-general}} o {{mx.iva-frontera}} de la frontera norte. Al centavo, sin fórmulas.",
  intro: [
    "El IVA en México es del {{mx.iva-general}}. Para agregarlo, multiplica el precio sin IVA por 1.16; para quitarlo, divide el precio con IVA entre 1.16.",
    "En la región fronteriza norte hay un estímulo fiscal que deja el IVA en {{mx.iva-frontera}}. La calculadora hace las dos cuentas por ti.",
  ],
  comoSeCalcula: [
    "Agregar el IVA: el IVA es el precio sin IVA por la tasa. Súmalo al precio y tienes el total.",
    "Quitar el IVA: divide el precio con IVA entre 1 más la tasa (escrita en decimales).",
    "El IVA es la diferencia entre el precio con IVA y el precio sin IVA.",
  ],
  ejemplo: [
    "Un servicio de 1,000 pesos más IVA del {{mx.iva-general}} queda en 1,160 pesos: 160 son de IVA.",
    "Al revés, si un precio de 2,320 pesos ya incluye el IVA, divide entre 1.16: el precio sin IVA es de 2,000 pesos y el IVA de 320.",
  ],
  faq: [
    {
      pregunta: "¿Cómo le quito el IVA a un precio?",
      respuesta: "Divide el precio entre 1 más la tasa. Con la tasa general, un precio de 1,160 pesos queda en 1,000 pesos sin IVA y 160 de IVA.",
    },
    {
      pregunta: "¿Cómo saco el IVA de una cantidad?",
      respuesta: "Si la cantidad no tiene IVA, multiplícala por 0.16. Si ya lo incluye, divídela entre 1.16 y réstale el resultado al total.",
    },
    {
      pregunta: "¿Dónde se cobra el IVA del {{mx.iva-frontera}}?",
      respuesta: "En ventas y servicios de negocios ubicados en los municipios de la región fronteriza norte que cumplen las reglas del estímulo. El estímulo está vigente hasta el 31 de diciembre de 2026.",
    },
    {
      pregunta: "¿Todo paga IVA?",
      respuesta: "No. Algunos productos, como muchos alimentos y medicinas, tienen tasa cero, y otros están exentos. Esta calculadora sirve para lo que paga la tasa general o la de la frontera.",
    },
  ],
  glosario: [
    { termino: "IVA", definicion: "Impuesto al Valor Agregado. Se suma al precio de bienes y servicios." },
    { termino: "Estímulo fiscal de la región fronteriza", definicion: "Crédito del 50 % del IVA para negocios de la frontera norte, que deja la tasa en {{mx.iva-frontera}}." },
  ],
});
