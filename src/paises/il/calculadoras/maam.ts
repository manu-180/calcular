import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "il.maam",
  mercado: "il",
  concepto: "iva",
  slug: "maam",
  estado: "publicado",
  requiere: { "il.maam": "numero" },
  campos: [
    {
      id: "peula",
      tipo: "opcion",
      etiqueta: "מה תרצו לחשב?",
      opciones: [
        { valor: "lehosif", etiqueta: 'להוסיף מע"מ למחיר לפני מע"מ' },
        { valor: "lehotzi", etiqueta: 'להוציא את המע"מ ממחיר שכולל מע"מ' },
      ],
      porDefecto: "lehosif",
    },
    { id: "schum", tipo: "moneda", etiqueta: "סכום", min: 0, porDefecto: 1000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.schum <= 0) throw new ErrorEntrada("הזינו סכום.", "schum");
    const shiur = v["il.maam"];
    const lifnei = e.peula === "lehosif" ? e.schum : e.schum / (1 + shiur / 100);
    const maam = redondear(porcentaje(lifnei, shiur));
    const lifneiR = redondear(lifnei);
    return {
      maam,
      lifnei: lifneiR,
      kolel: e.peula === "lehosif" ? redondear(lifneiR + maam) : redondear(e.schum),
      shiur,
    };
  },
  resultado: [
    { clave: "maam", etiqueta: 'סכום המע"מ', formato: "moneda", destacada: true },
    { clave: "lifnei", etiqueta: 'מחיר לפני מע"מ', formato: "moneda" },
    { clave: "kolel", etiqueta: 'מחיר כולל מע"מ', formato: "moneda" },
    { clave: "shiur", etiqueta: 'שיעור המע"מ', formato: "porcentaje" },
  ],
});
