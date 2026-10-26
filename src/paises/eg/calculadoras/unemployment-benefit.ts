import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

const TRAMOS = ["w1", "w2", "w3", "w4"] as const;

export default definirCalculadora({
  id: "eg.unemployment-benefit",
  mercado: "eg",
  concepto: "propio",
  slug: "unemployment-benefit",
  estado: "publicado",
  requiere: { "eg.unemployment-rates": "mapa", "eg.unemployment-weeks": "mapa" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "أجر الاشتراك الأخير (شهريًا)", min: 0, porDefecto: 8000 },
    { id: "meses", tipo: "entero", etiqueta: "مدة اشتراكك في تأمين البطالة بالأشهر", min: 0, max: 600, porDefecto: 48 },
    { id: "primeraVez", tipo: "si-no", etiqueta: "هذه أول مرة تتعطل فيها", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("أدخل أجر الاشتراك الأخير.", "salario");
    const tasas = v["eg.unemployment-rates"];
    const plazos = v["eg.unemployment-weeks"];
    const observaciones: string[] = [];
    if (e.meses < 12) {
      observaciones.push("يشترط لتعويض البطالة اشتراك سنة على الأقل في هذا التأمين، منها الستة أشهر السابقة على التعطل متصلة.");
      return { total: 0, semanas: 0, semanal: 0, primerTramo: 0, ultimoTramo: 0, observaciones };
    }
    const semanas = e.primeraVez && e.meses > 36 ? enMapa(plazos, "extendida") : enMapa(plazos, "normal");
    const semanal = (e.salario * 12) / 52;
    let total = 0;
    for (let s = 0; s < semanas; s++) {
      const tramo = TRAMOS[Math.min(Math.floor(s / 4), TRAMOS.length - 1)];
      total += semanal * (enMapa(tasas, tramo) / 100);
    }
    observaciones.push("الأجر الأسبوعي محسوب من الأجر الشهري × 12 ÷ 52.");
    observaciones.push("يبدأ الصرف من اليوم الثامن بعد انتهاء الخدمة، ويتوقف عند الالتحاق بعمل جديد.");
    return {
      total: redondear(total),
      semanas,
      semanal: redondear(semanal),
      primerTramo: redondear(semanal * (enMapa(tasas, "w1") / 100)),
      ultimoTramo: redondear(semanal * (enMapa(tasas, semanas > 12 ? "w4" : "w3") / 100)),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "إجمالي تعويض البطالة التقريبي", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "أقصى مدة للصرف", formato: "semanas" },
    { clave: "primerTramo", etiqueta: "التعويض الأسبوعي في أول أربعة أسابيع", formato: "moneda" },
    { clave: "ultimoTramo", etiqueta: "التعويض الأسبوعي في آخر فترة", formato: "moneda" },
    { clave: "semanal", etiqueta: "أجرك الأسبوعي المستخدم", formato: "moneda" },
  ],
});
