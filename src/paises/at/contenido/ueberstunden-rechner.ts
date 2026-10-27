import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.ueberstunden-rechner",
  h1: "Überstundenrechner mit Zuschlag",
  title: "Überstunden {{anio}} berechnen: Zuschlag und steuerfrei",
  description: "Was bringen Ihre Überstunden? Grundlohn, Zuschlag von {{at.ueberstundenzuschlag}}, steuerfreier Teil bis {{at.ueberstunden-steuerfrei[hoechstbetrag]}} Euro und Zeitausgleich.",
  intro: [
    "Überstunden liegen vor, wenn Sie über die tägliche oder wöchentliche Normalarbeitszeit hinaus arbeiten. Für jede Überstunde gebührt der Grundlohn plus ein Zuschlag von {{at.ueberstundenzuschlag}}.",
    "Statt der Bezahlung kann Zeitausgleich vereinbart werden: dann eineinhalb Stunden frei für jede Überstunde.",
  ],
  comoSeCalcula: [
    "Grundlohn je Stunde: Monatsgehalt geteilt durch die Stunden im Monat. Ohne Angabe rechnet der Rechner mit Wochenstunden mal 52 durch 12. Gibt Ihr Kollektivvertrag einen eigenen Teiler vor, tragen Sie ihn ein.",
    "Bezahlung je Überstunde: Grundlohn plus {{at.ueberstundenzuschlag}} Zuschlag.",
    "Steuerfrei sind 2026 die Zuschläge für die ersten {{at.ueberstunden-steuerfrei[stunden]}} Überstunden im Monat, höchstens {{at.ueberstunden-steuerfrei[hoechstbetrag]}} Euro. Der Grundlohn selbst wird normal versteuert.",
  ],
  ejemplo: [
    "Bei 3.000 Euro Gehalt und 40 Wochenstunden beträgt der Grundlohn 17,31 Euro je Stunde, mit Zuschlag rund 25,96 Euro. Zehn Überstunden bringen 259,62 Euro brutto, davon sind 86,54 Euro Zuschläge steuerfrei.",
  ],
  faq: [
    {
      pregunta: "Wie viele Überstunden sind erlaubt?",
      respuesta: "Bei erhöhtem Arbeitsbedarf sind bis zu 20 Überstunden pro Woche zulässig. Die Arbeitszeit darf 12 Stunden am Tag und 60 Stunden in der Woche nicht überschreiten, im Schnitt von 17 Wochen höchstens 48 Stunden.",
    },
    {
      pregunta: "Kann ich Überstunden ablehnen?",
      respuesta: "Überstunden, durch die die Tagesarbeitszeit über zehn Stunden oder die Wochenarbeitszeit über 50 Stunden steigt, können Sie ohne Angabe von Gründen ablehnen.",
    },
    {
      pregunta: "Wie viele Überstunden sind 2026 steuerfrei?",
      respuesta: "Die Zuschläge für die ersten {{at.ueberstunden-steuerfrei[stunden]}} Überstunden im Monat, bis zu {{at.ueberstunden-steuerfrei[hoechstbetrag]}} Euro. Diese erhöhte Grenze gilt für das Jahr 2026.",
    },
  ],
  glosario: [
    { termino: "Normalarbeitszeit", definicion: "Die vereinbarte Arbeitszeit ohne Überstunden." },
    { termino: "Zeitausgleich", definicion: "Freizeit statt Bezahlung, eineinhalb Stunden je Überstunde." },
    { termino: "Stundenteiler", definicion: "Die Zahl, durch die das Monatsgehalt geteilt wird, um den Stundenlohn zu erhalten." },
  ],
});
