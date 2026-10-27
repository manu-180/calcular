import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aniosServicio, CAMPO_FIN, CAMPO_INICIO, CAMPO_SIN_GOCE } from "../lib/laboral";

export default definirCalculadora({
  id: "om.end-of-service-gratuity",
  mercado: "om",
  concepto: "indemnizacion-despido",
  slug: "end-of-service-gratuity",
  estado: "publicado",
  requiere: {
    "om.gratuity": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "آخر أجر أساسي شهري", ayuda: "الأجر المتفق عليه في العقد مع العلاوة الدورية، دون البدلات.", min: 0, porDefecto: 400 },
    CAMPO_INICIO,
    CAMPO_FIN,
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "سبب انتهاء الخدمة",
      opciones: [
        { valor: "normal", etiqueta: "انتهاء العقد أو الاستقالة أو الإنهاء بإخطار" },
        { valor: "article-40", etiqueta: "فصل دون إخطار لإحدى حالات المادة 40" },
      ],
      porDefecto: "normal",
    },
    CAMPO_SIN_GOCE,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("أدخل آخر أجر أساسي شهري.", "basico");
    const { dias, anios } = aniosServicio(entrada.inicio, entrada.fin, entrada.sinGoce);
    const sinDerecho = entrada.motivo === "article-40";
    const mensual = entrada.basico * v["om.gratuity"];
    const observaciones = [
      "تخص المكافأة العامل غير المنتفع بقانون الحماية الاجتماعية، أي العامل غير العماني في القطاع الخاص.",
    ];
    if (sinDerecho) observaciones.push("المادة 40 تجيز لصاحب العمل الفصل دون إخطار ودون مكافأة نهاية الخدمة في الحالات التي تعددها، مثل انتحال شخصية غير صحيحة أو التزوير للحصول على العمل.");
    return {
      gratificacion: sinDerecho ? 0 : redondear(mensual * anios),
      anios,
      dias,
      porAnio: redondear(mensual),
      observaciones,
    };
  },
  resultado: [
    { clave: "gratificacion", etiqueta: "مكافأة نهاية الخدمة", formato: "moneda", destacada: true },
    { clave: "anios", etiqueta: "مدة الخدمة المحتسبة", formato: "anios", decimales: 2 },
    { clave: "dias", etiqueta: "أيام الخدمة المحتسبة", formato: "dias" },
    { clave: "porAnio", etiqueta: "المكافأة عن كل عام", formato: "moneda" },
  ],
});
