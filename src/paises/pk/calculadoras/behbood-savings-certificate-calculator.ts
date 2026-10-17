import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_CONTRIBUYENTE, neto, retencion, tasaNss } from "../lib/ahorro";

export default definirCalculadora({
  id: "pk.behbood-savings-certificate-calculator",
  mercado: "pk",
  concepto: "propio",
  slug: "behbood-savings-certificate-calculator",
  estado: "publicado",
  requiere: {
    "pk.nss-rates": "mapa",
    "pk.nss-wht-filer": "numero",
    "pk.nss-wht-nonfiler": "numero",
  },
  campos: [{ id: "monto", tipo: "moneda", etiqueta: "Amount invested", min: 0, porDefecto: 1000000 }, CAMPO_CONTRIBUYENTE],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount invested.", "monto");
    const tasa = tasaNss(v["pk.nss-rates"], "bsc");
    const bruto = (entrada.monto * tasa) / 1200;
    const r = neto(bruto, retencion(v, entrada.contribuyente));
    return { neto: redondear(r.neto), bruto: redondear(bruto), impuesto: redondear(r.impuesto), anual: redondear(r.neto * 12), tasa };
  },
  resultado: [
    { clave: "neto", etiqueta: "Monthly profit after tax", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Monthly profit before tax", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Withholding tax a month", formato: "moneda" },
    { clave: "anual", etiqueta: "Profit after tax a year", formato: "moneda" },
    { clave: "tasa", etiqueta: "Profit rate", formato: "porcentaje", decimales: 2 },
  ],
});
