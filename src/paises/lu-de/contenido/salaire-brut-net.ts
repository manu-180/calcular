import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.salaire-brut-net",
  h1: "Nettolohn in Luxemburg berechnen",
  title: "Brutto-Netto-Rechner Luxemburg 2026",
  description: "Vom Brutto zum Netto in Luxemburg: Kranken-, Renten- und Pflegeversicherung 2026, Lohnsteuer nach Steuerklasse 1, 1a oder 2 und Steuerkredite CIS und CI-CO2.",
  intro: [
    "In Luxemburg gehen vom Bruttolohn die Sozialversicherungsbeiträge des Arbeitnehmers (Kranken-, Renten- und Pflegeversicherung) und die Lohnsteuer ab. Der Steuerkredit für Arbeitnehmer (CIS) und der CI-CO2 verringern danach die Lohnsteuer.",
    "Der Rechner verwendet die Beitragssätze 2026 des Centre commun de la sécurité sociale (CCSS) und die Lohnsteuerformeln der Steuerverwaltung (ACD).",
  ],
  comoSeCalcula: [
    "Krankenversicherung: die Hälfte von {{lu.cotisation-maladie-soins}} und {{lu.cotisation-maladie-especes}}. Rentenversicherung: die Hälfte von {{lu.cotisation-pension}}. Beide enden bei der Beitragsbemessungsgrenze von {{lu.plafond-cotisable}} pro Monat.",
    "Pflegeversicherung: {{lu.cotisation-dependance}} auf den ganzen Lohn, abzüglich eines Freibetrags von {{lu.abattement-dependance}}.",
    "Lohnsteuer: Lohn minus Beiträge, auf 5 Euro abgerundet, geht in die Formel der Steuerklasse. Die Steuer wird dann für den Beschäftigungsfonds erhöht.",
    "Steuerkredite: CIS und CI-CO2 hängen vom jährlichen Bruttolohn ab und entfallen ab 80.000 Euro im Jahr.",
  ],
  ejemplo: [
    "Bei 5.000 Euro brutto in Steuerklasse 1 betragen die Beiträge rund 638 Euro und die Lohnsteuer rund 696 Euro. Mit 34 Euro Steuerkredit bleiben rund 3.700 Euro netto.",
  ],
  faq: [
    { pregunta: "Welche Steuerklasse habe ich?", respuesta: "Die Steuerklasse steht auf Ihrer Lohnsteuerkarte. Klasse 1 gilt meist für Alleinstehende, Klasse 2 für Verheiratete oder Partner, Klasse 1a unter anderem für Alleinerziehende und Personen ab 65 Jahren." },
    { pregunta: "Welche Beiträge zahlt der Arbeitnehmer?", respuesta: "Die Hälfte der Kranken- und Rentenversicherung und die ganze Pflegeversicherung. Unfallversicherung und Arbeitsmedizin trägt der Arbeitgeber." },
    { pregunta: "Warum weicht das Ergebnis von meiner Lohnabrechnung ab?", respuesta: "Die Lohnsteuerkarte kann Ermäßigungen enthalten, etwa für Fahrtkosten oder Freibeträge. Auch Sachbezüge und Prämien ändern die Berechnung. Maßgebend ist die Lohnsteuerkarte." },
  ],
  glosario: [
    { termino: "Lohnsteuerkarte", definicion: "Dokument der ACD mit der Steuerklasse und den Ermäßigungen, die der Arbeitgeber anwendet." },
    { termino: "CIS", definicion: "Steuerkredit für Arbeitnehmer, mit dem Lohn ausgezahlt und ab 40.000 Euro Bruttojahreslohn abnehmend." },
  ],
});
