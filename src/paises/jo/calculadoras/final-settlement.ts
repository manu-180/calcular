import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aniosServicio, CAMPO_ULTIMO_SALARIO, DIAS_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "jo.final-settlement",
  mercado: "jo",
  concepto: "liquidacion-final",
  slug: "final-settlement",
  estado: "publicado",
  requiere: {
    "jo.end-of-service": "numero",
    "jo.unfair-dismissal": "mapa",
    "jo.notice": "numero",
  },
  campos: [
    CAMPO_ULTIMO_SALARIO,
    { id: "inicio", tipo: "fecha", etiqueta: "تاريخ بداية الخدمة", porDefecto: "2021-01-01" },
    { id: "fin", tipo: "fecha", etiqueta: "تاريخ انتهاء الخدمة", porDefecto: "hoy" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "كيف انتهت الخدمة؟",
      opciones: [
        { valor: "resignation", etiqueta: "استقالة العامل مع مراعاة مدة الإشعار" },
        { valor: "notice", etiqueta: "إنهاء من صاحب العمل مع إشعار خطي قبل شهر" },
        { valor: "no-notice", etiqueta: "إنهاء من صاحب العمل دون إشعار" },
        { valor: "unfair", etiqueta: "فصل تعسفي حكمت به المحكمة" },
      ],
      porDefecto: "notice",
    },
    { id: "ssc", tipo: "si-no", etiqueta: "كنت مشمولًا بالضمان الاجتماعي", porDefecto: true },
    { id: "vacaciones", tipo: "numero", etiqueta: "أيام الإجازة السنوية غير المستعملة", min: 0, max: 120, porDefecto: 0 },
    { id: "pendientes", tipo: "entero", etiqueta: "أيام عمل لم تتقاضَ أجرها بعد", min: 0, max: 62, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل آخر أجر شهري.", "salario");
    const { anios } = aniosServicio(entrada.inicio, entrada.fin);
    const diario = entrada.salario / DIAS_MES;
    const sueldo = redondear(entrada.pendientes * diario);
    const vacaciones = redondear(entrada.vacaciones * diario);
    const sinAviso = entrada.motivo === "no-notice" || entrada.motivo === "unfair";
    const preaviso = sinAviso ? redondear(v["jo.notice"] * entrada.salario) : 0;
    const t = v["jo.unfair-dismissal"];
    const arbitrario = entrada.motivo === "unfair" ? redondear(Math.max(anios * enMapa(t, "per-year"), enMapa(t, "minimum")) * entrada.salario) : 0;
    const gratificacion = entrada.ssc ? 0 : redondear(anios * v["jo.end-of-service"] * entrada.salario);
    const observaciones = ["أجر اليوم محسوب على أساس 30 يومًا في الشهر."];
    if (entrada.ssc) observaciones.push("لا تدخل مكافأة نهاية الخدمة لأنك مشمول بالضمان الاجتماعي، إلا إذا نص عليها عقدك.");
    if (entrada.motivo === "unfair") observaciones.push("التعويض عن الفصل التعسفي تحكم به المحكمة في دعوى تُرفع خلال ستين يومًا من الفصل.");
    return {
      total: redondear(sueldo + vacaciones + preaviso + arbitrario + gratificacion),
      sueldo,
      vacaciones,
      preaviso,
      arbitrario,
      gratificacion,
      anios: Math.round(anios * 100) / 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "مجموع المستحقات", formato: "moneda", destacada: true },
    { clave: "sueldo", etiqueta: "أجر الأيام غير المدفوعة", formato: "moneda", ocultarSiCero: true },
    { clave: "vacaciones", etiqueta: "بدل الإجازة السنوية غير المستعملة", formato: "moneda", ocultarSiCero: true },
    { clave: "preaviso", etiqueta: "بدل الإشعار", formato: "moneda", ocultarSiCero: true },
    { clave: "arbitrario", etiqueta: "التعويض عن الفصل التعسفي", formato: "moneda", ocultarSiCero: true },
    { clave: "gratificacion", etiqueta: "مكافأة نهاية الخدمة", formato: "moneda", ocultarSiCero: true },
    { clave: "anios", etiqueta: "مدة الخدمة بالسنوات", formato: "numero", decimales: 2 },
  ],
});
