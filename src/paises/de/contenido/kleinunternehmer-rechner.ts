import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.kleinunternehmer-rechner",
  h1: "Kleinunternehmer-Rechner nach § 19 UStG",
  title: "Kleinunternehmerregelung 2026: Umsatzgrenzen prüfen",
  description:
    "Sind Sie Kleinunternehmer? Prüfen Sie die Umsatzgrenzen von {{de.kleinunternehmer-grenzen[vorjahr]}} im Vorjahr und {{de.kleinunternehmer-grenzen[laufendes-jahr]}} im laufenden Jahr.",
  intro: [
    "Kleinunternehmer stellen Rechnungen ohne Umsatzsteuer und sparen sich die Umsatzsteuervoranmeldungen. Das lohnt sich vor allem bei Kunden, die selbst keine Vorsteuer abziehen können, also Privatleuten.",
    "Der Rechner prüft beide Umsatzgrenzen des Umsatzsteuergesetzes.",
  ],
  comoSeCalcula: [
    "Grenze 1: Der Gesamtumsatz im Vorjahr darf {{de.kleinunternehmer-grenzen[vorjahr]}} nicht überschritten haben.",
    "Grenze 2: Der Gesamtumsatz im laufenden Jahr darf {{de.kleinunternehmer-grenzen[laufendes-jahr]}} nicht überschreiten.",
    "Gerechnet wird mit Umsätzen ohne Umsatzsteuer.",
    "Nur wenn beide Grenzen eingehalten sind, ist der Umsatz steuerfrei.",
  ],
  ejemplo: ["Mit 20.000 Euro Umsatz im Vorjahr und erwarteten 30.000 Euro in diesem Jahr können Sie die Regelung nutzen. Bei Regelbesteuerung wären auf 30.000 Euro 5.700 Euro Umsatzsteuer fällig."],
  faq: [
    {
      pregunta: "Was passiert, wenn ich die 100.000 Euro im laufenden Jahr überschreite?",
      respuesta: "Dann endet die Steuerbefreiung im laufenden Jahr, und für weitere Umsätze müssen Sie Umsatzsteuer berechnen. Behalten Sie den Umsatz deshalb im Blick.",
    },
    {
      pregunta: "Kann ich freiwillig auf die Regelung verzichten?",
      respuesta: "Ja. Wer viel investiert oder an Unternehmen verkauft, profitiert oft vom Vorsteuerabzug. Der Verzicht bindet Sie für mehrere Jahre.",
    },
    {
      pregunta: "Bin ich als Kleinunternehmer von der Einkommensteuer befreit?",
      respuesta: "Nein. Die Regelung betrifft nur die Umsatzsteuer. Ihren Gewinn versteuern Sie wie jeder andere.",
    },
  ],
  glosario: [
    { termino: "Gesamtumsatz", definicion: "Summe der steuerbaren Umsätze ohne Umsatzsteuer, abzüglich bestimmter steuerfreier Umsätze." },
    { termino: "Vorsteuerabzug", definicion: "Erstattung der beim Einkauf gezahlten Umsatzsteuer, die Kleinunternehmern nicht zusteht." },
  ],
});
