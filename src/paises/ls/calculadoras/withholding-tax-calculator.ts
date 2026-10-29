import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ls.withholding-tax-calculator",
  mercado: "ls",
  concepto: "retencion-honorarios",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "ls.withholding-rates": "mapa",
  },
  campos: [
    {
      id: "monto",
      tipo: "moneda",
      etiqueta: "Gross amount of the invoice",
      min: 0,
      porDefecto: 50000,
      ayuda: "The full amount due before withholding, including any materials supplied with the service.",
    },
    { id: "tipo", tipo: "opcion-dato", dato: "ls.withholding-rates", etiqueta: "Who you are paying", porDefecto: "resident-contractor" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount of the invoice.", "monto");
    const tasa = enMapa(v["ls.withholding-rates"], entrada.tipo);
    const retencion = redondear(porcentaje(entrada.monto, tasa));
    return { retencion, tasa, neto: redondear(entrada.monto - retencion) };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Withholding tax to pay to RSL", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Withholding rate", formato: "porcentaje", decimales: 1 },
    { clave: "neto", etiqueta: "Amount paid to the supplier", formato: "moneda" },
  ],
});
