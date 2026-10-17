import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.abgeltungsteuer-rechner",
  h1: "Abgeltungsteuer-Rechner",
  title: "Abgeltungsteuer berechnen: Zinsen, Dividenden, Kursgewinne",
  description:
    "Steuern auf Kapitalerträge: {{de.abgeltungsteuer}} Abgeltungsteuer plus Soli und Kirchensteuer, nach Abzug des Sparer-Pauschbetrags von {{de.sparer-pauschbetrag[einzeln]}}.",
  intro: [
    "Zinsen, Dividenden und Gewinne aus Wertpapieren werden in Deutschland pauschal mit {{de.abgeltungsteuer}} besteuert. Dazu kommen Solidaritätszuschlag und gegebenenfalls Kirchensteuer.",
    "Bis zum Sparer-Pauschbetrag bleiben Ihre Erträge steuerfrei, wenn Sie Ihrer Bank einen Freistellungsauftrag erteilt haben.",
  ],
  comoSeCalcula: [
    "Steuerpflichtig ist, was über dem Sparer-Pauschbetrag liegt: {{de.sparer-pauschbetrag[einzeln]}} für Alleinstehende, {{de.sparer-pauschbetrag[zusammen]}} für zusammen veranlagte Ehepaare.",
    "Ohne Kirchensteuer beträgt die Abgeltungsteuer {{de.abgeltungsteuer}} davon.",
    "Mit Kirchensteuer sinkt sie leicht, weil die Kirchensteuer abgezogen wird: Steuer = Erträge / (4 + Kirchensteuersatz).",
    "Der Solidaritätszuschlag beträgt immer {{de.soli-satz}} der Abgeltungsteuer, ohne Freigrenze.",
  ],
  ejemplo: ["Bei 5.000 Euro Kapitalerträgen bleiben 1.000 Euro steuerfrei. Auf 4.000 Euro fallen 1.000 Euro Abgeltungsteuer und 55 Euro Soli an."],
  faq: [
    {
      pregunta: "Wie nutze ich den Sparer-Pauschbetrag?",
      respuesta: "Mit einem Freistellungsauftrag bei Ihrer Bank. Haben Sie mehrere Konten, können Sie ihn aufteilen, insgesamt aber nicht mehr als den Pauschbetrag.",
    },
    {
      pregunta: "Lohnt sich die Günstigerprüfung?",
      respuesta: "Wenn Ihr persönlicher Steuersatz unter 25 % liegt, können Sie in der Steuererklärung beantragen, dass die Kapitalerträge mit Ihrem Tarif besteuert werden.",
    },
    {
      pregunta: "Kann ich Werbungskosten abziehen?",
      respuesta: "Nein. Mit dem Sparer-Pauschbetrag sind alle Werbungskosten abgegolten; tatsächliche Kosten wie Depotgebühren zählen nicht.",
    },
  ],
  glosario: [
    { termino: "Freistellungsauftrag", definicion: "Auftrag an die Bank, Erträge bis zum Pauschbetrag ohne Steuerabzug auszuzahlen." },
    { termino: "Kapitalertragsteuer", definicion: "Die Abgeltungsteuer, die die Bank direkt einbehält und ans Finanzamt abführt." },
  ],
});
