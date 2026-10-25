import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Artículos 2, 4 y 5 del חוק דמי מחלה: el primer día no se paga, el segundo y el tercero a la
// mitad y desde el cuarto completo, siempre dentro de los días acumulados (un día y medio por mes
// completo, hasta 90). Los días que se pagan se descuentan del saldo.
export default definirCalculadora({
  id: "il.dmei-machala",
  mercado: "il",
  concepto: "propio",
  slug: "dmei-machala",
  estado: "publicado",
  requiere: { "il.machala": "mapa" },
  campos: [
    { id: "yamim", tipo: "entero", etiqueta: "ימי המחלה ברצף", min: 1, max: 365, porDefecto: 4 },
    { id: "sacharYomi", tipo: "moneda", etiqueta: "השכר ליום עבודה", ayuda: "השכר שהייתם מקבלים אילו עבדתם באותו יום.", min: 0, porDefecto: 450 },
    { id: "chodashim", tipo: "entero", etiqueta: "חודשי עבודה מלאים אצל המעסיק", min: 0, max: 600, porDefecto: 12 },
    { id: "nutzlu", tipo: "numero", etiqueta: "ימי מחלה שכבר נוצלו", min: 0, max: 90, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.yamim < 1) throw new ErrorEntrada("הזינו לפחות יום מחלה אחד.", "yamim");
    if (e.sacharYomi <= 0) throw new ErrorEntrada("הזינו את השכר ליום עבודה.", "sacharYomi");
    const m = v["il.machala"];
    const tzvura = Math.max(0, Math.min(enMapa(m, "merbi"), e.chodashim * enMapa(m, "tzvira")) - e.nutzlu);
    let yitra = tzvura;
    let tashlum = 0;
    let meshulamim = 0;
    for (let d = 1; d <= e.yamim; d++) {
      const shiur = d === 1 ? enMapa(m, "yom-1") : d <= 3 ? enMapa(m, "yamim-2-3") : enMapa(m, "yom-4");
      if (shiur === 0) continue;
      if (yitra < 1) break;
      tashlum += porcentaje(e.sacharYomi, shiur);
      yitra -= 1;
      meshulamim += 1;
    }
    const observaciones: string[] = [];
    if (meshulamim < e.yamim - 1) observaciones.push("ימי המחלה הצבורים לא מספיקים לכל ההיעדרות. על הימים שמעבר ליתרה החוק לא מחייב תשלום.");
    return {
      tashlum: redondear(tashlum),
      meshulamim,
      leloTashlum: e.yamim - meshulamim,
      tzvura,
      yitra,
      observaciones,
    };
  },
  resultado: [
    { clave: "tashlum", etiqueta: "דמי מחלה מהמעסיק", formato: "moneda", destacada: true },
    { clave: "meshulamim", etiqueta: "ימים שמשולמים (מלא או חצי)", formato: "dias" },
    { clave: "leloTashlum", etiqueta: "ימים בלי תשלום", formato: "dias" },
    { clave: "tzvura", etiqueta: "ימי מחלה צבורים לפני ההיעדרות", formato: "dias", decimales: 1 },
    { clave: "yitra", etiqueta: "יתרת ימי מחלה אחרי ההיעדרות", formato: "dias", decimales: 1 },
  ],
});
