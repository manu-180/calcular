import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// ביטוח לאומי: sueldo diario = ingresos de los 6 meses / 150. Cada porción del sueldo diario, medida
// contra el סכום בסיסי, se paga a su porcentaje (más bajo antes de los 28 años). Hay un máximo para
// los primeros 125 días de pago y otro desde el día 126.
export default definirCalculadora({
  id: "il.dmei-avtala",
  mercado: "il",
  concepto: "propio",
  slug: "dmei-avtala",
  estado: "publicado",
  requiere: { "il.avtala-schumim": "mapa", "il.avtala-shiurim": "mapa", "il.avtala-yamim": "mapa" },
  campos: [
    {
      id: "hachnasa6",
      tipo: "moneda",
      etiqueta: "סך ההכנסה ב-6 החודשים האחרונים",
      ayuda: "ההכנסה שממנה שולמו דמי ביטוח, ב-6 החודשים שלפני החודש שבו נרשמתם לראשונה בשירות התעסוקה.",
      min: 0,
      porDefecto: 60000,
    },
    {
      id: "gil",
      tipo: "opcion",
      etiqueta: "גיל",
      opciones: [
        { valor: "ad-25", etiqueta: "עד 25" },
        { valor: "25-28", etiqueta: "25 עד 28" },
        { valor: "28-35", etiqueta: "28 עד 35" },
        { valor: "35-45", etiqueta: "35 עד 45" },
        { valor: "45", etiqueta: "45 ומעלה" },
      ],
      porDefecto: "28-35",
    },
    { id: "tluyim", tipo: "si-no", etiqueta: "יש לכם 3 תלויים או יותר", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.hachnasa6 <= 0) throw new ErrorEntrada("הזינו את ההכנסה ב-6 החודשים האחרונים.", "hachnasa6");
    const s = v["il.avtala-schumim"];
    const bsisi = enMapa(s, "bsisi");
    const yomi = e.hachnasa6 / 150;
    const kvutza = e.gil === "ad-25" || e.gil === "25-28" ? "tzair" : "28";
    const sh = v["il.avtala-shiurim"];
    const gvulot = [0, bsisi / 2, (bsisi * 3) / 4, bsisi, bsisi * 5];
    let dmei = 0;
    for (let i = 0; i < 4; i++) {
      const chelek = Math.max(0, Math.min(yomi, gvulot[i + 1]) - gvulot[i]);
      dmei += porcentaje(chelek, enMapa(sh, `${kvutza}-${i + 1}`));
    }
    const max125 = enMapa(s, "max-125");
    const maxAcharei = enMapa(s, "max-acharei");
    const yamim = enMapa(v["il.avtala-yamim"], e.tluyim ? `${e.gil}-3` : e.gil);
    const rishonim = Math.min(yamim, 125);
    const sach = rishonim * Math.min(dmei, max125) + Math.max(0, yamim - 125) * Math.min(dmei, maxAcharei);
    const observaciones = ["הסכום ברוטו. מדמי האבטלה מנוכים מס הכנסה, דמי ביטוח לאומי ודמי ביטוח בריאות."];
    if (yamim > 125 && dmei > maxAcharei) observaciones.push("מהיום ה-126 התשלום ליום יורד לסכום המרבי השני.");
    return {
      sach: redondear(sach),
      dmeiYomi: redondear(Math.min(dmei, max125)),
      sacharYomi: redondear(yomi),
      yamim,
      observaciones,
    };
  },
  resultado: [
    { clave: "sach", etiqueta: "סך דמי האבטלה לכל התקופה (ברוטו)", formato: "moneda", destacada: true },
    { clave: "dmeiYomi", etiqueta: "דמי אבטלה ליום", formato: "moneda" },
    { clave: "sacharYomi", etiqueta: "השכר היומי הממוצע", formato: "moneda" },
    { clave: "yamim", etiqueta: "מספר הימים המרבי", formato: "dias" },
  ],
});
