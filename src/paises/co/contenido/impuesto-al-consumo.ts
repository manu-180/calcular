import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.impuesto-al-consumo",
  h1: "Calculadora del impuesto al consumo (impoconsumo)",
  title: "Impuesto al consumo en restaurantes: calcula el {{co.impoconsumo-restaurantes}}",
  description:
    "Suma o quita el impuesto al consumo del {{co.impoconsumo-restaurantes}} en la cuenta de un restaurante, bar o cafetería. La propina no paga el impuesto.",
  intro: [
    "En restaurantes, cafeterías, panaderías y bares no se cobra IVA sino impuesto al consumo, del {{co.impoconsumo-restaurantes}}. Va incluido en el precio de la carta.",
    "Con esta calculadora puedes sumar el impuesto a un valor o sacarlo de un precio que ya lo trae.",
  ],
  comoSeCalcula: [
    "Sumar: valor × {{co.impoconsumo-restaurantes}}.",
    "Quitar: precio / (1 + {{co.impoconsumo-restaurantes}}) da el valor sin impuesto; la diferencia es el impuesto.",
    "La propina no hace parte de la base.",
  ],
  ejemplo: [
    "Una cuenta de $50.000 sin impuesto queda en $54.000 con el impuesto al consumo. Si la carta dice $54.000, el impuesto incluido es de $4.000.",
  ],
  faq: [
    {
      pregunta: "¿Los restaurantes cobran IVA o impuesto al consumo?",
      respuesta: "Impuesto al consumo del {{co.impoconsumo-restaurantes}}. Los que funcionan bajo franquicia son la excepción.",
    },
    {
      pregunta: "¿La propina paga impuesto al consumo?",
      respuesta: "No. La propina es voluntaria y no hace parte de la base del impuesto.",
    },
    {
      pregunta: "¿El impuesto tiene que estar en la cuenta?",
      respuesta: "Sí. Tiene que aparecer discriminado en la factura y estar incluido en los precios de la carta.",
    },
  ],
  glosario: [
    { termino: "Impoconsumo", definicion: "El impuesto nacional al consumo, que reemplaza al IVA en restaurantes y bares." },
  ],
});
