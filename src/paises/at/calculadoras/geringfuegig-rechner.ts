import { definirCalculadora } from "@/motor/calculo";

const WOCHEN_PRO_MONAT = 52 / 12;

export default definirCalculadora({
  id: "at.geringfuegig-rechner",
  mercado: "at",
  concepto: "propio",
  slug: "geringfuegig-rechner",
  estado: "publicado",
  requiere: { "at.beitragsgrundlage": "mapa" },
  campos: [
    { id: "stundenlohn", tipo: "moneda", etiqueta: "Bruttostundenlohn", min: 0.01, porDefecto: 14 },
    { id: "stunden", tipo: "numero", etiqueta: "Geplante Stunden pro Woche", min: 0, max: 60, porDefecto: 8 },
  ],
  calcular(entrada, valores, { redondear }) {
    const grenze = valores["at.beitragsgrundlage"].geringfuegig;
    const monatslohn = redondear(entrada.stundenlohn * entrada.stunden * WOCHEN_PRO_MONAT);
    const geringfuegig = monatslohn <= grenze;
    return {
      ergebnis: geringfuegig ? "Geringfügig beschäftigt" : "Über der Geringfügigkeitsgrenze: voll versichert",
      monatslohn,
      grenze,
      abstand: redondear(grenze - monatslohn),
      maxStunden: grenze / (entrada.stundenlohn * WOCHEN_PRO_MONAT),
      observaciones: geringfuegig
        ? ["Sie zahlen aus dieser Beschäftigung keine Sozialversicherung. Haben Sie mehrere Jobs und liegen Sie zusammen über der Grenze, schreibt Ihnen die Krankenkasse die Beiträge im Nachhinein vor."]
        : ["Über der Grenze fallen Kranken-, Pensions- und Arbeitslosenversicherung an. Was netto bleibt, zeigt der Brutto-Netto-Rechner."],
    };
  },
  resultado: [
    { clave: "ergebnis", etiqueta: "Ergebnis", formato: "texto", destacada: true },
    { clave: "monatslohn", etiqueta: "Monatslohn (Wochenstunden mal 52 durch 12)", formato: "moneda" },
    { clave: "grenze", etiqueta: "Geringfügigkeitsgrenze 2026", formato: "moneda" },
    { clave: "abstand", etiqueta: "Abstand zur Grenze", formato: "moneda" },
    { clave: "maxStunden", etiqueta: "Höchstens möglich pro Woche", formato: "horas", decimales: 1 },
  ],
});
