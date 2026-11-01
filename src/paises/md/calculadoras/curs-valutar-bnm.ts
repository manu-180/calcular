import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NUME = {
  eur: "euro (EUR)",
  usd: "dolari SUA (USD)",
  ron: "lei românești (RON)",
  uah: "grivne ucrainene (UAH)",
  gbp: "lire sterline (GBP)",
} as const;

export default definirCalculadora({
  id: "md.curs-valutar-bnm",
  mercado: "md",
  concepto: "tipo-de-cambio",
  slug: "curs-valutar-bnm",
  estado: "publicado",
  requiere: {
    "md.eur": "serie",
    "md.usd": "serie",
    "md.ron": "serie",
    "md.uah": "serie",
    "md.gbp": "serie",
  },
  campos: [
    {
      id: "moneda",
      tipo: "opcion",
      etiqueta: "Valuta",
      opciones: [
        { valor: "eur", etiqueta: "Euro (EUR)" },
        { valor: "usd", etiqueta: "Dolar SUA (USD)" },
        { valor: "ron", etiqueta: "Leu românesc (RON)" },
        { valor: "uah", etiqueta: "Grivnă ucraineană (UAH)" },
        { valor: "gbp", etiqueta: "Liră sterlină (GBP)" },
      ],
      porDefecto: "eur",
    },
    {
      id: "directie",
      tipo: "opcion",
      etiqueta: "Ce transformați",
      opciones: [
        { valor: "in-lei", etiqueta: "Din valută în lei moldovenești" },
        { valor: "din-lei", etiqueta: "Din lei moldovenești în valută" },
      ],
      porDefecto: "in-lei",
    },
    { id: "suma", tipo: "numero", etiqueta: "Suma", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Introduceți o sumă mai mare decât zero.", "suma");
    const { valor, fecha } = v[`md.${e.moneda}`];
    const inLei = e.directie === "in-lei";
    return {
      rezultat: redondear(inLei ? e.suma * valor : e.suma / valor),
      moneda: inLei ? "lei moldovenești (MDL)" : NUME[e.moneda],
      curs: valor,
      invers: 1 / valor,
      fecha,
      observaciones: ["Este cursul oficial al BNM. Băncile și casele de schimb cumpără și vând valuta la cursurile lor."],
    };
  },
  resultado: [
    { clave: "rezultat", etiqueta: "Rezultat", formato: "numero", decimales: 2, destacada: true },
    { clave: "moneda", etiqueta: "Moneda rezultatului", formato: "texto" },
    { clave: "curs", etiqueta: "Cursul oficial BNM (lei pentru o unitate)", formato: "numero", decimales: 4 },
    { clave: "invers", etiqueta: "Câtă valută primiți pentru 1 leu", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Data cursului", formato: "fecha" },
  ],
});
