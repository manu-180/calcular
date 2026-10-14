import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.abfertigung-neu-rechner",
  h1: "Abfertigung neu berechnen",
  title: "Abfertigung neu: Rechner für die Vorsorgekasse",
  description: "Wie viel liegt in Ihrer Abfertigung neu? Der Arbeitgeber zahlt {{at.sv-dienstgeber[bv]}} des Bruttogehalts in die Vorsorgekasse. Beiträge, Steuer und Auszahlung.",
  intro: [
    "Für Arbeitsverhältnisse, die seit 2003 begonnen haben, gilt die Abfertigung neu. Der Arbeitgeber zahlt jeden Monat einen Beitrag an eine Betriebliche Vorsorgekasse, und Ihr Anspruch wächst laufend.",
    "Der Rechner zeigt, wie viel in einem bestimmten Zeitraum eingezahlt wird und was nach Steuer davon bleibt.",
  ],
  comoSeCalcula: [
    "Beitrag: {{at.sv-dienstgeber[bv]}} des monatlichen Entgelts, auch von Urlaubsgeld und Weihnachtsgeld.",
    "Summe: Jahresbeitrag mal Anzahl der Jahre. Die Erträge der Vorsorgekasse kommen dazu, sind hier aber nicht eingerechnet.",
    "Steuer: Wird die Abfertigung ausgezahlt, fallen {{at.abfertigung-steuer}} Lohnsteuer an. Wird es an eine Pensionskasse übertragen, ist es steuerfrei.",
  ],
  ejemplo: [
    "Bei 3.000 Euro brutto und 14 Gehältern zahlt der Arbeitgeber 642,60 Euro im Jahr ein. Nach zehn Jahren sind es 6.426 Euro, nach 6 % Steuer 6.040,44 Euro, ohne Erträge.",
  ],
  faq: [
    {
      pregunta: "Wann wird die Abfertigung neu ausgezahlt?",
      respuesta: "Wenn das Arbeitsverhältnis auf eine Art endet, die den Anspruch wahrt, etwa durch Kündigung des Arbeitgebers, und mindestens drei Einzahlungsjahre vorliegen. Sonst bleibt das Kapital in der Kasse erhalten.",
    },
    {
      pregunta: "Verliere ich die Abfertigung bei Selbstkündigung?",
      respuesta: "Nein. Bei der Abfertigung neu bleibt das angesparte Kapital erhalten. Es wird nur nicht ausgezahlt und kann bei einer späteren Beendigung abgerufen werden.",
    },
    {
      pregunta: "Wie wird die Abfertigung neu besteuert?",
      respuesta: "Bei Auszahlung mit {{at.abfertigung-steuer}}. Wird das Kapital in eine Pensionskasse übertragen, bleibt es steuerfrei, ebenso die spätere Rente daraus.",
    },
  ],
  glosario: [
    { termino: "BV-Kasse", definicion: "Betriebliche Vorsorgekasse, die die Beiträge verwaltet und veranlagt." },
    { termino: "Einzahlungsjahre", definicion: "Die Jahre, in denen Beiträge für Sie eingezahlt wurden, auch bei verschiedenen Arbeitgebern." },
  ],
});
