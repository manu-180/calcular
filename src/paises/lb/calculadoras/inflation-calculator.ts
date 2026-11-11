import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// El comunicado mensual de إدارة الإحصاء المركزي da la variación anual del IPC. Con esa tasa se estima
// cuánto vale un monto; no hay índice con fórmula oficial de actualización.
export default definirCalculadora({
  id: "lb.inflation-calculator",
  mercado: "lb",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: { "lb.cpi-yoy": "serie" },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "المبلغ بالليرة", min: 0, porDefecto: 1000000 },
    { id: "anios", tipo: "numero", etiqueta: "عدد السنوات", ayuda: "بافتراض أن النسبة الحالية تبقى ثابتة، وهذا نادرًا ما يحدث.", min: 0, max: 30, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("أدخل المبلغ.", "importe");
    const serie = v["lb.cpi-yoy"];
    const factor = Math.pow(1 + serie.valor / 100, entrada.anios);
    return {
      futuro: redondear(entrada.importe * factor),
      poder: redondear(entrada.importe / factor),
      tasa: serie.valor,
      mes: serie.fecha,
      observaciones: ["تقدير لا توقع. جمع الأسعار ما زال صعبًا في بعض المناطق بحسب إدارة الإحصاء المركزي، والتضخم يتغير من شهر إلى آخر."],
    };
  },
  resultado: [
    { clave: "futuro", etiqueta: "ما تحتاجه بعد هذه المدة لتشتري الشيء نفسه", formato: "moneda", destacada: true },
    { clave: "poder", etiqueta: "القوة الشرائية للمبلغ بعد هذه المدة", formato: "moneda" },
    { clave: "tasa", etiqueta: "التضخم السنوي، آخر رقم", formato: "porcentaje", decimales: 2 },
    { clave: "mes", etiqueta: "شهر الرقم", formato: "fecha" },
  ],
});
