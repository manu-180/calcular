import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { formatearNumero } from "@/motor/formato";

const MEDIDA: Record<string, number> = { b5: 5, q3: 3, pen: 5, fam: 5, post: 3 };

export default definirCalculadora({
  id: "bd.sanchayapatra-calculator",
  mercado: "bd",
  concepto: "propio",
  slug: "sanchayapatra-calculator",
  estado: "publicado",
  requiere: {
    "bd.sanchayapatra-rates": "mapa",
    "bd.sanchayapatra-tier": "numero",
    "bd.tds-savings-certificate": "numero",
    "bd.tds-bank-interest": "numero",
    "bd.pensioner-tds-free-limit": "numero",
  },
  campos: [
    {
      id: "esquema",
      tipo: "opcion",
      etiqueta: "সঞ্চয় স্কিম",
      opciones: [
        { valor: "b5", etiqueta: "৫ বছর মেয়াদি বাংলাদেশ সঞ্চয়পত্র" },
        { valor: "q3", etiqueta: "৩ মাস অন্তর মুনাফাভিত্তিক সঞ্চয়পত্র" },
        { valor: "pen", etiqueta: "পেনশনার সঞ্চয়পত্র" },
        { valor: "fam", etiqueta: "পরিবার সঞ্চয়পত্র" },
        { valor: "post", etiqueta: "ডাকঘর সঞ্চয় ব্যাংক মেয়াদি হিসাব" },
      ],
      porDefecto: "fam",
    },
    { id: "monto", tipo: "moneda", etiqueta: "বিনিয়োগের পরিমাণ", min: 0, porDefecto: 500000 },
    { id: "anios", tipo: "entero", etiqueta: "কত বছর রাখবেন", ayuda: "মেয়াদ পূর্ণ হলে ৫ বছর (৩ মাস অন্তর ও ডাকঘরের হিসাবে ৩ বছর)।", min: 1, max: 5, porDefecto: 5 },
    {
      id: "acumulado",
      tipo: "moneda",
      etiqueta: "সব স্কিম মিলিয়ে আপনার মোট বিনিয়োগ",
      ayuda: "ঐচ্ছিক। খালি রাখলে এই বিনিয়োগটিকেই মোট ধরা হবে।",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("বিনিয়োগের পরিমাণ লিখুন।", "monto");
    const medida = MEDIDA[entrada.esquema];
    if (entrada.anios > medida) throw new ErrorEntrada(`এই স্কিমের মেয়াদ ${formatearNumero(medida, "bn-BD")} বছর।`, "anios");
    const acumulado = Math.max(entrada.acumulado ?? entrada.monto, entrada.monto);
    const nivel = acumulado > v["bd.sanchayapatra-tier"] ? "b" : "a";
    const tasa = enMapa(v["bd.sanchayapatra-rates"], `${entrada.esquema}-y${entrada.anios}-${nivel}`);
    const ganancia = redondear(porcentaje(entrada.monto, tasa) * entrada.anios);
    const exentoPension = entrada.esquema === "pen" && acumulado <= v["bd.pensioner-tds-free-limit"];
    const tasaImpuesto = exentoPension ? 0 : entrada.esquema === "post" ? v["bd.tds-bank-interest"] : v["bd.tds-savings-certificate"];
    const impuesto = redondear(porcentaje(ganancia, tasaImpuesto));
    const neto = redondear(ganancia - impuesto);
    const observaciones: string[] = [];
    if (exentoPension) observaciones.push("পেনশনার সঞ্চয়পত্রে মোট বিনিয়োগ সীমার মধ্যে, তাই মুনাফা থেকে উৎসে কর কাটা হবে না।");
    if (entrada.anios < medida) observaciones.push("মেয়াদের আগে ভাঙালে সেই বছরের জন্য নির্ধারিত কম হারে মুনাফা হিসাব হয়।");
    return {
      neto,
      ganancia,
      impuesto,
      mensual: redondear(neto / (entrada.anios * 12)),
      total: redondear(entrada.monto + neto),
      tasa,
      tasaImpuesto,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "উৎসে কর বাদে মোট মুনাফা", formato: "moneda", destacada: true },
    { clave: "ganancia", etiqueta: "মোট মুনাফা (কর কাটার আগে)", formato: "moneda" },
    { clave: "impuesto", etiqueta: "উৎসে কর", formato: "moneda" },
    { clave: "mensual", etiqueta: "গড়ে প্রতি মাসে হাতে", formato: "moneda" },
    { clave: "total", etiqueta: "আসল ও মুনাফা মিলিয়ে ফেরত", formato: "moneda" },
    { clave: "tasa", etiqueta: "প্রযোজ্য মুনাফার হার (বছরে)", formato: "porcentaje", decimales: 2 },
    { clave: "tasaImpuesto", etiqueta: "উৎসে করের হার", formato: "porcentaje", decimales: 0 },
  ],
});
