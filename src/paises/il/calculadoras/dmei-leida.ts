import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// ביטוח לאומי: el monto diario es el mayor entre el sueldo de los 3 meses completos anteriores
// dividido por 90 y el de los 6 meses dividido por 180, con tope diario.
export default definirCalculadora({
  id: "il.dmei-leida",
  mercado: "il",
  concepto: "propio",
  slug: "dmei-leida",
  estado: "publicado",
  requiere: { "il.dmei-leida-max": "numero", "il.dmei-leida-yamim": "mapa" },
  campos: [
    { id: "sachar3", tipo: "moneda", etiqueta: "סך השכר ב-3 החודשים המלאים האחרונים", ayuda: "השכר ברוטו שממנו שולמו דמי ביטוח לאומי.", min: 0, porDefecto: 36000 },
    { id: "sachar6", tipo: "moneda", etiqueta: "סך השכר ב-6 החודשים המלאים האחרונים", ayuda: "לא חובה. אם השכר היה גבוה יותר קודם, ייתכן שהחישוב לפי 6 חודשים ייתן יותר.", min: 0, requerido: false },
    {
      id: "zakaut",
      tipo: "opcion",
      etiqueta: "תקופת הזכאות",
      opciones: [
        { valor: "male", etiqueta: "מלאה: שולמו דמי ביטוח 10 חודשים מתוך 14 (או 15 מתוך 22)" },
        { valor: "chelki", etiqueta: "חלקית: שולמו דמי ביטוח 6 חודשים מתוך 14" },
      ],
      porDefecto: "male",
    },
    { id: "yeladim", tipo: "entero", etiqueta: "מספר הילודים בלידה", min: 1, max: 6, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.sachar3 <= 0) throw new ErrorEntrada("הזינו את השכר ב-3 החודשים האחרונים.", "sachar3");
    const lefi3 = e.sachar3 / 90;
    const lefi6 = e.sachar6 ? e.sachar6 / 180 : 0;
    const max = v["il.dmei-leida-max"];
    const yomi = redondear(Math.min(max, Math.max(lefi3, lefi6)));
    const m = v["il.dmei-leida-yamim"];
    const yamim = enMapa(m, e.zakaut) + (e.yeladim - 1) * enMapa(m, e.zakaut === "male" ? "tosefet-male" : "tosefet-chelki");
    const observaciones = ["הסכום ברוטו. מדמי הלידה מנוכים מס הכנסה, דמי ביטוח לאומי ודמי ביטוח בריאות."];
    if (Math.max(lefi3, lefi6) > max) observaciones.push("השכר היומי עובר את הסכום המרבי, ולכן התשלום ליום הוא הסכום המרבי.");
    return {
      sach: redondear(yomi * yamim),
      yomi,
      yamim,
      shavuot: yamim / 7,
      observaciones,
    };
  },
  resultado: [
    { clave: "sach", etiqueta: "סך דמי הלידה (ברוטו)", formato: "moneda", destacada: true },
    { clave: "yomi", etiqueta: "דמי לידה ליום", formato: "moneda" },
    { clave: "yamim", etiqueta: "ימי זכאות", formato: "dias" },
    { clave: "shavuot", etiqueta: "שבועות", formato: "semanas" },
  ],
});
