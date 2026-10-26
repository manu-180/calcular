import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NAVN = {
  eur: "euro (EUR)",
  usd: "amerikanske dollar (USD)",
  sek: "svenske kroner (SEK)",
  dkk: "danske kroner (DKK)",
  gbp: "britiske pund (GBP)",
} as const;

export default definirCalculadora({
  id: "no.valutakalkulator",
  mercado: "no",
  concepto: "tipo-de-cambio",
  slug: "valutakalkulator",
  estado: "publicado",
  requiere: {
    "no.eur": "serie",
    "no.usd": "serie",
    "no.sek": "serie",
    "no.dkk": "serie",
    "no.gbp": "serie",
  },
  campos: [
    {
      id: "valuta",
      tipo: "opcion",
      etiqueta: "Valuta",
      opciones: [
        { valor: "eur", etiqueta: "Euro (EUR)" },
        { valor: "usd", etiqueta: "Amerikanske dollar (USD)" },
        { valor: "sek", etiqueta: "Svenske kroner (SEK)" },
        { valor: "dkk", etiqueta: "Danske kroner (DKK)" },
        { valor: "gbp", etiqueta: "Britiske pund (GBP)" },
      ],
      porDefecto: "eur",
    },
    {
      id: "retning",
      tipo: "opcion",
      etiqueta: "Regn om",
      opciones: [
        { valor: "til-nok", etiqueta: "Fra valuta til norske kroner" },
        { valor: "fra-nok", etiqueta: "Fra norske kroner til valuta" },
      ],
      porDefecto: "til-nok",
    },
    { id: "belop", tipo: "numero", etiqueta: "Beløp", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.belop <= 0) throw new ErrorEntrada("Skriv inn et beløp over null.", "belop");
    const { valor, fecha } = v[`no.${e.valuta}`];
    const tilNok = e.retning === "til-nok";
    return {
      resultat: redondear(tilNok ? e.belop * valor : e.belop / valor),
      valuta: tilNok ? "norske kroner (NOK)" : NAVN[e.valuta],
      kurs: valor,
      omvendt: 1 / valor,
      dato: fecha,
      observaciones: ["Kursen er midtkursen fra Norges Bank. Banker og vekslingskontorer kjøper og selger valuta til egne kurser med påslag."],
    };
  },
  resultado: [
    { clave: "resultat", etiqueta: "Omregnet beløp", formato: "numero", decimales: 2, destacada: true },
    { clave: "valuta", etiqueta: "Valuta", formato: "texto" },
    { clave: "kurs", etiqueta: "Kurs fra Norges Bank (kroner for 1 enhet)", formato: "numero", decimales: 4 },
    { clave: "omvendt", etiqueta: "Valuta for 1 krone", formato: "numero", decimales: 4 },
    { clave: "dato", etiqueta: "Kursdato", formato: "fecha" },
  ],
});
