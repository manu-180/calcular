import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.abfertigung-alt-rechner",
  h1: "Abfertigung alt berechnen",
  title: "Abfertigung alt: Rechner nach Dienstjahren",
  description: "Wie hoch ist Ihre Abfertigung alt? Zwei bis zwölf Monatsentgelte je nach Dienstjahren, mit {{at.abfertigung-steuer}} Lohnsteuer. Für Dienstverhältnisse vor 2003.",
  intro: [
    "Die Abfertigung alt gilt für Arbeitsverhältnisse, die vor dem 1. Jänner 2003 begonnen haben. Sie wird vom Arbeitgeber gezahlt, wenn das Arbeitsverhältnis mindestens drei Jahre gedauert hat und auf eine Art endet, die den Anspruch wahrt.",
    "Die Höhe steigt in Stufen mit den Dienstjahren. Grundlage ist das Entgelt im letzten Monat.",
  ],
  comoSeCalcula: [
    "Nach 3 Dienstjahren {{at.abfertigung-alt[3]}} Monatsentgelte, nach 5 Jahren {{at.abfertigung-alt[5]}}, nach 10 Jahren {{at.abfertigung-alt[10]}}, nach 15 Jahren {{at.abfertigung-alt[15]}}, nach 20 Jahren {{at.abfertigung-alt[20]}} und nach 25 Jahren {{at.abfertigung-alt[25]}} Monatsentgelte.",
    "Wenn Sie Urlaubsgeld und Weihnachtsgeld anteilig dazurechnen möchten, setzt der Rechner das Monatsentgelt mal 14 durch 12 an.",
    "Die Abfertigung wird mit dem festen Satz von {{at.abfertigung-steuer}} versteuert.",
  ],
  ejemplo: [
    "Nach zwölf Dienstjahren stehen vier Monatsentgelte zu. Bei 3.000 Euro brutto und anteiligen Sonderzahlungen sind das 14.000 Euro, nach 6 % Lohnsteuer 13.160 Euro.",
  ],
  faq: [
    {
      pregunta: "Wann geht die Abfertigung alt verloren?",
      respuesta: "Unter anderem bei Selbstkündigung. Eine Ausnahme ist die Selbstkündigung wegen Pensionsantritt, wenn das Arbeitsverhältnis mindestens zehn Jahre ununterbrochen gedauert hat.",
    },
    {
      pregunta: "Gilt die Abfertigung alt noch, wenn ich in das neue System gewechselt bin?",
      respuesta: "Wurden die alten Ansprüche eingefroren, gelten für diesen Teil weiter die alten Regeln. Bei einer vollen Übertragung an eine Vorsorgekasse gilt nur mehr die Abfertigung neu.",
    },
    {
      pregunta: "Was ist, wenn ich aus der Elternkarenz austrete?",
      respuesta: "Bei einem Austritt nach dem Mutterschutzgesetz oder Väter-Karenzgesetz gebührt die Hälfte, höchstens drei Monatsentgelte, wenn das Arbeitsverhältnis mindestens fünf Jahre gedauert hat.",
    },
  ],
  glosario: [
    { termino: "Monatsentgelt", definicion: "Das Entgelt für einen Monat, Grundlage für die Abfertigung." },
    { termino: "Anspruchswahrende Beendigung", definicion: "Ein Ende des Arbeitsverhältnisses, bei dem die Abfertigung zusteht, zum Beispiel Kündigung durch den Arbeitgeber." },
  ],
});
