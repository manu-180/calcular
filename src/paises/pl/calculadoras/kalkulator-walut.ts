import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NAZWY = { eur: "euro (EUR)", usd: "dolar amerykański (USD)", chf: "frank szwajcarski (CHF)", gbp: "funt szterling (GBP)" } as const;

export default definirCalculadora({
  id: "pl.kalkulator-walut",
  mercado: "pl",
  concepto: "tipo-de-cambio",
  slug: "kalkulator-walut",
  estado: "publicado",
  requiere: {
    "pl.eur": "serie",
    "pl.usd": "serie",
    "pl.chf": "serie",
    "pl.gbp": "serie",
  },
  campos: [
    {
      id: "waluta",
      tipo: "opcion",
      etiqueta: "Waluta",
      opciones: [
        { valor: "eur", etiqueta: "Euro (EUR)" },
        { valor: "usd", etiqueta: "Dolar amerykański (USD)" },
        { valor: "chf", etiqueta: "Frank szwajcarski (CHF)" },
        { valor: "gbp", etiqueta: "Funt szterling (GBP)" },
      ],
      porDefecto: "eur",
    },
    {
      id: "kierunek",
      tipo: "opcion",
      etiqueta: "Przelicz",
      opciones: [
        { valor: "na-pln", etiqueta: "Z waluty na złote" },
        { valor: "z-pln", etiqueta: "Ze złotych na walutę" },
      ],
      porDefecto: "na-pln",
    },
    { id: "kwota", tipo: "numero", etiqueta: "Kwota", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.kwota <= 0) throw new ErrorEntrada("Wpisz kwotę większą od zera.", "kwota");
    const { valor, fecha } = v[`pl.${e.waluta}`];
    const naPln = e.kierunek === "na-pln";
    return {
      wynik: redondear(naPln ? e.kwota * valor : e.kwota / valor),
      waluta: naPln ? "złoty (PLN)" : NAZWY[e.waluta],
      kurs: valor,
      odwrotny: 1 / valor,
      fecha,
      observaciones: ["To średni kurs NBP z tabeli A. Banki i kantory kupują i sprzedają walutę po własnych kursach, z marżą."],
    };
  },
  resultado: [
    { clave: "wynik", etiqueta: "Po przeliczeniu", formato: "numero", decimales: 2, destacada: true },
    { clave: "waluta", etiqueta: "Waluta wyniku", formato: "texto" },
    { clave: "kurs", etiqueta: "Średni kurs NBP (zł za 1 jednostkę)", formato: "numero", decimales: 4 },
    { clave: "odwrotny", etiqueta: "Ile waluty za 1 zł", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Data tabeli kursów", formato: "fecha" },
  ],
});
