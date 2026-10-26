import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bd.dps-calculator",
  mercado: "bd",
  concepto: "propio",
  slug: "dps-calculator",
  estado: "publicado",
  requiere: {
    "bd.tds-bank-interest": "numero",
  },
  campos: [
    { id: "cuota", tipo: "moneda", etiqueta: "মাসিক কিস্তি", min: 0, porDefecto: 5000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "ব্যাংকের সুদের হার (বছরে)", min: 0, max: 30, porDefecto: 9 },
    { id: "anios", tipo: "entero", etiqueta: "মেয়াদ (বছর)", min: 1, max: 30, porDefecto: 5 },
    {
      id: "retencion",
      tipo: "si-no",
      etiqueta: "সুদ থেকে উৎসে কর কাটা হয়",
      ayuda: "সরকার প্রবর্তিত বা সরকারের অনুমোদন নিয়ে তফসিলি ব্যাংকের চালু করা ডিপোজিট পেনশন স্কিমের সুদে উৎসে কর কাটা হয় না।",
      porDefecto: false,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.cuota <= 0) throw new ErrorEntrada("মাসিক কিস্তির পরিমাণ লিখুন।", "cuota");
    const n = entrada.anios * 12;
    const r = entrada.tasa / 100 / 12;
    // Cada cuota se deposita al principio del mes y el interés se acumula todos los meses.
    const final = r === 0 ? entrada.cuota * n : entrada.cuota * (((1 + r) ** n - 1) / r) * (1 + r);
    const depositado = entrada.cuota * n;
    const interes = redondear(final - depositado);
    const impuesto = entrada.retencion ? redondear(porcentaje(interes, v["bd.tds-bank-interest"])) : 0;
    return {
      total: redondear(depositado + interes - impuesto),
      depositado: redondear(depositado),
      interes,
      impuesto,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "মেয়াদ শেষে পাবেন", formato: "moneda", destacada: true },
    { clave: "depositado", etiqueta: "মোট জমা", formato: "moneda" },
    { clave: "interes", etiqueta: "মোট সুদ", formato: "moneda" },
    { clave: "impuesto", etiqueta: "উৎসে কর", formato: "moneda", ocultarSiCero: true },
  ],
});
