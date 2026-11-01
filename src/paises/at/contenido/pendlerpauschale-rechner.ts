import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.pendlerpauschale-rechner",
  h1: "Pendlerpauschale und Pendlereuro berechnen",
  title: "Pendlerpauschale {{anio}}: Rechner mit Pendlereuro",
  description: "Kleines oder großes Pendlerpauschale, Pendlereuro von {{at.pendlereuro}} je Kilometer und Ihre Steuerersparnis: der Pendlerrechner für Österreich {{anio}}.",
  intro: [
    "Die Fahrten zur Arbeit sind in Österreich mit dem Verkehrsabsetzbetrag abgegolten. Wer weiter weg wohnt oder öffentliche Verkehrsmittel nicht zumutbar nutzen kann, bekommt zusätzlich das Pendlerpauschale und den Pendlereuro.",
    "Das Pendlerpauschale senkt die Bemessungsgrundlage der Lohnsteuer, der Pendlereuro zieht direkt von der Steuer ab.",
  ],
  comoSeCalcula: [
    "Kleines Pendlerpauschale (öffentliche Verkehrsmittel zumutbar): 20 bis 40 km {{at.pendlerpauschale[klein-20]}}, über 40 bis 60 km {{at.pendlerpauschale[klein-40]}}, über 60 km {{at.pendlerpauschale[klein-60]}} im Jahr.",
    "Großes Pendlerpauschale (nicht zumutbar): 2 bis 20 km {{at.pendlerpauschale[gross-2]}}, über 20 bis 40 km {{at.pendlerpauschale[gross-20]}}, über 40 bis 60 km {{at.pendlerpauschale[gross-40]}}, über 60 km {{at.pendlerpauschale[gross-60]}} im Jahr.",
    "Pendlereuro: {{at.pendlereuro}} im Jahr je Kilometer der einfachen Strecke.",
    "Wer an mindestens elf Tagen im Monat fährt, bekommt beides voll, an acht bis zehn Tagen zu zwei Dritteln, an vier bis sieben Tagen zu einem Drittel.",
  ],
  ejemplo: [
    "Bei 30 km und großem Pendlerpauschale sind es 1.476 Euro Freibetrag und 180 Euro Pendlereuro im Jahr. Bei 3.500 Euro brutto spart das rund 623 Euro Lohnsteuer im Jahr.",
  ],
  faq: [
    {
      pregunta: "Wann ist die Benützung öffentlicher Verkehrsmittel nicht zumutbar?",
      respuesta: "Das hängt vor allem von der Fahrzeit ab. Ob Ihnen das kleine oder große Pendlerpauschale zusteht, ermittelt der Pendlerrechner des Finanzministeriums.",
    },
    {
      pregunta: "Steht das Pendlerpauschale auch im Urlaub und im Krankenstand zu?",
      respuesta: "Ja, während Urlaub und Krankenstand bleibt es bestehen. In einer Karenz steht es nicht zu.",
    },
    {
      pregunta: "Wie hoch ist der Pendlereuro 2026?",
      respuesta: "Seit 2026 sind es {{at.pendlereuro}} im Jahr je Kilometer der einfachen Strecke, bis 2025 waren es 2 Euro.",
    },
  ],
  glosario: [
    { termino: "Freibetrag", definicion: "Ein Betrag, der vom zu versteuernden Einkommen abgezogen wird." },
    { termino: "Absetzbetrag", definicion: "Ein Betrag, der direkt von der Steuer abgezogen wird." },
  ],
});
