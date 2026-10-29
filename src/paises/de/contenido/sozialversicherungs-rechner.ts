import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.sozialversicherungs-rechner",
  h1: "Sozialversicherungsrechner {{anio}}",
  title: "Sozialversicherungsbeiträge {{anio}} berechnen",
  description:
    "Kranken-, Pflege-, Renten- und Arbeitslosenversicherung für Ihren Lohn: Ihr Anteil und der des Arbeitgebers mit den Beitragssätzen und Bemessungsgrenzen {{anio}}.",
  intro: [
    "Von jedem Bruttolohn über der Minijob-Grenze gehen vier Sozialversicherungsbeiträge ab. Arbeitnehmer und Arbeitgeber teilen sie sich im Grundsatz zur Hälfte.",
    "Der Rechner zeigt jeden Beitrag einzeln, für Sie und für Ihren Arbeitgeber.",
  ],
  comoSeCalcula: [
    "Krankenversicherung: {{de.kv-allgemein}} plus Zusatzbeitrag der Kasse (Durchschnitt {{de.kv-zusatzbeitrag}}), je zur Hälfte.",
    "Pflegeversicherung: {{de.pv-beitragssatz}}, je zur Hälfte. Kinderlose ab 23 zahlen {{de.pv-zuschlaege[kinderlos]}} Zuschlag allein; Eltern mit mehreren Kindern unter 25 zahlen weniger. In Sachsen tragen Beschäftigte {{de.pv-sachsen}} mehr.",
    "Rentenversicherung: {{de.rv-beitragssatz}}, Arbeitslosenversicherung: {{de.av-beitragssatz}}, je zur Hälfte.",
    "Beiträge werden höchstens bis zur Beitragsbemessungsgrenze erhoben: {{de.bbg-kv}} für Kranken- und Pflegeversicherung, {{de.bbg-rv}} für Renten- und Arbeitslosenversicherung.",
  ],
  ejemplo: ["Bei 4.000 Euro brutto ohne Kinder zahlen Sie 870 Euro im Monat, Ihr Arbeitgeber 846 Euro. Zusammen gehen 1.716 Euro an die Sozialversicherung."],
  faq: [
    {
      pregunta: "Warum zahle ich mehr Pflegeversicherung als mein Arbeitgeber?",
      respuesta: "Wegen des Zuschlags für Kinderlose, den Sie allein tragen, oder weil Sie in Sachsen arbeiten. Mit Kindern sinkt Ihr Anteil dagegen ab dem zweiten Kind.",
    },
    {
      pregunta: "Was passiert über der Beitragsbemessungsgrenze?",
      respuesta: "Der Teil des Gehalts darüber ist beitragsfrei. Die Beiträge bleiben gleich, auch wenn das Gehalt weiter steigt.",
    },
    {
      pregunta: "Wann kann ich in die private Krankenversicherung wechseln?",
      respuesta: "Wenn Ihr Jahresgehalt die Versicherungspflichtgrenze übersteigt. Sie liegt 2026 bei 77.400 Euro.",
    },
  ],
  glosario: [
    { termino: "Gesamtsozialversicherungsbeitrag", definicion: "Summe der Beiträge von Arbeitnehmer und Arbeitgeber, die der Arbeitgeber an die Krankenkasse abführt." },
    { termino: "Zusatzbeitrag", definicion: "Der Beitrag, den jede Krankenkasse zusätzlich zum allgemeinen Satz selbst festlegt." },
  ],
});
