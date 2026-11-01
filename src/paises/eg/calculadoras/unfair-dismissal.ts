import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "eg.unfair-dismissal",
  mercado: "eg",
  concepto: "indemnizacion-despido",
  slug: "unfair-dismissal",
  estado: "publicado",
  requiere: { "eg.unfair-dismissal-months": "numero", "eg.notice-months": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "أجرك الشهري", min: 0, porDefecto: 10000 },
    { id: "anios", tipo: "numero", etiqueta: "سنوات الخدمة", min: 0, max: 60, porDefecto: 5, ayuda: "يمكنك إدخال كسر السنة، مثل 6.5." },
    { id: "sinPreaviso", tipo: "si-no", etiqueta: "أنهى صاحب العمل العقد دون مهلة الإخطار", porDefecto: true },
    { id: "mesesPreaviso", tipo: "numero", etiqueta: "أشهر الإخطار التي لم تُمنح لك", min: 0, max: 12, requerido: false, ayuda: "اتركه فارغًا إذا لم يُخطرك صاحب العمل أصلًا.", visibleSi: { sinPreaviso: [true] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("أدخل أجرك الشهري.", "salario");
    if (e.anios <= 0) throw new ErrorEntrada("أدخل سنوات خدمتك.", "anios");
    const meses = v["eg.unfair-dismissal-months"];
    const indemnizacion = redondear(e.salario * meses * e.anios);
    const faltante = e.sinPreaviso ? Math.min(e.mesesPreaviso ?? v["eg.notice-months"], v["eg.notice-months"]) : 0;
    const preaviso = redondear(e.salario * faltante);
    const observaciones: string[] = ["هذا هو الحد الأدنى للتعويض في القانون. المحكمة العمالية قد تقضي بأكثر منه بحسب الضرر."];
    if (!Number.isInteger(e.anios)) observaciones.push("كسر السنة محسوب بنسبته.");
    return {
      total: redondear(indemnizacion + preaviso),
      indemnizacion,
      preaviso,
      mesesIndemnizacion: meses * e.anios,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "إجمالي ما تستحقه على الأقل", formato: "moneda", destacada: true },
    { clave: "indemnizacion", etiqueta: "التعويض عن الفصل غير المشروع", formato: "moneda" },
    { clave: "preaviso", etiqueta: "مقابل مهلة الإخطار", formato: "moneda", ocultarSiCero: true },
    { clave: "mesesIndemnizacion", etiqueta: "عدد أشهر التعويض", formato: "meses", decimales: 1 },
  ],
});
