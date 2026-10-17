import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.netto-brutto-rechner",
  h1: "Netto-Brutto-Rechner 2026",
  title: "Netto-Brutto-Rechner 2026: welches Brutto brauche ich?",
  description:
    "Sie wissen, wie viel netto ankommen soll? Der Rechner findet das nötige Bruttogehalt mit Lohnsteuer, Soli, Kirchensteuer und Sozialabgaben 2026.",
  intro: [
    "Für Gehaltsverhandlungen zählt oft das Netto. Geben Sie ein, wie viel im Monat auf Ihrem Konto ankommen soll. Der Rechner sucht das Bruttogehalt, das genau dieses Netto ergibt.",
    "Gerechnet wird mit denselben Regeln wie im Brutto-Netto-Rechner: Lohnsteuer nach dem Programmablaufplan 2026 und Sozialabgaben mit den Beitragssätzen 2026.",
  ],
  comoSeCalcula: [
    "Für ein Probe-Brutto werden Lohnsteuer, Solidaritätszuschlag, Kirchensteuer und Sozialabgaben abgezogen.",
    "Das Brutto wird so lange angepasst, bis das Netto Ihren Wunschbetrag erreicht. Das Ergebnis ist das kleinste Brutto in vollen Cent, das dafür reicht.",
    "Sozialabgaben steigen nur bis zur Beitragsbemessungsgrenze von {{de.bbg-kv}} (Kranken- und Pflegeversicherung) und {{de.bbg-rv}} (Renten- und Arbeitslosenversicherung).",
  ],
  ejemplo: ["Wer in Steuerklasse I ohne Kinder 2.605,50 Euro netto möchte, braucht ungefähr 4.000 Euro brutto im Monat."],
  faq: [
    {
      pregunta: "Warum steigt das Brutto stärker als das Netto?",
      respuesta: "Jeder zusätzliche Euro wird mit Ihrem Grenzsteuersatz und den Sozialabgaben belastet. Von einer Gehaltserhöhung bleibt deshalb oft nur gut die Hälfte netto.",
    },
    {
      pregunta: "Kann ich mit dem Ergebnis in die Gehaltsverhandlung gehen?",
      respuesta: "Ja, als Orientierung. Einmalzahlungen, Sachbezüge und ein Freibetrag auf der Lohnsteuerkarte ändern das Ergebnis.",
    },
    {
      pregunta: "Was ist mit Minijobs?",
      respuesta: "Bis zur Geringfügigkeitsgrenze gilt der Minijob mit Pauschalabgaben des Arbeitgebers. Dafür gibt es einen eigenen Rechner.",
    },
  ],
  glosario: [
    { termino: "Brutto", definicion: "Das vereinbarte Gehalt vor Abzug von Steuern und Sozialabgaben." },
    { termino: "Netto", definicion: "Der Betrag, der nach allen Abzügen ausgezahlt wird." },
  ],
});
