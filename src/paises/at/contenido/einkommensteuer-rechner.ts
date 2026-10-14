import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.einkommensteuer-rechner",
  h1: "Einkommensteuerrechner für Österreich",
  title: "Einkommensteuer 2026 berechnen: Tarif und Steuersatz",
  description: "Berechnen Sie die Einkommensteuer 2026 nach dem österreichischen Tarif, mit Durchschnitts- und Grenzsteuersatz sowie Verkehrs- und Alleinverdienerabsetzbetrag.",
  intro: [
    "Die Einkommensteuer steigt in Österreich in Stufen: Jeder Teil des Einkommens wird mit dem Satz seiner Stufe besteuert, nicht das ganze Einkommen mit dem höchsten Satz.",
    "Geben Sie Ihr zu versteuerndes Jahreseinkommen ein. Der Rechner zeigt die Steuer, wie viel Prozent davon im Schnitt an das Finanzamt gehen und mit welchem Satz der nächste Euro besteuert wird.",
  ],
  comoSeCalcula: [
    "Tarifstufen 2026: bis 13.539 Euro 0 %, bis 21.992 Euro 20 %, bis 36.458 Euro 30 %, bis 70.365 Euro 40 %, bis 104.859 Euro 48 %, bis 1 Million Euro 50 %, darüber 55 %.",
    "Von der Steuer nach Tarif werden die Absetzbeträge abgezogen: für Arbeitnehmer der Verkehrsabsetzbetrag von {{at.verkehrsabsetzbetrag}}, für Alleinverdiener und Alleinerzieher {{at.avab[ein-kind]}} mit einem Kind und {{at.avab[zwei-kinder]}} mit zwei Kindern, für jedes weitere Kind {{at.avab[je-weiteres-kind]}}.",
    "Urlaubsgeld und Weihnachtsgeld gehören nicht in diese Rechnung, sie werden mit festen Sätzen besteuert.",
  ],
  ejemplo: [
    "Bei 50.000 Euro Einkommen fallen 11.447,20 Euro Steuer nach Tarif an. Ein Arbeitnehmer zieht den Verkehrsabsetzbetrag ab und zahlt 10.951,20 Euro, im Schnitt 21,9 %. Jeder weitere Euro wird mit 40 % besteuert.",
  ],
  faq: [
    {
      pregunta: "Wie viel ist in Österreich steuerfrei?",
      respuesta: "2026 bleiben die ersten 13.539 Euro des Jahreseinkommens steuerfrei. Für Arbeitnehmer kommen der Verkehrsabsetzbetrag und die Werbungskostenpauschale dazu, deshalb beginnt die Lohnsteuer erst bei einem höheren Bruttogehalt.",
    },
    {
      pregunta: "Was ist der Unterschied zwischen Grenzsteuersatz und Durchschnittssteuersatz?",
      respuesta: "Der Grenzsteuersatz gilt für den nächsten verdienten Euro. Der Durchschnittssteuersatz ist die Steuer geteilt durch das ganze Einkommen und deshalb immer niedriger.",
    },
    {
      pregunta: "Warum sind die Grenzen 2026 höher als 2025?",
      respuesta: "Die Tarifstufen werden jedes Jahr an die Inflation angepasst, um die kalte Progression auszugleichen. 2026 stiegen sie um 1,73 %, nur die Grenze von 1 Million Euro blieb gleich.",
    },
  ],
  glosario: [
    { termino: "Zu versteuerndes Einkommen", definicion: "Die Summe der Einkünfte nach Abzug von Sonderausgaben, außergewöhnlichen Belastungen und Freibeträgen." },
    { termino: "Absetzbetrag", definicion: "Ein Betrag, der direkt von der Steuer abgezogen wird, nicht vom Einkommen." },
    { termino: "Kalte Progression", definicion: "Steuererhöhung durch Inflation, wenn die Tarifgrenzen gleich bleiben." },
  ],
});
