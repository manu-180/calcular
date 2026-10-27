import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.geringfuegig-rechner",
  h1: "Geringfügigkeitsgrenze {{anio}}: bin ich geringfügig beschäftigt?",
  title: "Geringfügigkeitsgrenze {{anio}}: Rechner für Nebenjobs",
  description: "Die Geringfügigkeitsgrenze {{anio}} liegt bei {{at.beitragsgrundlage[geringfuegig]}} im Monat. Prüfen Sie mit Stundenlohn und Wochenstunden, ob Ihr Job darunter bleibt.",
  intro: [
    "Wer im Monat nicht mehr als {{at.beitragsgrundlage[geringfuegig]}} verdient, ist in Österreich geringfügig beschäftigt und zahlt aus diesem Job keine Sozialversicherung.",
    "Der Rechner zeigt, ob Ihr Monatslohn unter der Grenze bleibt und wie viele Stunden pro Woche bei Ihrem Stundenlohn möglich sind.",
  ],
  comoSeCalcula: [
    "Monatslohn: Stundenlohn mal Wochenstunden mal 52 durch 12.",
    "Liegt der Monatslohn bei höchstens {{at.beitragsgrundlage[geringfuegig]}}, ist die Beschäftigung geringfügig.",
    "Höchste Wochenstunden: Grenze geteilt durch Stundenlohn mal 52 durch 12.",
  ],
  ejemplo: [
    "Bei 14 Euro Stundenlohn und 8 Stunden pro Woche verdienen Sie 485,33 Euro im Monat und bleiben unter der Grenze. Möglich wären bis zu rund 9 Stunden pro Woche.",
  ],
  faq: [
    {
      pregunta: "Steigt die Geringfügigkeitsgrenze 2026?",
      respuesta: "Nein. Die Aufwertung wurde für 2026 ausgesetzt, die Grenze bleibt wie 2025 bei {{at.beitragsgrundlage[geringfuegig]}} im Monat.",
    },
    {
      pregunta: "Was passiert bei mehreren geringfügigen Jobs?",
      respuesta: "Liegen Ihre Einkünfte aus mehreren Beschäftigungen zusammen über der Grenze, schreibt Ihnen die Krankenkasse die Beiträge für das Jahr im Nachhinein vor.",
    },
    {
      pregunta: "Wie hoch ist die Geringfügigkeitsgrenze 2026?",
      respuesta: "Sie beträgt {{at.beitragsgrundlage[geringfuegig]}} brutto im Monat.",
    },
  ],
  glosario: [
    { termino: "Geringfügige Beschäftigung", definicion: "Ein Job mit einem Monatslohn bis zur Geringfügigkeitsgrenze." },
    { termino: "Geringfügigkeitsgrenze", definicion: "Die Einkommensgrenze, bis zu der keine Dienstnehmerbeiträge anfallen." },
  ],
});
