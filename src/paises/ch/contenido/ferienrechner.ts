import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.ferienrechner",
  h1: "Ferienrechner Schweiz: Ferienanspruch berechnen",
  title: "Ferienrechner Schweiz: Ferientage und Ferienzuschlag",
  description:
    "Wie viele Ferientage haben Sie? Mindestens {{ch.ferien-wochen}} Wochen pro Jahr, bis 20 Jahre {{ch.ferien-wochen-jugendliche}}. Anteilig bei Teilzeit, Eintritt oder Austritt.",
  intro: [
    "In der Schweiz haben Arbeitnehmende Anspruch auf mindestens {{ch.ferien-wochen}} Wochen Ferien pro Dienstjahr. Bis zum vollendeten 20. Altersjahr sind es {{ch.ferien-wochen-jugendliche}} Wochen.",
    "Der Rechner rechnet die Wochen in Ferientage um, auch bei Teilzeit oder wenn Sie nicht das ganze Dienstjahr angestellt sind.",
  ],
  comoSeCalcula: [
    "Ferientage pro Jahr = Ferienwochen × Arbeitstage pro Woche.",
    "Für ein unvollständiges Dienstjahr gibt es Ferien im Verhältnis zur Dauer der Anstellung: Ferientage × Monate / 12.",
    "Der rechnerische Ferienzuschlag bei Stundenlohn ist Ferienwochen geteilt durch die übrigen Wochen des Jahres: 4 / 48 oder 5 / 47.",
  ],
  ejemplo: ["Bei einer 3-Tage-Woche und einem halben Dienstjahr ergeben 4 Wochen Ferien 6 Ferientage."],
  faq: [
    {
      pregunta: "Wie viele Ferientage habe ich bei Teilzeit?",
      respuesta: "Gleich viele Wochen wie Vollzeitangestellte. In Tagen sind es weniger: 4 Wochen bei 3 Arbeitstagen pro Woche ergeben 12 Ferientage.",
    },
    {
      pregunta: "Darf der Arbeitgeber Ferien auszahlen statt gewähren?",
      respuesta: "Nein, solange das Arbeitsverhältnis dauert. Ferien dürfen in dieser Zeit nicht durch Geld oder andere Vergünstigungen abgegolten werden.",
    },
    {
      pregunta: "Wer bestimmt, wann ich in die Ferien gehe?",
      respuesta: "Der Arbeitgeber legt den Zeitpunkt fest und nimmt dabei Rücksicht auf Ihre Wünsche, soweit der Betrieb es zulässt. Mindestens zwei Ferienwochen müssen zusammenhängen.",
    },
  ],
  glosario: [
    { termino: "Dienstjahr", definicion: "Das Jahr ab Beginn des Arbeitsverhältnisses, nicht das Kalenderjahr." },
  ],
});
