import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.iva",
  h1: "Calculadora de IVA",
  title: "Calculadora de IVA en México: suma o quita el {{mx.iva-general}}",
  description:
    "Agrega o quita el IVA del {{mx.iva-general}} a cualquier precio, o el {{mx.iva-frontera}} de la región fronteriza norte. Al centavo y con la fuente oficial.",
  intro: [
    "El IVA general en México es del {{mx.iva-general}}. En la región fronteriza norte hay un estímulo fiscal que lo deja en {{mx.iva-frontera}}.",
    "Con esta calculadora sacas el IVA de un precio, lo agregas a un precio sin IVA o lo quitas de un precio que ya lo incluye.",
  ],
  comoSeCalcula: [
    "Agregar el IVA: el IVA es el precio sin IVA por la tasa. Súmalo al precio y tienes el total.",
    "Quitar el IVA: divide el precio con IVA entre 1 más la tasa (escrita en decimales).",
    "El IVA es la diferencia entre el precio con IVA y el precio sin IVA.",
  ],
  faq: [
    {
      pregunta: "¿Cómo le quito el IVA a un precio?",
      respuesta: "Divide el precio entre 1 más la tasa. Con la tasa general, un precio de 1,160 pesos queda en 1,000 pesos sin IVA y 160 de IVA.",
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
