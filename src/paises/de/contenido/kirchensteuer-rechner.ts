import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.kirchensteuer-rechner",
  h1: "Kirchensteuerrechner",
  title: "Kirchensteuer berechnen: 8 oder 9 % nach Bundesland",
  description:
    "Wie viel Kirchensteuer zahlen Sie? {{de.kirchensteuer@by}} in Bayern und Baden-Württemberg, {{de.kirchensteuer@nw}} in allen anderen Ländern, berechnet auf Ihre Einkommensteuer.",
  intro: [
    "Mitglieder der evangelischen oder katholischen Kirche und einiger anderer Religionsgemeinschaften zahlen Kirchensteuer. Sie wird nicht auf das Einkommen berechnet, sondern auf die Einkommen- oder Lohnsteuer.",
    "Der Satz hängt vom Bundesland ab, in dem Sie wohnen.",
  ],
  comoSeCalcula: [
    "Kirchensteuer = Einkommensteuer × Kirchensteuersatz.",
    "Der Satz beträgt {{de.kirchensteuer@by}} in Bayern und Baden-Württemberg und {{de.kirchensteuer@nw}} in den übrigen 14 Ländern.",
    "Haben Sie Kinder, wird die Steuer für die Kirchensteuer mit den Kinderfreibeträgen berechnet und ist niedriger.",
  ],
  ejemplo: ["Bei 10.548 Euro Einkommensteuer zahlen Sie in Hessen 949,32 Euro Kirchensteuer im Jahr, in Bayern 843,84 Euro."],
  faq: [
    {
      pregunta: "Ist die Kirchensteuer absetzbar?",
      respuesta: "Ja. Gezahlte Kirchensteuer ist als Sonderausgabe abziehbar, soweit sie nicht auf Kapitalerträge mit Abgeltungsteuer entfällt.",
    },
    {
      pregunta: "Wer muss Kirchensteuer zahlen?",
      respuesta: "Mitglieder einer steuererhebenden Religionsgemeinschaft, vor allem der evangelischen und der katholischen Kirche. Ohne Steuer auf das Einkommen fällt auch keine Kirchensteuer an.",
    },
    {
      pregunta: "Gilt der Satz auch für Kapitalerträge?",
      respuesta: "Ja, die Kirchensteuer wird auch auf die Abgeltungsteuer erhoben. Der Abgeltungsteuer-Rechner berücksichtigt das.",
    },
  ],
  glosario: [
    { termino: "Kirchenlohnsteuer", definicion: "Die Kirchensteuer, die der Arbeitgeber zusammen mit der Lohnsteuer einbehält." },
    { termino: "Bemessungsgrundlage", definicion: "Die Einkommen- oder Lohnsteuer, gegebenenfalls nach Abzug der Kinderfreibeträge." },
  ],
});
