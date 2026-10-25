import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "il.mas-rechisha",
  mercado: "il",
  concepto: "propio",
  slug: "mas-rechisha",
  estado: "publicado",
  requiere: { "il.mas-rechisha-yechida": "escala", "il.mas-rechisha-nosefet": "escala" },
  campos: [
    { id: "shovi", tipo: "moneda", etiqueta: "מחיר הדירה", min: 0, porDefecto: 2500000 },
    {
      id: "sug",
      tipo: "opcion",
      etiqueta: "סוג הרכישה",
      opciones: [
        { valor: "yechida", etiqueta: "דירה יחידה (תושב ישראל)" },
        { valor: "nosefet", etiqueta: "דירה נוספת (שאינה דירה יחידה)" },
      ],
      porDefecto: "yechida",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.shovi <= 0) throw new ErrorEntrada("הזינו את מחיר הדירה.", "shovi");
    const escala = e.sug === "yechida" ? v["il.mas-rechisha-yechida"] : v["il.mas-rechisha-nosefet"];
    const mas = redondear(aplicarEscalaMarginal(escala, e.shovi));
    const observaciones: string[] = [];
    if (e.sug === "yechida") observaciones.push("דירה יחידה מוגדרת בחוק מיסוי מקרקעין, ויש לה תנאים. כדאי לבדוק שהרכישה עומדת בהם לפני שמסתמכים על המדרגות האלה.");
    return {
      mas,
      shiur: (mas / e.shovi) * 100,
      kolel: redondear(e.shovi + mas),
      observaciones,
    };
  },
  resultado: [
    { clave: "mas", etiqueta: "מס רכישה לתשלום", formato: "moneda", destacada: true },
    { clave: "shiur", etiqueta: "המס כאחוז ממחיר הדירה", formato: "porcentaje", decimales: 2 },
    { clave: "kolel", etiqueta: "מחיר הדירה כולל מס רכישה", formato: "moneda" },
  ],
});
