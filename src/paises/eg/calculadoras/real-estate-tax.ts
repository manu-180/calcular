import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "eg.real-estate-tax",
  mercado: "eg",
  concepto: "propio",
  slug: "real-estate-tax",
  estado: "publicado",
  requiere: { "eg.real-estate-tax": "numero" },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "قيمة البيع", min: 0, porDefecto: 3000000 },
    { id: "parte", tipo: "porcentaje", etiqueta: "نسبة حصة البائع في العقار", min: 0, max: 100, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.precio <= 0) throw new ErrorEntrada("أدخل قيمة البيع.", "precio");
    if (e.parte <= 0) throw new ErrorEntrada("أدخل نسبة حصة البائع.", "parte");
    const base = porcentaje(e.precio, e.parte);
    const impuesto = redondear(porcentaje(base, v["eg.real-estate-tax"]));
    return { impuesto, base: redondear(base), neto: redondear(base - impuesto) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "ضريبة التصرفات العقارية", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "قيمة حصة البائع", formato: "moneda" },
    { clave: "neto", etiqueta: "ما يتبقى للبائع بعد الضريبة", formato: "moneda" },
  ],
});
