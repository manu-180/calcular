import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.indexation-salaires",
  h1: "Lohnindexierung in Luxemburg: nächste Indextranche",
  title: "Indextranche Luxemburg: Rechner für die nächste Tranche",
  description: "Wo steht die nächste Indextranche in Luxemburg? Halbjahresdurchschnitt des IPCN, Auslöseschwelle und Ihr Lohn nach einer Erhöhung von 2,5 %.",
  intro: [
    "In Luxemburg werden die Löhne an die Entwicklung der Lebenshaltungskosten angepasst. Steigt der Index um 2,5 %, werden die Löhne im gleichen Verhältnis erhöht.",
    "Der Rechner vergleicht den letzten Halbjahresdurchschnitt des IPCN mit der nächsten Auslöseschwelle und zeigt Ihren Lohn nach der Tranche.",
  ],
  comoSeCalcula: [
    "Nächste Schwelle: die aktuelle Auslöseschwelle, {{lu.cote-echeance}}, plus 2,5 %.",
    "Noch nötiger Anstieg: Abstand zwischen der nächsten Schwelle und dem letzten von STATEC veröffentlichten Halbjahresdurchschnitt.",
    "Lohn nach der Tranche: aktueller Lohn x 1,025. Die geltende Indexzahl beträgt derzeit {{lu.nombre-indice}}.",
  ],
  ejemplo: [
    "Im September 2026 lag der Halbjahresdurchschnitt des IPCN bei 1.058,56, die nächste Schwelle bei 1.064,75. Ein Lohn von 5.000 Euro stiege auf 5.125 Euro.",
  ],
  faq: [
    { pregunta: "Wann war die letzte Indextranche?", respuesta: "Am 1. Juni 2026. Die geltende Indexzahl stieg auf {{lu.nombre-indice}}." },
    { pregunta: "Werden alle Löhne indexiert?", respuesta: "Ja, Löhne, Gehälter und Sozialleistungen, einschließlich des sozialen Mindestlohns. Für nach Luxemburg entsandte Arbeitnehmer wird nur der Mindestlohn indexiert." },
    { pregunta: "Was ist der Lohn zum Index 100?", respuesta: "Der Lohn auf die Basis der gleitenden Lohnskala zurückgerechnet: Lohn x 100 / Indexzahl." },
  ],
  glosario: [
    { termino: "Auslöseschwelle", definicion: "Wert des Halbjahresdurchschnitts des IPCN, der eine Indextranche auslöst (cote d'échéance)." },
    { termino: "Indexzahl", definicion: "Koeffizient, der auf Löhne zum Index 100 angewendet wird." },
  ],
});
