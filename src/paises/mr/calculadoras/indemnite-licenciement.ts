import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

type Mapa = Readonly<Record<string, number>>;

// Art. 31 de la convención colectiva general: porcentaje del salario global mensual medio por cada año,
// con fracciones de año, en tres tramos (1 a 5, 6 a 10, más de 10).
function porTramos(m: Mapa, anios: number): number {
  const t1 = Math.min(anios, 5);
  const t2 = Math.max(0, Math.min(anios, 10) - 5);
  const t3 = Math.max(0, anios - 10);
  return (t1 * enMapa(m, "1-5") + t2 * enMapa(m, "6-10") + t3 * enMapa(m, "plus-10")) / 100;
}

export default definirCalculadora({
  id: "mr.indemnite-licenciement",
  mercado: "mr",
  concepto: "indemnizacion-despido",
  slug: "indemnite-licenciement",
  estado: "publicado",
  requiere: { "mr.licenciement": "mapa", "mr.licenciement-collectif": "mapa", "mr.depart-retraite": "mapa" },
  campos: [
    {
      id: "motif",
      tipo: "opcion",
      etiqueta: "سبب انتهاء العقد",
      opciones: [
        { valor: "individuel", etiqueta: "فصل فردي من المشغل" },
        { valor: "collectif", etiqueta: "فصل جماعي لتقليص العمال" },
        { valor: "retraite", etiqueta: "الذهاب إلى التقاعد" },
      ],
      porDefecto: "individuel",
    },
    { id: "salaire", tipo: "moneda", etiqueta: "متوسط الأجر الشهري الإجمالي في آخر 12 شهرًا", ayuda: "كل ما تقاضيته مقابل العمل، دون تسديد المصاريف.", min: 0, porDefecto: 30000 },
    { id: "annees", tipo: "numero", etiqueta: "الأقدمية في المؤسسة بالسنوات", ayuda: "يمكن إدخال كسر السنة: 7,5 تعني سبع سنوات ونصفًا.", min: 0, max: 50, porDefecto: 8 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("أدخل متوسط الأجر الشهري.", "salaire");
    const observaciones: string[] = ["لا يستحق التعويض في حالة الخطأ الجسيم ولا إذا استقال العامل."];
    if (entrada.annees < 1) {
      observaciones.unshift("يُشترط أن تبلغ الأقدمية سنة على الأقل، وهي مدة اكتساب الحق في العطلة.");
      return { indemnite: 0, mois: 0, licenciement: 0, pourcentage: null, observaciones };
    }
    const licenciement = porTramos(v["mr.licenciement"], entrada.annees) * entrada.salaire;
    let indemnite = licenciement;
    let pourcentage: number | null = null;
    if (entrada.motif === "collectif") {
      indemnite = porTramos(v["mr.licenciement-collectif"], entrada.annees) * entrada.salaire;
    } else if (entrada.motif === "retraite") {
      const r = v["mr.depart-retraite"];
      pourcentage = entrada.annees > 20 ? enMapa(r, "plus-20") : entrada.annees >= 10 ? enMapa(r, "10-20") : entrada.annees >= 5 ? enMapa(r, "5-10") : enMapa(r, "1-5");
      indemnite = (licenciement * pourcentage) / 100;
      observaciones[0] = "تعويض الذهاب إلى التقاعد يُدفع لمن يترك العمل ليتقاضى معاش الشيخوخة.";
    }
    return {
      indemnite: redondear(indemnite),
      mois: indemnite / entrada.salaire,
      licenciement: redondear(licenciement),
      pourcentage,
      observaciones,
    };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "مبلغ التعويض", formato: "moneda", destacada: true },
    { clave: "mois", etiqueta: "ما يعادله بأشهر الأجر", formato: "numero", decimales: 2 },
    { clave: "licenciement", etiqueta: "تعويض الفصل الفردي المرجعي", formato: "moneda" },
    { clave: "pourcentage", etiqueta: "نسبة تعويض التقاعد من تعويض الفصل", formato: "porcentaje" },
  ],
});
