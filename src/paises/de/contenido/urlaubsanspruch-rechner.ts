import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.urlaubsanspruch-rechner",
  h1: "Urlaubsanspruch-Rechner",
  title: "Urlaubsanspruch berechnen: gesetzlich und anteilig",
  description:
    "Wie viele Urlaubstage stehen Ihnen zu? Gesetzlicher Mindesturlaub nach Arbeitstagen pro Woche und Teilurlaub bei Eintritt oder Austritt im Jahr.",
  intro: [
    "Das Bundesurlaubsgesetz garantiert mindestens {{de.mindesturlaub}} Urlaub im Jahr, gezählt in Werktagen. Werktage sind alle Tage außer Sonn- und Feiertagen, also eine Sechstagewoche.",
    "Der Rechner rechnet das auf Ihre Arbeitswoche um und zeigt den anteiligen Urlaub, wenn Sie nicht das ganze Jahr beschäftigt sind.",
  ],
  comoSeCalcula: [
    "Gesetzlicher Urlaub = {{de.mindesturlaub}} (Werktage) × Ihre Arbeitstage pro Woche / 6.",
    "Gilt im Vertrag mehr Urlaub, zählt der Vertrag.",
    "Teilurlaub: ein Zwölftel des Jahresurlaubs für jeden vollen Monat. Bruchteile ab einem halben Tag werden aufgerundet.",
    "Den vollen Anspruch erwerben Sie erst nach sechs Monaten im Arbeitsverhältnis.",
  ],
  ejemplo: ["Bei einer Fünftagewoche beträgt der gesetzliche Mindesturlaub 20 Tage. Mit 30 Tagen laut Vertrag und sieben vollen Monaten im Jahr stehen Ihnen 18 Tage zu."],
  faq: [
    {
      pregunta: "Wie viel Urlaub habe ich in Teilzeit?",
      respuesta: "Bei weniger Arbeitstagen pro Woche entsprechend weniger Tage. Wer drei Tage pro Woche arbeitet, hat mindestens 12 Urlaubstage, also ebenfalls vier freie Wochen.",
    },
    {
      pregunta: "Was passiert mit Resturlaub bei Kündigung?",
      respuesta: "Er wird möglichst in der Kündigungsfrist genommen. Geht das nicht, muss der Arbeitgeber ihn auszahlen.",
    },
    {
      pregunta: "Zählen Feiertage als Urlaubstage?",
      respuesta: "Nein. Gesetzliche Feiertage, auf die ein Arbeitstag fällt, werden nicht vom Urlaub abgezogen.",
    },
  ],
  glosario: [
    { termino: "Werktage", definicion: "Alle Kalendertage, die nicht Sonntag oder gesetzlicher Feiertag sind." },
    { termino: "Teilurlaub", definicion: "Anteiliger Urlaub von einem Zwölftel pro vollem Beschäftigungsmonat (§ 5 BUrlG)." },
  ],
});
