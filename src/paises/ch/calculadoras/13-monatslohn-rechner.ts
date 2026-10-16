import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ch.13-monatslohn-rechner",
  mercado: "ch",
  concepto: "bono-semestral",
  slug: "13-monatslohn-rechner",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "monatslohn", tipo: "moneda", etiqueta: "Bruttolohn pro Monat", min: 0, porDefecto: 6500 },
    { id: "monate", tipo: "numero", etiqueta: "Gearbeitete Monate im Kalenderjahr", min: 0, max: 12, porDefecto: 12, ayuda: "Halbe Monate als 0.5 eingeben." },
  ],
  calcular(entrada, _valores, { redondear }) {
    if (entrada.monate < 0 || entrada.monate > 12) throw new ErrorEntrada("Ein Jahr hat höchstens 12 Monate.", "monate");
    const anteil = redondear((entrada.monatslohn * entrada.monate) / 12);
    return {
      anteil,
      proMonat: redondear(entrada.monatslohn / 12),
      jahreslohn: redondear(entrada.monatslohn * entrada.monate + anteil),
      observaciones: [
        "Der 13. Monatslohn ist nur geschuldet, wenn er vereinbart ist, etwa im Arbeitsvertrag oder in einem Gesamtarbeitsvertrag. Dort steht auch, wie er bei einem Ein- oder Austritt während des Jahres berechnet wird.",
      ],
    };
  },
  resultado: [
    { clave: "anteil", etiqueta: "13. Monatslohn (anteilig)", formato: "moneda", destacada: true },
    { clave: "proMonat", etiqueta: "Anteil pro gearbeiteten Monat", formato: "moneda" },
    { clave: "jahreslohn", etiqueta: "Bruttolohn für diese Monate inklusive 13. Monatslohn", formato: "moneda" },
  ],
});
