import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// Art. 51 y 52 de la ley del seguro social. Los supuestos de art. 52.1 (asegurado voluntario o aprendiz,
// un tercio) y los mínimos especiales del reglamento no entran: quedan en la observación.
export default definirCalculadora({
  id: "lb.end-of-service-calculator",
  mercado: "lb",
  concepto: "fondo-cesantia",
  slug: "end-of-service-calculator",
  estado: "publicado",
  requiere: { "lb.end-of-service": "mapa" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر في الشهر السابق لنشوء الحق بالليرة", min: 0, porDefecto: 30000000 },
    { id: "anios", tipo: "numero", etiqueta: "سنوات الخدمة", min: 0, max: 60, porDefecto: 10 },
    {
      id: "caso",
      tipo: "opcion",
      etiqueta: "سبب التصفية",
      opciones: [
        { valor: "full", etiqueta: "عشرون سنة خدمة أو بلوغ السن" },
        { valor: "left", etiqueta: "ترك العمل نهائيًا قبل عشرين سنة" },
        { valor: "disability", etiqueta: "عجز بنسبة 50% على الأقل" },
        { valor: "death", etiqueta: "وفاة الأجير" },
      ],
      porDefecto: "full",
    },
    { id: "sesenta", tipo: "si-no", etiqueta: "بلغت الستين من العمر", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر.", "salario");
    const m = v["lb.end-of-service"];
    const anios = entrada.anios;
    const base = anios * enMapa(m, "months-per-year");
    let meses = base;
    let nota = "شهر عن كل سنة خدمة";
    if (entrada.caso === "left" && anios < enMapa(m, "full-years")) {
      const pct = anios <= 5 ? enMapa(m, "up-to-5") : anios <= 10 ? enMapa(m, "up-to-10") : anios <= 15 ? enMapa(m, "up-to-15") : enMapa(m, "under-20");
      meses = (base * pct) / 100;
      nota = `${pct}% من التعويض بحسب مدة الاشتراك`;
    } else if (entrada.caso === "disability") {
      meses = Math.max(base, enMapa(m, "disability-months"));
      nota = "لا يقل عن أجر عشرين شهرًا";
    } else if (entrada.caso === "death") {
      meses = Math.max(base, enMapa(m, "death-min-months"));
      nota = "لا يقل عن راتب ستة أشهر";
    }
    const extra = entrada.sesenta && anios > enMapa(m, "full-years") ? (anios - enMapa(m, "full-years")) * enMapa(m, "extra-after-20") : 0;
    return {
      tenencia: redondear((meses + extra) * entrada.salario),
      meses: meses + extra,
      extra,
      nota,
      observaciones: ["هذا تقدير على أساس الأجر الذي أدخلته، وقد يختلف المبلغ الفعلي. اطلب كشف حسابك من مكتب الضمان."],
    };
  },
  resultado: [
    { clave: "tenencia", etiqueta: "تعويض نهاية الخدمة التقديري", formato: "moneda", destacada: true },
    { clave: "meses", etiqueta: "ما يعادله بأجر الأشهر", formato: "numero", decimales: 2 },
    { clave: "extra", etiqueta: "التعويض الإضافي بعد العشرين سنة (بالأشهر)", formato: "numero", decimales: 2, ocultarSiCero: true },
    { clave: "nota", etiqueta: "القاعدة المطبقة", formato: "texto" },
  ],
});
