import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { DIAS_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "jo.minimum-wage",
  mercado: "jo",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "jo.minimum-wage": "numero",
    "jo.working-hours": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "راتبك الشهري", ayuda: "لمقارنته بالحد الأدنى للأجور.", min: 0, porDefecto: 300 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario < 0) throw new ErrorEntrada("أدخل الراتب الشهري.", "salario");
    const minimo = v["jo.minimum-wage"];
    const semana = enMapa(v["jo.working-hours"], "weekly");
    const diferencia = redondear(entrada.salario - minimo);
    return {
      minimo,
      cumple: diferencia >= 0 ? "نعم، راتبك لا يقل عن الحد الأدنى" : "لا، راتبك أقل من الحد الأدنى",
      diferencia,
      diario: redondear(minimo / DIAS_MES),
      horario: redondear((minimo * 12) / (semana * 52)),
      anual: redondear(minimo * 12),
      observaciones: [
        "الأجر اليومي محسوب على 30 يومًا، وأجر الساعة على أسبوع العمل الكامل في القانون. لا يسري الحد الأدنى العام على عمال قطاع الألبسة المشمولين بعقد العمل الجماعي ولا على عمال المنازل غير الأردنيين.",
      ],
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "الحد الأدنى للأجور في الشهر", formato: "moneda", destacada: true },
    { clave: "cumple", etiqueta: "هل يبلغ راتبك الحد الأدنى؟", formato: "texto" },
    { clave: "diferencia", etiqueta: "الفرق بين راتبك والحد الأدنى", formato: "moneda" },
    { clave: "diario", etiqueta: "ما يعادله في اليوم", formato: "moneda" },
    { clave: "horario", etiqueta: "ما يعادله في الساعة تقريبًا", formato: "moneda" },
    { clave: "anual", etiqueta: "ما يعادله في السنة", formato: "moneda" },
  ],
});
