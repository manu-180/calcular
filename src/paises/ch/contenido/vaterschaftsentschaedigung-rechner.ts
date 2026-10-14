import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.vaterschaftsentschaedigung-rechner",
  h1: "Vaterschaftsentschädigung berechnen",
  title: "Vaterschaftsurlaub Rechner: Entschädigung der EO 2026",
  description:
    "Entschädigung für den Urlaub des andern Elternteils: {{ch.eo-taggeld-satz}} des Einkommens, höchstens {{ch.eo-hoechstbetrag-taggeld}} pro Tag, für {{ch.vaterschaft-taggelder}} Taggelder.",
  intro: [
    "Der andere Elternteil, meist der Vater, hat nach der Geburt Anspruch auf zwei Wochen Urlaub. Die Erwerbsersatzordnung zahlt dafür eine Entschädigung von {{ch.eo-taggeld-satz}} des Einkommens, höchstens {{ch.eo-hoechstbetrag-taggeld}} pro Tag.",
    "Insgesamt gibt es {{ch.vaterschaft-taggelder}} Taggelder. Der Urlaub kann innert sechs Monaten nach der Geburt wochen- oder tageweise bezogen werden.",
  ],
  comoSeCalcula: [
    "Angestellte: Monatslohn geteilt durch 30. Selbstständige: Jahreseinkommen geteilt durch 360.",
    "Taggeld: {{ch.eo-taggeld-satz}} davon, höchstens {{ch.eo-hoechstbetrag-taggeld}}.",
    "Entschädigung: Taggeld mal {{ch.vaterschaft-taggelder}} Taggelder. Wer den Urlaub wochenweise bezieht, erhält pro Woche 7 Taggelder. Tageweise gibt es pro 5 bezogene Tage 2 Taggelder dazu.",
  ],
  ejemplo: ["Bei 6000 Franken Monatslohn beträgt das Taggeld 160 Franken. Für 14 Taggelder sind das 2240 Franken."],
  faq: [
    {
      pregunta: "Wie viel Vaterschaftsentschädigung gibt es?",
      respuesta: "{{ch.eo-taggeld-satz}} des durchschnittlichen Einkommens vor der Geburt, höchstens {{ch.eo-hoechstbetrag-taggeld}} pro Tag, für höchstens {{ch.vaterschaft-taggelder}} Taggelder.",
    },
    {
      pregunta: "Bis wann muss ich den Urlaub beziehen?",
      respuesta: "Innert sechs Monaten nach der Geburt des Kindes. Sie können ihn am Stück, wochenweise oder tageweise nehmen.",
    },
    {
      pregunta: "Wer hat Anspruch?",
      respuesta: "Der rechtliche Vater bei der Geburt oder innerhalb der folgenden sechs Monate, und die Ehefrau der Mutter, wenn sie bei der Geburt rechtlicher Elternteil ist.",
    },
  ],
  glosario: [
    { termino: "Urlaub des andern Elternteils", definicion: "Zwei Wochen bezahlter Urlaub nach der Geburt, meist Vaterschaftsurlaub genannt." },
  ],
});
