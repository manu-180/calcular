import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_CONTRIBUYENTE, neto, retencion, tasaNss } from "../lib/ahorro";

export default definirCalculadora({
  id: "pk.special-savings-certificate-calculator",
  mercado: "pk",
  concepto: "propio",
  slug: "special-savings-certificate-calculator",
  estado: "publicado",
  requiere: {
    "pk.nss-rates": "mapa",
    "pk.nss-wht-filer": "numero",
    "pk.nss-wht-nonfiler": "numero",
  },
  campos: [{ id: "monto", tipo: "moneda", etiqueta: "Amount invested", min: 0, porDefecto: 1000000 }, CAMPO_CONTRIBUYENTE],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount invested.", "monto");
    const t1 = tasaNss(v["pk.nss-rates"], "ssc");
    const t3 = tasaNss(v["pk.nss-rates"], "ssc3");
    const semestre = (entrada.monto * t1) / 200;
    const ultimo = (entrada.monto * t3) / 200;
    const bruto = semestre * 5 + ultimo;
    const wht = retencion(v, entrada.contribuyente);
    const r = neto(bruto, wht);
    return {
      neto: redondear(r.neto),
      bruto: redondear(bruto),
      impuesto: redondear(r.impuesto),
      semestre: redondear(neto(semestre, wht).neto),
      ultimo: redondear(neto(ultimo, wht).neto),
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Total profit over 3 years after tax", formato: "moneda", destacada: true },
    { clave: "semestre", etiqueta: "Each of the first five half-yearly payments (after tax)", formato: "moneda" },
    { clave: "ultimo", etiqueta: "Final half-yearly payment (after tax)", formato: "moneda" },
    { clave: "bruto", etiqueta: "Total profit before tax", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Withholding tax", formato: "moneda" },
  ],
});
