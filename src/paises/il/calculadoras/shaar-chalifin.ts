import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const SHEMOT = { usd: "דולר אמריקאי (USD)", eur: "אירו (EUR)", gbp: "לירה שטרלינג (GBP)" } as const;

export default definirCalculadora({
  id: "il.shaar-chalifin",
  mercado: "il",
  concepto: "tipo-de-cambio",
  slug: "shaar-chalifin",
  estado: "publicado",
  requiere: { "il.usd": "serie", "il.eur": "serie", "il.gbp": "serie" },
  campos: [
    {
      id: "matbea",
      tipo: "opcion",
      etiqueta: "מטבע",
      opciones: [
        { valor: "usd", etiqueta: "דולר אמריקאי (USD)" },
        { valor: "eur", etiqueta: "אירו (EUR)" },
        { valor: "gbp", etiqueta: "לירה שטרלינג (GBP)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "kivun",
      tipo: "opcion",
      etiqueta: "כיוון ההמרה",
      opciones: [
        { valor: "le-shekel", etiqueta: "ממטבע חוץ לשקלים" },
        { valor: "mi-shekel", etiqueta: "משקלים למטבע חוץ" },
      ],
      porDefecto: "le-shekel",
    },
    { id: "schum", tipo: "numero", etiqueta: "סכום", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.schum <= 0) throw new ErrorEntrada("הזינו סכום גדול מאפס.", "schum");
    const { valor, fecha } = v[`il.${e.matbea}`];
    const leShekel = e.kivun === "le-shekel";
    return {
      totzaa: redondear(leShekel ? e.schum * valor : e.schum / valor),
      matbeaTotzaa: leShekel ? "שקל חדש (ILS)" : SHEMOT[e.matbea],
      shaar: valor,
      hafuch: 1 / valor,
      fecha,
      observaciones: ["זה השער היציג של בנק ישראל. בבנקים ובחלפנים קונים ומוכרים מטבע בשערים אחרים, עם עמלה."],
    };
  },
  resultado: [
    { clave: "totzaa", etiqueta: "הסכום אחרי ההמרה", formato: "numero", decimales: 2, destacada: true },
    { clave: "matbeaTotzaa", etiqueta: "המטבע של התוצאה", formato: "texto" },
    { clave: "shaar", etiqueta: "שער יציג (שקלים ליחידה)", formato: "numero", decimales: 4 },
    { clave: "hafuch", etiqueta: "יחידות מטבע לשקל אחד", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "תאריך השער", formato: "fecha" },
  ],
});
