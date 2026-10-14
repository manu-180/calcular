import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "at.mehrwertsteuer-rechner",
  mercado: "at",
  concepto: "iva",
  slug: "mehrwertsteuer-rechner",
  estado: "publicado",
  requiere: { "at.ust": "mapa" },
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
    { id: "satz", tipo: "opcion-dato", etiqueta: "Steuersatz", dato: "at.ust", porDefecto: "normal" },
  ],
  calcular(entrada, valores, { redondear }) {
    const satz = enMapa(valores["at.ust"], entrada.satz);
    const netto = entrada.richtung === "aufschlagen" ? entrada.betrag : redondear(entrada.betrag / (1 + satz / 100));
    const ust = entrada.richtung === "aufschlagen" ? redondear(porcentaje(netto, satz)) : redondear(entrada.betrag - netto);
    return { satz, netto, ust, brutto: redondear(netto + ust) };
  },
  resultado: [
    { clave: "ust", etiqueta: "Umsatzsteuer", formato: "moneda", destacada: true },
    { clave: "netto", etiqueta: "Nettobetrag", formato: "moneda" },
    { clave: "brutto", etiqueta: "Bruttobetrag", formato: "moneda" },
    { clave: "satz", etiqueta: "Steuersatz", formato: "porcentaje", decimales: 1 },
  ],
});
