import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.mutterschaftsentschaedigung-rechner",
  h1: "Mutterschaftsentschädigung berechnen",
  title: "Mutterschaftsentschädigung Rechner: Taggeld der EO {{anio}}",
  description:
    "Mutterschaftsentschädigung der EO: {{ch.eo-taggeld-satz}} des Einkommens, höchstens {{ch.eo-hoechstbetrag-taggeld}} pro Tag, während {{ch.mutterschaft-tage}} Tagen. Taggeld und Gesamtbetrag berechnen.",
  intro: [
    "Nach der Geburt erhalten erwerbstätige Mütter eine Mutterschaftsentschädigung aus der Erwerbsersatzordnung (EO). Sie beträgt {{ch.eo-taggeld-satz}} des durchschnittlichen Einkommens vor der Geburt, höchstens {{ch.eo-hoechstbetrag-taggeld}} pro Tag.",
    "Die Entschädigung wird während {{ch.mutterschaft-tage}} Tagen am Stück ausbezahlt, ab dem Tag der Geburt.",
  ],
  comoSeCalcula: [
    "Angestellte: Monatslohn vor der Geburt geteilt durch 30 ergibt das Einkommen pro Tag.",
    "Selbstständige: AHV-pflichtiges Jahreseinkommen geteilt durch 360.",
    "Taggeld: {{ch.eo-taggeld-satz}} davon, höchstens {{ch.eo-hoechstbetrag-taggeld}}. Gesamtbetrag: Taggeld mal {{ch.mutterschaft-tage}} Tage.",
  ],
  ejemplo: ["Bei 5250 Franken Monatslohn beträgt das Taggeld 140 Franken. Für 98 Tage sind das 13 720 Franken. Ab 8250 Franken Monatslohn ist das Höchsttaggeld erreicht."],
  faq: [
    {
      pregunta: "Wie hoch ist die Mutterschaftsentschädigung?",
      respuesta: "{{ch.eo-taggeld-satz}} des durchschnittlichen Erwerbseinkommens vor der Geburt, höchstens {{ch.eo-hoechstbetrag-taggeld}} pro Tag.",
    },
    {
      pregunta: "Wie lange dauert der Mutterschaftsurlaub?",
      respuesta: "Nach dem Obligationenrecht mindestens 14 Wochen. Die Entschädigung läuft während {{ch.mutterschaft-tage}} Tagen ab dem Tag der Geburt.",
    },
    {
      pregunta: "Was gilt, wenn das Neugeborene im Spital bleiben muss?",
      respuesta: "Bleibt das Kind direkt nach der Geburt mindestens zwei Wochen im Spital, verlängert sich die Entschädigung um die Dauer des Spitalaufenthalts, höchstens um 56 Tage. Die Mutter muss nachweisen, dass sie nach dem Urlaub wieder arbeiten wollte.",
    },
    {
      pregunta: "Werden Beiträge abgezogen?",
      respuesta: "Ja. Auf der Entschädigung werden AHV/IV/EO-Beiträge erhoben, bei Arbeitnehmerinnen zusätzlich der Beitrag an die Arbeitslosenversicherung.",
    },
  ],
  glosario: [
    { termino: "EO", definicion: "Erwerbsersatzordnung. Sie zahlt Entschädigungen bei Mutterschaft, Vaterschaft und Dienst." },
  ],
});
