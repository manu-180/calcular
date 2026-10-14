import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.grunderwerbsteuer-rechner",
  h1: "Grunderwerbsteuer und Grundbuchsgebühr berechnen",
  title: "Grunderwerbsteuer Österreich: Rechner mit Grundbuch",
  description: "Grunderwerbsteuer von {{at.grunderwerbsteuer}}, Eintragungsgebühr von {{at.grundbuch[eigentum]}} und Pfandrecht: die Nebenkosten beim Wohnungs- oder Hauskauf in Österreich.",
  intro: [
    "Beim Kauf einer Wohnung, eines Hauses oder Grundstücks fallen in Österreich die Grunderwerbsteuer und die Gebühren für die Eintragung ins Grundbuch an. Bei einer Finanzierung kommt die Gebühr für das Pfandrecht dazu.",
    "Der Rechner zeigt diese Steuern und Gebühren für einen Kauf und für Übertragungen in der Familie.",
  ],
  comoSeCalcula: [
    "Kauf: Grunderwerbsteuer {{at.grunderwerbsteuer}} vom Kaufpreis, Eintragung des Eigentumsrechts {{at.grundbuch[eigentum]}}.",
    "Schenkung, Erbschaft und Übertragungen in der Familie: Stufentarif vom Grundstückswert, für die ersten 250.000 Euro 0,5 %, für die nächsten 150.000 Euro 2 %, darüber 3,5 %.",
    "Pfandrecht für den Kredit: {{at.grundbuch[pfandrecht]}} vom Pfandbetrag. Dazu kommt die Eingabengebühr von {{at.grundbuch[eingabe]}} Euro für den Antrag.",
  ],
  ejemplo: [
    "Bei einem Kaufpreis von 300.000 Euro und einem Kredit über 200.000 Euro fallen 10.500 Euro Grunderwerbsteuer, 3.300 Euro für das Eigentum, 2.400 Euro für das Pfandrecht und 85 Euro Eingabengebühr an, zusammen 16.285 Euro.",
  ],
  faq: [
    {
      pregunta: "Wer zahlt die Grunderwerbsteuer?",
      respuesta: "Steuerschuldner sind grundsätzlich alle am Erwerb beteiligten Personen, also Käufer und Verkäufer.",
    },
    {
      pregunta: "Was gilt als Übertragung in der Familie?",
      respuesta: "Zum Familienverband zählen unter anderem Ehe- und eingetragene Partner, Lebensgefährten mit gemeinsamem Hauptwohnsitz, Kinder, Enkel, Eltern und Geschwister. Für sie gilt der Stufentarif vom Grundstückswert.",
    },
    {
      pregunta: "Welche Kosten kommen noch dazu?",
      respuesta: "Notar- oder Anwaltskosten für Vertrag und Abwicklung und gegebenenfalls eine Maklerprovision. Sie sind im Rechner nicht enthalten.",
    },
  ],
  glosario: [
    { termino: "Grundstückswert", definicion: "Der Wert, nach dem bei unentgeltlichen Übertragungen die Steuer berechnet wird." },
    { termino: "Einverleibung", definicion: "Die Eintragung eines Rechts, etwa des Eigentums, ins Grundbuch." },
  ],
});
