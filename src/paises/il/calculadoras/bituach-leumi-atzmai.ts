import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// ביטוח לאומי לעצמאים: tasa reducida hasta la primera תקרה y normal hasta el ingreso máximo, con
// un ingreso mínimo como base. Después de la edad de retiro sin קצבה, tasas totales propias.
export default definirCalculadora({
  id: "il.bituach-leumi-atzmai",
  mercado: "il",
  concepto: "propio",
  slug: "bituach-leumi-atzmai",
  estado: "publicado",
  requiere: { "il.bl-atzmai": "mapa", "il.bl-atzmai-mizarit": "mapa", "il.bl-tikrot": "mapa" },
  campos: [
    { id: "hachnasa", tipo: "moneda", etiqueta: "הכנסה חודשית חייבת מעסק", ayuda: "ההכנסה מהעסק אחרי ההוצאות המוכרות, בחודש.", min: 0, porDefecto: 15000 },
    {
      id: "gil",
      tipo: "opcion",
      etiqueta: "גיל",
      opciones: [
        { valor: "regil", etiqueta: "מגיל 18 עד גיל הפרישה" },
        { valor: "prisha", etiqueta: "אחרי גיל הפרישה, בלי קצבת אזרח ותיק" },
      ],
      porDefecto: "regil",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.hachnasa < 0) throw new ErrorEntrada("ההכנסה לא יכולה להיות שלילית.", "hachnasa");
    const t = v["il.bl-tikrot"];
    const s = v["il.bl-atzmai"];
    const mufchat = enMapa(t, "mufchat");
    const merbit = enMapa(t, "merbit");
    const mizarit = enMapa(v["il.bl-atzmai-mizarit"], "chodshi");
    const basis = Math.min(merbit, Math.max(mizarit, e.hachnasa));
    const nimuch = Math.min(basis, mufchat);
    const gavoha = Math.max(0, basis - mufchat);
    const kfi = (a: string, b: string) => redondear((nimuch * enMapa(s, a) + gavoha * enMapa(s, b)) / 100);
    const regil = e.gil === "regil";
    const leumi = regil ? kfi("bl-mufchat", "bl-male") : 0;
    const briut = regil ? kfi("briut-mufchat", "briut-male") : 0;
    const sach = regil ? redondear(leumi + briut) : kfi("prisha-mufchat", "prisha-male");
    const observaciones: string[] = [];
    if (e.hachnasa < mizarit) observaciones.push("ההכנסה נמוכה מההכנסה המזערית, ולכן דמי הביטוח מחושבים מההכנסה המזערית.");
    if (e.hachnasa > merbit) observaciones.push("על ההכנסה שמעל ההכנסה המרבית לא משלמים דמי ביטוח.");
    if (!regil) observaciones.push("אחרי גיל הפרישה השיעורים כוללים גם ביטוח בריאות, והביטוח הלאומי מפרסם אותם כסכום אחד.");
    return {
      sach,
      shnati: redondear(sach * 12),
      leumi,
      briut,
      achuz: e.hachnasa > 0 ? (sach / e.hachnasa) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "sach", etiqueta: "דמי ביטוח לחודש", formato: "moneda", destacada: true },
    { clave: "shnati", etiqueta: "דמי ביטוח לשנה", formato: "moneda" },
    { clave: "leumi", etiqueta: "מזה ביטוח לאומי", formato: "moneda" },
    { clave: "briut", etiqueta: "מזה ביטוח בריאות", formato: "moneda" },
    { clave: "achuz", etiqueta: "שיעור מתוך ההכנסה", formato: "porcentaje" },
  ],
});
