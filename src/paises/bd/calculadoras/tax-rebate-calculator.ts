import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { rebaja } from "../lib/impuesto";

export default definirCalculadora({
  id: "bd.tax-rebate-calculator",
  mercado: "bd",
  concepto: "propio",
  slug: "tax-rebate-calculator",
  estado: "publicado",
  requiere: {
    "bd.investment-rebate": "mapa",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "বছরের মোট করযোগ্য আয়", min: 0, porDefecto: 1000000 },
    { id: "inversion", tipo: "moneda", etiqueta: "রেয়াতযোগ্য বিনিয়োগ ও দান (বছরে)", min: 0, porDefecto: 200000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("বছরের মোট আয় লিখুন।", "ingreso");
    const r = rebaja(v["bd.investment-rebate"], entrada.ingreso, entrada.inversion);
    const maximo = Math.min(r.porIngreso, r.tope);
    const necesaria = maximo / (enMapa(v["bd.investment-rebate"], "investment-pct") / 100);
    const faltante = Math.max(0, necesaria - entrada.inversion);
    const observaciones: string[] = [];
    if (faltante === 0) observaciones.push("আপনার বিনিয়োগে সর্বোচ্চ রেয়াত পাওয়া যাচ্ছে। এর বেশি বিনিয়োগে রেয়াত আর বাড়বে না।");
    return {
      rebaja: redondear(r.rebaja),
      porIngreso: redondear(r.porIngreso),
      porInversion: redondear(r.porInversion),
      tope: r.tope,
      necesaria: redondear(necesaria),
      faltante: redondear(faltante),
      observaciones,
    };
  },
  resultado: [
    { clave: "rebaja", etiqueta: "আপনার কর রেয়াত", formato: "moneda", destacada: true },
    { clave: "porIngreso", etiqueta: "আয়ের ভিত্তিতে সীমা", formato: "moneda" },
    { clave: "porInversion", etiqueta: "বিনিয়োগের ভিত্তিতে রেয়াত", formato: "moneda" },
    { clave: "tope", etiqueta: "আইনের সর্বোচ্চ সীমা", formato: "moneda" },
    { clave: "necesaria", etiqueta: "পূর্ণ রেয়াত পেতে মোট বিনিয়োগ", formato: "moneda" },
    { clave: "faltante", etiqueta: "আরও যত বিনিয়োগ লাগবে", formato: "moneda" },
  ],
});
