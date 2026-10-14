import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.gewerbesteuer-rechner",
  h1: "Gewerbesteuerrechner",
  title: "Gewerbesteuer berechnen: Messbetrag, Freibetrag, Hebesatz",
  description:
    "Gewerbesteuer für Einzelunternehmen und GmbH: Freibetrag {{de.gewst-freibetrag}}, Steuermesszahl {{de.gewst-messzahl}} und der Hebesatz Ihrer Gemeinde.",
  intro: [
    "Gewerbetreibende zahlen Gewerbesteuer an ihre Gemeinde. Wie viel, hängt vom Gewerbeertrag, der Rechtsform und dem Hebesatz der Gemeinde ab.",
    "Freiberufler wie Ärztinnen, Anwälte oder Journalisten zahlen keine Gewerbesteuer.",
  ],
  comoSeCalcula: [
    "Der Gewerbeertrag wird auf volle 100 Euro abgerundet.",
    "Einzelunternehmen und Personengesellschaften ziehen einen Freibetrag von {{de.gewst-freibetrag}} ab, Kapitalgesellschaften nicht.",
    "Steuermessbetrag = Rest × {{de.gewst-messzahl}}.",
    "Gewerbesteuer = Steuermessbetrag × Hebesatz der Gemeinde. Er beträgt mindestens {{de.gewst-mindesthebesatz}}.",
  ],
  ejemplo: ["Ein Einzelunternehmen mit 80.000 Euro Gewerbeertrag zahlt bei einem Hebesatz von 400 % genau 7.770 Euro Gewerbesteuer."],
  faq: [
    {
      pregunta: "Wo finde ich den Hebesatz meiner Gemeinde?",
      respuesta: "Auf der Website der Gemeinde oder in ihrer Haushaltssatzung. Die Gemeinde legt ihn selbst fest, gesetzlich aber nicht unter {{de.gewst-mindesthebesatz}}.",
    },
    {
      pregunta: "Kann ich die Gewerbesteuer mit der Einkommensteuer verrechnen?",
      respuesta: "Als Einzelunternehmer oder Gesellschafter einer Personengesellschaft wird die Gewerbesteuer weitgehend auf Ihre Einkommensteuer angerechnet. Bei der GmbH gibt es diese Anrechnung nicht.",
    },
    {
      pregunta: "Ist die Gewerbesteuer eine Betriebsausgabe?",
      respuesta: "Nein. Die Gewerbesteuer mindert den Gewinn steuerlich nicht.",
    },
  ],
  glosario: [
    { termino: "Gewerbeertrag", definicion: "Der Gewinn nach dem Einkommen- oder Körperschaftsteuerrecht, korrigiert um Hinzurechnungen und Kürzungen." },
    { termino: "Hebesatz", definicion: "Der Prozentsatz, mit dem jede Gemeinde ihre Gewerbesteuer selbst festlegt." },
  ],
});
