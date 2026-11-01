import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { DIAS_MES, SEMANAS_ANIO } from "../lib/laboral";

export default definirCalculadora({
  id: "lb.minimum-wage",
  mercado: "lb",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "lb.minimum-wage": "numero",
    "lb.minimum-wage-daily": "numero",
    "lb.working-time": "mapa",
    "lb.nssf-ceiling-health": "numero",
  },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "أجرك الشهري بالليرة", ayuda: "لمقارنته بالحد الأدنى الرسمي.", min: 0, porDefecto: 30000000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario < 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const minimo = v["lb.minimum-wage"];
    const diferencia = redondear(entrada.salario - minimo);
    return {
      minimo,
      cumple: diferencia >= 0 ? "نعم، أجرك يبلغ الحد الأدنى" : "لا، أجرك دون الحد الأدنى",
      diferencia,
      diario: v["lb.minimum-wage-daily"],
      horario: redondear((minimo * 12) / (enMapa(v["lb.working-time"], "weekly") * SEMANAS_ANIO)),
      anual: redondear(minimo * 12),
      tope: v["lb.nssf-ceiling-health"],
      observaciones: [`الأجر اليومي هو الرقم الرسمي في المرسوم، وليس الأجر الشهري مقسومًا على ${DIAS_MES}. أجر الساعة تقدير على أساس الحد الأعلى لساعات الأسبوع في قانون العمل.`],
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "الحد الأدنى الرسمي في الشهر", formato: "moneda", destacada: true },
    { clave: "cumple", etiqueta: "هل يبلغ أجرك الحد الأدنى؟", formato: "texto" },
    { clave: "diferencia", etiqueta: "الفرق بين أجرك والحد الأدنى", formato: "moneda" },
    { clave: "diario", etiqueta: "الحد الأدنى الرسمي في اليوم", formato: "moneda" },
    { clave: "horario", etiqueta: "ما يعادله في الساعة تقريبًا", formato: "moneda" },
    { clave: "anual", etiqueta: "ما يعادله في السنة", formato: "moneda" },
    { clave: "tope", etiqueta: "الحد الأقصى للكسب في فرع المرض والأمومة", formato: "moneda" },
  ],
});
