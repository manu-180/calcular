import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.bundessteuer-rechner",
  h1: "Bundessteuer-Rechner: direkte Bundessteuer 2026",
  title: "Bundessteuer-Rechner 2026: direkte Bundessteuer berechnen",
  description:
    "Direkte Bundessteuer 2026 für Alleinstehende, Verheiratete und Familien berechnen: Tarif nach Art. 36 DBG, Abzug {{ch.dbst-kinderermaessigung}} je Kind, Grenzsteuersatz.",
  intro: [
    "Die direkte Bundessteuer ist der Teil der Einkommenssteuer, der an den Bund geht. Kanton und Gemeinde erheben ihre eigenen Steuern dazu, die hier nicht enthalten sind.",
    "Der Tarif ist im ganzen Land gleich. Für 2026 hat das Eidgenössische Finanzdepartement die Tarifstufen an die Teuerung angepasst.",
  ],
  comoSeCalcula: [
    "Grundlage ist das steuerbare Einkommen nach allen Abzügen. Gerechnet wird mit vollen 100 Franken.",
    "Alleinstehende ohne Kinder zahlen nach dem Tarif in Art. 36 Abs. 1 DBG. Verheiratete und alle, die mit Kindern im gleichen Haushalt leben und für deren Unterhalt hauptsächlich aufkommen, zahlen nach dem tieferen Tarif in Abs. 2.",
    "Mit Kindern sinkt die Steuer um {{ch.dbst-kinderermaessigung}} je Kind. Beträge unter {{ch.dbst-mindestbetrag}} werden nicht erhoben.",
    "Ab einem hohen Einkommen gilt ein fester Satz von 11.5 % auf dem ganzen Einkommen.",
  ],
  ejemplo: [
    "Eine alleinstehende Person mit 80 000 Franken steuerbarem Einkommen zahlt rund 1378 Franken direkte Bundessteuer. Das sind etwa 1.7 % des Einkommens. Je weitere 100 Franken kosten 5.94 Franken mehr.",
  ],
  faq: [
    {
      pregunta: "Was ist das steuerbare Einkommen?",
      respuesta: "Das Einkommen nach allen Abzügen, etwa Berufskosten, Beiträgen an die Säule 3a und Versicherungsprämien. Sie finden es in Ihrer Veranlagung der direkten Bundessteuer. Es kann vom steuerbaren Einkommen des Kantons abweichen.",
    },
    {
      pregunta: "Warum zahle ich mit Kind nach dem Tarif für Verheiratete?",
      respuesta: "Das Gesetz wendet den Tarif für Verheiratete auch auf Ledige, Geschiedene und Verwitwete an, die mit Kindern im gleichen Haushalt leben und deren Unterhalt zur Hauptsache bestreiten. Zusätzlich sinkt die Steuer um {{ch.dbst-kinderermaessigung}} je Kind.",
    },
    {
      pregunta: "Was ist der Grenzsteuersatz?",
      respuesta: "Der Anteil, den Sie von zusätzlichen 100 Franken Einkommen an Bundessteuer zahlen. Er zeigt, wie viel ein Abzug, zum Beispiel eine Einzahlung in die Säule 3a, bei der Bundessteuer spart.",
    },
    {
      pregunta: "Wie hoch ist die Bundessteuer höchstens?",
      respuesta: "11.5 % des steuerbaren Einkommens. Dieser Satz gilt ab 794 000 Franken für Alleinstehende und ab 941 400 Franken für Verheiratete auf dem ganzen Einkommen.",
    },
  ],
  glosario: [
    { termino: "DBG", definicion: "Bundesgesetz über die direkte Bundessteuer." },
    { termino: "Kalte Progression", definicion: "Mehrbelastung, wenn Löhne nur wegen der Teuerung steigen. Der Bund gleicht sie aus, indem er die Tarifstufen anpasst." },
  ],
});
