import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.13-monatslohn-rechner",
  h1: "13. Monatslohn berechnen",
  title: "13. Monatslohn Rechner: anteilig bei Ein- und Austritt",
  description:
    "Wie viel 13. Monatslohn steht Ihnen zu? Anteil für ein ganzes Jahr oder bei Ein- und Austritt während des Jahres, pro Monat und als Jahresbetrag.",
  intro: [
    "Ist ein 13. Monatslohn vereinbart, entspricht er für ein ganzes Jahr einem zusätzlichen Monatslohn.",
    "Der Rechner zeigt den Anteil, wenn Sie nicht das ganze Jahr angestellt waren. Massgebend ist, was Ihr Vertrag für Ein- und Austritte vorsieht.",
  ],
  comoSeCalcula: [
    "13. Monatslohn = Monatslohn × gearbeitete Monate / 12.",
    "Pro gearbeiteten Monat entsteht ein Zwölftel eines Monatslohns.",
    "Auf den 13. Monatslohn gehen dieselben Sozialabzüge ab wie auf den normalen Lohn.",
  ],
  ejemplo: ["Wer Mitte Mai mit 6500 Franken Monatslohn beginnt, arbeitet bis Ende Jahr 7.5 Monate. Der 13. Monatslohn beträgt dann 4062.50 Franken."],
  faq: [
    {
      pregunta: "Habe ich Anspruch auf einen 13. Monatslohn?",
      respuesta: "Nur wenn er vereinbart ist, im Arbeitsvertrag, in einem Gesamtarbeitsvertrag oder in einem Normalarbeitsvertrag. Das Gesetz schreibt ihn nicht vor.",
    },
    {
      pregunta: "Was ist der Unterschied zur Gratifikation?",
      respuesta: "Eine Gratifikation ist eine Sondervergütung zu einem bestimmten Anlass. Bei einem Austritt vor diesem Anlass besteht ein Anspruch auf einen Anteil nur, wenn das verabredet ist.",
    },
    {
      pregunta: "Muss ich auf den 13. Monatslohn AHV zahlen?",
      respuesta: "Ja. Er gehört zum AHV-pflichtigen Lohn. Dafür gibt es den Brutto-Netto-Rechner.",
    },
  ],
  glosario: [
    { termino: "Gratifikation", definicion: "Sondervergütung zu einem bestimmten Anlass, etwa Weihnachten. Sie ist nur geschuldet, wenn sie verabredet ist." },
  ],
});
