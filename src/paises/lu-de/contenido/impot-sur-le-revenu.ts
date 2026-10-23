import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.impot-sur-le-revenu",
  h1: "Einkommensteuer in Luxemburg berechnen",
  title: "Einkommensteuer Luxemburg: Rechner nach Steuerklasse",
  description: "Einkommensteuer in Luxemburg nach dem Tarif der ACD: Steuerklassen 1, 1a und 2, Beitrag zum Beschäftigungsfonds von 7 % oder 9 % und Durchschnittssteuersatz.",
  intro: [
    "Der Einkommensteuertarif hängt von der Steuerklasse ab. Er steigt stufenweise bis 42 %. Zur Steuer kommt ein Beitrag zum Beschäftigungsfonds.",
    "Der Rechner geht vom steuerpflichtigen Einkommen aus, also vom Einkommen nach Werbungskosten, Sonderausgaben und Freibeträgen.",
  ],
  comoSeCalcula: [
    "Das steuerpflichtige Einkommen wird auf 50 Euro abgerundet.",
    "Steuer = Satz der Stufe x Einkommen, minus Abzug der Stufe, auf den Euro abgerundet. Die Formeln sind die der Steuerverwaltung (ACD).",
    "Beschäftigungsfonds: Die Steuer wird um 7 % erhöht. Über 150.000 Euro (300.000 Euro in Klasse 2) steigt der Zuschlag auf 9 % mit einem Abzug.",
  ],
  ejemplo: [
    "Eine Person in Steuerklasse 1 mit 60.000 Euro steuerpflichtigem Einkommen zahlt 11.164 Euro Steuer, mit dem Beitrag zum Beschäftigungsfonds 11.945 Euro.",
  ],
  faq: [
    { pregunta: "Was ist die Steuerklasse 2?", respuesta: "Die Klasse der gemeinsam veranlagten Verheirateten oder Partner. Ihr Tarif gilt für das gemeinsame Einkommen des Haushalts." },
    { pregunta: "Wie hoch ist der Spitzensteuersatz?", respuesta: "Die letzte Stufe des Tarifs wird mit 42 % besteuert, vor dem Beitrag zum Beschäftigungsfonds." },
    { pregunta: "Sind Steuerkredite enthalten?", respuesta: "Nein. Der Rechner zeigt die Steuer laut Tarif. Steuerkredite wie der CIS werden danach von der geschuldeten Steuer abgezogen." },
  ],
  glosario: [
    { termino: "Beschäftigungsfonds", definicion: "Beitrag, der zur Einkommensteuer hinzukommt, 7 % oder 9 % je nach Einkommen." },
    { termino: "Steuerpflichtiges Einkommen", definicion: "Einkommen nach Abzug von Werbungskosten, Sonderausgaben und Freibeträgen." },
  ],
});
