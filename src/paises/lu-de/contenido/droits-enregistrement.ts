import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.droits-enregistrement",
  h1: "Registrierungsgebühren und Bëllegen Akt berechnen",
  title: "Registrierungsgebühren Luxemburg: Bëllegen Akt 2026",
  description: "Kaufnebenkosten einer Wohnung in Luxemburg: 6 % Registrierung und 1 % Umschreibung, minus Steuerkredit Bëllegen Akt von {{lu.bellegen-akt}} pro Käufer.",
  intro: [
    "Beim Kauf eines Hauses, einer Wohnung oder eines Baugrundstücks betragen die Gebühren 7 %: {{lu.droits-enregistrement}} Registrierung und {{lu.droits-transcription}} Umschreibung.",
    "Für die eigene Wohnung kann jeder Käufer den Steuerkredit Bëllegen Akt beantragen, begrenzt auf {{lu.bellegen-akt}}.",
  ],
  comoSeCalcula: [
    "Gebühren = Preis x ({{lu.droits-enregistrement}} + {{lu.droits-transcription}}).",
    "Steuerkredit: bis {{lu.bellegen-akt}} pro Käufer. Die Verwaltung erhebt in jedem Fall mindestens {{lu.droits-minimum}}.",
  ],
  ejemplo: [
    "Bei einem Kauf für 750.000 Euro betragen die Gebühren 52.500 Euro. Als einziger Käufer zahlen Sie nach dem Steuerkredit von 40.000 Euro noch 12.500 Euro. Zu zweit bleiben 100 Euro zu zahlen.",
  ],
  faq: [
    { pregunta: "Welche Bedingungen gelten für den Bëllegen Akt?", respuesta: "Die Immobilie innerhalb von 2 Jahren selbst beziehen (4 Jahre bei einem Grundstück oder einem Gebäude im Bau) und mindestens 2 Jahre ohne Unterbrechung bewohnen. Der Notar stellt den Antrag in der Urkunde." },
    { pregunta: "Gilt der Steuerkredit für eine Mietwohnung?", respuesta: "Nein. Zweitwohnungen, Wochenendhäuser und Gebäude zur Vermietung oder für den Handel sind ausgeschlossen." },
    { pregunta: "Haben Nichtansässige Anspruch?", respuesta: "Ja, wenn sie sich verpflichten, sich in der gekauften Immobilie in Luxemburg niederzulassen." },
  ],
  glosario: [
    { termino: "Bëllegen Akt", definicion: "Luxemburgischer Name des Steuerkredits auf notarielle Urkunden." },
  ],
});
