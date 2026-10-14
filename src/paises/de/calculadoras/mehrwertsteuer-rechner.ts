import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "de.mehrwertsteuer-rechner",
  mercado: "de",
  concepto: "iva",
  slug: "mehrwertsteuer-rechner",
  estado: "publicado",
  requiere: {
    "de.mwst-regelsatz": "numero",
    "de.mwst-ermaessigt": "numero",
  },
  campos: [
    { id: "betrag", tipo: "moneda", etiqueta: "Betrag", min: 0, porDefecto: 100 },
    {
      id: "richtung",
      tipo: "opcion",
      etiqueta: "Was möchten Sie berechnen?",
      opciones: [
        { valor: "aufschlagen", etiqueta: "Mehrwertsteuer aufschlagen (Betrag ist netto)" },
        { valor: "herausrechnen", etiqueta: "Mehrwertsteuer herausrechnen (Betrag ist brutto)" },
      ],
      porDefecto: "aufschlagen",
    },
    {
      id: "satz",
      tipo: "opcion",
      etiqueta: "Steuersatz",
      opciones: [
        { valor: "regel", etiqueta: "Regelsatz" },
        { valor: "ermaessigt", etiqueta: "Ermäßigter Satz (zum Beispiel viele Lebensmittel, Bücher)" },
      ],
      porDefecto: "regel",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const satz = entrada.satz === "ermaessigt" ? valores["de.mwst-ermaessigt"] : valores["de.mwst-regelsatz"];
    const netto = entrada.richtung === "aufschlagen" ? entrada.betrag : redondear(entrada.betrag / (1 + satz / 100));
    const mwst = entrada.richtung === "aufschlagen" ? redondear(porcentaje(netto, satz)) : redondear(entrada.betrag - netto);
    return { satz, netto, mwst, brutto: redondear(netto + mwst) };
  },
  resultado: [
    { clave: "mwst", etiqueta: "Mehrwertsteuer", formato: "moneda", destacada: true },
    { clave: "netto", etiqueta: "Nettobetrag", formato: "moneda" },
    { clave: "brutto", etiqueta: "Bruttobetrag", formato: "moneda" },
    { clave: "satz", etiqueta: "Steuersatz", formato: "porcentaje" },
  ],
});
