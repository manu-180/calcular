import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.saron-hypothek-rechner",
  h1: "SARON-Hypothek-Rechner: Zins mit dem aktuellen SARON",
  title: "SARON-Hypothek Rechner: Zinskosten mit aktuellem SARON",
  description:
    "Zinskosten einer SARON-Hypothek berechnen: aktueller SARON aus dem Datenportal der SNB plus Ihre Marge, pro Monat, Quartal und Jahr. Mit dem SNB-Leitzins.",
  intro: [
    "Bei einer SARON-Hypothek setzt sich der Zins aus dem SARON und einer festen Marge der Bank zusammen. Der SARON ist ein besicherter Tageszins für Franken.",
    "Der Rechner nimmt den zuletzt publizierten SARON aus dem Datenportal der SNB und zeigt, was Ihre Hypothek damit kostet.",
  ],
  comoSeCalcula: [
    "Zinssatz = SARON + Marge. Ist der SARON negativ, rechnen Sie je nach Vertrag mit 0 % oder mit dem publizierten Wert.",
    "Zins pro Jahr = Hypothekarbetrag × Zinssatz. Pro Monat ein Zwölftel, pro Quartal ein Viertel.",
  ],
  ejemplo: ["Eine Hypothek von 600 000 Franken mit 0.8 % Marge kostet bei einem SARON um null rund 400 Franken im Monat."],
  faq: [
    {
      pregunta: "Was ist der SARON?",
      respuesta: "Der Swiss Average Rate Overnight, ein Referenzzins für Tagesgeld in Franken. Er wird täglich neu festgelegt.",
    },
    {
      pregunta: "Wie hängt der SARON mit dem Leitzins zusammen?",
      respuesta: "Die Nationalbank will die kurzfristigen besicherten Geldmarktzinsen in Franken nahe am SNB-Leitzins halten. Der Rechner zeigt beide Werte nebeneinander, damit Sie den Abstand sehen.",
    },
    {
      pregunta: "Gilt mein Zins für die ganze Laufzeit?",
      respuesta: "Nein. Nur die Marge ist fest. Der SARON-Anteil ändert sich mit jedem neuen Wert.",
    },
  ],
  glosario: [
    { termino: "Marge", definicion: "Fester Zuschlag der Bank auf den SARON, vereinbart im Hypothekarvertrag." },
    { termino: "Leitzins", definicion: "Zins, mit dem die Schweizerische Nationalbank ihre Geldpolitik umsetzt." },
  ],
});
