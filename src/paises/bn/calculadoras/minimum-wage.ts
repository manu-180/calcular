import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: las cifras del Minimum Wage Order no se pudieron leer en la fuente primaria (ver datos.json).
export default definirCalculadora({
  id: "bn.minimum-wage",
  mercado: "bn",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "borrador",
  requiere: { "bn.minimum-wage-monthly": "numero", "bn.minimum-wage-hourly": "numero" },
  campos: [
    { id: "modo", tipo: "opcion", etiqueta: "Your job", porDefecto: "full", opciones: [{ valor: "full", etiqueta: "Full-time, paid by the month" }, { valor: "part", etiqueta: "Part-time, paid by the hour" }] },
    { id: "pago", tipo: "moneda", etiqueta: "What you are paid (a month, or an hour)", min: 0, porDefecto: 600 },
  ],
  calcular(e, v, { redondear }) {
    if (e.pago <= 0) throw new ErrorEntrada("Enter your pay.", "pago");
    const minimo = e.modo === "full" ? v["bn.minimum-wage-monthly"] : v["bn.minimum-wage-hourly"];
    return { minimo, diferencia: redondear(e.pago - minimo), cumple: e.pago >= minimo ? "Yes" : "No" };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Minimum wage", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Your pay above (or below) the minimum", formato: "moneda" },
    { clave: "cumple", etiqueta: "Meets the minimum", formato: "texto" },
  ],
});
