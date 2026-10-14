import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ch.ueberstunden-rechner",
  mercado: "ch",
  concepto: "horas-extra",
  slug: "ueberstunden-rechner",
  estado: "publicado",
  requiere: { "ch.ueberstunden-zuschlag": "numero" },
  campos: [
    {
      id: "lohnart",
      tipo: "opcion",
      etiqueta: "Lohnart",
      opciones: [
        { valor: "monat", etiqueta: "Monatslohn" },
        { valor: "stunde", etiqueta: "Stundenlohn" },
      ],
      porDefecto: "monat",
    },
    { id: "lohn", tipo: "moneda", etiqueta: "Bruttolohn (pro Monat oder pro Stunde)", min: 0, porDefecto: 6500 },
    { id: "wochenstunden", tipo: "numero", etiqueta: "Vertragliche Arbeitszeit pro Woche (Stunden)", min: 1, max: 60, porDefecto: 42 },
    { id: "stunden", tipo: "numero", etiqueta: "Anzahl Überstunden", min: 0, porDefecto: 10 },
    { id: "zuschlag", tipo: "porcentaje", etiqueta: "Zuschlag laut Vertrag", min: 0, max: 200, requerido: false, ayuda: "Leer lassen, dann gilt der gesetzliche Zuschlag." },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.wochenstunden <= 0) throw new ErrorEntrada("Bitte die Wochenarbeitszeit eingeben.", "wochenstunden");
    const gesetz = valores["ch.ueberstunden-zuschlag"];
    const satz = entrada.zuschlag ?? gesetz;
    const stundenlohn = entrada.lohnart === "stunde" ? entrada.lohn : (entrada.lohn * 12) / 52 / entrada.wochenstunden;
    const grund = stundenlohn * entrada.stunden;
    const zuschlag = (grund * satz) / 100;
    const hinweise: string[] = [];
    if (satz < gesetz) hinweise.push("Ein tieferer Zuschlag oder keiner gilt nur, wenn er schriftlich vereinbart oder in einem Normal- oder Gesamtarbeitsvertrag geregelt ist.");
    hinweise.push("Mit Ihrem Einverständnis kann der Arbeitgeber Überstunden auch mit Freizeit von mindestens gleicher Dauer ausgleichen. Dann gibt es keinen Zuschlag.");
    return {
      total: redondear(grund + zuschlag),
      stundenlohn: redondear(stundenlohn),
      grund: redondear(grund),
      zuschlag: redondear(zuschlag),
      satz,
      observaciones: hinweise,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Vergütung für die Überstunden", formato: "moneda", destacada: true },
    { clave: "grund", etiqueta: "Normallohn für diese Stunden", formato: "moneda" },
    { clave: "zuschlag", etiqueta: "Zuschlag", formato: "moneda" },
    { clave: "satz", etiqueta: "Zuschlagssatz", formato: "porcentaje", decimales: 0 },
    { clave: "stundenlohn", etiqueta: "Stundenlohn", formato: "moneda" },
  ],
});
