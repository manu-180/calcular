import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NAZIVI = { eur: "evro (EUR)", usd: "američki dolar (USD)", chf: "švajcarski franak (CHF)", gbp: "britanska funta (GBP)" } as const;

export default definirCalculadora({
  id: "rs.kurs-nbs",
  mercado: "rs",
  concepto: "tipo-de-cambio",
  slug: "kurs-nbs",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  requiere: { "rs.eur": "serie", "rs.usd": "serie", "rs.chf": "serie", "rs.gbp": "serie" },
  campos: [
    {
      id: "valuta",
      tipo: "opcion",
      etiqueta: "Valuta",
      opciones: [
        { valor: "eur", etiqueta: "Evro (EUR)" },
        { valor: "usd", etiqueta: "Američki dolar (USD)" },
        { valor: "chf", etiqueta: "Švajcarski franak (CHF)" },
        { valor: "gbp", etiqueta: "Britanska funta (GBP)" },
      ],
      porDefecto: "eur",
    },
    {
      id: "smer",
      tipo: "opcion",
      etiqueta: "Pretvaranje",
      opciones: [
        { valor: "udinar", etiqueta: "Iz valute u dinare" },
        { valor: "uvalutu", etiqueta: "Iz dinara u valutu" },
      ],
      porDefecto: "udinar",
    },
    { id: "iznos", tipo: "numero", etiqueta: "Iznos", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.iznos <= 0) throw new ErrorEntrada("Unesite iznos veći od nule.", "iznos");
    const { valor, fecha } = v[`rs.${e.valuta}`];
    const uDinar = e.smer === "udinar";
    return {
      rezultat: redondear(uDinar ? e.iznos * valor : e.iznos / valor),
      valuta: uDinar ? "dinar (RSD)" : NAZIVI[e.valuta],
      kurs: valor,
      fecha,
      observaciones: ["Ovo je zvanični srednji kurs NBS. Banke i menjačnice rade po svojim kupovnim i prodajnim kursevima."],
    };
  },
  resultado: [
    { clave: "rezultat", etiqueta: "Rezultat", formato: "numero", decimales: 2, destacada: true },
    { clave: "valuta", etiqueta: "Valuta rezultata", formato: "texto" },
    { clave: "kurs", etiqueta: "Srednji kurs NBS, dinara za jednu jedinicu", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Datum kursa", formato: "fecha" },
  ],
});
