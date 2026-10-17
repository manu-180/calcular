import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.kleinunternehmer-rechner",
  h1: "Kleinunternehmerregelung prüfen",
  title: "Kleinunternehmergrenze 2026: Rechner für Österreich",
  description: "Sind Sie Kleinunternehmer? Prüfen Sie die Umsatzgrenze von {{at.kleinunternehmer[grenze]}} Euro und die Toleranz im laufenden Jahr. Ohne Umsatzsteuer auf Ihren Rechnungen.",
  intro: [
    "Kleine Unternehmen sind in Österreich von der Umsatzsteuer befreit, solange ihr Umsatz unter der Kleinunternehmergrenze bleibt. Sie stellen dann keine Umsatzsteuer in Rechnung und müssen keine Umsatzsteuervoranmeldung abgeben.",
    "Seit 1. Jänner 2025 liegt die Grenze bei {{at.kleinunternehmer[grenze]}} Euro im Jahr.",
  ],
  comoSeCalcula: [
    "Befreit ist, wer die Grenze von {{at.kleinunternehmer[grenze]}} Euro weder im Vorjahr noch im laufenden Jahr überschreitet.",
    "Im laufenden Jahr ist eine Überschreitung um bis zu {{at.kleinunternehmer[toleranz]}} % erlaubt, die Befreiung gilt dann bis Jahresende.",
    "Wird die Grenze um mehr überschritten, fällt die Befreiung für den Umsatz weg, mit dem das passiert, und für alle späteren Umsätze.",
    "Gezählt wird das gesamte vereinbarte Entgelt.",
  ],
  ejemplo: [
    "Wer im Vorjahr 50.000 Euro und heuer 58.000 Euro Umsatz macht, bleibt heuer noch Kleinunternehmer. Im nächsten Jahr gilt die Befreiung nicht mehr.",
  ],
  faq: [
    {
      pregunta: "Kann ich als Kleinunternehmer die Vorsteuer abziehen?",
      respuesta: "Nein. Die Befreiung ist eine unechte Steuerbefreiung, deshalb steht kein Vorsteuerabzug zu.",
    },
    {
      pregunta: "Wie hoch war die Grenze bis 2024?",
      respuesta: "Bis 31. Dezember 2024 lag sie bei 35.000 Euro netto, und eine Überschreitung machte die Umsätze rückwirkend für das ganze Jahr steuerpflichtig.",
    },
    {
      pregunta: "Muss ich als Kleinunternehmer eine Umsatzsteuererklärung abgeben?",
      respuesta: "Wenn die Kleinunternehmerregelung angewendet wird, müssen Sie keine Umsatzsteuervoranmeldung und keine Jahreserklärung abgeben.",
    },
  ],
  glosario: [
    { termino: "Unechte Steuerbefreiung", definicion: "Eine Befreiung von der Umsatzsteuer, bei der auch kein Vorsteuerabzug zusteht." },
    { termino: "UVA", definicion: "Umsatzsteuervoranmeldung an das Finanzamt." },
  ],
});
