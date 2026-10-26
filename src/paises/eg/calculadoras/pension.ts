import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "eg.pension",
  mercado: "eg",
  concepto: "jubilacion",
  slug: "pension",
  estado: "publicado",
  requiere: {
    "eg.pension-divisor": "numero",
    "eg.pension-cap": "numero",
    "eg.pension-floor": "numero",
    "eg.pension-min-months": "numero",
    "eg.si-wage-min": "numero",
    "eg.si-wage-max": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "متوسط أجر الاشتراك الشهري (أجر التسوية)",
      min: 0,
      porDefecto: 8000,
      ayuda: "متوسط الأجور التي اشتركت عنها طوال مدة الاشتراك، بعد زيادتها بمعدل التضخم كما تحسبها الهيئة.",
    },
    { id: "anios", tipo: "entero", etiqueta: "سنوات الاشتراك", min: 0, max: 50, porDefecto: 30 },
    { id: "meses", tipo: "entero", etiqueta: "أشهر إضافية", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("أدخل متوسط أجر الاشتراك.", "salario");
    const totalMeses = e.anios * 12 + e.meses;
    if (totalMeses <= 0) throw new ErrorEntrada("أدخل مدة الاشتراك.", "anios");
    const tope = v["eg.si-wage-max"];
    const base = Math.min(e.salario, tope);
    const observaciones: string[] = [];
    if (e.salario > tope) observaciones.push("أجر التسوية لا يتجاوز الحد الأقصى لأجر الاشتراك، فاستخدمنا الحد الأقصى.");
    if (totalMeses < v["eg.pension-min-months"]) {
      observaciones.push("مدة اشتراكك أقل من المدة اللازمة لمعاش الشيخوخة. قد تستحق تعويض الدفعة الواحدة بدلًا من المعاش.");
      return { pension: 0, porcentajeReemplazo: 0, calculado: 0, limite: null, observaciones };
    }
    const calculado = (base * (totalMeses / 12)) / v["eg.pension-divisor"];
    const maximo = porcentaje(base, v["eg.pension-cap"]);
    const minimo = porcentaje(v["eg.si-wage-min"], v["eg.pension-floor"]);
    const maximoAbsoluto = porcentaje(tope, v["eg.pension-cap"]);
    let pension = Math.min(calculado, maximo, maximoAbsoluto);
    let limite: string | null = pension < calculado ? "تم تطبيق الحد الأقصى للمعاش" : null;
    if (pension < minimo) {
      pension = minimo;
      limite = "تم رفع المعاش إلى الحد الأدنى";
    }
    return {
      pension: redondear(pension),
      porcentajeReemplazo: (pension / base) * 100,
      calculado: redondear(calculado),
      limite,
      observaciones,
    };
  },
  resultado: [
    { clave: "pension", etiqueta: "معاش الشيخوخة الشهري التقريبي", formato: "moneda", destacada: true },
    { clave: "porcentajeReemplazo", etiqueta: "نسبته من أجر التسوية", formato: "porcentaje", decimales: 1 },
    { clave: "calculado", etiqueta: "المعاش قبل تطبيق الحدين", formato: "moneda" },
    { clave: "limite", etiqueta: "ملاحظة على الحدين", formato: "texto" },
  ],
});
