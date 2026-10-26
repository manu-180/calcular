import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { DIAS_MES, diasEntre, sumarMeses } from "../lib/laboral";

export default definirCalculadora({
  id: "jo.notice-period",
  mercado: "jo",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: {
    "jo.notice": "numero",
  },
  campos: [
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "من يُنهي العقد؟",
      opciones: [
        { valor: "worker", etiqueta: "العامل (استقالة)" },
        { valor: "employer", etiqueta: "صاحب العمل" },
      ],
      porDefecto: "worker",
    },
    { id: "aviso", tipo: "fecha", etiqueta: "تاريخ تسليم الإشعار الخطي", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", min: 0, porDefecto: 600 },
    {
      id: "faltan",
      tipo: "entero",
      etiqueta: "أيام الإشعار التي لم تُراعَ",
      ayuda: "إذا انتهى العمل قبل انقضاء مدة الإشعار، أدخل عدد الأيام الباقية منها. اتركه صفرًا إذا رُوعيت المدة كاملة.",
      min: 0,
      max: 366,
      porDefecto: 0,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const fin = sumarMeses(entrada.aviso, v["jo.notice"]);
    const dias = diasEntre(entrada.aviso, fin);
    if (entrada.faltan > dias) throw new ErrorEntrada("الأيام الباقية أكثر من مدة الإشعار.", "faltan");
    const compensacion = redondear((entrada.faltan * entrada.salario) / DIAS_MES);
    const trabajador = entrada.quien === "worker";
    return {
      fin,
      dias,
      compensacion,
      quienPaga: entrada.faltan === 0 ? "لا تعويض" : trabajador ? "يدفعه العامل لصاحب العمل" : "يدفعه صاحب العمل للعامل",
      observaciones: [
        trabajador
          ? "إذا ترك العامل العمل قبل انقضاء مدة الإشعار فلا يستحق أجرًا عن تلك الفترة، وعليه أن يعوض صاحب العمل بما يعادل أجره عنها."
          : "يبقى العقد ساريًا طوال مدة الإشعار وتُحسب من مدة الخدمة. لصاحب العمل أن يعفي العامل من العمل خلالها، وله أن يشغله إلا في الأيام السبعة الأخيرة، ويستحق العامل أجره عن المدة كلها.",
        "يُحسب أجر اليوم على أساس 30 يومًا في الشهر.",
      ],
    };
  },
  resultado: [
    { clave: "fin", etiqueta: "تاريخ انتهاء مدة الإشعار", formato: "fecha", destacada: true },
    { clave: "dias", etiqueta: "مدة الإشعار", formato: "dias" },
    { clave: "compensacion", etiqueta: "التعويض عن الأيام التي لم تُراعَ", formato: "moneda" },
    { clave: "quienPaga", etiqueta: "من يدفع التعويض", formato: "texto" },
  ],
});
