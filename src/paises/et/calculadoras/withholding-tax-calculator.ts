import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "et.withholding-tax-calculator",
  mercado: "et",
  concepto: "propio",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "et.withholding-rate": "numero",
    "et.withholding-goods-threshold": "numero",
    "et.withholding-services-threshold": "numero",
    "et.withholding-no-tin-rate": "numero",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount of the transaction or contract", min: 0, porDefecto: 50000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "What is being supplied?",
      opciones: [
        { valor: "goods", etiqueta: "Goods" },
        { valor: "services", etiqueta: "Services" },
      ],
      porDefecto: "goods",
    },
    { id: "tin", tipo: "si-no", etiqueta: "The supplier gave a TIN and business licence", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter the amount of the transaction.", "importe");
    const umbralBienes = v["et.withholding-goods-threshold"];
    const umbralServicios = v["et.withholding-services-threshold"];
    // Artículo 97(1): bienes por más de 20.000 en una operación; servicios de 10.000 en un contrato.
    const aplica = e.tipo === "goods" ? e.importe > umbralBienes : e.importe >= umbralServicios;
    const tasa = aplica ? (e.tin ? v["et.withholding-rate"] : v["et.withholding-no-tin-rate"]) : 0;
    const retencion = redondear(porcentaje(e.importe, tasa));
    const observaciones: string[] = [];
    if (!aplica) observaciones.push("The amount is below the threshold, so no withholding applies to this transaction.");
    return {
      retencion,
      tasa,
      aPagar: redondear(e.importe - retencion),
      umbral: e.tipo === "goods" ? umbralBienes : umbralServicios,
      observaciones,
    };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Tax to withhold", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Withholding rate", formato: "porcentaje", decimales: 0 },
    { clave: "aPagar", etiqueta: "Amount paid to the supplier", formato: "moneda" },
    { clave: "umbral", etiqueta: "Threshold for this kind of supply", formato: "moneda" },
  ],
});
