import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.bvg-rechner",
  h1: "BVG-Rechner: Altersguthaben und Pensionskassenrente",
  title: "BVG-Rechner: Altersguthaben und Rente mit 65 berechnen",
  description:
    "Wie viel Pensionskasse haben Sie mit 65? Altersgutschriften nach BVG, Zins {{ch.bvg-mindestzins}} und Umwandlungssatz {{ch.bvg-umwandlungssatz}}: Kapital und Rente.",
  intro: [
    "In der Pensionskasse sparen Sie jedes Jahr eine Altersgutschrift auf dem koordinierten Lohn an. Mit Zins wächst daraus das Altersguthaben, das bei der Pensionierung in eine Rente umgewandelt wird.",
    "Der Rechner zeigt das gesetzliche Minimum nach BVG. Steht auf Ihrem Vorsorgeausweis ein höheres Guthaben, versichert Ihre Kasse mehr als das Gesetz.",
  ],
  comoSeCalcula: [
    "Koordinierter Lohn: Jahreslohn bis {{ch.bvg-obere-grenze}} minus {{ch.bvg-koordinationsabzug}}, mindestens {{ch.bvg-min-koordinierter-lohn}}. Versichert ist nur, wer mehr als {{ch.bvg-eintrittsschwelle}} verdient.",
    "Altersgutschrift: 7 % vom 25. bis 34. Altersjahr, 10 % von 35 bis 44, 15 % von 45 bis 54 und 18 % von 55 bis 65.",
    "Jedes Jahr kommt der Zins auf dem bisherigen Guthaben dazu, dann die neue Gutschrift. Ohne Ihre Angabe gilt der Mindestzinssatz von {{ch.bvg-mindestzins}}.",
    "Rente: Altersguthaben mal Umwandlungssatz von {{ch.bvg-umwandlungssatz}} im Referenzalter 65.",
  ],
  ejemplo: [
    "Wer ab 45 bis 65 mit 80 000 Franken Jahreslohn versichert ist, kommt nach dem Gesetz auf rund 198 200 Franken Altersguthaben. Das ergibt rund 1123 Franken Rente im Monat.",
  ],
  faq: [
    {
      pregunta: "Was ist der Umwandlungssatz?",
      respuesta: "Der Prozentsatz, mit dem das Altersguthaben in eine jährliche Rente umgerechnet wird. Für den obligatorischen Teil beträgt er im Referenzalter 65 mindestens {{ch.bvg-umwandlungssatz}}.",
    },
    {
      pregunta: "Wer zahlt die Altersgutschriften?",
      respuesta: "Arbeitgeber und Arbeitnehmende gemeinsam. Der Arbeitgeber muss mindestens gleich viel bezahlen wie alle Arbeitnehmenden zusammen.",
    },
    {
      pregunta: "Warum weicht mein Vorsorgeausweis ab?",
      respuesta: "Ihre Kasse kann mehr versichern, als das Gesetz verlangt, oder eigene Sätze anwenden. Dieser Rechner zeigt nur das, was das BVG mindestens vorschreibt.",
    },
  ],
  glosario: [
    { termino: "Altersguthaben", definicion: "Das in der Pensionskasse angesparte Kapital aus Altersgutschriften und Zinsen." },
    { termino: "Vorsorgeausweis", definicion: "Jährliche Übersicht der Pensionskasse mit Guthaben, versichertem Lohn und voraussichtlicher Rente." },
  ],
});
