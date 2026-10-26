import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sa.vat-calculator",
  mercado: "sa",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: {
    "sa.vat": "numero",
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
    { id: "monto", tipo: "moneda", etiqueta: "المبلغ", min: 0, porDefecto: 1000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("أدخل المبلغ.", "monto");
    const tasa = v["sa.vat"];
    const neto = entrada.operacion === "add" ? entrada.monto : entrada.monto / (1 + tasa / 100);
    const impuesto = redondear(porcentaje(neto, tasa));
    const netoR = redondear(neto);
    return {
      impuesto,
      neto: netoR,
      total: entrada.operacion === "add" ? redondear(netoR + impuesto) : redondear(entrada.monto),
      tasa,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "قيمة ضريبة القيمة المضافة", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "السعر قبل الضريبة", formato: "moneda" },
    { clave: "total", etiqueta: "السعر شامل الضريبة", formato: "moneda" },
    { clave: "tasa", etiqueta: "النسبة المطبقة", formato: "porcentaje" },
  ],
});
