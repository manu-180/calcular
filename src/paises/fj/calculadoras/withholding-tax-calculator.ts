import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fj.withholding-tax-calculator",
  mercado: "fj",
  concepto: "propio",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: { "fj.withholding-rates": "mapa" },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Gross payment", min: 0, porDefecto: 10000 },
    { id: "tipo", tipo: "opcion-dato", etiqueta: "Type of payment", dato: "fj.withholding-rates", porDefecto: "nr-royalty-fees" },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter the gross payment.", "monto");
    const tasa = enMapa(v["fj.withholding-rates"], e.tipo);
    const retencion = redondear(porcentaje(e.monto, tasa));
    return { retencion, neto: redondear(e.monto - retencion), tasa };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Tax withheld", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount paid out", formato: "moneda" },
    { clave: "tasa", etiqueta: "Withholding rate", formato: "porcentaje", decimales: 0 },
  ],
});
