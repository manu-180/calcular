import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "li.kinderzulagen-rechner",
  h1: "Kinderzulagen Liechtenstein berechnen",
  title: "Kinderzulage Liechtenstein {{anio}}: Rechner",
  description: "Kinderzulagen der FAK in Liechtenstein: {{li.kinderzulage}} pro Kind, {{li.kinderzulage-erhoeht}} ab 10 Jahren und ab dem dritten Kind, plus Alleinerziehendenzulage.",
  intro: [
    "Die Kinderzulage beträgt {{li.kinderzulage}} pro Kind und Monat. Ab dem Monat, in dem das Kind das 10. Lebensjahr vollendet, steigt sie auf {{li.kinderzulage-erhoeht}}.",
    "Wer mehr als zwei zulagenberechtigte Kinder hat, erhält für jedes Kind {{li.kinderzulage-erhoeht}}.",
  ],
  comoSeCalcula: [
    "Bis zwei Kinder: {{li.kinderzulage}} für Kinder unter 10, {{li.kinderzulage-erhoeht}} für Kinder ab 10.",
    "Ab drei Kindern: {{li.kinderzulage-erhoeht}} für jedes Kind.",
    "Alleinerziehende erhalten zusätzlich {{li.alleinerziehendenzulage}} pro Kind und Monat.",
  ],
  ejemplo: [
    "Eine Familie mit zwei Kindern von 6 und 12 Jahren erhält 670 Franken im Monat, 8040 Franken im Jahr.",
  ],
  faq: [
    { pregunta: "Wer zahlt die Kinderzulagen?", respuesta: "Die Familienausgleichskasse (FAK) der Liechtensteinischen AHV-IV-FAK." },
    { pregunta: "Was gilt für Zwillinge?", respuesta: "Für Zwillinge beträgt die Kinderzulage ab Geburt je {{li.kinderzulage-erhoeht}}." },
    { pregunta: "Was gilt für Grenzgänger?", respuesta: "Arbeiten beide Eltern in verschiedenen Vertragsstaaten, zahlt der Wohnstaat. Die FAK zahlt einen Differenzausgleich, wenn die ausländischen Zulagen tiefer sind." },
  ],
  glosario: [
    { termino: "Alleinerziehendenzulage", definicion: "Zulage pro Kind für alleinstehende Personen, die mit dem Kind im gleichen Haushalt leben." },
  ],
});
