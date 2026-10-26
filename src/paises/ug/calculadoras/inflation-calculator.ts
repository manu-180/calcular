import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default definirCalculadora({
  id: "ug.inflation-calculator",
  mercado: "ug",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "ug.inflation": "serie",
  },
  campos: [{ id: "importe", tipo: "moneda", etiqueta: "Price a year ago", min: 0, porDefecto: 100000 }],
  calcular(e, v, { redondear }) {
    if (e.importe < 0) throw new ErrorEntrada("The amount cannot be negative.", "importe");
    const p = v["ug.inflation"];
    const anio = Number(p.fecha.slice(0, 4));
    const mes = MESES[Number(p.fecha.slice(5, 7)) - 1];
    const actualizado = redondear(e.importe * (1 + p.valor / 100));
    return {
      actualizado,
      diferencia: redondear(actualizado - e.importe),
      tasa: p.valor,
      periodo: `${mes} ${anio - 1} to ${mes} ${anio}`,
      observaciones: ["Uses UBOS annual headline inflation. The price of a single item can rise more or less than that."],
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Same basket of goods today", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "tasa", etiqueta: "Annual headline inflation", formato: "porcentaje", decimales: 1 },
    { clave: "periodo", etiqueta: "Period", formato: "texto" },
  ],
});
