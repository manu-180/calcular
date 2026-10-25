import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

function claveChok(shavua: string, shana: number): string {
  const tope = shavua === "5" ? 12 : 13;
  const s = shana <= 5 ? 1 : Math.min(shana, tope);
  return `${shavua}-${s}`;
}

function claveTzav(shavua: string, shana: number): string {
  const s = shana <= 2 ? 1 : shana <= 4 ? 3 : shana === 5 ? 5 : shana <= 8 ? 6 : 9;
  return `${shavua}-${s}`;
}

// La ley (desde 2017) y el צו ההרחבה del שבוע עבודה מקוצר dan tablas distintas; vale la más
// favorable (משרד העבודה, «ההוראה המטיבה»).
export default definirCalculadora({
  id: "il.yemei-chufsha",
  mercado: "il",
  concepto: "vacaciones",
  slug: "yemei-chufsha",
  estado: "publicado",
  requiere: { "il.chufsha-chok": "mapa", "il.chufsha-tzav": "mapa" },
  campos: [
    { id: "shana", tipo: "entero", etiqueta: "שנת העבודה אצל המעסיק", ayuda: "למשל 1 בשנה הראשונה, 6 בשנה השישית.", min: 1, max: 60, porDefecto: 1 },
    {
      id: "shavua",
      tipo: "opcion",
      etiqueta: "ימי עבודה בשבוע",
      opciones: [
        { valor: "5", etiqueta: "5 ימים" },
        { valor: "6", etiqueta: "6 ימים" },
      ],
      porDefecto: "5",
    },
    {
      id: "tzav",
      tipo: "si-no",
      etiqueta: "חל עליכם צו ההרחבה לשבוע עבודה מקוצר",
      ayuda: "הצו חל על רוב מקומות העבודה במגזר העסקי. הוא לא חל, למשל, במקום עבודה עם פחות מארבעה עובדים או בחברה ממשלתית.",
      porDefecto: true,
    },
    {
      id: "yamimBafoal",
      tipo: "entero",
      etiqueta: "ימים שעבדתם בפועל באותה שנה",
      ayuda: "שנה מלאה היא 200 ימי עבודה לפחות (240 אם התחלתם או סיימתם באמצע השנה). פחות מזה מזכה בחלק יחסי.",
      min: 0,
      max: 366,
      porDefecto: 240,
    },
    { id: "chelkit", tipo: "si-no", etiqueta: "עבדתם רק בחלק מהשנה (התחלתם או סיימתם באמצעה)", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.shana < 1) throw new ErrorEntrada("הזינו את שנת העבודה, מ-1 ומעלה.", "shana");
    const chok = enMapa(v["il.chufsha-chok"], claveChok(e.shavua, e.shana));
    const tzav = e.tzav ? enMapa(v["il.chufsha-tzav"], claveTzav(e.shavua, e.shana)) : 0;
    const male = Math.max(chok, tzav);
    const saf = e.chelkit ? 240 : 200;
    const yachas = Math.min(1, e.yamimBafoal / saf);
    const yamim = redondear(male * yachas);
    const observaciones: string[] = [];
    if (yachas < 1) observaciones.push("לא עבדתם מספיק ימים לשנה מלאה, ולכן מגיע חלק יחסי לפי הימים שעבדתם בפועל.");
    return {
      yamim,
      male,
      chok,
      tzav: e.tzav ? tzav : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "yamim", etiqueta: "ימי חופשה שמגיעים לכם בשנה הזו", formato: "dias", destacada: true, decimales: 1 },
    { clave: "male", etiqueta: "ימי חופשה בשנה מלאה", formato: "dias" },
    { clave: "chok", etiqueta: "לפי החוק", formato: "dias" },
    { clave: "tzav", etiqueta: "לפי צו ההרחבה", formato: "dias" },
  ],
});
