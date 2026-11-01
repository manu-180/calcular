import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_DIAS_MES, sumarDias } from "../lib/laboral";

export default definirCalculadora({
  id: "om.notice-period",
  mercado: "om",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: {
    "om.notice": "mapa",
  },
  campos: [
    {
      id: "pago",
      tipo: "opcion",
      etiqueta: "طريقة دفع الأجر",
      opciones: [
        { valor: "monthly", etiqueta: "أجر شهري" },
        { valor: "other", etiqueta: "أجر يومي أو أسبوعي أو بالقطعة" },
      ],
      porDefecto: "monthly",
    },
    { id: "contrato", tipo: "entero", etiqueta: "مدة الإخطار في العقد بالأيام", ayuda: "اتركها صفرًا إذا لم ينص العقد على مدة. تطبق المدة الأطول.", min: 0, max: 365, porDefecto: 0 },
    { id: "aviso", tipo: "fecha", etiqueta: "تاريخ تسليم الإخطار الكتابي", porDefecto: "hoy" },
    { id: "cumplidos", tipo: "entero", etiqueta: "أيام الإخطار التي عملها العامل فعلًا", ayuda: "إذا انتهى العقد قبل نهاية الإخطار، يستحق الطرف الآخر تعويضًا عن الباقي.", min: 0, max: 365, porDefecto: 0 },
    { id: "salario", tipo: "moneda", etiqueta: "آخر أجر شامل شهري", min: 0, porDefecto: 600 },
    CAMPO_DIAS_MES,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل آخر أجر شامل شهري.", "salario");
    const legal = enMapa(v["om.notice"], entrada.pago);
    const dias = Math.max(legal, entrada.contrato);
    if (entrada.cumplidos > dias) throw new ErrorEntrada("الأيام التي عملها أكثر من مدة الإخطار.", "cumplidos");
    const faltan = dias - entrada.cumplidos;
    return {
      dias,
      legal,
      fin: sumarDias(entrada.aviso, dias),
      faltan,
      compensacion: redondear((entrada.salario / entrada.diasMes) * faltan),
      observaciones: [
        "إذا كان العامل في إجازة عند تسليم إخطار صاحب العمل، يبدأ الإخطار من اليوم التالي لانتهاء الإجازة.",
        "خلال الإخطار من صاحب العمل يحق للعامل التغيب عشر ساعات مدفوعة الأجر في الأسبوع للبحث عن عمل جديد.",
      ],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "مدة الإخطار", formato: "dias", destacada: true },
    { clave: "fin", etiqueta: "آخر يوم في الإخطار", formato: "fecha" },
    { clave: "legal", etiqueta: "الحد الأدنى في القانون", formato: "dias" },
    { clave: "faltan", etiqueta: "أيام الإخطار غير المنفذة", formato: "dias" },
    { clave: "compensacion", etiqueta: "التعويض عن الأيام غير المنفذة", formato: "moneda" },
  ],
});
