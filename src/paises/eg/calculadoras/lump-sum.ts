import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "eg.lump-sum",
  mercado: "eg",
  concepto: "propio",
  slug: "lump-sum",
  estado: "publicado",
  requiere: { "eg.lump-sum-rate": "numero", "eg.si-wage-max": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "متوسط أجر الاشتراك الشهري (أجر التسوية)", min: 0, porDefecto: 6000 },
    { id: "anios", tipo: "entero", etiqueta: "سنوات الاشتراك", min: 0, max: 50, porDefecto: 10 },
    { id: "meses", tipo: "entero", etiqueta: "أشهر إضافية", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("أدخل متوسط أجر الاشتراك.", "salario");
    const anios = e.anios + e.meses / 12;
    if (anios <= 0) throw new ErrorEntrada("أدخل مدة الاشتراك.", "anios");
    const base = Math.min(e.salario, v["eg.si-wage-max"]);
    const anual = base * 12;
    const porAnio = porcentaje(anual, v["eg.lump-sum-rate"]);
    const observaciones: string[] = [];
    if (e.salario > base) observaciones.push("أجر التسوية لا يتجاوز الحد الأقصى لأجر الاشتراك، فاستخدمنا الحد الأقصى.");
    if (e.meses > 0) observaciones.push("الأشهر الإضافية محسوبة بنسبتها من السنة.");
    return {
      total: redondear(porAnio * anios),
      porAnio: redondear(porAnio),
      anual: redondear(anual),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "تعويض الدفعة الواحدة", formato: "moneda", destacada: true },
    { clave: "porAnio", etiqueta: "عن كل سنة اشتراك", formato: "moneda" },
    { clave: "anual", etiqueta: "الأجر السنوي المستخدم", formato: "moneda" },
  ],
});
