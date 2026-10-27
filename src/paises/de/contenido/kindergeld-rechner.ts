import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.kindergeld-rechner",
  h1: "Kindergeldrechner: {{de.kindergeld}} pro Kind",
  title: "Kindergeld {{anio}}: {{de.kindergeld}} pro Kind, Rechner",
  description:
    "Kindergeld beträgt {{de.kindergeld}} im Monat für jedes Kind. Rechnen Sie Ihren Betrag aus und vergleichen Sie ihn mit der Wirkung der Kinderfreibeträge.",
  intro: [
    "Für jedes Kind gibt es dasselbe Kindergeld: {{de.kindergeld}} im Monat, egal ob erstes oder fünftes Kind.",
    "Mit Ihrem zu versteuernden Einkommen zeigt der Rechner außerdem, ob die Kinderfreibeträge Ihnen mehr Steuer sparen würden als das Kindergeld.",
  ],
  comoSeCalcula: [
    "Kindergeld = {{de.kindergeld}} × Anzahl der Kinder, jeden Monat.",
    "Die Freibeträge für Kinder betragen je Elternteil {{de.kinderfreibetrag[saechlich]}} Kinderfreibetrag plus {{de.kinderfreibetrag[bea]}} für Betreuung, Erziehung oder Ausbildung, bei zusammen veranlagten Eltern das Doppelte.",
    "Steuerersparnis = Einkommensteuer ohne Freibeträge minus Einkommensteuer mit Freibeträgen.",
    "Ist die Ersparnis höher als das Kindergeld im Jahr, berücksichtigt das Finanzamt die Freibeträge und zieht das Kindergeld wieder ab.",
  ],
  ejemplo: ["Zwei Kinder bringen 518 Euro im Monat. Bei 150.000 Euro gemeinsamem zu versteuerndem Einkommen sparen die Freibeträge 8.122 Euro Steuer und sind damit günstiger als 6.216 Euro Kindergeld."],
  faq: [
    {
      pregunta: "Bis wann gibt es Kindergeld?",
      respuesta: "Bis zum 18. Geburtstag für jedes Kind, danach bis 25, solange es in Ausbildung oder Studium ist oder andere Voraussetzungen erfüllt.",
    },
    {
      pregunta: "Wo beantrage ich Kindergeld?",
      respuesta: "Bei der Familienkasse der Bundesagentur für Arbeit. Rückwirkend gibt es Kindergeld für höchstens sechs Monate.",
    },
    {
      pregunta: "Muss ich die Günstigerprüfung beantragen?",
      respuesta: "Nein. Das Finanzamt macht sie mit Ihrer Steuererklärung automatisch.",
    },
  ],
  glosario: [
    { termino: "Familienkasse", definicion: "Die Stelle der Bundesagentur für Arbeit, die das Kindergeld auszahlt." },
    { termino: "Günstigerprüfung", definicion: "Vergleich des Finanzamts zwischen Kindergeld und der Steuerersparnis durch die Kinderfreibeträge." },
  ],
});
