import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// El NCSI publica la variación interanual del IPC cada mes; el índice por mes solo viene dibujado en el
// gráfico del informe. La cuenta usa esa tasa: cuánto vale hoy un monto de hace un año y cómo crecerían
// los precios si la tasa se mantuviera.
export default definirCalculadora({
  id: "om.inflation-calculator",
  mercado: "om",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "om.cpi-yoy": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "المبلغ", min: 0, porDefecto: 1000 },
    { id: "anios", tipo: "numero", etiqueta: "عدد السنوات", ayuda: "للتقدير بافتراض أن نسبة التضخم الحالية تبقى كما هي.", min: 0, max: 50, porDefecto: 5 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("أدخل المبلغ.", "importe");
    const serie = v["om.cpi-yoy"];
    const r = serie.valor / 100;
    const factor = Math.pow(1 + r, entrada.anios);
    return {
      haceUnAnio: redondear(entrada.importe * (1 + r)),
      futuro: redondear(entrada.importe * factor),
      poder: redondear(entrada.importe / factor),
      tasa: serie.valor,
      mes: serie.fecha,
      observaciones: ["التقدير للسنوات القادمة افتراضي. التضخم يتغير من شهر إلى آخر، والنسبة المستخدمة هي آخر نسبة سنوية نشرها المركز الوطني للإحصاء والمعلومات."],
    };
  },
  resultado: [
    { clave: "futuro", etiqueta: "ما يعادل المبلغ بعد هذه السنوات", formato: "moneda", destacada: true },
    { clave: "poder", etiqueta: "القوة الشرائية للمبلغ بعد هذه السنوات", formato: "moneda" },
    { clave: "haceUnAnio", etiqueta: "ما يعادل اليوم مبلغًا من قبل سنة", formato: "moneda" },
    { clave: "tasa", etiqueta: "التضخم السنوي (آخر نسبة)", formato: "porcentaje", decimales: 1 },
    { clave: "mes", etiqueta: "شهر البيانات", formato: "fecha" },
  ],
});
