import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lb.vat-calculator",
  mercado: "lb",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: { "lb.vat": "numero", "lb.vat-thresholds": "mapa" },
  campos: [
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "ماذا تريد أن تحسب؟",
      opciones: [
        { valor: "add", etiqueta: "إضافة الضريبة إلى السعر" },
        { valor: "extract", etiqueta: "استخراج الضريبة من سعر شامل" },
      ],
      porDefecto: "add",
    },
    { id: "monto", tipo: "moneda", etiqueta: "المبلغ بالليرة", min: 0, porDefecto: 1000000 },
    { id: "otraTasa", tipo: "porcentaje", etiqueta: "نسبة أخرى (اختياري)", ayuda: "تحل محل النسبة النافذة إن صدر قانون يعدلها.", min: 0, max: 100, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("أدخل المبلغ.", "monto");
    const tasa = entrada.otraTasa ?? v["lb.vat"];
    const neto = redondear(entrada.operacion === "add" ? entrada.monto : entrada.monto / (1 + tasa / 100));
    const total = entrada.operacion === "add" ? redondear(neto + porcentaje(neto, tasa)) : redondear(entrada.monto);
    return {
      impuesto: redondear(total - neto),
      neto,
      total,
      tasa,
      umbral: enMapa(v["lb.vat-thresholds"], "mandatory"),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "قيمة الضريبة", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "السعر قبل الضريبة", formato: "moneda" },
    { clave: "total", etiqueta: "السعر شامل الضريبة", formato: "moneda" },
    { clave: "tasa", etiqueta: "النسبة المطبقة", formato: "porcentaje" },
    { clave: "umbral", etiqueta: "رقم الأعمال الموجب للتسجيل الإلزامي", formato: "moneda" },
  ],
});
