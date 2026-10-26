import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lk.gratuity-tax-calculator",
  mercado: "lk",
  concepto: "propio",
  slug: "gratuity-tax-calculator",
  estado: "publicado",
  requiere: {
    "lk.terminal-benefits-bands": "escala",
  },
  campos: [
    { id: "gratificacion", tipo: "moneda", etiqueta: "Retiring gratuity", min: 0, porDefecto: 5000000 },
    { id: "pension", tipo: "moneda", etiqueta: "Commuted pension", min: 0, porDefecto: 0 },
    { id: "etf", tipo: "moneda", etiqueta: "ETF paid at or after retirement", min: 0, porDefecto: 0 },
    { id: "compensacion", tipo: "moneda", etiqueta: "Compensation for loss of employment under a uniform scheme", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    const total = e.gratificacion + e.pension + e.etf + e.compensacion;
    if (total <= 0) throw new ErrorEntrada("Enter at least one amount you received.", "gratificacion");
    const impuesto = redondear(aplicarEscala(v["lk.terminal-benefits-bands"], total));
    return {
      impuesto,
      total,
      neto: redondear(total - impuesto),
      tasaEfectiva: (impuesto / total) * 100,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax on these payments", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Total received in the year", formato: "moneda" },
    { clave: "neto", etiqueta: "What you keep", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Effective rate", formato: "porcentaje", decimales: 2 },
  ],
});
