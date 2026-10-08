import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.iva",
  h1: "Calculadora de IVA en Uruguay",
  title: "Calculadora de IVA Uruguay: sumá o sacá el {{uy.iva-basica}} y el {{uy.iva-minima}}",
  description:
    "Sacá el IVA de un precio o sumáselo con la tasa básica de {{uy.iva-basica}} o la mínima de {{uy.iva-minima}}. Ves el precio sin IVA, el impuesto y el total al instante.",
  intro: [
    "En Uruguay el IVA básico es de {{uy.iva-basica}} y el mínimo, de {{uy.iva-minima}}. La tasa básica es la general y la mínima va para los bienes y servicios que fija la ley.",
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
      pregunta: "¿Cómo saco el IVA de un precio?",
      respuesta: "Dividí el precio final entre 1,22 (o entre 1,10 si va con tasa mínima). El resultado es el precio sin IVA y la diferencia es el impuesto.",
    },
    {
      pregunta: "¿Cómo le sumo el IVA a un precio?",
      respuesta: "Multiplicá el precio sin IVA por 1,22 con la tasa básica o por 1,10 con la mínima.",
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
