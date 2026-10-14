import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ch.mwst-rechner",
  mercado: "ch",
  concepto: "iva",
  slug: "mwst-rechner",
  estado: "publicado",
  requiere: {
    "ch.mwst-normalsatz": "numero",
    "ch.mwst-reduziert": "numero",
    "ch.mwst-beherbergung": "numero",
  },
  campos: [
    { id: "betrag", tipo: "moneda", etiqueta: "Betrag in Franken", min: 0, porDefecto: 100 },
    {
      id: "richtung",
      tipo: "opcion",
      etiqueta: "Was möchten Sie berechnen?",
      opciones: [
        { valor: "zuschlagen", etiqueta: "MWST dazurechnen (Betrag ist ohne MWST)" },
        { valor: "herausrechnen", etiqueta: "MWST herausrechnen (Betrag ist inklusive MWST)" },
      ],
      porDefecto: "zuschlagen",
    },
    {
      id: "satz",
      tipo: "opcion",
      etiqueta: "Steuersatz",
      opciones: [
        { valor: "normal", etiqueta: "Normalsatz" },
        { valor: "reduziert", etiqueta: "Reduzierter Satz (zum Beispiel Lebensmittel, Medikamente, Bücher)" },
        { valor: "beherbergung", etiqueta: "Sondersatz für Beherbergung (Übernachtung mit Frühstück)" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const satz =
      entrada.satz === "reduziert" ? valores["ch.mwst-reduziert"] : entrada.satz === "beherbergung" ? valores["ch.mwst-beherbergung"] : valores["ch.mwst-normalsatz"];
    const netto = entrada.richtung === "zuschlagen" ? entrada.betrag : redondear(entrada.betrag / (1 + satz / 100));
    const mwst = entrada.richtung === "zuschlagen" ? redondear(porcentaje(netto, satz)) : redondear(entrada.betrag - netto);
    return { satz, netto, mwst, brutto: redondear(netto + mwst) };
  },
  resultado: [
    { clave: "mwst", etiqueta: "Mehrwertsteuer", formato: "moneda", destacada: true },
    { clave: "netto", etiqueta: "Betrag ohne MWST", formato: "moneda" },
    { clave: "brutto", etiqueta: "Betrag inklusive MWST", formato: "moneda" },
    { clave: "satz", etiqueta: "Steuersatz", formato: "porcentaje", decimales: 1 },
  ],
});
