import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual, REQUIERE_IMPUESTO } from "../lib/impuesto";

export default definirCalculadora({
  id: "jo.income-tax-calculator",
  mercado: "jo",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: REQUIERE_IMPUESTO,
  campos: [
    {
      id: "ingreso",
      tipo: "moneda",
      etiqueta: "الدخل السنوي الإجمالي",
      ayuda: "مجموع رواتبك أو دخلك من العمل في السنة قبل الإعفاءات.",
      min: 0,
      porDefecto: 18000,
    },
    {
      id: "dependientes",
      tipo: "si-no",
      etiqueta: "أعيل زوجًا أو أولادًا أو والدين",
      ayuda: "المعال هو الزوج أو الأولاد أو الأصول أو الأقارب حتى الدرجة الثانية الذين تنفق عليهم.",
      porDefecto: false,
    },
    { id: "conyuge", tipo: "si-no", etiqueta: "من المعالين زوج أو زوجة", porDefecto: true, visibleSi: { dependientes: [true] } },
    { id: "hijos", tipo: "entero", etiqueta: "عدد الأولاد المعالين", min: 0, max: 20, porDefecto: 0, visibleSi: { dependientes: [true] } },
    {
      id: "facturas",
      tipo: "moneda",
      etiqueta: "فواتير العلاج والتعليم والإيجار وفوائد قرض السكن في السنة",
      ayuda: "النفقات الموثقة بفواتير. يُعفى منها مبلغ محدد عنك وعن زوجك وعن كل ولد، ويُطبَّق الحد الأقصى تلقائيًا.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("أدخل الدخل السنوي.", "ingreso");
    const r = impuestoAnual(
      entrada.ingreso,
      { dependientes: entrada.dependientes, conyuge: entrada.conyuge === true, hijos: entrada.hijos ?? 0, facturas: entrada.facturas },
      v,
    );
    const observaciones: string[] = [];
    if (entrada.facturas > r.exencionGastos) observaciones.push("الفواتير أكثر من الحد المسموح به، فاحتُسب الحد الأقصى فقط.");
    if (r.imponible === 0) observaciones.push("دخلك لا يتجاوز الإعفاءات، فلا تستحق عليه ضريبة دخل.");
    observaciones.push("يُقرّب الدخل الخاضع للضريبة والضريبة إلى الدينار الأدنى كما ينص القانون.");
    return {
      total: r.total,
      mensual: redondear(r.total / 12),
      impuesto: r.impuesto,
      contribucion: r.contribucion,
      exenciones: r.exenciones,
      imponible: r.imponible,
      marginal: r.tasaMarginal,
      efectiva: Math.round((r.total / entrada.ingreso) * 10000) / 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "ضريبة الدخل السنوية", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "ما يعادلها في الشهر", formato: "moneda" },
    { clave: "impuesto", etiqueta: "منها ضريبة الدخل حسب الشرائح", formato: "moneda" },
    { clave: "contribucion", etiqueta: "منها المساهمة الوطنية", formato: "moneda", ocultarSiCero: true },
    { clave: "exenciones", etiqueta: "مجموع الإعفاءات", formato: "moneda" },
    { clave: "imponible", etiqueta: "الدخل الخاضع للضريبة", formato: "moneda" },
    { clave: "marginal", etiqueta: "نسبة الشريحة الأعلى التي وصلتها", formato: "porcentaje" },
    { clave: "efectiva", etiqueta: "النسبة الفعلية من دخلك", formato: "porcentaje", decimales: 2 },
  ],
});
