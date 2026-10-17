import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.allocations-familiales",
  h1: "Familienzulagen in Luxemburg berechnen (Zukunftskeess)",
  title: "Familienzulagen Luxemburg 2026: Kindergeld der CAE",
  description: "Familienzulagen in Luxemburg: {{lu.allocation-familiale}} pro Kind und Monat, Alterszuschläge und Schulanfangszulage der Zukunftskeess.",
  intro: [
    "Seit dem 1. Juni 2026 beträgt die Familienzulage {{lu.allocation-familiale}} pro Kind und Monat. Ab 6 Jahren und erneut ab 12 Jahren kommt ein Zuschlag hinzu.",
    "Für Kinder ab 6 Jahren wird einmal im Jahr eine Schulanfangszulage gezahlt.",
  ],
  comoSeCalcula: [
    "Pro Monat: {{lu.allocation-familiale}} pro Kind, plus {{lu.majoration-age[6-11]}} von 6 bis 11 Jahren oder {{lu.majoration-age[12-plus]}} ab 12 Jahren.",
    "Schulanfang: {{lu.allocation-rentree[6-11]}} von 6 bis 11 Jahren, {{lu.allocation-rentree[12-plus]}} ab 12 Jahren.",
  ],
  ejemplo: [
    "Für drei Kinder von 4, 8 und 14 Jahren betragen die Familienzulagen 1.028,37 Euro im Monat und die Schulanfangszulage 350 Euro.",
  ],
  faq: [
    { pregunta: "Hängt der Betrag von der Zahl der Kinder ab?", respuesta: "Nein, im System seit dem 1. August 2016: Der Betrag ist für jedes Kind gleich." },
    { pregunta: "Wer zahlt die Familienzulagen?", respuesta: "Die Zukunftskeess, auf Französisch Caisse pour l'avenir des enfants (CAE)." },
    { pregunta: "Gibt es eine Geburtszulage?", respuesta: "Ja, in drei Teilen. Dieser Rechner berücksichtigt sie nicht." },
  ],
  glosario: [
    { termino: "Zukunftskeess", definicion: "Caisse pour l'avenir des enfants (CAE), die die Familienleistungen auszahlt." },
  ],
});
