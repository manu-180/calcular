import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.presumptive-tax-calculator",
  mercado: "bt",
  concepto: "regimen-simplificado",
  slug: "presumptive-tax-calculator",
  estado: "publicado",
  requiere: {
    "bt.pit-bands": "escala",
    "bt.presumptive-ratio": "numero",
    "bt.presumptive-limit": "numero",
  },
  campos: [{ id: "ventas", tipo: "moneda", etiqueta: "Total income of your business for the year", min: 0, porDefecto: 3000000 }],
  calcular(e, v, { redondear }) {
    if (e.ventas < 0) throw new ErrorEntrada("The amount cannot be negative.", "ventas");
    if (e.ventas > v["bt.presumptive-limit"]) throw new ErrorEntrada("Presumptive taxation stops at Nu. 5 million a year. Above that you file on actual profit.", "ventas");
    const presunto = redondear(porcentaje(e.ventas, v["bt.presumptive-ratio"]));
    const impuesto = redondear(aplicarEscalaMarginal(v["bt.pit-bands"], presunto));
    return {
      impuesto,
      presunto,
      sobreVentas: e.ventas > 0 ? (impuesto / e.ventas) * 100 : 0,
      margen: redondear(v["bt.presumptive-limit"] - e.ventas),
      observaciones: ["Not available if the business is registered for GST, if it is a partnership, or if you hold a professional qualification."],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax for the year", formato: "moneda", destacada: true },
    { clave: "presunto", etiqueta: "Income the tax is charged on", formato: "moneda" },
    { clave: "sobreVentas", etiqueta: "Tax as a share of business income", formato: "porcentaje", decimales: 2 },
    { clave: "margen", etiqueta: "Room left before the ceiling", formato: "moneda" },
  ],
});
