import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NAVNE = { eur: "euro (EUR)", usd: "amerikanske dollar (USD)", gbp: "britiske pund (GBP)", sek: "svenske kroner (SEK)", nok: "norske kroner (NOK)" } as const;

export default definirCalculadora({
  id: "dk.valutaomregner",
  mercado: "dk",
  concepto: "tipo-de-cambio",
  slug: "valutaomregner",
  estado: "publicado",
  requiere: {
    "dk.eur": "serie",
    "dk.usd": "serie",
    "dk.gbp": "serie",
    "dk.sek": "serie",
    "dk.nok": "serie",
  },
  campos: [
    {
      id: "valuta",
      tipo: "opcion",
      etiqueta: "Valuta",
      opciones: [
        { valor: "eur", etiqueta: "Euro (EUR)" },
        { valor: "usd", etiqueta: "Amerikanske dollar (USD)" },
        { valor: "gbp", etiqueta: "Britiske pund (GBP)" },
        { valor: "sek", etiqueta: "Svenske kroner (SEK)" },
        { valor: "nok", etiqueta: "Norske kroner (NOK)" },
      ],
      porDefecto: "eur",
    },
    {
      id: "retning",
      tipo: "opcion",
      etiqueta: "Omregn",
      opciones: [
        { valor: "til-dkk", etiqueta: "Fra valuta til danske kroner" },
        { valor: "fra-dkk", etiqueta: "Fra danske kroner til valuta" },
      ],
      porDefecto: "til-dkk",
    },
    { id: "beloeb", tipo: "numero", etiqueta: "Beløb", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.beloeb <= 0) throw new ErrorEntrada("Skriv et beløb, der er større end 0.", "beloeb");
    const { valor, fecha } = v[`dk.${e.valuta}`];
    const kurs = valor / 100;
    const tilDkk = e.retning === "til-dkk";
    return {
      resultat: redondear(tilDkk ? e.beloeb * kurs : e.beloeb / kurs),
      valuta: tilDkk ? "danske kroner (DKK)" : NAVNE[e.valuta],
      kurs100: valor,
      omvendt: 1 / kurs,
      dato: fecha,
      observaciones: ["Det er Nationalbankens kurs (midtkurs). Banker og vekselkontorer bruger egne kurser med gebyr eller kursavance."],
    };
  },
  resultado: [
    { clave: "resultat", etiqueta: "Omregnet beløb", formato: "numero", decimales: 2, destacada: true },
    { clave: "valuta", etiqueta: "Valuta for resultatet", formato: "texto" },
    { clave: "kurs100", etiqueta: "Kurs (kroner pr. 100 enheder)", formato: "numero", decimales: 2 },
    { clave: "omvendt", etiqueta: "Valuta pr. 1 krone", formato: "numero", decimales: 4 },
    { clave: "dato", etiqueta: "Kursdato", formato: "fecha" },
  ],
});
