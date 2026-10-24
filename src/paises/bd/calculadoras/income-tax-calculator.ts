import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { liquidar, tasaMarginal, umbralDe } from "../lib/impuesto";

export default definirCalculadora({
  id: "bd.income-tax-calculator",
  mercado: "bd",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "bd.income-tax-slabs": "escala",
    "bd.tax-free-threshold": "mapa",
    "bd.disabled-child-extra": "numero",
    "bd.investment-rebate": "mapa",
    "bd.minimum-tax": "mapa",
    "bd.return-timing-rates": "mapa",
    "bd.return-timing-amounts": "mapa",
  },
  campos: [
    {
      id: "ingreso",
      tipo: "moneda",
      etiqueta: "বছরের মোট করযোগ্য আয়",
      ayuda: "সব খাতের আয় যোগ করে লিখুন। বেতনের করমুক্ত অংশ বাদ দিয়ে লিখবেন।",
      min: 0,
      porDefecto: 900000,
    },
    { id: "categoria", tipo: "opcion-dato", dato: "bd.tax-free-threshold", etiqueta: "করদাতার ধরন", porDefecto: "general" },
    { id: "hijos", tipo: "entero", etiqueta: "প্রতিবন্ধী সন্তান বা পোষ্যের সংখ্যা", ayuda: "পিতা ও মাতা দুজনেই করদাতা হলে একজন এই সুবিধা নেবেন।", min: 0, max: 10, porDefecto: 0 },
    { id: "inversion", tipo: "moneda", etiqueta: "রেয়াতযোগ্য বিনিয়োগ ও দান (বছরে)", ayuda: "সঞ্চয়পত্র, ডিপিএস, জীবন বিমার প্রিমিয়াম, ভবিষ্য তহবিলের চাঁদা, তালিকাভুক্ত শেয়ার ইত্যাদি।", min: 0, porDefecto: 0 },
    { id: "retenido", tipo: "moneda", etiqueta: "উৎসে কাটা ও অগ্রিম দেওয়া কর", min: 0, porDefecto: 0 },
    { id: "nuevo", tipo: "si-no", etiqueta: "এবারই প্রথম রিটার্ন দিচ্ছেন", porDefecto: false },
    {
      id: "momento",
      tipo: "opcion",
      etiqueta: "রিটার্ন কখন দাখিল করবেন",
      opciones: [
        { valor: "jul-sep", etiqueta: "১ জুলাই থেকে ৩০ সেপ্টেম্বর" },
        { valor: "oct-dec", etiqueta: "১ অক্টোবর থেকে ৩১ ডিসেম্বর" },
        { valor: "jan-mar", etiqueta: "১ জানুয়ারি থেকে ৩১ মার্চ" },
        { valor: "apr-jun", etiqueta: "১ এপ্রিল থেকে ৩০ জুন" },
      ],
      porDefecto: "oct-dec",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso < 0) throw new ErrorEntrada("আয় শূন্যের কম হতে পারে না।", "ingreso");
    const umbral = umbralDe(v, entrada.categoria, entrada.hijos);
    const l = liquidar(v, entrada.ingreso, umbral, entrada.inversion, entrada.nuevo);
    const impuesto = redondear(l.impuesto);
    const conRetenido = Math.max(0, impuesto - entrada.retenido);
    const tasas = v["bd.return-timing-rates"];
    const montos = v["bd.return-timing-amounts"];
    let ajuste = 0;
    const observaciones: string[] = [];
    if (entrada.momento === "jul-sep") {
      ajuste = -Math.min(porcentaje(conRetenido, enMapa(tasas, "incentive")), enMapa(montos, "incentive-max"));
    } else if (conRetenido > 0 && entrada.momento === "jan-mar") {
      ajuste = Math.max(porcentaje(conRetenido, enMapa(tasas, "late-jan-mar")), enMapa(montos, "late-jan-mar-min"));
    } else if (conRetenido > 0 && entrada.momento === "apr-jun") {
      ajuste = Math.max(porcentaje(conRetenido, enMapa(tasas, "late-apr-jun")), enMapa(montos, "late-apr-jun-min"));
    }
    if (l.despuesRebaja < l.minimo) observaciones.push("হিসাবে আসা কর ন্যূনতম করের চেয়ে কম, তাই ন্যূনতম কর দেখানো হয়েছে।");
    if (entrada.ingreso <= umbral) observaciones.push("আয় করমুক্ত সীমার মধ্যে, তাই কর দিতে হবে না। রিটার্ন দাখিলের বাধ্যবাধকতা থাকলে রিটার্ন তবুও দিতে হবে।");
    if (entrada.retenido > impuesto) observaciones.push("উৎসে কাটা কর প্রদেয় করের চেয়ে বেশি। বাড়তি অংশ ফেরত বা সমন্বয়ের জন্য রিটার্নে দাবি করতে পারেন।");
    return {
      impuesto,
      bruto: redondear(l.bruto),
      rebaja: redondear(l.rebaja),
      umbral,
      conRetenido: redondear(conRetenido),
      ajuste: redondear(ajuste),
      aPagar: redondear(conRetenido + ajuste),
      efectiva: entrada.ingreso > 0 ? (impuesto / entrada.ingreso) * 100 : 0,
      marginal: tasaMarginal(v, entrada.ingreso, umbral),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "বছরের মোট করদায়", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "রেয়াতের আগে কর", formato: "moneda" },
    { clave: "rebaja", etiqueta: "বিনিয়োগজনিত কর রেয়াত", formato: "moneda" },
    { clave: "umbral", etiqueta: "আপনার করমুক্ত সীমা", formato: "moneda" },
    { clave: "conRetenido", etiqueta: "উৎসে কাটা কর বাদে বাকি", formato: "moneda" },
    { clave: "ajuste", etiqueta: "সময় অনুযায়ী প্রণোদনা (−) বা অতিরিক্ত কর (+)", formato: "moneda", ocultarSiCero: true },
    { clave: "aPagar", etiqueta: "রিটার্নের সঙ্গে দিতে হবে", formato: "moneda" },
    { clave: "efectiva", etiqueta: "কার্যকর করহার", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "সর্বোচ্চ ধাপের হার", formato: "porcentaje", decimales: 0 },
  ],
});
