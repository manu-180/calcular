import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.iva",
  h1: "Calculadora de IVA en Paraguay",
  title: "Calcular IVA Paraguay: sacá el {{py.iva-general}} y el {{py.iva-reducida}} de un precio",
  description: "Sacá el IVA de una factura o sumáselo a un precio, con la tasa general del {{py.iva-general}} o la reducida del {{py.iva-reducida}}. Tasas vigentes de la DNIT, gratis.",
  intro: [
    "En Paraguay el IVA es del {{py.iva-general}} (tasa general) o del {{py.iva-reducida}} (tasa reducida). Si el precio ya lo incluye, el IVA del {{py.iva-general}} es el precio dividido 11 y el del {{py.iva-reducida}}, el precio dividido 21.",
    "Poné el monto, elegí la tasa y si el precio ya trae IVA o no.",
  ],
  comoSeCalcula: [
    "Si el precio ya incluye IVA del {{py.iva-general}}, el impuesto es el precio dividido 11.",
    "Si incluye IVA del {{py.iva-reducida}}, el impuesto es el precio dividido 21.",
    "Si el precio no tiene IVA, se multiplica por la tasa y se suma.",
  ],
  ejemplo: ["Una factura de Gs. 110.000 con IVA del {{py.iva-general}} incluido tiene Gs. 10.000 de impuesto y Gs. 100.000 de precio gravado."],
  faq: [
    {
      pregunta: "¿Cuánto es el IVA en Paraguay?",
      respuesta: "Hay dos tasas: la general del {{py.iva-general}} y la reducida del {{py.iva-reducida}}, para los bienes y servicios que fija la ley.",
    },
    {
      pregunta: "¿Cómo le sumo el IVA a un precio?",
      respuesta: "Multiplicá el precio sin IVA por 1,10 con la tasa general o por 1,05 con la reducida.",
    },
    {
      pregunta: "¿Qué lleva IVA reducido?",
      respuesta: "Pagan el {{py.iva-reducida}} el alquiler de vivienda, la venta de inmuebles, los medicamentos registrados y productos de la canasta básica como arroz, fideos, aceite, yerba, leche, huevos, harina y sal yodada. También frutas, verduras, carnes y otros productos agropecuarios.",
    },
    {
      pregunta: "¿Cómo saco el IVA de una factura?",
      respuesta: "Con IVA del {{py.iva-general}}, dividí el total por 11. Con IVA del {{py.iva-reducida}}, dividilo por 21. Eso es el impuesto.",
    },
    {
      pregunta: "¿El alquiler paga IVA?",
      respuesta: "Sí. El alquiler solo para vivienda paga el {{py.iva-reducida}}. El alquiler para un comercio paga el {{py.iva-general}}.",
    },
  ],
  glosario: [
    { termino: "IVA incluido", definicion: "El precio final ya tiene el impuesto adentro." },
    { termino: "Gravado", definicion: "El monto sobre el que se calcula el impuesto." },
  ],
});
