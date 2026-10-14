import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.midijob-rechner",
  h1: "Midijob-Rechner: Übergangsbereich 2026",
  title: "Midijob-Rechner 2026: Sozialabgaben im Übergangsbereich",
  description:
    "Im Midijob bis {{de.uebergangsbereich-obergrenze}} zahlen Sie weniger Sozialabgaben. Der Rechner zeigt Ihren Anteil, die Ersparnis und den Beitrag des Arbeitgebers.",
  intro: [
    "Zwischen der Minijob-Grenze und {{de.uebergangsbereich-obergrenze}} im Monat liegt der Übergangsbereich, oft Midijob genannt. Sie sind voll versichert, zahlen aber einen geringeren Anteil.",
    "Direkt über der Minijob-Grenze ist Ihr Anteil sehr klein und steigt dann bis {{de.uebergangsbereich-obergrenze}} auf den vollen Satz.",
  ],
  comoSeCalcula: [
    "Ihr Anteil wird nicht vom Bruttolohn berechnet, sondern von einer geminderten beitragspflichtigen Einnahme: 2000 / (2000 − G) × (Brutto − G). G ist die Minijob-Grenze.",
    "Darauf zahlen Sie den halben Beitragssatz von Kranken-, Renten- und Arbeitslosenversicherung und Ihren Anteil an der Pflegeversicherung.",
    "Der Gesamtbeitrag wird von einer zweiten Einnahme mit dem Faktor F berechnet. F ist 28 % geteilt durch die Summe aller Beitragssätze. Den Rest des Gesamtbeitrags trägt der Arbeitgeber.",
    "Ihre Rentenansprüche richten sich trotzdem nach dem vollen Bruttolohn.",
  ],
  ejemplo: ["Bei 1.500 Euro brutto ohne Kinder zahlen Sie 280,17 Euro Sozialabgaben statt 326,25 Euro. Das sind 46,08 Euro weniger im Monat."],
  faq: [
    {
      pregunta: "Wo liegt der Übergangsbereich 2026?",
      respuesta: "Von 603,01 Euro bis {{de.uebergangsbereich-obergrenze}} im Monat. Die Untergrenze steigt mit dem Mindestlohn.",
    },
    {
      pregunta: "Bekomme ich im Midijob weniger Rente?",
      respuesta: "Nein. Seit Juli 2019 werden die Entgeltpunkte aus dem tatsächlichen Arbeitsentgelt ermittelt (§ 70 Absatz 1a SGB VI), obwohl Sie geringere Beiträge zahlen.",
    },
    {
      pregunta: "Muss ich im Midijob Lohnsteuer zahlen?",
      respuesta: "Das hängt von der Steuerklasse ab. In Klasse I fallen 2026 bei 1.500 Euro nur 9,25 Euro Lohnsteuer an, in Klasse V sind es 152,83 Euro.",
    },
  ],
  glosario: [
    { termino: "Übergangsbereich", definicion: "Der Lohnbereich nach § 20 Absatz 2 SGB IV mit geminderten Arbeitnehmerbeiträgen." },
    { termino: "Faktor F", definicion: "Rechengröße des Übergangsbereichs, die das BMAS jedes Jahr bekannt gibt." },
  ],
});
