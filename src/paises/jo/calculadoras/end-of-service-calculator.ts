import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aniosServicio, CAMPO_ULTIMO_SALARIO } from "../lib/laboral";

export default definirCalculadora({
  id: "jo.end-of-service-calculator",
  mercado: "jo",
  concepto: "propio",
  slug: "end-of-service-calculator",
  estado: "publicado",
  requiere: {
    "jo.end-of-service": "numero",
  },
  campos: [
    CAMPO_ULTIMO_SALARIO,
    { id: "inicio", tipo: "fecha", etiqueta: "تاريخ بداية الخدمة", porDefecto: "2021-01-01" },
    { id: "fin", tipo: "fecha", etiqueta: "تاريخ انتهاء الخدمة", porDefecto: "hoy" },
    {
      id: "ssc",
      tipo: "si-no",
      etiqueta: "كنت مشمولًا بالضمان الاجتماعي طوال الخدمة",
      ayuda: "المكافأة في قانون العمل للعامل غير الخاضع لأحكام قانون الضمان الاجتماعي.",
      porDefecto: false,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل آخر أجر شهري.", "salario");
    const { dias, anios } = aniosServicio(entrada.inicio, entrada.fin);
    const meses = anios * v["jo.end-of-service"];
    const monto = entrada.ssc ? 0 : redondear(meses * entrada.salario);
    const observaciones = entrada.ssc
      ? ["العامل المشمول بالضمان الاجتماعي لا يستحق مكافأة نهاية الخدمة بموجب قانون العمل، إلا إذا نص عليها عقده أو نظام المنشأة. حقه عند التقاعد في رواتب الضمان."]
      : ["تُحسب المكافأة على آخر أجر، وتُعطى عن كسور السنة مكافأة نسبية. إذا كان الأجر بالعمولة أو بالقطعة فيُعتمد متوسط آخر اثني عشر شهرًا."];
    return {
      monto,
      anios: Math.round(anios * 100) / 100,
      dias,
      meses: entrada.ssc ? 0 : Math.round(meses * 100) / 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "monto", etiqueta: "مكافأة نهاية الخدمة", formato: "moneda", destacada: true },
    { clave: "anios", etiqueta: "مدة الخدمة بالسنوات", formato: "numero", decimales: 2 },
    { clave: "dias", etiqueta: "مدة الخدمة بالأيام", formato: "dias" },
    { clave: "meses", etiqueta: "عدد أجور الأشهر المستحقة", formato: "numero", decimales: 2 },
  ],
});
