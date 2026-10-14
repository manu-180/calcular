import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.mehrwertsteuer-rechner",
  h1: "Mehrwertsteuerrechner: {{de.mwst-regelsatz}} und {{de.mwst-ermaessigt}}",
  title: "MwSt-Rechner: {{de.mwst-regelsatz}} und {{de.mwst-ermaessigt}} aufschlagen oder herausrechnen",
  description:
    "Mehrwertsteuer mit {{de.mwst-regelsatz}} oder {{de.mwst-ermaessigt}} aufschlagen oder aus einem Bruttobetrag herausrechnen. Netto, Steuer und Brutto auf den Cent.",
  intro: [
    "Die Mehrwertsteuer (amtlich Umsatzsteuer) beträgt in Deutschland {{de.mwst-regelsatz}}. Für viele Lebensmittel, Bücher und einige andere Umsätze gilt der ermäßigte Satz von {{de.mwst-ermaessigt}}.",
    "Mit dem Rechner schlagen Sie die Steuer auf einen Nettopreis auf oder rechnen sie aus einem Bruttopreis heraus.",
  ],
  comoSeCalcula: [
    "Aufschlagen: Nettobetrag mal Steuersatz ergibt die Mehrwertsteuer. Netto plus Steuer ist der Bruttobetrag.",
    "Herausrechnen: Bruttobetrag geteilt durch 1,19 (oder 1,07) ergibt den Nettobetrag. Die Differenz zum Brutto ist die Mehrwertsteuer.",
    "Nicht 19 % vom Bruttobetrag abziehen: Das ergibt zu wenig Netto.",
  ],
  ejemplo: [
    "Eine Rechnung über 500 Euro netto kostet mit {{de.mwst-regelsatz}} Mehrwertsteuer 595 Euro brutto. Aus 595 Euro brutto ergeben sich umgekehrt 95 Euro Steuer.",
  ],
  faq: [
    {
      pregunta: "Wie rechne ich 19 % Mehrwertsteuer heraus?",
      respuesta: "Teilen Sie den Bruttobetrag durch 1,19. Aus 119 Euro werden 100 Euro netto, die Steuer beträgt 19 Euro.",
    },
    {
      pregunta: "Wann gilt der ermäßigte Satz?",
      respuesta: "Für die in Anlage 2 des Umsatzsteuergesetzes genannten Waren, etwa die meisten Lebensmittel und Bücher, und für die Leistungen, die § 12 Absatz 2 UStG aufzählt. Im Zweifel hilft das Finanzamt.",
    },
    {
      pregunta: "Was ist der Unterschied zwischen Mehrwertsteuer und Umsatzsteuer?",
      respuesta: "Keiner. Umsatzsteuer ist der Begriff im Gesetz, Mehrwertsteuer der im Alltag.",
    },
    {
      pregunta: "Müssen Kleinunternehmer Mehrwertsteuer ausweisen?",
      respuesta: "Nein. Unter den Umsatzgrenzen der Kleinunternehmerregelung stellen Sie Rechnungen ohne Umsatzsteuer. Prüfen können Sie das mit dem Kleinunternehmer-Rechner.",
    },
  ],
  glosario: [
    { termino: "Nettobetrag", definicion: "Preis ohne Umsatzsteuer." },
    { termino: "Vorsteuer", definicion: "Die Umsatzsteuer, die ein Unternehmen beim Einkauf zahlt und vom Finanzamt zurückholen kann." },
  ],
});
