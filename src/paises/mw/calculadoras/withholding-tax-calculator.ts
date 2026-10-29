import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mw.withholding-tax-calculator",
  mercado: "mw",
  concepto: "retencion-honorarios",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "mw.wht-rates": "mapa",
  },
  campos: [
    { id: "pago", tipo: "opcion-dato", etiqueta: "Type of payment", dato: "mw.wht-rates", porDefecto: "services" },
    { id: "monto", tipo: "moneda", etiqueta: "Gross payment", min: 0, porDefecto: 500000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter the gross payment.", "monto");
    const tasa = enMapa(v["mw.wht-rates"], e.pago);
    const retencion = redondear(porcentaje(e.monto, tasa));
    return { neto: redondear(e.monto - retencion), retencion, tasa };
  },
  resultado: [
    { clave: "neto", etiqueta: "Amount paid to the supplier", formato: "moneda", destacada: true },
    { clave: "retencion", etiqueta: "Withholding tax deducted", formato: "moneda" },
    { clave: "tasa", etiqueta: "Withholding tax rate", formato: "porcentaje", decimales: 0 },
  ],
});
