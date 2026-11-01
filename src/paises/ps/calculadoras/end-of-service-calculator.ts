import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aniosServicio, CAMPO_ULTIMO_SALARIO, parteRenuncia } from "../lib/laboral";

export default definirCalculadora({
  id: "ps.end-of-service-calculator",
  mercado: "ps",
  concepto: "propio",
  slug: "end-of-service-calculator",
  estado: "publicado",
  requiere: {
    "ps.end-of-service": "numero",
    "ps.end-of-service-min": "numero",
    "ps.resignation-years": "mapa",
  },
  campos: [
    CAMPO_ULTIMO_SALARIO,
    { id: "inicio", tipo: "fecha", etiqueta: "تاريخ بداية العمل", porDefecto: "2019-01-01" },
    { id: "fin", tipo: "fecha", etiqueta: "تاريخ انتهاء العمل", porDefecto: "hoy" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "سبب انتهاء العمل",
      opciones: [
        { valor: "employer", etiqueta: "إنهاء من صاحب العمل أو باتفاق الطرفين أو بانتهاء العقد" },
        { valor: "resignation", etiqueta: "استقالة العامل" },
        { valor: "justified", etiqueta: "ترك العمل لسبب من أسباب المادة 42 (1)" },
      ],
      porDefecto: "employer",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل آخر أجر شهري.", "salario");
    const { dias, anios } = aniosServicio(entrada.inicio, entrada.fin);
    const m = v["ps.resignation-years"];
    const limites = { third: enMapa(m, "third"), full: enMapa(m, "full") };
    const completa = anios * v["ps.end-of-service"] * entrada.salario;
    const alcanza = anios >= v["ps.end-of-service-min"];
    const parte = entrada.motivo === "resignation" ? parteRenuncia(anios, limites) : 1;
    const monto = alcanza ? redondear(completa * parte) : 0;
    const observaciones = alcanza
      ? ["تُحسب المكافأة على آخر أجر دون أجر الساعات الإضافية، وتدخل كسور السنة في الحساب."]
      : ["لا تُستحق المكافأة قبل إتمام سنة من العمل."];
    if (alcanza && entrada.motivo === "resignation" && parte < 1) {
      observaciones.push("المستقيل يأخذ ثلث المكافأة في السنوات الخمس الأولى وثلثيها في الخمس التالية، وكاملة بعد عشر سنوات.");
    }
    return {
      monto,
      completa: alcanza ? redondear(completa) : 0,
      parte: Math.round(parte * 10000) / 100,
      anios: Math.round(anios * 100) / 100,
      dias,
      observaciones,
    };
  },
  resultado: [
    { clave: "monto", etiqueta: "مكافأة نهاية الخدمة المستحقة", formato: "moneda", destacada: true },
    { clave: "completa", etiqueta: "المكافأة الكاملة قبل حصة الاستقالة", formato: "moneda" },
    { clave: "parte", etiqueta: "النسبة المستحقة من المكافأة", formato: "porcentaje", decimales: 2 },
    { clave: "anios", etiqueta: "مدة العمل بالسنوات", formato: "numero", decimales: 2 },
    { clave: "dias", etiqueta: "مدة العمل بالأيام", formato: "dias" },
  ],
});
