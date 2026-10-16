import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "in.post-office-mis-calculator",
  mercado: "in",
  concepto: "propio",
  slug: "post-office-mis-calculator",
  estado: "publicado",
  requiere: {
    "in.small-savings-rates": "mapa",
  },
  campos: [{ id: "monto", tipo: "moneda", etiqueta: "Amount deposited", min: 0, porDefecto: 900000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount you deposit.", "monto");
    const tasa = enMapa(v["in.small-savings-rates"], "mis");
    const mensual = redondear((entrada.monto * tasa) / 1200);
    return { mensual, anual: redondear(mensual * 12), tasa };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Monthly income", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Income a year", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate used", formato: "porcentaje", decimales: 1 },
  ],
});
