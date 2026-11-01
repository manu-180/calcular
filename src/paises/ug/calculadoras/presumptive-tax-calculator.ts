import { aplicarEscala, aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.presumptive-tax-calculator",
  mercado: "ug",
  concepto: "regimen-simplificado",
  slug: "presumptive-tax-calculator",
  estado: "publicado",
  requiere: {
    "ug.presumptive-records": "escala",
    "ug.presumptive-no-records": "escala",
    "ug.presumptive-ceiling": "numero",
  },
  campos: [
    { id: "ventas", tipo: "moneda", etiqueta: "Turnover for the year", min: 0, porDefecto: 60000000, ayuda: "Total sales from all your businesses from 1 July to 30 June." },
    { id: "registros", tipo: "si-no", etiqueta: "You keep business records", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.ventas < 0) throw new ErrorEntrada("Turnover cannot be negative.", "ventas");
    if (e.ventas > v["ug.presumptive-ceiling"]) {
      throw new ErrorEntrada("Above Ushs 150 million of turnover you are no longer a small business taxpayer. You file a normal income tax return.", "ventas");
    }
    const conRegistros = redondear(aplicarEscalaMarginal(v["ug.presumptive-records"], e.ventas));
    const sinRegistros = redondear(aplicarEscala(v["ug.presumptive-no-records"], e.ventas));
    const impuesto = e.registros ? conRegistros : sinRegistros;
    const observaciones: string[] = [];
    if (impuesto === 0) observaciones.push("Turnover of Ushs 10 million or less pays no income tax.");
    if (!e.registros && conRegistros < sinRegistros) observaciones.push("Keeping records would lower your tax for this turnover.");
    return {
      impuesto,
      conRegistros,
      sinRegistros,
      efectiva: e.ventas > 0 ? (impuesto / e.ventas) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Presumptive tax for the year", formato: "moneda", destacada: true },
    { clave: "conRegistros", etiqueta: "Tax with records", formato: "moneda" },
    { clave: "sinRegistros", etiqueta: "Tax without records", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Tax as a share of turnover", formato: "porcentaje", decimales: 2 },
  ],
});
