import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.arbeitslosengeld-rechner",
  h1: "Arbeitslosengeld-Rechner Schweiz: Taggeld der ALV",
  title: "Arbeitslosengeld Rechner Schweiz: ALV-Taggeld berechnen",
  description:
    "Arbeitslosenentschädigung berechnen: {{ch.alv-taggeld-reduziert}} oder {{ch.alv-taggeld-voll}} des versicherten Verdienstes, Taggeld, Monatsbetrag und Höchstzahl der Taggelder nach AVIG.",
  intro: [
    "Wer arbeitslos wird und in den letzten zwei Jahren mindestens zwölf Monate Beiträge bezahlt hat, erhält Taggelder der Arbeitslosenversicherung. Ein Taggeld beträgt {{ch.alv-taggeld-voll}} oder {{ch.alv-taggeld-reduziert}} des versicherten Verdienstes.",
    "Der Rechner zeigt Taggeld, Monatsbetrag und die Höchstzahl der Taggelder. Verbindlich entscheidet Ihre Arbeitslosenkasse.",
  ],
  comoSeCalcula: [
    "Versicherter Verdienst: Ihr durchschnittlicher Monatslohn der letzten sechs oder zwölf Beitragsmonate, der höhere Wert zählt. Höchstens {{ch.hoechster-versicherter-verdienst}} im Jahr.",
    "Tagesverdienst: Monatsverdienst geteilt durch {{ch.alv-tage-pro-monat}}.",
    "{{ch.alv-taggeld-voll}} erhalten Personen mit Unterhaltspflicht gegenüber Kindern unter 25 Jahren, mit einer IV-Rente ab 40 % Invaliditätsgrad oder mit einem vollen Taggeld bis {{ch.alv-schwelle-volles-taggeld}}. Alle anderen erhalten {{ch.alv-taggeld-reduziert}}.",
    "Höchstzahl: 260 Taggelder ab 12 Beitragsmonaten, 400 ab 18, 520 ab 22 Monaten für Personen ab 55 Jahren oder mit IV-Rente. Unter 25 ohne Kinder höchstens 200.",
  ],
  ejemplo: [
    "Bei 6000 Franken versichertem Verdienst und ohne Kinder beträgt das Taggeld rund 194 Franken, rund 4200 Franken im Monat brutto. Mit 24 Beitragsmonaten und 35 Jahren gibt es höchstens 400 Taggelder.",
  ],
  faq: [
    {
      pregunta: "Wie viel Arbeitslosengeld bekomme ich?",
      respuesta: "{{ch.alv-taggeld-reduziert}} des versicherten Verdienstes, oder {{ch.alv-taggeld-voll}}, wenn Sie Kinder unter 25 Jahren unterstützen, eine IV-Rente ab 40 % beziehen oder Ihr volles Taggeld {{ch.alv-schwelle-volles-taggeld}} nicht übersteigt.",
    },
    {
      pregunta: "Wie lange erhalte ich Taggelder?",
      respuesta: "Das hängt von Beitragszeit und Alter ab: 260, 400 oder 520 Taggelder innerhalb von zwei Jahren. Personen unter 25 Jahren ohne Unterhaltspflicht erhalten höchstens 200 Taggelder.",
    },
    {
      pregunta: "Was wird vom Taggeld abgezogen?",
      respuesta: "AHV/IV/EO-Beiträge, ein Beitrag an die berufliche Vorsorge für Tod und Invalidität und höchstens zwei Drittel der Prämie für Nichtberufsunfälle.",
    },
    {
      pregunta: "Wie wird ein Monat gerechnet?",
      respuesta: "Ein Monat entspricht {{ch.alv-tage-pro-monat}} Taggeldern. Für eine Woche werden fünf Taggelder ausbezahlt.",
    },
  ],
  glosario: [
    { termino: "Versicherter Verdienst", definicion: "Der durchschnittliche Lohn, auf dem das Taggeld berechnet wird, höchstens bis zum Höchstbetrag der Unfallversicherung." },
    { termino: "Rahmenfrist", definicion: "Zeitraum von zwei Jahren für die Beitragszeit und für den Bezug der Taggelder." },
  ],
});
