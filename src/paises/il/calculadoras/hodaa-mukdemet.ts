import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { DIAS_HE, pluralHe } from "@/motor/i18n/hebreo";

// Tablas del חוק הודעה מוקדמת לפיטורים ולהתפטרות según la página del משרד העבודה. Al cumplir el
// año (עובד במשכורת) o el tercer año (עובד בשכר) el plazo es "un mes", sin cuenta de días.
export default definirCalculadora({
  id: "il.hodaa-mukdemet",
  mercado: "il",
  concepto: "preaviso",
  slug: "hodaa-mukdemet",
  estado: "publicado",
  requiere: { "il.hodaa-mukdemet": "mapa" },
  campos: [
    {
      id: "sug",
      tipo: "opcion",
      etiqueta: "איך משולם השכר?",
      opciones: [
        { valor: "maskoret", etiqueta: "משכורת חודשית" },
        { valor: "sachar", etiqueta: "שכר יומי או שעתי" },
      ],
      porDefecto: "maskoret",
    },
    { id: "chodashim", tipo: "entero", etiqueta: "חודשי עבודה אצל המעסיק", min: 0, max: 600, porDefecto: 8 },
  ],
  calcular(e, v) {
    if (e.chodashim < 0) throw new ErrorEntrada("הזינו את מספר חודשי העבודה.", "chodashim");
    const m = v["il.hodaa-mukdemet"];
    const n = e.chodashim;
    let yamim: number | null;
    if (e.sug === "maskoret") {
      if (n >= 12) yamim = null;
      else if (n <= 6) yamim = n * enMapa(m, "maskoret-yom-lechodesh");
      else yamim = Math.min(enMapa(m, "maskoret-max"), 6 * enMapa(m, "maskoret-yom-lechodesh") + (n - 6) * enMapa(m, "maskoret-acharei-6"));
    } else if (n <= 12) yamim = n;
    else if (n <= 24) yamim = enMapa(m, "sachar-shana-2") + Math.floor((n - 13) / 2);
    else if (n <= 36) yamim = enMapa(m, "sachar-shana-3") + Math.floor((n - 25) / 2);
    else yamim = null;
    return {
      tkufa: yamim === null ? "חודש ימים" : pluralHe(yamim, DIAS_HE),
      yamim,
      observaciones: [
        "ההודעה צריכה להיות בכתב. מי שלא נתן הודעה מוקדמת משלם לצד השני את השכר הרגיל של תקופת ההודעה.",
      ],
    };
  },
  resultado: [
    { clave: "tkufa", etiqueta: "תקופת ההודעה המוקדמת", formato: "texto", destacada: true },
    { clave: "yamim", etiqueta: "ימי הודעה מוקדמת", formato: "dias", decimales: 1 },
  ],
});
