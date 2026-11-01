import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aniosServicio, CAMPO_ULTIMO_SALARIO } from "../lib/laboral";

export default definirCalculadora({
  id: "ps.unfair-dismissal-compensation",
  mercado: "ps",
  concepto: "indemnizacion-despido",
  slug: "unfair-dismissal-compensation",
  estado: "publicado",
  requiere: {
    "ps.unfair-dismissal": "mapa",
    "ps.notice": "numero",
  },
  campos: [
    CAMPO_ULTIMO_SALARIO,
    { id: "inicio", tipo: "fecha", etiqueta: "تاريخ بداية العمل", porDefecto: "2022-01-01" },
    { id: "fin", tipo: "fecha", etiqueta: "تاريخ الفصل", porDefecto: "hoy" },
    { id: "sinAviso", tipo: "si-no", etiqueta: "فُصلت دون إشعار مسبق", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل آخر أجر شهري.", "salario");
    const { dias, anios } = aniosServicio(entrada.inicio, entrada.fin);
    const t = v["ps.unfair-dismissal"];
    const sinTope = anios * enMapa(t, "per-year");
    const meses = Math.min(sinTope, enMapa(t, "cap"));
    const compensacion = redondear(meses * entrada.salario);
    const preaviso = entrada.sinAviso ? redondear(v["ps.notice"] * entrada.salario) : 0;
    const observaciones = ["هذا التعويض يُضاف إلى بقية حقوق العامل، ومنها مكافأة نهاية الخدمة. والمحكمة هي التي تقرر أن الفصل تعسفي."];
    if (sinTope > meses) observaciones.push("بلغ التعويض حده الأعلى: أجر سنتين مهما طالت مدة العمل.");
    return {
      total: redondear(compensacion + preaviso),
      compensacion,
      preaviso,
      meses: Math.round(meses * 100) / 100,
      anios: Math.round(anios * 100) / 100,
      dias,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "المجموع", formato: "moneda", destacada: true },
    { clave: "compensacion", etiqueta: "التعويض عن الفصل التعسفي", formato: "moneda" },
    { clave: "preaviso", etiqueta: "بدل الإشعار", formato: "moneda", ocultarSiCero: true },
    { clave: "meses", etiqueta: "عدد أجور الأشهر في التعويض", formato: "numero", decimales: 2 },
    { clave: "anios", etiqueta: "مدة العمل بالسنوات", formato: "numero", decimales: 2 },
    { clave: "dias", etiqueta: "مدة العمل بالأيام", formato: "dias" },
  ],
});
