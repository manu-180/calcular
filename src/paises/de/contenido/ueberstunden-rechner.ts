import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.ueberstunden-rechner",
  h1: "Überstundenrechner",
  title: "Überstunden berechnen: Stundenlohn, Vergütung und Zuschlag",
  description:
    "Was sind Ihre Überstunden wert? Der Rechner ermittelt Ihren Stundenlohn aus dem Monatsgehalt und die Vergütung mit dem vereinbarten Zuschlag.",
  intro: [
    "Für Überstunden gibt es in Deutschland keinen gesetzlichen Zuschlag. Ob und wie sie bezahlt werden, regeln Arbeitsvertrag, Tarifvertrag oder Betriebsvereinbarung.",
    "Der Rechner zeigt, was Ihre Überstunden bei Ihrem Stundenlohn wert sind, mit oder ohne Zuschlag.",
  ],
  comoSeCalcula: [
    "Stundenlohn = Monatsgehalt × 3 / (13 × Wochenstunden). Dahinter steht der durchschnittliche Monat mit 13/3 Wochen.",
    "Grundvergütung = Stundenlohn × Überstunden.",
    "Zuschlag = Grundvergütung × vereinbarter Prozentsatz.",
    "Jede Arbeitsstunde muss mindestens mit dem Mindestlohn von {{de.mindestlohn}} bezahlt werden.",
  ],
  ejemplo: ["Bei 3.500 Euro und 40 Wochenstunden beträgt der Stundenlohn 20,19 Euro. Zehn Überstunden mit 25 % Zuschlag bringen 252,38 Euro brutto."],
  faq: [
    {
      pregunta: "Muss mein Arbeitgeber Überstunden bezahlen?",
      respuesta: "Wenn er sie angeordnet oder gebilligt hat und nichts anderes wirksam vereinbart ist, in der Regel ja, entweder in Geld oder als Freizeitausgleich.",
    },
    {
      pregunta: "Sind Überstunden mit dem Gehalt abgegolten?",
      respuesta: "Eine pauschale Klausel, nach der alle Überstunden abgegolten sind, ist meist unwirksam. Eine Klausel mit einer klar begrenzten Zahl von Stunden kann dagegen gelten.",
    },
    {
      pregunta: "Wie werden Überstunden versteuert?",
      respuesta: "Wie normaler Lohn mit Lohnsteuer und Sozialabgaben. Steuerfrei sind nur bestimmte Zuschläge für Sonntags-, Feiertags- und Nachtarbeit.",
    },
  ],
  glosario: [
    { termino: "Überstunden", definicion: "Arbeitszeit über die vertraglich vereinbarte Arbeitszeit hinaus." },
    { termino: "Freizeitausgleich", definicion: "Abbau von Überstunden durch freie Zeit statt Bezahlung." },
  ],
});
