import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NUME = {
  eur: "euro (EUR)",
  usd: "dolari americani (USD)",
  gbp: "lire sterline (GBP)",
  chf: "franci elvețieni (CHF)",
  mdl: "lei moldovenești (MDL)",
} as const;

export default definirCalculadora({
  id: "ro.curs-valutar-bnr",
  mercado: "ro",
  concepto: "tipo-de-cambio",
  slug: "curs-valutar-bnr",
  estado: "publicado",
  requiere: {
    "ro.eur": "serie",
    "ro.usd": "serie",
    "ro.gbp": "serie",
    "ro.chf": "serie",
    "ro.mdl": "serie",
  },
  campos: [
    {
      id: "moneda",
      tipo: "opcion",
      etiqueta: "Moneda",
      opciones: [
        { valor: "eur", etiqueta: "Euro (EUR)" },
        { valor: "usd", etiqueta: "Dolar american (USD)" },
        { valor: "gbp", etiqueta: "Liră sterlină (GBP)" },
        { valor: "chf", etiqueta: "Franc elvețian (CHF)" },
        { valor: "mdl", etiqueta: "Leu moldovenesc (MDL)" },
      ],
      porDefecto: "eur",
    },
    {
      id: "directie",
      tipo: "opcion",
      etiqueta: "Ce transformați",
      opciones: [
        { valor: "in-lei", etiqueta: "Din valută în lei" },
        { valor: "din-lei", etiqueta: "Din lei în valută" },
      ],
      porDefecto: "in-lei",
    },
    { id: "suma", tipo: "numero", etiqueta: "Suma", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Introduceți o sumă mai mare decât zero.", "suma");
    const { valor, fecha } = v[`ro.${e.moneda}`];
    const inLei = e.directie === "in-lei";
    return {
      rezultat: redondear(inLei ? e.suma * valor : e.suma / valor),
      moneda: inLei ? "lei (RON)" : NUME[e.moneda],
      curs: valor,
      invers: 1 / valor,
      fecha,
      observaciones: ["Este cursul de referință al BNR. Băncile și casele de schimb cumpără și vând valuta la cursurile lor, cu marjă."],
    };
  },
  resultado: [
    { clave: "rezultat", etiqueta: "Rezultat", formato: "numero", decimales: 2, destacada: true },
    { clave: "moneda", etiqueta: "Moneda rezultatului", formato: "texto" },
    { clave: "curs", etiqueta: "Cursul BNR (lei pentru o unitate)", formato: "numero", decimales: 4 },
    { clave: "invers", etiqueta: "Câtă valută primiți pentru 1 leu", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Data cursului", formato: "fecha" },
  ],
});
