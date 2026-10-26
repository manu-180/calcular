import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bd.fdr-calculator",
  mercado: "bd",
  concepto: "plazo-fijo",
  slug: "fdr-calculator",
  estado: "publicado",
  requiere: {
    "bd.tds-bank-interest": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "এফডিআরের পরিমাণ", min: 0, porDefecto: 500000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "ব্যাংকের সুদের হার (বছরে)", ayuda: "আপনার ব্যাংক যে হার দিচ্ছে সেটি লিখুন।", min: 0, max: 30, porDefecto: 9 },
    { id: "meses", tipo: "entero", etiqueta: "মেয়াদ (মাস)", min: 1, max: 120, porDefecto: 12 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("এফডিআরের পরিমাণ লিখুন।", "monto");
    const interes = redondear(porcentaje(entrada.monto, entrada.tasa) * (entrada.meses / 12));
    const impuesto = redondear(porcentaje(interes, v["bd.tds-bank-interest"]));
    const neto = redondear(interes - impuesto);
    return {
      madurez: redondear(entrada.monto + neto),
      interes,
      impuesto,
      neto,
      efectiva: entrada.meses > 0 ? (neto / entrada.monto) * (12 / entrada.meses) * 100 : 0,
    };
  },
  resultado: [
    { clave: "madurez", etiqueta: "মেয়াদ শেষে হাতে পাবেন", formato: "moneda", destacada: true },
    { clave: "interes", etiqueta: "মোট সুদ", formato: "moneda" },
    { clave: "impuesto", etiqueta: "উৎসে কর", formato: "moneda" },
    { clave: "neto", etiqueta: "কর বাদে সুদ", formato: "moneda" },
    { clave: "efectiva", etiqueta: "কর বাদে বার্ষিক আয়ের হার", formato: "porcentaje", decimales: 2 },
  ],
});
