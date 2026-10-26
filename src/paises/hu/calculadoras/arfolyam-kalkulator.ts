import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NEVEK = { eur: "euró (EUR)", usd: "amerikai dollár (USD)", chf: "svájci frank (CHF)", gbp: "angol font (GBP)" } as const;

export default definirCalculadora({
  id: "hu.arfolyam-kalkulator",
  mercado: "hu",
  concepto: "tipo-de-cambio",
  slug: "arfolyam-kalkulator",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  requiere: {
    "hu.eur": "serie",
    "hu.usd": "serie",
    "hu.chf": "serie",
    "hu.gbp": "serie",
  },
  campos: [
    {
      id: "deviza",
      tipo: "opcion",
      etiqueta: "Deviza",
      opciones: [
        { valor: "eur", etiqueta: "Euró (EUR)" },
        { valor: "usd", etiqueta: "Amerikai dollár (USD)" },
        { valor: "chf", etiqueta: "Svájci frank (CHF)" },
        { valor: "gbp", etiqueta: "Angol font (GBP)" },
      ],
      porDefecto: "eur",
    },
    {
      id: "irany",
      tipo: "opcion",
      etiqueta: "Átváltás",
      opciones: [
        { valor: "forintra", etiqueta: "Devizából forintra" },
        { valor: "devizara", etiqueta: "Forintból devizára" },
      ],
      porDefecto: "forintra",
    },
    { id: "osszeg", tipo: "numero", etiqueta: "Összeg", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.osszeg <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb összeget.", "osszeg");
    const { valor, fecha } = v[`hu.${e.deviza}`];
    const forintra = e.irany === "forintra";
    return {
      eredmeny: redondear(forintra ? e.osszeg * valor : e.osszeg / valor),
      penznem: forintra ? "forint (HUF)" : NEVEK[e.deviza],
      arfolyam: valor,
      forditott: 1 / valor,
      fecha,
      observaciones: ["Ez az MNB hivatalos devizaárfolyama. A bankok és a pénzváltók saját árfolyamon, árréssel váltanak."],
    };
  },
  resultado: [
    { clave: "eredmeny", etiqueta: "Átváltva", formato: "numero", decimales: 2, destacada: true },
    { clave: "penznem", etiqueta: "Az eredmény pénzneme", formato: "texto" },
    { clave: "arfolyam", etiqueta: "MNB-árfolyam (forint egy egységért)", formato: "numero", decimales: 2 },
    { clave: "forditott", etiqueta: "Ennyi deviza egy forintért", formato: "numero", decimales: 6 },
    { clave: "fecha", etiqueta: "Az árfolyam napja", formato: "fecha" },
  ],
});
