import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NOFN = { eur: "evrur (EUR)", usd: "Bandaríkjadalir (USD)", gbp: "sterlingspund (GBP)", nok: "norskar krónur (NOK)", sek: "sænskar krónur (SEK)", chf: "svissneskir frankar (CHF)" } as const;

export default definirCalculadora({
  id: "is.gengi",
  mercado: "is",
  concepto: "tipo-de-cambio",
  slug: "gengi",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  requiere: { "is.eur": "serie", "is.usd": "serie", "is.gbp": "serie", "is.nok": "serie", "is.sek": "serie", "is.chf": "serie" },
  campos: [
    {
      id: "mynt",
      tipo: "opcion",
      etiqueta: "Gjaldmiðill",
      opciones: [
        { valor: "eur", etiqueta: "Evra (EUR)" },
        { valor: "usd", etiqueta: "Bandaríkjadalur (USD)" },
        { valor: "gbp", etiqueta: "Sterlingspund (GBP)" },
        { valor: "nok", etiqueta: "Norsk króna (NOK)" },
        { valor: "sek", etiqueta: "Sænsk króna (SEK)" },
        { valor: "chf", etiqueta: "Svissneskur franki (CHF)" },
      ],
      porDefecto: "eur",
    },
    {
      id: "stefna",
      tipo: "opcion",
      etiqueta: "Umreikningur",
      opciones: [
        { valor: "ikr", etiqueta: "Úr erlendri mynt í krónur" },
        { valor: "erlent", etiqueta: "Úr krónum í erlenda mynt" },
      ],
      porDefecto: "ikr",
    },
    { id: "upphaed", tipo: "numero", etiqueta: "Upphæð", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.upphaed <= 0) throw new ErrorEntrada("Sláðu inn upphæð hærri en núll.", "upphaed");
    const { valor, fecha } = v[`is.${e.mynt}`];
    const ikr = e.stefna === "ikr";
    return {
      nidurstada: redondear(ikr ? e.upphaed * valor : e.upphaed / valor),
      mynt: ikr ? "íslenskar krónur (ISK)" : NOFN[e.mynt],
      gengi: valor,
      fecha,
      observaciones: ["Þetta er opinbert viðmiðunargengi Seðlabankans (miðgengi). Bankar og gjaldeyrisskrifstofur nota eigið gengi með álagi."],
    };
  },
  resultado: [
    { clave: "nidurstada", etiqueta: "Umreiknað", formato: "numero", decimales: 2, destacada: true },
    { clave: "mynt", etiqueta: "Mynt niðurstöðu", formato: "texto" },
    { clave: "gengi", etiqueta: "Miðgengi (krónur á einingu)", formato: "numero", decimales: 3 },
    { clave: "fecha", etiqueta: "Dagsetning gengis", formato: "fecha" },
  ],
});
