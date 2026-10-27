import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { CAMPO_DIAS_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "om.overtime-calculator",
  mercado: "om",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "om.overtime": "mapa",
    "om.overtime-urgent": "mapa",
    "om.working-hours": "mapa",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "الأجر الأساسي الشهري", min: 0, porDefecto: 400 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "وقت العمل الإضافي",
      opciones: [
        { valor: "day", etiqueta: "ساعات نهارية" },
        { valor: "night", etiqueta: "ساعات ليلية (من 9 مساءً إلى 5 صباحًا)" },
        { valor: "rest", etiqueta: "يوم الراحة الأسبوعية أو إجازة رسمية" },
      ],
      porDefecto: "day",
    },
    {
      id: "urgente",
      tipo: "si-no",
      etiqueta: "عمل إضافي دون موافقة العامل (جرد أو حادث أو ضغط غير عادي)",
      ayuda: "الحالات التي تجيز فيها المادة 72 تكليف العامل دون موافقته، وأجرها أعلى.",
      porDefecto: false,
    },
    { id: "horas", tipo: "numero", etiqueta: "عدد الساعات الإضافية", min: 0, max: 400, porDefecto: 10, visibleSi: { tipo: ["day", "night"] } },
    { id: "dias", tipo: "entero", etiqueta: "عدد أيام العمل في الراحة أو الإجازة", min: 0, max: 100, porDefecto: 1, visibleSi: { tipo: ["rest"] } },
    { id: "horasDia", tipo: "numero", etiqueta: "ساعات العمل العادية في اليوم", ayuda: "ثماني ساعات في القانون، وست ساعات للمسلمين في رمضان.", min: 1, max: 12, porDefecto: 8 },
    CAMPO_DIAS_MES,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("أدخل الأجر الأساسي الشهري.", "basico");
    const tabla = entrada.urgente ? v["om.overtime-urgent"] : v["om.overtime"];
    const recargo = enMapa(tabla, entrada.tipo);
    const diario = entrada.basico / entrada.diasMes;
    const hora = diario / entrada.horasDia;
    const observaciones = ["يجب أن يوافق العامل على العمل الإضافي، إلا في الحالات التي تعددها المادة 72."];
    if (entrada.horasDia > enMapa(v["om.working-hours"], "daily")) observaciones.push("ساعات العمل العادية التي أدخلتها أكثر من الحد اليومي في قانون العمل.");
    if (entrada.tipo === "rest") {
      const dias = entrada.dias ?? 0;
      observaciones.push(entrada.urgente
        ? "ويجوز بدل المبلغ تعويض العامل بيومي راحة عن كل يوم عمل في الإجازات الرسمية."
        : "ويجوز بدل المبلغ منح العامل يوم راحة تعويضيًا عن كل يوم عمل.");
      return {
        pago: redondear(porcentaje(diario, recargo) * dias),
        porUnidad: redondear(porcentaje(diario, recargo)),
        hora: redondear(hora),
        recargo,
        observaciones,
      };
    }
    const porHora = hora + porcentaje(hora, recargo);
    return {
      pago: redondear(porHora * (entrada.horas ?? 0)),
      porUnidad: redondear(porHora),
      hora: redondear(hora),
      recargo,
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "أجر العمل الإضافي", formato: "moneda", destacada: true },
    { clave: "porUnidad", etiqueta: "عن كل ساعة أو يوم إضافي", formato: "moneda" },
    { clave: "hora", etiqueta: "الأجر الأساسي للساعة", formato: "moneda" },
    { clave: "recargo", etiqueta: "الزيادة المطبقة", formato: "porcentaje" },
  ],
});
