import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { DIAS_MES, diasEntre, sumarDias, sumarMeses } from "../lib/laboral";

export default definirCalculadora({
  id: "ps.notice-period",
  mercado: "ps",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: {
    "ps.notice": "numero",
    "ps.notice-weekly": "numero",
    "ps.probation": "numero",
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
    {
      id: "pago",
      tipo: "opcion",
      etiqueta: "طريقة دفع الأجر",
      opciones: [
        { valor: "monthly", etiqueta: "أجر شهري" },
        { valor: "weekly", etiqueta: "أجر يومي أو أسبوعي أو بالقطعة أو بالعمولة" },
      ],
      porDefecto: "monthly",
      visibleSi: { quien: ["worker"] },
    },
    { id: "aviso", tipo: "fecha", etiqueta: "تاريخ تسليم الإشعار", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", min: 0, porDefecto: 3000 },
    {
      id: "faltan",
      tipo: "entero",
      etiqueta: "أيام الإشعار التي لم يراعها صاحب العمل",
      ayuda: "إذا أنهى صاحب العمل العقد قبل نهاية مدة الإشعار فأدخل عدد الأيام الباقية منها. اتركه صفرًا إذا رُوعيت المدة كلها.",
      visibleSi: { quien: ["employer"] },
      min: 0,
      max: 62,
      porDefecto: 0,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const trabajador = entrada.quien === "worker";
    const semanal = trabajador && entrada.pago === "weekly";
    const fin = semanal ? sumarDias(entrada.aviso, v["ps.notice-weekly"] * 7) : sumarMeses(entrada.aviso, v["ps.notice"]);
    const dias = diasEntre(entrada.aviso, fin);
    const faltan = entrada.faltan ?? 0;
    if (faltan > dias) throw new ErrorEntrada("الأيام الباقية أكثر من مدة الإشعار.", "faltan");
    const compensacion = trabajador ? null : redondear((faltan * entrada.salario) / DIAS_MES);
    const observaciones = [
      trabajador
        ? "يجب أن يكون إخطار الاستقالة خطيًا وقبل ترك العمل بالمدة المبينة."
        : "يُرسل الإشعار بعلم الوصول. وللعامل الذي تلقاه أن يتغيب طوال النصف الثاني من مدته، ويُعد غيابه عملًا فعليًا.",
      "لا يلزم إشعار خلال فترة التجربة، فلكل طرف إنهاء العقد فيها.",
      "أجر اليوم محسوب على أساس 30 يومًا في الشهر.",
    ];
    return {
      fin,
      dias,
      mitad: trabajador ? null : sumarDias(entrada.aviso, Math.ceil(dias / 2)),
      compensacion,
      observaciones,
    };
  },
  resultado: [
    { clave: "fin", etiqueta: "تاريخ انتهاء مدة الإشعار", formato: "fecha", destacada: true },
    { clave: "dias", etiqueta: "مدة الإشعار", formato: "dias" },
    { clave: "mitad", etiqueta: "يجوز للعامل التغيب ابتداءً من", formato: "fecha" },
    { clave: "compensacion", etiqueta: "بدل الإشعار المستحق للعامل", formato: "moneda" },
  ],
});
