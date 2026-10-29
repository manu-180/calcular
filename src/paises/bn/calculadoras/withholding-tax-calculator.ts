import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bn.withholding-tax-calculator",
  mercado: "bn",
  concepto: "retencion-honorarios",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: { "bn.wht-rates": "mapa" },
  campos: [
    { id: "pago", tipo: "moneda", etiqueta: "Gross payment to the non-resident", min: 0, porDefecto: 20000 },
    { id: "naturaleza", tipo: "opcion-dato", dato: "bn.wht-rates", etiqueta: "Nature of the payment", porDefecto: "technical-services" },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "The amount you entered is",
      porDefecto: "gross",
      opciones: [
        { valor: "gross", etiqueta: "The payment before tax is withheld" },
        { valor: "net", etiqueta: "What the non-resident should receive after tax" },
      ],
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.pago <= 0) throw new ErrorEntrada("Enter the amount of the payment.", "pago");
    const tasa = enMapa(v["bn.wht-rates"], e.naturaleza);
    const bruto = e.modo === "net" ? e.pago / (1 - tasa / 100) : e.pago;
    const retencion = redondear(porcentaje(bruto, tasa));
    const brutoR = redondear(bruto);
    return { tasa, bruto: brutoR, retencion, aRecibir: redondear(brutoR - retencion) };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Tax to withhold and pay to the Collector of Income Tax", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Withholding rate", formato: "porcentaje", decimales: 1 },
    { clave: "bruto", etiqueta: "Gross payment", formato: "moneda" },
    { clave: "aRecibir", etiqueta: "Paid to the non-resident", formato: "moneda" },
  ],
});
