import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.netto-brutto-rechner",
  h1: "Netto-Brutto-Rechner: welches Brutto für mein Wunschnetto?",
  title: "Netto-Brutto-Rechner 2026 für Österreich",
  description: "Geben Sie Ihr Wunschnetto ein und sehen Sie, welches Bruttogehalt Sie dafür brauchen. Mit Sozialversicherung, Lohnsteuer und Familienbonus Plus 2026.",
  intro: [
    "Bei Gehaltsverhandlungen wird in Österreich fast immer über das Brutto gesprochen, im Alltag zählt aber das Netto. Dieser Rechner geht den umgekehrten Weg: Sie nennen den Betrag, der am Konto ankommen soll, und er sucht das passende Bruttogehalt.",
    "Gerechnet wird mit 14 Gehältern und den Abzügen für Angestellte und Arbeiter im Jahr 2026.",
  ],
  comoSeCalcula: [
    "Der Rechner probiert Bruttobeträge durch, bis das Netto nach Sozialversicherung und Lohnsteuer Ihrem Wunsch entspricht. Die Abzüge sind dieselben wie im Brutto-Netto-Rechner.",
    "Sozialversicherung bis zur Höchstbeitragsgrundlage von {{at.beitragsgrundlage[hoechst-monat]}}, Lohnsteuer nach dem Tarif 2026 mit Verkehrsabsetzbetrag ({{at.verkehrsabsetzbetrag}} im Jahr) und Ihrem Familienbonus Plus.",
    "Weil die Arbeitslosenversicherung bei niedrigen Gehältern in Stufen steigt, lässt sich nicht jedes Netto auf den Cent treffen. Dann zeigt der Rechner das kleinste Brutto, das mindestens Ihr Wunschnetto bringt.",
  ],
  ejemplo: [
    "Wer in Wien 2.454,71 Euro netto im Monat haben möchte, braucht 3.500 Euro brutto. Im Jahr sind das 49.000 Euro brutto.",
  ],
  faq: [
    {
      pregunta: "Gilt das Ergebnis auch für Urlaubsgeld und Weihnachtsgeld?",
      respuesta: "Der Rechner sucht das Brutto für das laufende Monatsgehalt. Urlaubsgeld und Weihnachtsgeld in derselben Höhe sind im Jahresbetrag enthalten und netto etwas höher, weil sie günstiger besteuert werden.",
    },
    {
      pregunta: "Warum steigt das Brutto stärker als das Netto?",
      respuesta: "Jeder zusätzliche Euro brutto wird mit Ihrem Grenzsteuersatz und den Sozialversicherungsbeiträgen belastet. Bei mittleren Gehältern bleibt von einem Euro mehr brutto etwa die Hälfte netto.",
    },
    {
      pregunta: "Ist das Pendlerpauschale berücksichtigt?",
      respuesta: "Nein. Wenn Ihnen ein Pendlerpauschale zusteht, wird Ihr Netto bei gleichem Brutto höher. Prüfen können Sie das im Brutto-Netto-Rechner.",
    },
  ],
  glosario: [
    { termino: "Wunschnetto", definicion: "Der Betrag, der nach allen Abzügen jeden Monat auf Ihrem Konto ankommen soll." },
    { termino: "Grenzsteuersatz", definicion: "Der Steuersatz, mit dem der nächste verdiente Euro besteuert wird." },
  ],
});
