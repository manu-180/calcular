import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "li.lohnkosten-rechner",
  h1: "Lohnkosten in Liechtenstein berechnen",
  title: "Lohnkosten Liechtenstein 2026: Arbeitgeberbeiträge",
  description: "Was kostet ein Lohn den Arbeitgeber in Liechtenstein? AHV/IV/FAK mit Verwaltungskosten, ALV, Pensionskasse und Berufsunfallversicherung nach den Sätzen 2026.",
  intro: [
    "Zum Bruttolohn kommen die Arbeitgeberbeiträge an AHV, IV und FAK, die Verwaltungskosten, die Arbeitslosenversicherung, die Pensionskasse und die Berufsunfallversicherung.",
    "Der Rechner zeigt die Kosten pro Monat und pro Jahr.",
  ],
  comoSeCalcula: [
    "AHV {{li.beitraege-arbeitgeber[ahv]}}, IV {{li.beitraege-arbeitgeber[iv]}}, FAK {{li.beitraege-arbeitgeber[fak]}} und Verwaltungskosten {{li.beitraege-arbeitgeber[vk]}} des Lohns.",
    "ALV: die Hälfte von {{li.alv-satz}} bis {{li.alv-hoechstlohn}} Jahreslohn.",
    "Pensionskasse: der Arbeitgeber trägt mindestens die Hälfte der Beiträge, hier die Hälfte des Mindestbeitrags von {{li.bpv-altersbeitrag}}.",
  ],
  ejemplo: [
    "Ein Lohn von 6000 Franken kostet den Arbeitgeber 6713.10 Franken im Monat: 443.10 Franken AHV/IV/FAK, 30 Franken ALV und 240 Franken Pensionskasse.",
  ],
  faq: [
    { pregunta: "Wer zahlt die FAK-Beiträge?", respuesta: "Vor allem der Arbeitgeber mit 1,9 %. Arbeitnehmende zahlen 0,2 %." },
    { pregunta: "Was sind die Verwaltungskosten?", respuesta: "Ein Beitrag von 0,585 % des Lohns, den nur der Arbeitgeber an die AHV-IV-FAK zahlt." },
    { pregunta: "Muss der Arbeitgeber die Berufsunfallversicherung zahlen?", respuesta: "Ja. Tragen Sie die Prämie laut Ihrer Police ein." },
  ],
  glosario: [
    { termino: "BU", definicion: "Berufsunfallversicherung, deren Prämie der Arbeitgeber trägt." },
  ],
});
