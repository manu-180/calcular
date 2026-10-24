import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_CONTRIBUYENTE, neto, retencion, tasaNss } from "../lib/ahorro";

export default definirCalculadora({
  id: "pk.national-savings-account-calculator",
  mercado: "pk",
  concepto: "propio",
  slug: "national-savings-account-calculator",
  estado: "publicado",
  requiere: {
    "pk.nss-rates": "mapa",
    "pk.nss-wht-filer": "numero",
    "pk.nss-wht-nonfiler": "numero",
  },
  campos: [
    { id: "saldo", tipo: "moneda", etiqueta: "Balance in the account", min: 0, porDefecto: 500000 },
    { id: "meses", tipo: "entero", etiqueta: "Months", min: 1, max: 60, porDefecto: 12 },
    CAMPO_CONTRIBUYENTE,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.saldo <= 0) throw new ErrorEntrada("Enter the balance.", "saldo");
    const tasa = tasaNss(v["pk.nss-rates"], "sa");
    const bruto = (entrada.saldo * tasa * entrada.meses) / 1200;
    const r = neto(bruto, retencion(v, entrada.contribuyente));
    return { neto: redondear(r.neto), bruto: redondear(bruto), impuesto: redondear(r.impuesto), tasa };
  },
  resultado: [
    { clave: "neto", etiqueta: "Profit after tax", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Profit before tax", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Withholding tax", formato: "moneda" },
    { clave: "tasa", etiqueta: "Profit rate", formato: "porcentaje", decimales: 2 },
  ],
});
