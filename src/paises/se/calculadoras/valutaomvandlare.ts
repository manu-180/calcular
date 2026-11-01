import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NAMN = { eur: "euro (EUR)", usd: "amerikanska dollar (USD)", nok: "norska kronor (NOK)", dkk: "danska kronor (DKK)", gbp: "brittiska pund (GBP)" } as const;

export default definirCalculadora({
  id: "se.valutaomvandlare",
  mercado: "se",
  concepto: "tipo-de-cambio",
  slug: "valutaomvandlare",
  estado: "publicado",
  requiere: {
    "se.eur": "serie",
    "se.usd": "serie",
    "se.nok": "serie",
    "se.dkk": "serie",
    "se.gbp": "serie",
  },
  campos: [
    {
      id: "valuta",
      tipo: "opcion",
      etiqueta: "Valuta",
      opciones: [
        { valor: "eur", etiqueta: "Euro (EUR)" },
        { valor: "usd", etiqueta: "Amerikansk dollar (USD)" },
        { valor: "nok", etiqueta: "Norsk krona (NOK)" },
        { valor: "dkk", etiqueta: "Dansk krona (DKK)" },
        { valor: "gbp", etiqueta: "Brittiskt pund (GBP)" },
      ],
      porDefecto: "eur",
    },
    {
      id: "riktning",
      tipo: "opcion",
      etiqueta: "Räkna om",
      opciones: [
        { valor: "till-sek", etiqueta: "Från valutan till kronor" },
        { valor: "fran-sek", etiqueta: "Från kronor till valutan" },
      ],
      porDefecto: "till-sek",
    },
    { id: "belopp", tipo: "numero", etiqueta: "Belopp", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.belopp <= 0) throw new ErrorEntrada("Skriv ett belopp som är större än noll.", "belopp");
    const { valor, fecha } = v[`se.${e.valuta}`];
    const tillSek = e.riktning === "till-sek";
    return {
      resultat: redondear(tillSek ? e.belopp * valor : e.belopp / valor),
      valutaResultat: tillSek ? "svenska kronor (SEK)" : NAMN[e.valuta],
      kurs: valor,
      omvand: 1 / valor,
      fecha,
      observaciones: ["Det här är Riksbankens mittkurs. Banker och växlingskontor köper och säljer valuta till egna kurser, med påslag."],
    };
  },
  resultado: [
    { clave: "resultat", etiqueta: "Omräknat belopp", formato: "numero", decimales: 2, destacada: true },
    { clave: "valutaResultat", etiqueta: "Valuta", formato: "texto" },
    { clave: "kurs", etiqueta: "Mittkurs (kronor för 1 enhet)", formato: "numero", decimales: 4 },
    { clave: "omvand", etiqueta: "Enheter för 1 krona", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Kursdag", formato: "fecha" },
  ],
});
