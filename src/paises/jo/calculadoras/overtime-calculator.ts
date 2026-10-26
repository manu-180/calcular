import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { DIAS_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "jo.overtime-calculator",
  mercado: "jo",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "jo.overtime-premium": "mapa",
    "jo.working-hours": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري المعتاد", min: 0, porDefecto: 480 },
    { id: "horas", tipo: "numero", etiqueta: "ساعات العمل الإضافي في أيام العمل", min: 0, max: 400, porDefecto: 10 },
    { id: "horasDescanso", tipo: "numero", etiqueta: "ساعات العمل في العطلة الأسبوعية أو الأعياد أو العطل الرسمية", min: 0, max: 400, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    if (entrada.horas + entrada.horasDescanso <= 0) throw new ErrorEntrada("أدخل عدد الساعات الإضافية.", "horas");
    const t = v["jo.overtime-premium"];
    const hora = entrada.salario / DIAS_MES / enMapa(v["jo.working-hours"], "daily");
    const normal = redondear(porcentaje(entrada.horas * hora, enMapa(t, "regular")));
    const descanso = redondear(porcentaje(entrada.horasDescanso * hora, enMapa(t, "rest-day")));
    return {
      total: redondear(normal + descanso),
      normal,
      descanso,
      hora: redondear(hora),
      horaExtra: redondear(porcentaje(hora, enMapa(t, "regular"))),
      horaDescanso: redondear(porcentaje(hora, enMapa(t, "rest-day"))),
      observaciones: [
        "أجر الساعة المعتاد هنا هو الأجر الشهري مقسومًا على 30 يومًا ثم على ساعات اليوم في القانون. النسب حد أدنى، ويجوز الاتفاق على أكثر.",
        "لا يجوز تشغيل العامل ساعات إضافية إلا بموافقته.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "أجر العمل الإضافي", formato: "moneda", destacada: true },
    { clave: "normal", etiqueta: "عن الساعات الإضافية في أيام العمل", formato: "moneda", ocultarSiCero: true },
    { clave: "descanso", etiqueta: "عن ساعات العطل والأعياد", formato: "moneda", ocultarSiCero: true },
    { clave: "hora", etiqueta: "أجر الساعة المعتاد", formato: "moneda" },
    { clave: "horaExtra", etiqueta: "أجر الساعة الإضافية في يوم العمل", formato: "moneda" },
    { clave: "horaDescanso", etiqueta: "أجر الساعة في العطلة", formato: "moneda" },
  ],
});
