import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aniosServicio, CAMPO_ULTIMO_SALARIO, DIAS_MES, parteRenuncia, salarioSemanal } from "../lib/laboral";

export default definirCalculadora({
  id: "ps.final-settlement",
  mercado: "ps",
  concepto: "liquidacion-final",
  slug: "final-settlement",
  estado: "publicado",
  requiere: {
    "ps.end-of-service": "numero",
    "ps.end-of-service-min": "numero",
    "ps.resignation-years": "mapa",
    "ps.unfair-dismissal": "mapa",
    "ps.notice": "numero",
  },
  campos: [
    CAMPO_ULTIMO_SALARIO,
    { id: "inicio", tipo: "fecha", etiqueta: "تاريخ بداية العمل", porDefecto: "2019-01-01" },
    { id: "fin", tipo: "fecha", etiqueta: "تاريخ انتهاء العمل", porDefecto: "hoy" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "كيف انتهى العمل؟",
      opciones: [
        { valor: "resignation", etiqueta: "استقالة العامل" },
        { valor: "justified", etiqueta: "ترك العمل لسبب من أسباب المادة 42 (1)" },
        { valor: "notice", etiqueta: "إنهاء من صاحب العمل مع إشعار قبل شهر" },
        { valor: "no-notice", etiqueta: "إنهاء من صاحب العمل دون إشعار" },
        { valor: "unfair", etiqueta: "فصل تعسفي" },
      ],
      porDefecto: "notice",
    },
    { id: "vacaciones", tipo: "numero", etiqueta: "أسابيع الإجازة السنوية غير المستعملة", min: 0, max: 10, porDefecto: 0 },
    { id: "pendientes", tipo: "entero", etiqueta: "أيام عمل لم تتقاضَ أجرها بعد", min: 0, max: 62, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل آخر أجر شهري.", "salario");
    const { anios } = aniosServicio(entrada.inicio, entrada.fin);
    const limites = v["ps.resignation-years"];
    const parte = entrada.motivo === "resignation" ? parteRenuncia(anios, { third: enMapa(limites, "third"), full: enMapa(limites, "full") }) : 1;
    const gratificacion = anios >= v["ps.end-of-service-min"] ? redondear(anios * v["ps.end-of-service"] * entrada.salario * parte) : 0;
    const sinAviso = entrada.motivo === "no-notice" || entrada.motivo === "unfair";
    const preaviso = sinAviso ? redondear(v["ps.notice"] * entrada.salario) : 0;
    const t = v["ps.unfair-dismissal"];
    const arbitrario = entrada.motivo === "unfair" ? redondear(Math.min(anios * enMapa(t, "per-year"), enMapa(t, "cap")) * entrada.salario) : 0;
    const vacaciones = redondear(entrada.vacaciones * salarioSemanal(entrada.salario));
    const sueldo = redondear((entrada.pendientes * entrada.salario) / DIAS_MES);
    const observaciones = ["أجر اليوم على أساس 30 يومًا في الشهر، وأجر الأسبوع هو الأجر الشهري في 12 مقسومًا على 52."];
    if (anios < v["ps.end-of-service-min"]) observaciones.push("لا تدخل مكافأة نهاية الخدمة لأن مدة العمل أقل من سنة.");
    if (entrada.motivo === "unfair") observaciones.push("التعويض عن الفصل التعسفي تقرره المحكمة المختصة، والدعوى العمالية معفاة من الرسوم.");
    return {
      total: redondear(gratificacion + preaviso + arbitrario + vacaciones + sueldo),
      gratificacion,
      preaviso,
      arbitrario,
      vacaciones,
      sueldo,
      anios: Math.round(anios * 100) / 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "مجموع المستحقات", formato: "moneda", destacada: true },
    { clave: "gratificacion", etiqueta: "مكافأة نهاية الخدمة", formato: "moneda", ocultarSiCero: true },
    { clave: "preaviso", etiqueta: "بدل الإشعار", formato: "moneda", ocultarSiCero: true },
    { clave: "arbitrario", etiqueta: "التعويض عن الفصل التعسفي", formato: "moneda", ocultarSiCero: true },
    { clave: "vacaciones", etiqueta: "بدل الإجازة السنوية غير المستعملة", formato: "moneda", ocultarSiCero: true },
    { clave: "sueldo", etiqueta: "أجر الأيام غير المدفوعة", formato: "moneda", ocultarSiCero: true },
    { clave: "anios", etiqueta: "مدة العمل بالسنوات", formato: "numero", decimales: 2 },
  ],
});
