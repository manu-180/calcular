import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

function claveVetek(shana: number): string {
  if (shana <= 1) return "shana-1";
  if (shana <= 3) return "shanim-2-3";
  if (shana <= 10) return "shanim-4-10";
  if (shana <= 15) return "shanim-11-15";
  if (shana <= 19) return "shanim-16-19";
  return "shanim-20";
}

// El valor del día lo pone la persona: en el sector privado lo fija el הסכם קיבוצי כללי y se
// actualiza por צו הרחבה; la página del משרד העבודה no publica el valor vigente.
export default definirCalculadora({
  id: "il.dmei-havraa",
  mercado: "il",
  concepto: "propio",
  slug: "dmei-havraa",
  estado: "publicado",
  requiere: { "il.havraa-yamim": "mapa" },
  campos: [
    { id: "shana", tipo: "entero", etiqueta: "שנת העבודה אצל המעסיק", ayuda: "למשל 3 אם אתם בשנת העבודה השלישית.", min: 1, max: 60, porDefecto: 3 },
    { id: "misra", tipo: "porcentaje", etiqueta: "היקף המשרה (%)", min: 1, max: 100, porDefecto: 100 },
    {
      id: "erechYom",
      tipo: "moneda",
      etiqueta: "ערך יום הבראה",
      ayuda: "הסכום ליום לפי ההסכם הקיבוצי או צו ההרחבה שחלים עליכם. במגזר הפרטי הוא נקבע בהסכם הקיבוצי הכללי ומתעדכן מדי פעם.",
      min: 0,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.shana < 1) throw new ErrorEntrada("דמי הבראה מגיעים אחרי שנת עבודה אחת לפחות.", "shana");
    if (e.erechYom <= 0) throw new ErrorEntrada("הזינו את ערך יום ההבראה.", "erechYom");
    const yamimMale = enMapa(v["il.havraa-yamim"], claveVetek(e.shana));
    const yamim = porcentaje(yamimMale, e.misra);
    return {
      schum: redondear(yamim * e.erechYom),
      yamim,
      yamimMale,
      observaciones: ["מי שעבד רק חלק מהשנה (למשל בחופשה ללא תשלום) מקבל חלק יחסי לפי תקופת העבודה."],
    };
  },
  resultado: [
    { clave: "schum", etiqueta: "דמי הבראה לשנה", formato: "moneda", destacada: true },
    { clave: "yamim", etiqueta: "ימי הבראה שמגיעים לכם", formato: "dias", decimales: 1 },
    { clave: "yamimMale", etiqueta: "ימי הבראה במשרה מלאה", formato: "dias" },
  ],
});
