import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.iva",
  h1: "Calculadora de IVA",
  title: "IVA en Uruguay: sumá o sacá el IVA de un precio",
  description:
    "Sumá o sacá el IVA de un precio con la tasa básica de {{uy.iva-basica}} o la mínima de {{uy.iva-minima}}. Resultado al instante, con el IVA separado.",
  intro: [
    "En Uruguay el IVA tiene dos tasas: la básica, que es la general, y la mínima, para los bienes y servicios que fija la ley.",
    "Elegí si querés sumarle el IVA a un precio o sacárselo, y te mostramos el precio sin IVA, el impuesto y el total.",
  ],
  comoSeCalcula: [
    "Para sumar el IVA se multiplica el precio sin impuesto por la tasa: {{uy.iva-basica}} o {{uy.iva-minima}}.",
    "Para sacarlo se divide el precio final por 1 más la tasa (1,22 en la básica) y la diferencia es el IVA.",
    "Los montos se redondean al centésimo.",
  ],
  ejemplo: ["Un precio de $ 1.220 con IVA básico es $ 1.000 sin impuesto más $ 220 de IVA."],
  faq: [
    {
      pregunta: "¿Cuál es la tasa de IVA en Uruguay?",
      respuesta: "La básica es de {{uy.iva-basica}} y la mínima, de {{uy.iva-minima}}.",
    },
    {
      pregunta: "¿Por qué el IVA no es el {{uy.iva-basica}} del precio final?",
      respuesta: "Porque la tasa se aplica sobre el precio sin IVA. Sobre el precio final, el impuesto es cerca del 18 %.",
    },
    {
      pregunta: "¿Qué productos van con tasa mínima?",
      respuesta: "Los que enumera la ley del IVA (Título 10 del Texto Ordenado). Si dudás, mirá la factura: la tasa aparece al lado de cada línea.",
    },
  ],
  glosario: [
    { termino: "IVA", definicion: "Impuesto al Valor Agregado. Se suma al precio de la mayoría de los bienes y servicios." },
    { termino: "Precio neto", definicion: "El precio sin IVA." },
  ],
});
