import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hr.tecaj-hnb",
  mercado: "hr",
  concepto: "tipo-de-cambio",
  slug: "tecaj-hnb",
  estado: "publicado",
  requiere: { "hr.usd": "serie", "hr.gbp": "serie", "hr.chf": "serie", "hr.bam": "serie", "hr.pln": "serie", "hr.huf": "serie", "hr.czk": "serie" },
  campos: [
    {
      id: "valuta",
      tipo: "opcion",
      etiqueta: "Valuta",
      opciones: [
        { valor: "usd", etiqueta: "Američki dolar (USD)" },
        { valor: "gbp", etiqueta: "Britanska funta (GBP)" },
        { valor: "chf", etiqueta: "Švicarski franak (CHF)" },
        { valor: "bam", etiqueta: "Konvertibilna marka (BAM)" },
        { valor: "pln", etiqueta: "Poljski zlot (PLN)" },
        { valor: "huf", etiqueta: "Mađarska forinta (HUF)" },
        { valor: "czk", etiqueta: "Češka kruna (CZK)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "smjer",
      tipo: "opcion",
      etiqueta: "Pretvorba",
      opciones: [
        { valor: "izEura", etiqueta: "Iz eura u valutu" },
        { valor: "uEuro", etiqueta: "Iz valute u eure" },
      ],
      porDefecto: "izEura",
    },
    { id: "iznos", tipo: "numero", etiqueta: "Iznos", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.iznos <= 0) throw new ErrorEntrada("Unesite iznos veći od nule.", "iznos");
    const { valor, fecha } = v[`hr.${e.valuta}`];
    return {
      rezultat: redondear(e.smjer === "izEura" ? e.iznos * valor : e.iznos / valor),
      valuta: e.smjer === "izEura" ? e.valuta.toUpperCase() : "EUR",
      tecaj: valor,
      fecha,
      observaciones: ["Ovo je srednji tečaj HNB-a. Banke i mjenjačnice rade po vlastitim tečajevima."],
    };
  },
  resultado: [
    { clave: "rezultat", etiqueta: "Rezultat", formato: "numero", decimales: 2, destacada: true },
    { clave: "valuta", etiqueta: "Valuta rezultata", formato: "texto" },
    { clave: "tecaj", etiqueta: "Srednji tečaj HNB-a, valuta za 1 euro", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Datum primjene", formato: "fecha" },
  ],
});
