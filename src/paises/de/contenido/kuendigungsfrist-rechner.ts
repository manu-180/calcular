import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.kuendigungsfrist-rechner",
  h1: "Kündigungsfrist-Rechner nach § 622 BGB",
  title: "Kündigungsfrist berechnen: letzter Arbeitstag nach § 622 BGB",
  description:
    "Wann endet Ihr Arbeitsverhältnis? Gesetzliche Kündigungsfrist für Arbeitgeber und Arbeitnehmer nach Betriebszugehörigkeit, auch in der Probezeit.",
  intro: [
    "Die gesetzlichen Kündigungsfristen stehen in § 622 BGB. Für Arbeitnehmer gilt immer die Grundfrist von vier Wochen. Kündigt der Arbeitgeber, wird die Frist mit der Dauer der Beschäftigung länger.",
    "Geben Sie Beginn des Arbeitsverhältnisses und den Tag ein, an dem die Kündigung zugeht. Der Rechner nennt den letzten Tag.",
  ],
  comoSeCalcula: [
    "Grundfrist: vier Wochen zum 15. oder zum Ende eines Kalendermonats.",
    "Kündigt der Arbeitgeber nach 2 Jahren: 1 Monat zum Monatsende, nach 5 Jahren 2 Monate, nach 8 Jahren 3, nach 10 Jahren 4, nach 12 Jahren 5, nach 15 Jahren 6 und nach 20 Jahren 7 Monate.",
    "In einer vereinbarten Probezeit von höchstens sechs Monaten gilt eine Frist von zwei Wochen ohne festen Termin.",
    "Die Frist beginnt am Tag nach dem Zugang der Kündigung. Entscheidend ist, wann sie Ihnen tatsächlich zugeht, nicht das Datum auf dem Schreiben.",
  ],
  ejemplo: ["Wer seit zehn Jahren im Betrieb ist und am 14. Oktober 2026 die Kündigung erhält, ist bis zum 28. Februar 2027 beschäftigt."],
  faq: [
    {
      pregunta: "Gilt die längere Frist auch, wenn ich selbst kündige?",
      respuesta: "Nein. Die verlängerten Fristen gelten nach dem Gesetz nur für Kündigungen durch den Arbeitgeber. Ihr Vertrag oder ein Tarifvertrag kann aber längere Fristen auch für Sie vorsehen.",
    },
    {
      pregunta: "Muss die Kündigung schriftlich sein?",
      respuesta: "Ja. Eine Kündigung per E-Mail, SMS oder mündlich ist unwirksam. Sie braucht die eigenhändige Unterschrift auf Papier.",
    },
    {
      pregunta: "Was gilt bei einem Tarifvertrag?",
      respuesta: "Tarifverträge dürfen eigene Fristen festlegen, auch kürzere. Schauen Sie in Ihren Tarifvertrag, wenn einer gilt.",
    },
  ],
  glosario: [
    { termino: "Zugang", definicion: "Der Moment, in dem die Kündigung in Ihren Machtbereich gelangt, zum Beispiel in den Briefkasten." },
    { termino: "Betriebszugehörigkeit", definicion: "Wie lange das Arbeitsverhältnis im Betrieb oder Unternehmen schon besteht." },
  ],
});
