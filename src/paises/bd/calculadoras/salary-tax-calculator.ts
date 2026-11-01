import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { liquidar, umbralDe } from "../lib/impuesto";

export default definirCalculadora({
  id: "bd.salary-tax-calculator",
  mercado: "bd",
  concepto: "sueldo-neto",
  slug: "salary-tax-calculator",
  estado: "publicado",
  requiere: {
    "bd.income-tax-slabs": "escala",
    "bd.tax-free-threshold": "mapa",
    "bd.disabled-child-extra": "numero",
    "bd.investment-rebate": "mapa",
    "bd.minimum-tax": "mapa",
    "bd.salary-exempt-max": "numero",
  },
  campos: [
    {
      id: "mensual",
      tipo: "moneda",
      etiqueta: "মাসিক মোট বেতন",
      ayuda: "মূল বেতন, বাড়ি ভাড়া, চিকিৎসা ও যাতায়াত ভাতাসহ প্রতি মাসে যা পান।",
      min: 0,
      porDefecto: 60000,
    },
    { id: "bono", tipo: "moneda", etiqueta: "বছরে উৎসব বোনাস ও অন্যান্য প্রাপ্তি", min: 0, porDefecto: 0 },
    { id: "categoria", tipo: "opcion-dato", dato: "bd.tax-free-threshold", etiqueta: "করদাতার ধরন", porDefecto: "general" },
    { id: "pf", tipo: "moneda", etiqueta: "প্রতি মাসে ভবিষ্য তহবিলে আপনার চাঁদা", ayuda: "স্বীকৃত ভবিষ্য তহবিলের চাঁদা কর রেয়াতের বিনিয়োগ হিসেবে ধরা হয়।", min: 0, porDefecto: 0 },
    { id: "inversion", tipo: "moneda", etiqueta: "অন্যান্য রেয়াতযোগ্য বিনিয়োগ (বছরে)", ayuda: "সঞ্চয়পত্র, ডিপিএস, জীবন বিমার প্রিমিয়াম ইত্যাদি।", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.mensual <= 0) throw new ErrorEntrada("মাসিক বেতন লিখুন।", "mensual");
    const anual = entrada.mensual * 12 + entrada.bono;
    const exento = Math.min(anual / 3, v["bd.salary-exempt-max"]);
    const imponible = anual - exento;
    const umbral = umbralDe(v, entrada.categoria, 0);
    const l = liquidar(v, imponible, umbral, entrada.pf * 12 + entrada.inversion, false);
    const impuesto = redondear(l.impuesto);
    const mensualImpuesto = redondear(impuesto / 12);
    const observaciones: string[] = [];
    if (imponible <= umbral) observaciones.push("করযোগ্য বেতন করমুক্ত সীমার মধ্যে, তাই বেতন থেকে কর কাটা হবে না।");
    return {
      neto: redondear(entrada.mensual - mensualImpuesto - entrada.pf),
      mensualImpuesto,
      impuesto,
      anual: redondear(anual),
      exento: redondear(exento),
      imponible: redondear(imponible),
      rebaja: redondear(l.rebaja),
      efectiva: anual > 0 ? (impuesto / anual) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "মাসে হাতে পাবেন", formato: "moneda", destacada: true },
    { clave: "mensualImpuesto", etiqueta: "প্রতি মাসে বেতন থেকে কর", formato: "moneda" },
    { clave: "impuesto", etiqueta: "বছরের মোট কর", formato: "moneda" },
    { clave: "anual", etiqueta: "বছরের মোট বেতন", formato: "moneda" },
    { clave: "exento", etiqueta: "করমুক্ত অংশ", formato: "moneda" },
    { clave: "imponible", etiqueta: "করযোগ্য বেতন", formato: "moneda" },
    { clave: "rebaja", etiqueta: "বিনিয়োগজনিত কর রেয়াত", formato: "moneda", ocultarSiCero: true },
    { clave: "efectiva", etiqueta: "মোট বেতনের তুলনায় কর", formato: "porcentaje", decimales: 2 },
  ],
  mundo: { bruto: "mensual", periodoBruto: "mes", neto: "neto", periodoNeto: "mes" },
});
