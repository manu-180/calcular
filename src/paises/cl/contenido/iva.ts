import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.iva",
  h1: "Calculadora de IVA en Chile",
  title: "Calculadora de IVA Chile: agrega o saca el {{cl.iva}}",
  description: "Agrega el IVA de {{cl.iva}} a un monto neto o sácalo de un precio final. Ves el neto, el IVA y el total al instante.",
  intro: [
    "El IVA (Impuesto al Valor Agregado) es de {{cl.iva}} y se aplica a la mayoría de las ventas y servicios en Chile.",
    "Con esta calculadora pasas de un monto neto al total con IVA, o separas el IVA de un precio que ya lo incluye.",
  ],
  comoSeCalcula: [
    "Para agregar IVA: se calcula {{cl.iva}} del neto y se suma.",
    "Para sacar el IVA: se divide el precio final por 1 más la tasa (1,19 con la tasa de hoy). El resultado es el neto y la diferencia es el IVA.",
    "Los montos se redondean al peso.",
  ],
  ejemplo: ["Un precio final de $11.900 tiene un neto de $10.000 y un IVA de $1.900."],
  faq: [
    {
      pregunta: "¿Cuánto es el IVA en Chile?",
      respuesta: "{{cl.iva}} sobre la base imponible, según el artículo 14 de la Ley sobre Impuesto a las Ventas y Servicios.",
    },
    {
      pregunta: "¿Cómo saco el neto de una boleta?",
      respuesta: "Divide el total de la boleta por 1,19. Eso es el neto; lo que falta para llegar al total es el IVA.",
    },
    {
      pregunta: "¿Las boletas de honorarios llevan IVA?",
      respuesta: "No. Los honorarios tienen una retención propia, que puedes calcular en la calculadora de boleta de honorarios.",
    },
  ],
  glosario: [
    { termino: "Neto", definicion: "Monto antes de sumar el IVA." },
    { termino: "Bruto o total", definicion: "Monto con el IVA incluido." },
  ],
});
