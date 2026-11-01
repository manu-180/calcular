import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.withholding-tax-calculator",
  mercado: "sc",
  concepto: "retencion-honorarios",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: { "sc.withholding-rates": "mapa" },
  campos: [
    { id: "tipo", tipo: "opcion-dato", dato: "sc.withholding-rates", etiqueta: "Type of payment", porDefecto: "non-resident-income" },
    { id: "pago", tipo: "moneda", etiqueta: "Gross payment", min: 0, porDefecto: 100000, ayuda: "The amount before any tax is held back." },
  ],
  calcular(e, v, { redondear }) {
    if (e.pago <= 0) throw new ErrorEntrada("Enter the gross payment.", "pago");
    const tasa = enMapa(v["sc.withholding-rates"], e.tipo);
    const retencion = redondear(porcentaje(e.pago, tasa));
    return { retencion, neto: redondear(e.pago - retencion), tasa };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Tax to withhold and pay to the SRC", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount paid to the recipient", formato: "moneda" },
    { clave: "tasa", etiqueta: "Withholding rate", formato: "porcentaje", decimales: 1 },
  ],
});
