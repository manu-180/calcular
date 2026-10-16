import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.mwst-rechner",
  h1: "MWST-Rechner Schweiz: {{ch.mwst-normalsatz}}, {{ch.mwst-reduziert}} und {{ch.mwst-beherbergung}}",
  title: "MWST-Rechner Schweiz: {{ch.mwst-normalsatz}} dazurechnen oder herausrechnen",
  description:
    "Mehrwertsteuer in der Schweiz mit {{ch.mwst-normalsatz}}, {{ch.mwst-reduziert}} oder {{ch.mwst-beherbergung}} berechnen: Betrag mit und ohne MWST auf den Rappen genau.",
  intro: [
    "In der Schweiz beträgt die Mehrwertsteuer {{ch.mwst-normalsatz}}. Lebensmittel, Medikamente, Bücher und Zeitungen tragen den reduzierten Satz von {{ch.mwst-reduziert}}. Für Übernachtungen mit Frühstück gilt der Sondersatz von {{ch.mwst-beherbergung}}.",
    "Mit dem Rechner schlagen Sie die MWST auf einen Betrag auf oder rechnen sie aus einem Preis inklusive MWST heraus.",
  ],
  comoSeCalcula: [
    "Dazurechnen: Betrag mal Steuersatz ergibt die MWST. Betrag plus MWST ist der Preis inklusive MWST.",
    "Herausrechnen: Preis inklusive MWST geteilt durch 1.081 (oder 1.026 und 1.038) ergibt den Betrag ohne MWST. Die Differenz ist die Steuer.",
    "Nicht einfach {{ch.mwst-normalsatz}} vom Endpreis abziehen: Das ergibt zu viel Steuer.",
  ],
  ejemplo: [
    "Eine Offerte über 2000 Franken ohne MWST kostet mit dem Normalsatz 2162 Franken. Darin stecken 162 Franken Mehrwertsteuer.",
  ],
  faq: [
    {
      pregunta: "Wie rechne ich die MWST aus einem Bruttobetrag heraus?",
      respuesta: "Teilen Sie den Betrag inklusive MWST durch 1.081. Aus 108.10 Franken werden 100 Franken ohne MWST, die Steuer beträgt 8.10 Franken.",
    },
    {
      pregunta: "Was fällt unter den reduzierten Satz?",
      respuesta: "Unter anderem Wasser in Leitungen, Lebensmittel ohne alkoholische Getränke, Medikamente, Zeitungen, Zeitschriften und Bücher. Die vollständige Liste steht in Art. 25 Abs. 2 des Mehrwertsteuergesetzes.",
    },
    {
      pregunta: "Gilt im Restaurant der reduzierte Satz?",
      respuesta: "Nein. Für Essen und Getränke, die im Restaurant serviert werden, gilt der Normalsatz. Lebensmittel zum Mitnehmen tragen den reduzierten Satz, alkoholische Getränke ausgenommen.",
    },
    {
      pregunta: "Wie lange gilt der Sondersatz für Beherbergung?",
      respuesta: "Das Gesetz sieht ihn bis längstens 31. Dezember 2027 vor. Er gilt für Übernachtungen einschliesslich Frühstück, auch wenn das Frühstück separat verrechnet wird.",
    },
  ],
  glosario: [
    { termino: "MWST", definicion: "Abkürzung für Mehrwertsteuer, wie sie die Eidgenössische Steuerverwaltung verwendet." },
    { termino: "Vorsteuer", definicion: "Die MWST, die ein Unternehmen beim Einkauf bezahlt und in seiner Abrechnung abziehen kann." },
  ],
});
