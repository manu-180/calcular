import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.saeule-3a-rechner",
  h1: "Säule-3a-Rechner: Maximalbetrag und Steuerersparnis",
  title: "Säule 3a Rechner 2026: Maximalbetrag und Steuerersparnis",
  description:
    "Säule 3a 2026: bis {{ch.saeule-3a-mit-pk}} mit Pensionskasse, bis {{ch.saeule-3a-ohne-pk}} ohne. Maximalbetrag und Ersparnis bei der Bundessteuer berechnen.",
  intro: [
    "Einzahlungen in die Säule 3a dürfen Sie vom steuerbaren Einkommen abziehen, beim Bund, beim Kanton und bei der Gemeinde. Wer einer Pensionskasse angehört, kann {{ch.saeule-3a-mit-pk}} im Jahr einzahlen.",
    "Ohne Pensionskasse sind es {{ch.saeule-3a-ohne-pk-satz}} des Erwerbseinkommens, höchstens {{ch.saeule-3a-ohne-pk}}. Der Rechner zeigt Ihr Maximum und was die Einzahlung bei der direkten Bundessteuer spart.",
  ],
  comoSeCalcula: [
    "Mit Pensionskasse: 8 % des oberen BVG-Grenzbetrags, gerundet {{ch.saeule-3a-mit-pk}}.",
    "Ohne Pensionskasse: {{ch.saeule-3a-ohne-pk-satz}} des Erwerbseinkommens, höchstens 40 % des oberen BVG-Grenzbetrags, also {{ch.saeule-3a-ohne-pk}}.",
    "Ersparnis: Bundessteuer auf dem steuerbaren Einkommen minus Bundessteuer auf dem Einkommen nach Abzug der Einzahlung, mit den Tarifen 2026.",
  ],
  ejemplo: [
    "Eine alleinstehende Person mit Pensionskasse und 80 000 Franken steuerbarem Einkommen zahlt das Maximum ein. Die direkte Bundessteuer sinkt um rund 330 Franken. Die Ersparnis bei Kanton und Gemeinde kommt dazu.",
  ],
  faq: [
    {
      pregunta: "Wie viel darf ich 2026 in die Säule 3a einzahlen?",
      respuesta: "Mit Pensionskasse {{ch.saeule-3a-mit-pk}}. Ohne Pensionskasse {{ch.saeule-3a-ohne-pk-satz}} des Erwerbseinkommens, höchstens {{ch.saeule-3a-ohne-pk}}. Ab 2027 steigen die Beträge auf 7373 und 36 864 Franken.",
    },
    {
      pregunta: "Kann ich verpasste Jahre nachzahlen?",
      respuesta: "Ja, unter Bedingungen. Sie dürfen Lücken der letzten zehn Jahre einkaufen, wenn Sie im Einkaufsjahr den vollen ordentlichen Beitrag eingezahlt haben und in den betroffenen Jahren beitragsberechtigt waren. Pro Jahr ist der Einkauf auf den kleinen Höchstbetrag begrenzt.",
    },
    {
      pregunta: "Wie lange darf ich einzahlen?",
      respuesta: "Höchstens bis fünf Jahre nach Erreichen des Referenzalters, solange Sie erwerbstätig sind. Im Jahr, in dem Sie aufhören zu arbeiten, ist noch der volle Beitrag möglich.",
    },
    {
      pregunta: "Können beide Ehepartner einzahlen?",
      respuesta: "Ja. Sind beide erwerbstätig, kann jede Person bis zu ihrem eigenen Maximum einzahlen und abziehen.",
    },
  ],
  glosario: [
    { termino: "Säule 3a", definicion: "Gebundene Selbstvorsorge. Ausbezahlt wird frühestens fünf Jahre vor dem Referenzalter, vorher nur in gesetzlich bestimmten Fällen wie dem Kauf von Wohneigentum zum Eigenbedarf." },
    { termino: "Oberer BVG-Grenzbetrag", definicion: "Der höchste Jahreslohn, der in der obligatorischen Pensionskasse versichert ist: {{ch.bvg-obere-grenze}}." },
  ],
});
