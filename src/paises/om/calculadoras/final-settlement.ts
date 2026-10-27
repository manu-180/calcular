import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aniosServicio, CAMPO_DIAS_MES, CAMPO_FIN, CAMPO_INICIO, CAMPO_SIN_GOCE } from "../lib/laboral";
import { CAMPO_NACIONALIDAD } from "../lib/spf";

export default definirCalculadora({
  id: "om.final-settlement",
  mercado: "om",
  concepto: "liquidacion-final",
  slug: "final-settlement",
  estado: "publicado",
  requiere: {
    "om.gratuity": "numero",
  },
  campos: [
    CAMPO_NACIONALIDAD,
    { id: "basico", tipo: "moneda", etiqueta: "آخر أجر أساسي شهري", min: 0, porDefecto: 400 },
    { id: "total", tipo: "moneda", etiqueta: "آخر أجر شامل شهري", ayuda: "الأساسي مع جميع العلاوات والبدلات.", min: 0, porDefecto: 550 },
    CAMPO_INICIO,
    CAMPO_FIN,
    { id: "articulo40", tipo: "si-no", etiqueta: "فصل دون إخطار لإحدى حالات المادة 40", porDefecto: false, visibleSi: { nacionalidad: ["expat"] } },
    CAMPO_SIN_GOCE,
    { id: "vacaciones", tipo: "numero", etiqueta: "رصيد الإجازة السنوية غير المستخدم بالأيام", min: 0, max: 400, porDefecto: 10 },
    { id: "pendientes", tipo: "numero", etiqueta: "أيام عمل لم يُدفع أجرها بعد", min: 0, max: 60, porDefecto: 0 },
    { id: "preaviso", tipo: "numero", etiqueta: "أيام الإخطار التي لم ينفذها صاحب العمل", ayuda: "إذا أنهى صاحب العمل العقد دون مراعاة مدة الإخطار.", min: 0, max: 365, porDefecto: 0 },
    CAMPO_DIAS_MES,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("أدخل آخر أجر أساسي شهري.", "basico");
    if (entrada.total < entrada.basico) throw new ErrorEntrada("الأجر الشامل لا يقل عن الأجر الأساسي.", "total");
    const { anios } = aniosServicio(entrada.inicio, entrada.fin, entrada.sinGoce);
    const expat = entrada.nacionalidad === "expat";
    const sinGratificacion = !expat || entrada.articulo40 === true;
    const diario = entrada.total / entrada.diasMes;
    const gratificacion = sinGratificacion ? 0 : redondear(entrada.basico * v["om.gratuity"] * anios);
    const vacaciones = redondear(diario * entrada.vacaciones);
    const sueldo = redondear(diario * entrada.pendientes);
    const preaviso = redondear(diario * entrada.preaviso);
    const observaciones: string[] = [];
    if (!expat) observaciones.push("العماني في القطاع الخاص لا تُحسب له مكافأة نهاية الخدمة من صاحب العمل، لأنه مؤمن عليه في صندوق الحماية الاجتماعية.");
    return {
      total: redondear(gratificacion + vacaciones + sueldo + preaviso),
      gratificacion,
      vacaciones,
      sueldo,
      preaviso,
      anios,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "مجموع المستحقات", formato: "moneda", destacada: true },
    { clave: "gratificacion", etiqueta: "مكافأة نهاية الخدمة", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "بدل رصيد الإجازة", formato: "moneda" },
    { clave: "sueldo", etiqueta: "أجر الأيام غير المدفوعة", formato: "moneda", ocultarSiCero: true },
    { clave: "preaviso", etiqueta: "تعويض الإخطار", formato: "moneda", ocultarSiCero: true },
    { clave: "anios", etiqueta: "مدة الخدمة المحتسبة", formato: "anios", decimales: 2 },
  ],
});
