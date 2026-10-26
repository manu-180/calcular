import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aniosServicio, CAMPO_ULTIMO_SALARIO } from "../lib/laboral";

export default definirCalculadora({
  id: "jo.unfair-dismissal-compensation",
  mercado: "jo",
  concepto: "indemnizacion-despido",
  slug: "unfair-dismissal-compensation",
  estado: "publicado",
  requiere: {
    "jo.unfair-dismissal": "mapa",
    "jo.notice": "numero",
  },
  campos: [
    CAMPO_ULTIMO_SALARIO,
    { id: "inicio", tipo: "fecha", etiqueta: "تاريخ بداية الخدمة", porDefecto: "2021-01-01" },
    { id: "fin", tipo: "fecha", etiqueta: "تاريخ الفصل", porDefecto: "hoy" },
    {
      id: "avisado",
      tipo: "si-no",
      etiqueta: "تسلمت إشعارًا خطيًا بالفصل قبل شهر على الأقل وتقاضيت أجره",
      porDefecto: false,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل آخر أجر شهري.", "salario");
    const { dias, anios } = aniosServicio(entrada.inicio, entrada.fin);
    const t = v["jo.unfair-dismissal"];
    const meses = Math.max(anios * enMapa(t, "per-year"), enMapa(t, "minimum"));
    const compensacion = redondear(meses * entrada.salario);
    const preaviso = entrada.avisado ? 0 : redondear(v["jo.notice"] * entrada.salario);
    return {
      total: redondear(compensacion + preaviso),
      compensacion,
      preaviso,
      meses: Math.round(meses * 100) / 100,
      anios: Math.round(anios * 100) / 100,
      dias,
      observaciones: [
        "التعويض تحكم به المحكمة إذا رفع العامل دعواه خلال ستين يومًا من تاريخ فصله وثبت أن الفصل تعسفي. وللمحكمة أن تأمر بإعادته إلى عمله بدل التعويض.",
        "يُضاف إلى ذلك ما تبقى من حقوقك الأخرى، مثل بدل الإجازات غير المستعملة.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "مجموع التعويض وبدل الإشعار", formato: "moneda", destacada: true },
    { clave: "compensacion", etiqueta: "التعويض عن الفصل التعسفي", formato: "moneda" },
    { clave: "preaviso", etiqueta: "بدل الإشعار", formato: "moneda", ocultarSiCero: true },
    { clave: "meses", etiqueta: "عدد أجور الأشهر في التعويض", formato: "numero", decimales: 2 },
    { clave: "anios", etiqueta: "مدة الخدمة بالسنوات", formato: "numero", decimales: 2 },
    { clave: "dias", etiqueta: "مدة الخدمة بالأيام", formato: "dias" },
  ],
});
