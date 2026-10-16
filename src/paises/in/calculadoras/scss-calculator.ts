import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "in.scss-calculator",
  mercado: "in",
  concepto: "propio",
  slug: "scss-calculator",
  estado: "publicado",
  requiere: {
    "in.small-savings-rates": "mapa",
  },
  campos: [{ id: "monto", tipo: "moneda", etiqueta: "Amount deposited", min: 0, porDefecto: 1500000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount you deposit.", "monto");
    const tasa = enMapa(v["in.small-savings-rates"], "scss");
    const trimestral = redondear((entrada.monto * tasa) / 400);
    return {
      trimestral,
      anual: redondear(trimestral * 4),
      mensual: redondear(trimestral / 3),
      total: redondear(trimestral * 20),
      tasa,
    };
  },
  resultado: [
    { clave: "trimestral", etiqueta: "Interest every quarter", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Interest a year", formato: "moneda" },
    { clave: "mensual", etiqueta: "Works out to a month", formato: "moneda" },
    { clave: "total", etiqueta: "Interest over 5 years", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate used", formato: "porcentaje", decimales: 1 },
  ],
});
