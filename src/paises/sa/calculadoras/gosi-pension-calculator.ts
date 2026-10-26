import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Solo el sistema nuevo (ley de 1445): 2,25 % del promedio de los 180 meses mejor pagados por cada año
// aportado, con techo del 100 % del promedio. El sistema anterior tiene otra fórmula y no se cubre.
export default definirCalculadora({
  id: "sa.gosi-pension-calculator",
  mercado: "sa",
  concepto: "jubilacion",
  slug: "gosi-pension-calculator",
  estado: "publicado",
  requiere: {
    "sa.gosi-pension-formula": "mapa",
    "sa.gosi-cap": "numero",
  },
  campos: [
    {
      id: "promedio",
      tipo: "moneda",
      etiqueta: "متوسط الأجر الشهري الخاضع للاشتراك",
      ayuda: "متوسط أعلى الأجور المسجلة في التأمينات عن 180 شهرًا. إذا لم تعرفه فأدخل أجرك الحالي الخاضع للاشتراك (الأساسي مع بدل السكن).",
      min: 0,
      porDefecto: 15000,
    },
    { id: "meses", tipo: "entero", etiqueta: "عدد أشهر الاشتراك عند بلوغ سن التقاعد", min: 1, max: 720, porDefecto: 360 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.promedio <= 0) throw new ErrorEntrada("أدخل متوسط الأجر الشهري.", "promedio");
    const f = v["sa.gosi-pension-formula"];
    const promedio = Math.min(entrada.promedio, v["sa.gosi-cap"]);
    const calculado = (porcentaje(promedio, enMapa(f, "accrual")) * entrada.meses) / 12;
    const tope = promedio;
    let pension = Math.min(calculado, tope);
    const observaciones = ["هذه الحاسبة للمشمولين بنظام التأمينات الاجتماعية الجديد، والسن النظامية فيه 65 سنة. المدة اللازمة للاستحقاق يحددها قرار من مجلس الوزراء."];
    if (entrada.meses >= enMapa(f, "minimum-months") && pension < enMapa(f, "minimum")) {
      pension = enMapa(f, "minimum");
      observaciones.push("طُبق الحد الأدنى للمعاش لمن بلغت مدة اشتراكه 480 شهرًا.");
    } else if (entrada.meses < enMapa(f, "minimum-months")) {
      observaciones.push("لمن تقل مدته عن 480 شهرًا حد أدنى أقل يُنقص حسب المدة، ولا تحسبه هذه الحاسبة.");
    }
    if (entrada.promedio > v["sa.gosi-cap"]) observaciones.push("حُسب المتوسط على الحد الأعلى للأجر الخاضع للاشتراك.");
    return {
      pension: redondear(pension),
      tasaReemplazo: (pension / promedio) * 100,
      anios: entrada.meses / 12,
      calculado: redondear(calculado),
      observaciones,
    };
  },
  resultado: [
    { clave: "pension", etiqueta: "المعاش الشهري التقديري", formato: "moneda", destacada: true },
    { clave: "tasaReemplazo", etiqueta: "المعاش من متوسط الأجر", formato: "porcentaje", decimales: 1 },
    { clave: "anios", etiqueta: "سنوات الاشتراك", formato: "anios", decimales: 1 },
    { clave: "calculado", etiqueta: "المعاش حسب المعادلة قبل الحدود", formato: "moneda" },
  ],
});
