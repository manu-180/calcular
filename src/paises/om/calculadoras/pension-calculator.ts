import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Estimación del art. 73 sin revalorizar los salarios: 2 % del salario promedio (con el tope del ramo)
// por año de servicio. La garantía en efectivo del régimen anterior (art. 74) no entra.
export default definirCalculadora({
  id: "om.pension-calculator",
  mercado: "om",
  concepto: "jubilacion",
  slug: "pension-calculator",
  estado: "publicado",
  requiere: {
    "om.pension-accrual": "numero",
    "om.spf-cap": "numero",
    "om.old-age": "numero",
    "om.women-early-years": "numero",
    "om.early-reduction": "mapa",
  },
  campos: [
    { id: "promedio", tipo: "moneda", etiqueta: "متوسط أجرك الشهري الخاضع للاشتراك", min: 0, porDefecto: 900 },
    { id: "anios", tipo: "numero", etiqueta: "سنوات الخدمة الفعلية", min: 0, max: 50, porDefecto: 30 },
    { id: "edad", tipo: "entero", etiqueta: "العمر عند التقاعد", min: 30, max: 80, porDefecto: 60 },
    {
      id: "sexo",
      tipo: "opcion",
      etiqueta: "الجنس",
      opciones: [
        { valor: "male", etiqueta: "رجل" },
        { valor: "female", etiqueta: "امرأة" },
      ],
      porDefecto: "male",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.promedio <= 0) throw new ErrorEntrada("أدخل متوسط أجرك الشهري.", "promedio");
    if (entrada.anios <= 0) throw new ErrorEntrada("أدخل سنوات الخدمة.", "anios");
    const vejez = v["om.old-age"];
    const sinReduccion = entrada.sexo === "female" ? vejez - v["om.women-early-years"] : vejez;
    const faltan = Math.max(0, sinReduccion - entrada.edad);
    if (faltan > 0 && entrada.anios < 30 && (faltan > 5 || entrada.anios < 20)) {
      throw new ErrorEntrada("بهذا العمر ومدة الخدمة لا يجوز طلب التقاعد المبكر: يلزم 20 عامًا من الخدمة قبل السن بخمسة أعوام على الأكثر، أو 30 عامًا دون اشتراط سن.", "edad");
    }
    const r = v["om.early-reduction"];
    const reduccion = Math.min(faltan, 5) * enMapa(r, "first5") + Math.max(0, faltan - 5) * enMapa(r, "beyond");
    const base = Math.min(entrada.promedio, v["om.spf-cap"]);
    const bruto = porcentaje(base, v["om.pension-accrual"]) * entrada.anios;
    const pension = bruto - porcentaje(bruto, reduccion);
    const observaciones = [
      "تقدير مبسط: القانون يعيد تقييم الأجور سنويًا بمتوسط نمو الأجور، ويحسب مدة الخدمة السابقة لعام 2024 على الراتب الأخير المعاد تقييمه، وقد يضمن حدًا أدنى نقديًا لمن له مدة في النظام السابق.",
    ];
    return {
      pension: redondear(pension),
      reduccion,
      sinReduccion,
      tasa: v["om.pension-accrual"] * entrada.anios,
      observaciones,
    };
  },
  resultado: [
    { clave: "pension", etiqueta: "المعاش الشهري التقديري", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "نسبة المعاش من متوسط الأجر قبل الخصم", formato: "porcentaje" },
    { clave: "reduccion", etiqueta: "نسبة خصم التقاعد المبكر", formato: "porcentaje" },
    { clave: "sinReduccion", etiqueta: "سن التقاعد دون خصم", formato: "anios" },
  ],
});
