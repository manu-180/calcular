import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "li.brutto-netto-rechner",
  h1: "Brutto-Netto-Rechner Liechtenstein",
  title: "Brutto-Netto-Rechner Liechtenstein {{anio}}: Lohn netto",
  description: "Lohnrechner für Liechtenstein: vom Bruttolohn zum Nettolohn mit AHV/IV/FAK, ALV, Pensionskasse und NBU nach den Beitragssätzen {{anio}}.",
  intro: [
    "In Liechtenstein gehen vom Bruttolohn die Beiträge an AHV, IV und FAK, die Arbeitslosenversicherung, die Pensionskasse und die Nichtberufsunfallversicherung ab.",
    "Der Rechner verwendet die Beitragssätze 2026 der Liechtensteinischen AHV-IV-FAK und den gesetzlichen Mindestbeitrag an die betriebliche Personalvorsorge.",
  ],
  comoSeCalcula: [
    "AHV/IV/FAK: {{li.beitraege-arbeitnehmer[ahv]}} AHV, {{li.beitraege-arbeitnehmer[iv]}} IV und {{li.beitraege-arbeitnehmer[fak]}} FAK, zusammen 4,9 % des Lohns.",
    "ALV: die Hälfte von {{li.alv-satz}}, bis zu einem Jahreslohn von {{li.alv-hoechstlohn}}.",
    "Pensionskasse: geschätzt die Hälfte des Mindestbeitrags von {{li.bpv-altersbeitrag}} für das Alter, ohne Risikoprämie. Steht der Abzug auf Ihrer Lohnabrechnung, tragen Sie ihn ein.",
    "Die Steuer ist nicht abgezogen. Den Steuerabzug vom Lohn legt die Steuerverwaltung fest.",
  ],
  ejemplo: [
    "Bei 6500 Franken brutto mit 12 Löhnen gehen 318.50 Franken AHV/IV/FAK, 32.50 Franken ALV und rund 260 Franken Pensionskasse ab. Es bleiben 5889 Franken vor Steuern.",
  ],
  faq: [
    { pregunta: "Wie viel AHV zahlt man in Liechtenstein?", respuesta: "Arbeitnehmende zahlen 2026 zusammen 4,9 % für AHV, IV und FAK. Der Arbeitgeber zahlt 7,385 %, einschliesslich der Verwaltungskosten." },
    { pregunta: "Bis zu welchem Lohn zahlt man ALV?", respuesta: "Bis 126 000 Franken Jahreslohn. Auf Lohnteilen darüber werden keine ALV-Beiträge erhoben." },
    { pregunta: "Ab wann muss ich in die Pensionskasse?", respuesta: "Wenn der Jahreslohn mindestens die minimale jährliche AHV-Altersrente erreicht. Für das Alter ab dem 1. Januar nach dem vollendeten 19. Altersjahr, für Tod und Invalidität schon ab dem 17. Altersjahr." },
  ],
  glosario: [
    { termino: "FAK", definicion: "Familienausgleichskasse, die die Familienzulagen auszahlt." },
    { termino: "NBU", definicion: "Nichtberufsunfallversicherung, deren Prämie vom Lohn abgezogen wird." },
  ],
});
