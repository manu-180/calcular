import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NAZIVI = { eur: "euro (EUR)", usd: "američki dolar (USD)", gbp: "britanska funta (GBP)", chf: "švicarski franak (CHF)", rsd: "srpski dinar (RSD)" } as const;

export default definirCalculadora({
  id: "ba.kursna-lista",
  mercado: "ba",
  concepto: "tipo-de-cambio",
  slug: "kursna-lista",
  estado: "publicado",
  requiere: { "ba.kurs-eur": "numero", "ba.usd": "serie", "ba.gbp": "serie", "ba.chf": "serie", "ba.rsd": "serie" },
  campos: [
    {
      id: "valuta",
      tipo: "opcion",
      etiqueta: "Valuta",
      opciones: [
        { valor: "eur", etiqueta: "Euro (EUR)" },
        { valor: "usd", etiqueta: "Američki dolar (USD)" },
        { valor: "gbp", etiqueta: "Britanska funta (GBP)" },
        { valor: "chf", etiqueta: "Švicarski franak (CHF)" },
        { valor: "rsd", etiqueta: "Srpski dinar (RSD)" },
      ],
      porDefecto: "eur",
    },
    {
      id: "smjer",
      tipo: "opcion",
      etiqueta: "Pretvaranje",
      opciones: [
        { valor: "ukm", etiqueta: "Iz valute u KM" },
        { valor: "uvalutu", etiqueta: "Iz KM u valutu" },
      ],
      porDefecto: "ukm",
    },
    { id: "iznos", tipo: "numero", etiqueta: "Iznos", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.iznos <= 0) throw new ErrorEntrada("Unesite iznos veći od nule.", "iznos");
    const stavka = e.valuta === "eur" ? null : v[`ba.${e.valuta}`];
    const kurs = stavka ? stavka.valor : v["ba.kurs-eur"];
    const uKm = e.smjer === "ukm";
    return {
      rezultat: redondear(uKm ? e.iznos * kurs : e.iznos / kurs),
      valuta: uKm ? "konvertibilna marka (BAM)" : NAZIVI[e.valuta],
      kurs,
      observaciones: ["Ovo je srednji kurs Centralne banke BiH. Banke i mjenjačnice rade po svojim kursevima."],
    };
  },
  resultado: [
    { clave: "rezultat", etiqueta: "Rezultat", formato: "numero", decimales: 2, destacada: true },
    { clave: "valuta", etiqueta: "U valuti", formato: "texto" },
    { clave: "kurs", etiqueta: "Srednji kurs za 1 jedinicu, u KM", formato: "numero", decimales: 6 },
  ],
});
