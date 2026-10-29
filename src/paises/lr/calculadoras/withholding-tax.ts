import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.withholding-tax",
  mercado: "lr",
  concepto: "propio",
  slug: "withholding-tax",
  estado: "publicado",
  requiere: {
    "lr.withholding-rates": "mapa",
  },
  campos: [
    { id: "pago", tipo: "opcion-dato", etiqueta: "Type of payment", dato: "lr.withholding-rates", porDefecto: "services" },
    { id: "monto", tipo: "moneda", etiqueta: "Gross amount of the payment", min: 0, porDefecto: 100000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount of the payment.", "monto");
    const tasa = enMapa(v["lr.withholding-rates"], entrada.pago);
    const retencion = redondear(porcentaje(entrada.monto, tasa));
    return { retencion, neto: redondear(entrada.monto - retencion), tasa };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Tax to withhold", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount paid to the recipient", formato: "moneda" },
    { clave: "tasa", etiqueta: "Withholding rate", formato: "porcentaje", decimales: 0 },
  ],
});
