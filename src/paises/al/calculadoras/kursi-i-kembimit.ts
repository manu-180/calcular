import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const EMRAT = { eur: "euro (EUR)", usd: "dollar amerikan (USD)" } as const;

export default definirCalculadora({
  id: "al.kursi-i-kembimit",
  mercado: "al",
  concepto: "tipo-de-cambio",
  slug: "kursi-i-kembimit",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  requiere: { "al.eur": "serie", "al.usd": "serie" },
  campos: [
    {
      id: "valuta",
      tipo: "opcion",
      etiqueta: "Valuta",
      opciones: [
        { valor: "eur", etiqueta: "Euro (EUR)" },
        { valor: "usd", etiqueta: "Dollar amerikan (USD)" },
      ],
      porDefecto: "eur",
    },
    {
      id: "drejtimi",
      tipo: "opcion",
      etiqueta: "Këmbimi",
      opciones: [
        { valor: "ne-leke", etiqueta: "Nga valuta në lekë" },
        { valor: "ne-valute", etiqueta: "Nga lekët në valutë" },
      ],
      porDefecto: "ne-leke",
    },
    { id: "shuma", tipo: "numero", etiqueta: "Shuma", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.shuma <= 0) throw new ErrorEntrada("Vendosni një shumë më të madhe se zero.", "shuma");
    const { valor, fecha } = v[`al.${e.valuta}`];
    const neLeke = e.drejtimi === "ne-leke";
    return {
      rezultati: redondear(neLeke ? e.shuma * valor : e.shuma / valor),
      monedha: neLeke ? "lekë (ALL)" : EMRAT[e.valuta],
      kursi: valor,
      fecha,
      observaciones: ["Ky është kursi zyrtar i Bankës së Shqipërisë, një nivel reference. Bankat dhe zyrat e këmbimit punojnë me kurset e tyre."],
    };
  },
  resultado: [
    { clave: "rezultati", etiqueta: "Shuma e këmbyer", formato: "numero", decimales: 2, destacada: true },
    { clave: "monedha", etiqueta: "Monedha e rezultatit", formato: "texto" },
    { clave: "kursi", etiqueta: "Kursi zyrtar (lekë për një njësi)", formato: "numero", decimales: 2 },
    { clave: "fecha", etiqueta: "Data e kursit", formato: "fecha" },
  ],
});
