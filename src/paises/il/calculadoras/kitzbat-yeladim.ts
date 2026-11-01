import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "il.kitzbat-yeladim",
  mercado: "il",
  concepto: "propio",
  slug: "kitzbat-yeladim",
  estado: "publicado",
  requiere: { "il.kitzbat-yeladim": "mapa" },
  campos: [{ id: "yeladim", tipo: "entero", etiqueta: "מספר הילדים שבעדם משולמת קצבה", min: 1, max: 20, porDefecto: 3 }],
  calcular(e, v, { redondear }) {
    if (e.yeladim < 1) throw new ErrorEntrada("הזינו לפחות ילד אחד.", "yeladim");
    const m = v["il.kitzbat-yeladim"];
    let chodshi = 0;
    for (let i = 1; i <= e.yeladim; i++) chodshi += enMapa(m, i === 1 ? "rishon" : i <= 4 ? "sheni-revii" : "chamishi");
    return {
      chodshi: redondear(chodshi),
      shnati: redondear(chodshi * 12),
      memutza: redondear(chodshi / e.yeladim),
      observaciones: ["הסכום לכל ילד תלוי במקום שלו בסדר הילדים במשפחה: הראשון, השני עד הרביעי, או החמישי ואילך."],
    };
  },
  resultado: [
    { clave: "chodshi", etiqueta: "קצבת ילדים לחודש", formato: "moneda", destacada: true },
    { clave: "shnati", etiqueta: "בשנה", formato: "moneda" },
    { clave: "memutza", etiqueta: "ממוצע לילד", formato: "moneda" },
  ],
});
