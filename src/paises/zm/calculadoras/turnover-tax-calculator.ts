import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// El folleto de la ZRA calcula el ejemplo de enero de 2026 sobre lo que pasa de K2,500 en el mes
// (K6,000 − K2,500 = K3,500 × 5 % = K175). Seguimos ese ejemplo oficial.
export default definirCalculadora({
  id: "zm.turnover-tax-calculator",
  mercado: "zm",
  concepto: "regimen-simplificado",
  slug: "turnover-tax-calculator",
  estado: "publicado",
  requiere: {
    "zm.tot-rate": "numero",
    "zm.tot-exempt-monthly": "numero",
    "zm.tot-limit": "numero",
  },
  campos: [{ id: "ventas", tipo: "moneda", etiqueta: "Sales for the month", min: 0, porDefecto: 6000 }],
  calcular(e, v, { redondear }) {
    if (e.ventas < 0) throw new ErrorEntrada("Sales cannot be negative.", "ventas");
    const exento = v["zm.tot-exempt-monthly"];
    const gravado = Math.max(0, e.ventas - exento);
    const impuesto = redondear(porcentaje(gravado, v["zm.tot-rate"]));
    const observaciones: string[] = [];
    if (e.ventas * 12 > v["zm.tot-limit"]) {
      observaciones.push("At this level your sales would pass the turnover tax limit over a year. Above it you register for income tax instead.");
    }
    return { impuesto, gravado: redondear(gravado), exento: Math.min(e.ventas, exento), observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Turnover tax for the month", formato: "moneda", destacada: true },
    { clave: "gravado", etiqueta: "Sales taxed at the full rate", formato: "moneda" },
    { clave: "exento", etiqueta: "Sales taxed at 0%", formato: "moneda" },
  ],
});
