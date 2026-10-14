import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.elterngeld-rechner",
  h1: "Elterngeldrechner",
  title: "Elterngeldrechner 2026: Basiselterngeld und ElterngeldPlus",
  description:
    "Wie viel Elterngeld bekommen Sie? Basiselterngeld und ElterngeldPlus aus Ihrem Netto vor der Geburt, mit Mindestbetrag {{de.elterngeld-betraege[mindest]}} und Höchstbetrag {{de.elterngeld-betraege[hoechst]}}.",
  intro: [
    "Elterngeld ersetzt einen Teil des Einkommens, das nach der Geburt wegfällt. Grundlage ist Ihr durchschnittliches Nettoeinkommen vor der Geburt.",
    "Der Rechner zeigt das Basiselterngeld und das ElterngeldPlus, auch wenn Sie während des Bezugs in Teilzeit arbeiten.",
  ],
  comoSeCalcula: [
    "Regelsatz: {{de.elterngeld-saetze[regel]}} des Nettoeinkommens vor der Geburt.",
    "Unter {{de.elterngeld-betraege[schwelle-niedrig]}} steigt der Satz um 0,1 Prozentpunkte je 2 Euro, bis auf {{de.elterngeld-saetze[hoechst]}}. Über {{de.elterngeld-betraege[schwelle-hoch]}} sinkt er um 0,1 Prozentpunkte je 2 Euro, bis auf {{de.elterngeld-saetze[mindest]}}.",
    "Das Basiselterngeld liegt zwischen {{de.elterngeld-betraege[mindest]}} und {{de.elterngeld-betraege[hoechst]}} im Monat.",
    "Wer im Bezug in Teilzeit arbeitet, bekommt den Satz auf die Differenz zwischen dem Einkommen vorher (höchstens {{de.elterngeld-betraege[deckel]}}) und dem Einkommen nachher.",
    "ElterngeldPlus beträgt höchstens die Hälfte des Basiselterngelds ohne Teilzeit, wird dafür doppelt so lange gezahlt.",
  ],
  ejemplo: ["Mit 2.000 Euro netto vor der Geburt erhalten Sie 65 %, also 1.300 Euro Basiselterngeld oder 650 Euro ElterngeldPlus im Monat."],
  faq: [
    {
      pregunta: "Wer bekommt kein Elterngeld?",
      respuesta: "Wer im Kalenderjahr vor der Geburt ein zu versteuerndes Einkommen über {{de.elterngeld-einkommensgrenze}} hatte. Bei Paaren gilt die Summe beider Einkommen.",
    },
    {
      pregunta: "Was ist das Elterngeld-Netto?",
      respuesta: "Ein pauschal berechnetes Netto: Vom Brutto der zwölf Monate vor der Geburt zieht die Elterngeldstelle pauschale Steuern und Sozialabgaben ab. Es liegt meist nahe an Ihrem echten Netto.",
    },
    {
      pregunta: "Wo beantrage ich Elterngeld?",
      respuesta: "Bei der Elterngeldstelle Ihres Bundeslandes, in vielen Ländern auch online. Rückwirkend wird es nur für die letzten drei Monate vor dem Antrag gezahlt.",
    },
  ],
  glosario: [
    { termino: "Basiselterngeld", definicion: "Das klassische Elterngeld, zusammen bis zu 14 Monate für beide Eltern." },
    { termino: "ElterngeldPlus", definicion: "Halber Monatsbetrag, dafür doppelt so viele Monate, gedacht für Teilzeit im Bezug." },
  ],
});
