import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Borrador: la tasa general del impuesto a las ventas no se pudo leer en istd.gov.jo (no respondió el
// 24/10/2026). Mientras tanto la universal «vat» tampoco entra: necesita la tasa verificada.
export default definirCalculadora({
  id: "jo.sales-tax-calculator",
  mercado: "jo",
  concepto: "iva",
  slug: "sales-tax-calculator",
  estado: "borrador",
  requiere: {
    "jo.gst": "numero",
  },
  campos: [
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "ماذا تريد أن تحسب؟",
      opciones: [
        { valor: "add", etiqueta: "إضافة الضريبة إلى سعر قبل الضريبة" },
        { valor: "extract", etiqueta: "استخراج الضريبة من سعر شامل الضريبة" },
      ],
      porDefecto: "add",
    },
    { id: "monto", tipo: "moneda", etiqueta: "المبلغ", min: 0, porDefecto: 100 },
    { id: "otraTasa", tipo: "porcentaje", etiqueta: "نسبة خاصة (اختياري)", ayuda: "لسلعة أو خدمة لها نسبة غير النسبة العامة.", min: 0, max: 100, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("أدخل المبلغ.", "monto");
    const tasa = entrada.otraTasa ?? v["jo.gst"];
    const neto = entrada.operacion === "add" ? entrada.monto : entrada.monto / (1 + tasa / 100);
    const netoR = redondear(neto);
    const total = entrada.operacion === "add" ? redondear(netoR + porcentaje(netoR, tasa)) : redondear(entrada.monto);
    return {
      impuesto: redondear(total - netoR),
      neto: netoR,
      total,
      tasa,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "قيمة الضريبة العامة على المبيعات", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "السعر قبل الضريبة", formato: "moneda" },
    { clave: "total", etiqueta: "السعر شامل الضريبة", formato: "moneda" },
    { clave: "tasa", etiqueta: "النسبة المطبقة", formato: "porcentaje" },
  ],
});
