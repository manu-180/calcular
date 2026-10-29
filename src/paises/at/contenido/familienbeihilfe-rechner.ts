import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.familienbeihilfe-rechner",
  h1: "Familienbeihilfe-Rechner {{anio}}",
  title: "Familienbeihilfe {{anio}} berechnen: Beträge und Staffel",
  description: "Wie viel Familienbeihilfe bekommen Sie {{anio}}? Beträge nach Alter, Geschwisterstaffelung, Kinderabsetzbetrag von {{at.kinderabsetzbetrag}} und Schulstartgeld.",
  intro: [
    "Die Familienbeihilfe wird monatlich für jedes Kind ausgezahlt, gemeinsam mit dem Kinderabsetzbetrag. Die Höhe hängt vom Alter des Kindes und von der Zahl der Kinder ab.",
    "Für 2026 und 2027 bleiben die Beträge auf dem Stand von 2025.",
  ],
  comoSeCalcula: [
    "Grundbetrag je Kind und Monat: ab Geburt {{at.familienbeihilfe[ab-0]}}, ab 3 Jahren {{at.familienbeihilfe[ab-3]}}, ab 10 Jahren {{at.familienbeihilfe[ab-10]}}, ab 19 Jahren {{at.familienbeihilfe[ab-19]}}.",
    "Geschwisterstaffelung je Kind: bei zwei Kindern {{at.geschwisterstaffel[2]}}, bei drei {{at.geschwisterstaffel[3]}}, bei vier {{at.geschwisterstaffel[4]}}, bei fünf {{at.geschwisterstaffel[5]}}, bei sechs {{at.geschwisterstaffel[6]}}, ab sieben {{at.geschwisterstaffel[7]}}.",
    "Dazu kommen der Kinderabsetzbetrag von {{at.kinderabsetzbetrag}} je Kind und Monat, bei erheblicher Behinderung ein Zuschlag von {{at.familienbeihilfe-zuschlaege[behinderung]}} und im August das Schulstartgeld von {{at.familienbeihilfe-zuschlaege[schulstartgeld]}} für Kinder zwischen 6 und 15 Jahren.",
  ],
  ejemplo: [
    "Eine Familie mit einem einjährigen und einem fünfjährigen Kind bekommt 303,60 Euro Familienbeihilfe und 141,80 Euro Kinderabsetzbetrag, zusammen 445,40 Euro im Monat.",
  ],
  faq: [
    {
      pregunta: "Wird die Familienbeihilfe 2026 erhöht?",
      respuesta: "Nein. In den Jahren 2026 und 2027 bleiben die Beträge auf dem Niveau von 2025.",
    },
    {
      pregunta: "Muss ich den Kinderabsetzbetrag beantragen?",
      respuesta: "Nein, er wird automatisch gemeinsam mit der Familienbeihilfe ausgezahlt.",
    },
    {
      pregunta: "Für welche Kinder gibt es 2026 das Schulstartgeld?",
      respuesta: "Für Kinder zwischen 6 und 15 Jahren, im Jahr 2026 für die Geburtsjahrgänge 2011 bis 2020. Es wird mit der Familienbeihilfe für August ausgezahlt.",
    },
  ],
  glosario: [
    { termino: "Geschwisterstaffelung", definicion: "Ein Zuschlag je Kind, der mit der Zahl der Kinder steigt." },
    { termino: "Kinderabsetzbetrag", definicion: "Ein Betrag je Kind, der zusammen mit der Familienbeihilfe ausgezahlt wird." },
  ],
});
