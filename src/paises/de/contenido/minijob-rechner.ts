import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.minijob-rechner",
  h1: "Minijob-Rechner 2026",
  title: "Minijob-Rechner 2026: Netto und Kosten für den Arbeitgeber",
  description:
    "Was bleibt Ihnen vom Minijob, und was kostet er den Arbeitgeber? Mit Minijob-Grenze, Rentenbeitrag, Pauschalabgaben und Stunden zum Mindestlohn.",
  intro: [
    "Ein Minijob ist eine Beschäftigung bis zur Geringfügigkeitsgrenze. Sie zahlen keine Lohnsteuer und keine Kranken-, Pflege- oder Arbeitslosenversicherung, nur einen kleinen Rentenbeitrag.",
    "Der Arbeitgeber zahlt Pauschalabgaben. Der Rechner zeigt beide Seiten und wie viele Stunden Sie zum Mindestlohn arbeiten dürfen.",
  ],
  comoSeCalcula: [
    "Die Minijob-Grenze ergibt sich aus dem Mindestlohn von {{de.mindestlohn}}: mal 130, geteilt durch 3, auf volle Euro aufgerundet.",
    "Arbeitgeber: {{de.minijob-kv-pauschale}} Krankenversicherung (nur bei gesetzlich Versicherten), {{de.minijob-rv-pauschale}} Rentenversicherung und {{de.minijob-pauschsteuer}} Pauschsteuer.",
    "Sie: die Differenz zwischen dem vollen Rentenbeitrag von {{de.rv-beitragssatz}} und den {{de.minijob-rv-pauschale}} des Arbeitgebers. Bei einem Verdienst unter {{de.minijob-mindestbemessung}} wird der volle Beitrag von {{de.minijob-mindestbemessung}} gerechnet.",
    "Wer sich von der Rentenversicherungspflicht befreien lässt, zahlt nichts selbst und bekommt den vollen Verdienst.",
  ],
  ejemplo: ["Bei 603 Euro im Monat zahlen Sie 21,71 Euro Rentenbeitrag und behalten 581,29 Euro. Den Arbeitgeber kostet der Job 783,90 Euro plus Umlagen."],
  faq: [
    {
      pregunta: "Wie viele Stunden darf ich im Minijob arbeiten?",
      respuesta: "So viele, dass der Monatsverdienst die Grenze nicht übersteigt. Beim Mindestlohn sind das gut 43 Stunden im Monat.",
    },
    {
      pregunta: "Lohnt sich die Befreiung von der Rentenversicherung?",
      respuesta: "Sie haben mehr Netto, sammeln aber keine vollwertigen Beitragszeiten und weniger Rentenansprüche. Wägen Sie das ab, bevor Sie den Antrag stellen.",
    },
    {
      pregunta: "Was ändert sich 2027?",
      respuesta: "Mit dem Mindestlohn von 14,60 Euro steigt die Grenze auf 633 Euro. Zusätzlich ändert sich der Pauschalbeitrag zur Krankenversicherung.",
    },
  ],
  glosario: [
    { termino: "Geringfügige Beschäftigung", definicion: "Der amtliche Begriff für den Minijob." },
    { termino: "Minijob-Zentrale", definicion: "Die zentrale Stelle der Knappschaft-Bahn-See, bei der Arbeitgeber Minijobs melden." },
  ],
});
