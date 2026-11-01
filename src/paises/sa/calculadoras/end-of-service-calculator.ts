import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aniosServicio, CAMPO_SALARIO_FINAL, mmkafaa, MOTIVO_FIN } from "../lib/laboral";

export default definirCalculadora({
  id: "sa.end-of-service-calculator",
  mercado: "sa",
  concepto: "indemnizacion-despido",
  slug: "end-of-service-calculator",
  estado: "publicado",
  requiere: {
    "sa.eos": "mapa",
    "sa.eos-resignation": "mapa",
  },
  campos: [
    CAMPO_SALARIO_FINAL,
    { id: "inicio", tipo: "fecha", etiqueta: "تاريخ بداية الخدمة", porDefecto: "2019-01-01" },
    { id: "fin", tipo: "fecha", etiqueta: "تاريخ انتهاء الخدمة", porDefecto: "hoy" },
    MOTIVO_FIN,
    {
      id: "ausencias",
      tipo: "entero",
      etiqueta: "أيام غياب دون أجر لا تُحسب من الخدمة",
      ayuda: "يُعد الغياب دون أجر حتى عشرين يومًا متقطعة في سنة العمل جزءًا من الخدمة المستمرة. أدخل فقط ما زاد على ذلك.",
      min: 0,
      max: 20000,
      porDefecto: 0,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل آخر أجر شهري.", "salario");
    const { dias, anios } = aniosServicio(entrada.inicio, entrada.fin, entrada.ausencias);
    const r = mmkafaa(entrada.salario, anios, entrada.motivo, v["sa.eos"], v["sa.eos-resignation"]);
    const observaciones: string[] = [];
    if (entrada.motivo === "resignation") {
      if (r.factor === 0) observaciones.push("لا يستحق المستقيل مكافأة إذا قلت خدمته عن سنتين متتاليتين.");
      else if (r.factor < 1) observaciones.push("في الاستقالة يُصرف جزء من المكافأة حسب مدة الخدمة (المادة الخامسة والثمانون).");
    }
    if (entrada.motivo === "article-80") observaciones.push("الفسخ وفق المادة الثمانين يكون دون مكافأة، بشرط أن تتحقق إحدى الحالات الواردة فيها وأن تُتبع إجراءاتها.");
    return {
      mkafaa: redondear(r.monto),
      completa: redondear(r.completa),
      parte: r.factor * 100,
      meses: r.meses,
      anios,
      dias,
      observaciones,
    };
  },
  resultado: [
    { clave: "mkafaa", etiqueta: "مكافأة نهاية الخدمة المستحقة", formato: "moneda", destacada: true },
    { clave: "completa", etiqueta: "المكافأة الكاملة قبل خفض الاستقالة", formato: "moneda" },
    { clave: "parte", etiqueta: "النسبة المستحقة من المكافأة", formato: "porcentaje", decimales: 2 },
    { clave: "meses", etiqueta: "عدد رواتب الأشهر المستحقة", formato: "numero", decimales: 2 },
    { clave: "anios", etiqueta: "مدة الخدمة المحسوبة", formato: "anios", decimales: 2 },
    { clave: "dias", etiqueta: "أيام الخدمة", formato: "dias" },
  ],
});
