import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.withholding-tax-calculator",
  mercado: "ug",
  concepto: "retencion-honorarios",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "ug.wht-rates": "mapa",
    "ug.wht-goods-threshold": "numero",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Gross amount of the payment", min: 0, porDefecto: 5000000 },
    { id: "tipo", tipo: "opcion-dato", etiqueta: "Type of payment", dato: "ug.wht-rates", porDefecto: "professional-fees" },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter the gross amount of the payment.", "importe");
    const tasa = enMapa(v["ug.wht-rates"], e.tipo);
    const umbral = v["ug.wht-goods-threshold"];
    const observaciones: string[] = [];
    let retencion = redondear(porcentaje(e.importe, tasa));
    if (e.tipo === "goods-services" && e.importe <= umbral) {
      retencion = 0;
      observaciones.push("Payments for goods or services of Ushs 1,000,000 or less are not subject to withholding, unless several payments for one supply add up to more.");
    }
    if (e.tipo === "goods-services") observaciones.push("Only the Government, public bodies and designated withholding agents withhold on goods and services.");
    return { retencion, neto: redondear(e.importe - retencion), tasa, observaciones };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Withholding tax to deduct", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount the payee receives", formato: "moneda" },
    { clave: "tasa", etiqueta: "Withholding rate", formato: "porcentaje", decimales: 0 },
  ],
});
