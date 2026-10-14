import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.urlaubsanspruch-rechner",
  h1: "Urlaubsanspruch berechnen",
  title: "Urlaubsanspruch in Österreich: Rechner für Urlaubstage",
  description: "Wie viele Urlaubstage stehen Ihnen zu? Fünf Wochen, nach 25 Dienstjahren sechs, umgerechnet auf Ihre Arbeitstage pro Woche und anteilig im ersten Jahr.",
  intro: [
    "In Österreich stehen allen Arbeitnehmern fünf Wochen bezahlter Urlaub im Jahr zu. Nach 25 Dienstjahren beim selben Arbeitgeber sind es sechs Wochen.",
    "Das Gesetz zählt in Werktagen einer Sechstagewoche. Der Rechner rechnet das auf Ihre Arbeitstage um, auch bei Teilzeit mit weniger Tagen pro Woche.",
  ],
  comoSeCalcula: [
    "Grundanspruch: {{at.urlaub[regel]}} Werktage im Jahr, nach 25 Dienstjahren {{at.urlaub[ab-25-dienstjahren]}} Werktage.",
    "Umrechnung: Werktage mal Ihre Arbeitstage pro Woche, geteilt durch sechs. Bei einer Fünftagewoche sind das 25 beziehungsweise 30 Urlaubstage.",
    "Im ersten Arbeitsjahr entsteht der Urlaub in den ersten sechs Monaten anteilig. Danach steht der volle Urlaub zu, ab dem zweiten Jahr gleich am ersten Tag des Arbeitsjahres.",
  ],
  ejemplo: [
    "Wer an vier Tagen pro Woche arbeitet, hat 20 Urlaubstage. Das sind ebenfalls fünf Wochen, denn eine Urlaubswoche besteht hier aus vier Arbeitstagen.",
  ],
  faq: [
    {
      pregunta: "Verfällt nicht verbrauchter Urlaub?",
      respuesta: "Der Urlaubsanspruch verjährt nach zwei Jahren ab dem Ende des Urlaubsjahres, in dem er entstanden ist. Bis dahin wird Resturlaub automatisch in das nächste Jahr übertragen.",
    },
    {
      pregunta: "Was passiert, wenn ich im Urlaub krank werde?",
      respuesta: "Dauert der Krankenstand mehr als drei Kalendertage, werden die Krankheitstage, die auf Werktage fallen, nicht auf den Urlaub angerechnet.",
    },
    {
      pregunta: "Bekomme ich offenen Urlaub ausgezahlt, wenn das Arbeitsverhältnis endet?",
      respuesta: "Ja, für nicht verbrauchten Urlaub steht eine Ersatzleistung zu. Für das laufende Urlaubsjahr wird sie anteilig berechnet.",
    },
  ],
  glosario: [
    { termino: "Werktage", definicion: "Die Tage einer Sechstagewoche, in denen das Gesetz den Urlaub zählt." },
    { termino: "Urlaubsjahr", definicion: "Grundsätzlich das Arbeitsjahr ab Beginn des Dienstverhältnisses, es kann auf das Kalenderjahr umgestellt werden." },
    { termino: "Ersatzleistung", definicion: "Die Abgeltung von offenem Urlaub bei Ende des Arbeitsverhältnisses." },
  ],
});
