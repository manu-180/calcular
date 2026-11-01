import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.property-tax-penalty",
  mercado: "lr",
  concepto: "propio",
  slug: "property-tax-penalty",
  estado: "publicado",
  requiere: {
    "lr.property-penalty": "mapa",
  },
  campos: [
    { id: "impuesto", tipo: "moneda", moneda: "USD", etiqueta: "Real property tax due", min: 0, porDefecto: 125 },
    { id: "meses", tipo: "entero", etiqueta: "Months after 31 July the tax is still unpaid", min: 0, porDefecto: 2 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.impuesto <= 0) throw new ErrorEntrada("Enter the real property tax due.", "impuesto");
    if (entrada.meses < 0) throw new ErrorEntrada("Enter the months late.", "meses");
    const p = v["lr.property-penalty"];
    const tasa = Math.min(entrada.meses * p["por-mes"], p.tope);
    const multa = redondear(porcentaje(entrada.impuesto, tasa));
    return {
      multa,
      tasa,
      total: redondear(entrada.impuesto + multa),
      observaciones: ["Interest at the market rate published by the Central Bank of Liberia is charged on top and is not included."],
    };
  },
  resultado: [
    { clave: "multa", etiqueta: "Penalty", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "tasa", etiqueta: "Penalty rate", formato: "porcentaje", decimales: 0 },
    { clave: "total", etiqueta: "Tax plus penalty", formato: "moneda", moneda: "USD" },
  ],
});
