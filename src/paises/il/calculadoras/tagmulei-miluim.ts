import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// ביטוח לאומי: el día de reserva es el bruto de los 3 meses anteriores dividido por 90, entre un
// mínimo y un máximo diarios. Se suman los días de la «תוספת 40%» según el resto de días / 7, y el
// autónomo cobra además un 25% del תגמול, con el total del día topeado en el máximo diario.
export default definirCalculadora({
  id: "il.tagmulei-miluim",
  mercado: "il",
  concepto: "propio",
  slug: "tagmulei-miluim",
  estado: "publicado",
  requiere: { "il.miluim": "mapa", "il.miluim-pitzui": "mapa", "il.miluim-tosefet": "mapa" },
  campos: [
    {
      id: "sug",
      tipo: "opcion",
      etiqueta: "מעמד בעבודה",
      opciones: [
        { valor: "sachir", etiqueta: "עובד שכיר" },
        { valor: "atzmai", etiqueta: "עובד עצמאי" },
        { valor: "lo-oved", etiqueta: "סטודנט או לא עובד" },
      ],
      porDefecto: "sachir",
    },
    {
      id: "hachnasa3",
      tipo: "moneda",
      etiqueta: "סך ההכנסה ברוטו ב-3 החודשים שלפני השירות",
      ayuda: "לשכיר: השכר ברוטו, כולל דמי מחלה, תמורת חופשה ותגמולי מילואים קודמים. לעצמאי: המקדמות המדווחות לביטוח הלאומי.",
      min: 0,
      porDefecto: 36000,
      visibleSi: { sug: ["sachir", "atzmai"] },
    },
    { id: "yamim", tipo: "entero", etiqueta: "ימי שירות המילואים", min: 1, max: 366, porDefecto: 20 },
  ],
  calcular(e, v, { redondear }) {
    const m = v["il.miluim"];
    const min = enMapa(m, "min-yomi");
    const max = enMapa(m, "max-yomi");
    const hachnasa = e.sug === "lo-oved" ? 0 : (e.hachnasa3 ?? 0);
    if (e.sug !== "lo-oved" && hachnasa <= 0) throw new ErrorEntrada("הזינו את ההכנסה ב-3 החודשים שלפני השירות.", "hachnasa3");
    const lefiHachnasa = hachnasa / 90;
    const yomi = redondear(Math.min(max, Math.max(min, lefiHachnasa)));
    const tosefet = enMapa(v["il.miluim-tosefet"], String(e.yamim % 7));
    const yemeiTashlum = e.yamim + tosefet;
    const tagmul = redondear(yomi * yemeiTashlum);
    // El פיצוי del autónomo: 25% del תגמול, sin pasar entre los dos el máximo por día.
    const pitzui =
      e.sug === "atzmai" ? redondear(Math.min(yomi * (enMapa(v["il.miluim-pitzui"], "atzmai") / 100), max - yomi) * yemeiTashlum) : 0;
    const observaciones = ["הסכום ברוטו. מהתגמול מנוכים מס הכנסה, דמי ביטוח לאומי ודמי ביטוח בריאות."];
    if (lefiHachnasa < min) observaciones.push("ההכנסה היומית נמוכה מהתגמול המזערי, ולכן התגמול ליום הוא הסכום המזערי.");
    if (lefiHachnasa > max) observaciones.push("ההכנסה היומית עוברת את התגמול המרבי, ולכן התגמול ליום הוא הסכום המרבי.");
    return {
      sach: redondear(tagmul + pitzui),
      yomi,
      yemeiTashlum,
      tosefet,
      tagmul,
      pitzui,
      observaciones,
    };
  },
  resultado: [
    { clave: "sach", etiqueta: "סך התשלום (ברוטו)", formato: "moneda", destacada: true },
    { clave: "yomi", etiqueta: "תגמול ליום", formato: "moneda" },
    { clave: "yemeiTashlum", etiqueta: "ימים לתשלום (שירות ותוספת)", formato: "dias" },
    { clave: "tosefet", etiqueta: "ימי תוספת 40%", formato: "dias" },
    { clave: "tagmul", etiqueta: "תגמול המילואים", formato: "moneda" },
    { clave: "pitzui", etiqueta: "פיצוי לעצמאי", formato: "moneda" },
  ],
});
