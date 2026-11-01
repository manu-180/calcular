import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "na.withholding-tax-calculator",
  mercado: "na",
  concepto: "propio",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "na.withholding-tax": "mapa",
  },
  campos: [
    { id: "tipo", tipo: "opcion-dato", etiqueta: "Payment to a non-resident", dato: "na.withholding-tax", porDefecto: "services" },
    { id: "monto", tipo: "moneda", etiqueta: "Gross amount payable", min: 0, porDefecto: 50000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter the amount payable.", "monto");
    const tasa = enMapa(v["na.withholding-tax"], e.tipo);
    const retencion = redondear(porcentaje(e.monto, tasa));
    return {
      retencion,
      neto: redondear(e.monto - retencion),
      tasa,
      observaciones: ["Pay the tax to NamRA and file the return within 20 days after the end of the month in which you withheld it."],
    };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Tax to withhold", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount paid to the non-resident", formato: "moneda" },
    { clave: "tasa", etiqueta: "Withholding rate", formato: "porcentaje", decimales: 0 },
  ],
});
