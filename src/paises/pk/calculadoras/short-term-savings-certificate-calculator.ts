import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_CONTRIBUYENTE, neto, retencion, tasaNss } from "../lib/ahorro";

const MESES = { stsc3m: 3, stsc6m: 6, stsc1y: 12 } as const;

export default definirCalculadora({
  id: "pk.short-term-savings-certificate-calculator",
  mercado: "pk",
  concepto: "plazo-fijo",
  slug: "short-term-savings-certificate-calculator",
  estado: "publicado",
  requiere: {
    "pk.nss-rates": "mapa",
    "pk.nss-wht-filer": "numero",
    "pk.nss-wht-nonfiler": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount invested", min: 0, porDefecto: 500000 },
    {
      id: "plazo",
      tipo: "opcion",
      etiqueta: "Term",
      opciones: [
        { valor: "stsc3m", etiqueta: "3 months" },
        { valor: "stsc6m", etiqueta: "6 months" },
        { valor: "stsc1y", etiqueta: "1 year" },
      ],
      porDefecto: "stsc1y",
    },
    CAMPO_CONTRIBUYENTE,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount invested.", "monto");
    const tasa = tasaNss(v["pk.nss-rates"], entrada.plazo);
    const bruto = (entrada.monto * tasa * MESES[entrada.plazo]) / 1200;
    const r = neto(bruto, retencion(v, entrada.contribuyente));
    return { madurez: redondear(entrada.monto + r.neto), neto: redondear(r.neto), bruto: redondear(bruto), impuesto: redondear(r.impuesto), tasa };
  },
  resultado: [
    { clave: "madurez", etiqueta: "Amount at maturity after tax", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Profit after tax", formato: "moneda" },
    { clave: "bruto", etiqueta: "Profit before tax", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Withholding tax", formato: "moneda" },
    { clave: "tasa", etiqueta: "Profit rate", formato: "porcentaje", decimales: 2 },
  ],
});
