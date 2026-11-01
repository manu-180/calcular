import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// מענק לידה: suma única del ביטוח לאומי. En un parto simple depende del lugar del hijo en la
// familia; en un parto múltiple, del número de bebés (cada uno más allá de la שלישייה suma "nosaf").
export default definirCalculadora({
  id: "il.maanak-leida",
  mercado: "il",
  concepto: "propio",
  slug: "maanak-leida",
  estado: "publicado",
  requiere: { "il.maanak-leida": "mapa" },
  campos: [
    { id: "tinokot", tipo: "entero", etiqueta: "מספר התינוקות שנולדו בלידה", min: 1, max: 8, porDefecto: 1 },
    {
      id: "sidur",
      tipo: "entero",
      etiqueta: "מספר הילדים במשפחה, כולל התינוק",
      ayuda: "למשל 2 אם זה הילד השני. בלידה של תאומים ומעלה השדה לא משפיע.",
      min: 1,
      max: 20,
      porDefecto: 1,
    },
  ],
  calcular(e, v) {
    if (e.tinokot < 1) throw new ErrorEntrada("הזינו כמה תינוקות נולדו.", "tinokot");
    if (e.sidur < 1) throw new ErrorEntrada("הזינו את מספר הילדים במשפחה.", "sidur");
    const m = v["il.maanak-leida"];
    let maanak: number;
    if (e.tinokot === 1) maanak = enMapa(m, e.sidur === 1 ? "rishon" : e.sidur === 2 ? "sheni" : "shlishi");
    else if (e.tinokot === 2) maanak = enMapa(m, "teomim");
    else maanak = enMapa(m, "shlishiya") + (e.tinokot - 3) * enMapa(m, "nosaf");
    return {
      maanak,
      observaciones: [
        "המענק משולם פעם אחת. בלידה מרובת עוברים יש גם קצבת לידה חודשית, שלא נכללת כאן.",
      ],
    };
  },
  resultado: [{ clave: "maanak", etiqueta: "מענק הלידה", formato: "moneda", destacada: true }],
});
