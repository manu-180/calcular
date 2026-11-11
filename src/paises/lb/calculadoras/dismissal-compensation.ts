import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { mesesDeAviso } from "../lib/laboral";

export default definirCalculadora({
  id: "lb.dismissal-compensation",
  mercado: "lb",
  concepto: "indemnizacion-despido",
  slug: "dismissal-compensation",
  estado: "publicado",
  requiere: { "lb.abusive-dismissal": "mapa", "lb.notice": "mapa" },
  campos: [
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "من فسخ العقد؟",
      opciones: [
        { valor: "employer", etiqueta: "صاحب العمل (صرف تعسفي)" },
        { valor: "worker", etiqueta: "العامل (لغير الأسباب التي يجيزها القانون)" },
      ],
      porDefecto: "employer",
    },
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري بالليرة", min: 0, porDefecto: 30000000 },
    { id: "anios", tipo: "numero", etiqueta: "سنوات الخدمة", min: 0, max: 60, porDefecto: 5 },
    { id: "avisoCumplido", tipo: "si-no", etiqueta: "جرى احترام مهلة الإنذار", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const m = v["lb.abusive-dismissal"];
    const esEmpleador = entrada.quien === "employer";
    const min = enMapa(m, esEmpleador ? "employer-min" : "worker-min");
    const max = enMapa(m, esEmpleador ? "employer-max" : "worker-max");
    const aviso = entrada.avisoCumplido ? 0 : mesesDeAviso(v["lb.notice"], entrada.anios) * entrada.salario;
    return {
      minimo: redondear(min * entrada.salario),
      maximo: redondear(max * entrada.salario),
      aviso: redondear(aviso),
      totalMin: redondear(min * entrada.salario + aviso),
      totalMax: redondear(max * entrada.salario + aviso),
      paga: esEmpleador ? "يدفعه صاحب العمل للعامل" : "يدفعه العامل لصاحب العمل",
      observaciones: ["يحدد المجلس التحكيمي المبلغ داخل هذا المجال بحسب الوقائع. ويجب رفع الدعوى خلال شهر من الإبلاغ بالفسخ. وهذا الرقم منفصل عن تعويض نهاية الخدمة من الضمان."],
    };
  },
  resultado: [
    { clave: "totalMax", etiqueta: "أعلى مبلغ مع بدل الإنذار", formato: "moneda", destacada: true },
    { clave: "totalMin", etiqueta: "أدنى مبلغ مع بدل الإنذار", formato: "moneda" },
    { clave: "maximo", etiqueta: "الحد الأقصى للتعويض", formato: "moneda" },
    { clave: "minimo", etiqueta: "الحد الأدنى للتعويض", formato: "moneda" },
    { clave: "aviso", etiqueta: "بدل الإنذار", formato: "moneda", ocultarSiCero: true },
    { clave: "paga", etiqueta: "من يدفع", formato: "texto" },
  ],
});
