import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.rentenrechner",
  h1: "Rentenrechner: Wie hoch wird meine Rente?",
  title: "Rentenrechner 2026: gesetzliche Rente mit Entgeltpunkten",
  description:
    "Schätzen Sie Ihre gesetzliche Rente aus Gehalt und Beitragsjahren: Entgeltpunkte mal aktueller Rentenwert von {{de.rentenwert}}. Mit Ihren bisherigen Punkten.",
  intro: [
    "Die gesetzliche Rente richtet sich nach Entgeltpunkten. Wer ein Jahr lang genau das Durchschnittsentgelt verdient, bekommt einen Punkt.",
    "Jeder Punkt ist derzeit {{de.rentenwert}} Monatsrente wert. Der Rechner schätzt Ihre Bruttorente in heutigen Euro.",
  ],
  comoSeCalcula: [
    "Entgeltpunkte pro Jahr = Ihr Bruttojahresgehalt geteilt durch das Durchschnittsentgelt ({{de.durchschnittsentgelt}} vorläufig für 2026).",
    "Gehalt über der Beitragsbemessungsgrenze von {{de.bbg-rv}} im Monat zählt nicht mit.",
    "Punkte pro Jahr mal Beitragsjahre, plus die Punkte aus Ihrer Renteninformation.",
    "Monatliche Bruttorente = Entgeltpunkte × aktueller Rentenwert ({{de.rentenwert}} seit dem {{de.rentenwert#desde}}).",
  ],
  ejemplo: ["Wer 45 Jahre lang genau durchschnittlich verdient, hat 45 Entgeltpunkte. Das ergibt nach heutigem Wert 1.913,40 Euro Bruttorente im Monat."],
  faq: [
    {
      pregunta: "Ist das meine echte spätere Rente?",
      respuesta: "Eine Schätzung in heutigen Werten. Der Rentenwert steigt in der Regel jedes Jahr im Juli. Abschläge bei frühem Rentenbeginn und Zeiten wie Kindererziehung sind nicht eingerechnet.",
    },
    {
      pregunta: "Wo finde ich meine bisherigen Entgeltpunkte?",
      respuesta: "In der Renteninformation, die die Deutsche Rentenversicherung ab 27 Jahren jährlich verschickt, oder in Ihrem Versicherungsverlauf.",
    },
    {
      pregunta: "Was bleibt von der Bruttorente?",
      respuesta: "Rentner zahlen Beiträge zur Kranken- und Pflegeversicherung und je nach Gesamteinkommen Einkommensteuer.",
    },
  ],
  glosario: [
    { termino: "Entgeltpunkt", definicion: "Rechengröße der Rentenversicherung. Ein Jahr mit Durchschnittsverdienst ergibt einen Punkt." },
    { termino: "Aktueller Rentenwert", definicion: "Der Monatsbetrag der Rente für einen Entgeltpunkt. Die Bundesregierung legt ihn jedes Jahr per Verordnung fest." },
  ],
});
