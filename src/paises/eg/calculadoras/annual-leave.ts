import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "eg.annual-leave",
  mercado: "eg",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "publicado",
  requiere: { "eg.annual-leave": "mapa" },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "مدة خدمتك بالأشهر", min: 0, max: 720, porDefecto: 24, ayuda: "مجموع خدمتك لدى صاحب العمل الحالي. لحساب الثلاثين يومًا تُضم الخدمة لدى أصحاب عمل سابقين." },
    { id: "edad", tipo: "entero", etiqueta: "سنك", min: 15, max: 80, porDefecto: 30 },
    { id: "discapacidad", tipo: "si-no", etiqueta: "من الأشخاص ذوي الإعاقة أو الأقزام", porDefecto: false },
    { id: "peligroso", tipo: "si-no", etiqueta: "تعمل في عمل خطر أو مضر بالصحة أو في منطقة نائية", porDefecto: false },
    { id: "salario", tipo: "moneda", etiqueta: "أجرك الشهري", min: 0, requerido: false, ayuda: "اختياري، لحساب مقابل الرصيد غير المستخدم." },
    { id: "pendientes", tipo: "numero", etiqueta: "أيام الرصيد غير المستخدمة", min: 0, max: 400, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    const m = v["eg.annual-leave"];
    if (e.meses < 0) throw new ErrorEntrada("أدخل مدة الخدمة.", "meses");
    let dias: number;
    let regla: string;
    if (e.discapacidad) {
      dias = enMapa(m, "disability");
      regla = "إجازة الأشخاص ذوي الإعاقة والأقزام";
    } else if (e.meses >= 120 || e.edad > 50) {
      dias = enMapa(m, "long");
      regla = "عشر سنوات خدمة أو سن فوق الخمسين";
    } else if (e.meses >= 12) {
      dias = enMapa(m, "standard");
      regla = "من السنة الثانية";
    } else if (e.meses >= 6) {
      dias = redondear((enMapa(m, "first-year") * e.meses) / 12);
      regla = "السنة الأولى، بنسبة مدة الخدمة";
    } else {
      dias = 0;
      regla = "لم تكمل ستة أشهر بعد";
    }
    const extra = e.peligroso && dias > 0 ? enMapa(m, "hazard") : 0;
    const total = dias + extra;
    const observaciones: string[] = [];
    if (dias === 0) observaciones.push("تستحق الإجازة السنوية بعد ستة أشهر على الأقل في خدمة صاحب العمل.");
    let valorPendiente: number | null = null;
    if (e.salario !== null && e.pendientes !== null) {
      valorPendiente = redondear((e.salario / 30) * e.pendientes);
      observaciones.push("مقابل الرصيد محسوب على أساس أجر يومي يساوي الأجر الشهري مقسومًا على 30.");
    }
    return { total, dias, extra, regla, valorPendiente, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "أيام الإجازة السنوية المستحقة", formato: "dias", destacada: true },
    { clave: "dias", etiqueta: "الإجازة الأساسية", formato: "dias" },
    { clave: "extra", etiqueta: "زيادة الأعمال الخطرة أو النائية", formato: "dias", ocultarSiCero: true },
    { clave: "regla", etiqueta: "القاعدة المطبقة", formato: "texto" },
    { clave: "valorPendiente", etiqueta: "مقابل الرصيد غير المستخدم", formato: "moneda" },
  ],
});
