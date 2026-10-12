import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.ganancia-de-capital",
  mercado: "hn",
  concepto: "propio",
  slug: "ganancia-de-capital",
  estado: "publicado",
  requiere: {
    "hn.ganancia-capital": "numero",
  },
  campos: [
    { id: "venta", tipo: "moneda", etiqueta: "Precio de venta", min: 0 },
    {
      id: "costo",
      tipo: "moneda",
      etiqueta: "Costo del bien",
      ayuda: "Lo que pagó al comprarlo, más las mejoras y gastos que lo aumentaron.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const ganancia = redondear(Math.max(0, entrada.venta - entrada.costo));
    const impuesto = redondear(porcentaje(ganancia, valores["hn.ganancia-capital"]));
    const observaciones = ["Es un impuesto único: esta ganancia no se suma a la tabla progresiva del ISR."];
    if (ganancia === 0) observaciones.push("Si vende por menos de lo que le costó, no hay ganancia y no paga este impuesto.");
    return { ganancia, tasa: valores["hn.ganancia-capital"], impuesto, neto: redondear(entrada.venta - impuesto), observaciones };
  },
  resultado: [
    { clave: "ganancia", etiqueta: "Ganancia de capital", formato: "moneda" },
    { clave: "tasa", etiqueta: "Tasa", formato: "porcentaje" },
    { clave: "impuesto", etiqueta: "Impuesto a pagar", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Lo que le queda de la venta", formato: "moneda" },
  ],
});
