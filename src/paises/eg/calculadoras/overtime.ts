import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "eg.overtime",
  mercado: "eg",
  concepto: "horas-extra",
  slug: "overtime",
  estado: "publicado",
  requiere: { "eg.overtime": "mapa" },
  campos: [
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "كيف تعرف أجرك؟",
      opciones: [
        { valor: "mensual", etiqueta: "أعرف أجري الشهري" },
        { valor: "hora", etiqueta: "أعرف أجر الساعة" },
      ],
      porDefecto: "mensual",
    },
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", min: 0, porDefecto: 9000, visibleSi: { base: ["mensual"] } },
    { id: "horasDia", tipo: "numero", etiqueta: "ساعات العمل الأصلية في اليوم", min: 1, max: 12, porDefecto: 8, visibleSi: { base: ["mensual"] } },
    { id: "valorHora", tipo: "moneda", etiqueta: "أجر الساعة الأصلية", min: 0, porDefecto: 40, visibleSi: { base: ["hora"] } },
    { id: "horasDiurnas", tipo: "numero", etiqueta: "ساعات إضافية نهارية", min: 0, max: 500, porDefecto: 10 },
    { id: "horasNocturnas", tipo: "numero", etiqueta: "ساعات إضافية ليلية", min: 0, max: 500, porDefecto: 0 },
    { id: "diasDescanso", tipo: "entero", etiqueta: "أيام راحة أسبوعية عملت فيها", min: 0, max: 31, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    const m = v["eg.overtime"];
    let hora: number;
    let horasDia: number;
    const observaciones: string[] = [];
    if (e.base === "mensual") {
      const salario = e.salario ?? 0;
      horasDia = e.horasDia ?? 8;
      if (salario <= 0) throw new ErrorEntrada("أدخل أجرك الشهري.", "salario");
      hora = salario / 30 / horasDia;
      observaciones.push("أجر الساعة محسوب على أساس الأجر الشهري مقسومًا على 30 يومًا ثم على ساعات اليوم.");
    } else {
      hora = e.valorHora ?? 0;
      horasDia = 8;
      if (hora <= 0) throw new ErrorEntrada("أدخل أجر الساعة.", "valorHora");
    }
    const diurno = redondear(e.horasDiurnas * hora * (1 + enMapa(m, "day") / 100));
    const nocturno = redondear(e.horasNocturnas * hora * (1 + enMapa(m, "night") / 100));
    const descanso = redondear(e.diasDescanso * hora * horasDia * (enMapa(m, "rest") / 100));
    if (e.diasDescanso > 0) observaciones.push("عن كل يوم راحة عملت فيه يمنحك صاحب العمل أيضًا يومًا آخر بدلًا منه خلال الأسبوع التالي.");
    return {
      total: redondear(diurno + nocturno + descanso),
      diurno,
      nocturno,
      descanso,
      valorHora: redondear(hora),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "أجر العمل الإضافي", formato: "moneda", destacada: true },
    { clave: "diurno", etiqueta: "الساعات النهارية", formato: "moneda", ocultarSiCero: true },
    { clave: "nocturno", etiqueta: "الساعات الليلية", formato: "moneda", ocultarSiCero: true },
    { clave: "descanso", etiqueta: "أيام الراحة الأسبوعية", formato: "moneda", ocultarSiCero: true },
    { clave: "valorHora", etiqueta: "أجر الساعة الأصلية", formato: "moneda" },
  ],
});
