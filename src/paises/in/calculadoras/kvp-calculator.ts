import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "in.kvp-calculator",
  mercado: "in",
  concepto: "propio",
  slug: "kvp-calculator",
  estado: "publicado",
  requiere: {
    "in.kvp-months": "numero",
    "in.small-savings-rates": "mapa",
  },
  campos: [{ id: "monto", tipo: "moneda", etiqueta: "Amount invested", min: 0, porDefecto: 100000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount you invest.", "monto");
    const meses = v["in.kvp-months"];
    return {
      madurez: redondear(entrada.monto * 2),
      interes: redondear(entrada.monto),
      meses,
      anios: Math.floor(meses / 12),
      mesesExtra: meses % 12,
      equivalente: (2 ** (12 / meses) - 1) * 100,
    };
  },
  resultado: [
    { clave: "madurez", etiqueta: "Maturity value", formato: "moneda", destacada: true },
    { clave: "interes", etiqueta: "Gain", formato: "moneda" },
    { clave: "meses", etiqueta: "Months to double", formato: "meses" },
    { clave: "anios", etiqueta: "That is, years", formato: "anios" },
    { clave: "mesesExtra", etiqueta: "and months", formato: "meses" },
    { clave: "equivalente", etiqueta: "Equivalent yearly return", formato: "porcentaje", decimales: 2 },
  ],
});
