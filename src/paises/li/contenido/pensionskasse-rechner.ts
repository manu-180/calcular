import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "li.pensionskasse-rechner",
  h1: "Pensionskasse Liechtenstein: Mindestbeitrag nach BPVG",
  title: "Pensionskasse Liechtenstein: Mindestbeitrag BPVG",
  description: "Betriebliche Personalvorsorge in Liechtenstein: Eintrittsschwelle, Mindestbeitrag von {{li.bpv-altersbeitrag}} für das Alter und Anteile von Arbeitgeber und Arbeitnehmer.",
  intro: [
    "Jeder Arbeitgeber in Liechtenstein muss seine Angestellten bei einer Pensionskasse versichern, wenn ihr Jahreslohn die minimale jährliche AHV-Altersrente erreicht.",
    "Der Beitrag für das Alter beträgt mindestens {{li.bpv-altersbeitrag}} des versicherten Lohns. Der Arbeitgeber trägt mindestens die Hälfte.",
  ],
  comoSeCalcula: [
    "Eintrittsschwelle: 12 x minimale monatliche AHV-Altersrente von {{li.ahv-mindestrente}}.",
    "Versicherter Lohn: der ganze AHV-pflichtige Jahreslohn. Das Reglement darf ihn begrenzen, aber nicht unter das Dreifache der maximalen jährlichen AHV-Altersrente.",
    "Mindestbeitrag: {{li.bpv-altersbeitrag}} des versicherten Lohns, je zur Hälfte.",
  ],
  ejemplo: [
    "Bei 78 000 Franken Jahreslohn beträgt der Mindestbeitrag für das Alter 6240 Franken im Jahr, davon höchstens 3120 Franken vom Arbeitnehmer.",
  ],
  faq: [
    { pregunta: "Gibt es einen Koordinationsabzug wie in der Schweiz?", respuesta: "Nein. Versichert ist grundsätzlich der ganze AHV-pflichtige Jahreslohn." },
    { pregunta: "Ab welchem Alter spart man für das Alter?", respuesta: "Ab dem 1. Januar nach dem vollendeten 19. Altersjahr, wenn das Arbeitsverhältnis unbefristet ist oder länger als drei Monate dauert." },
    { pregunta: "Sind Tod und Invalidität mitversichert?", respuesta: "Ja, ab dem 1. Januar nach dem vollendeten 17. Altersjahr. Die Prämie dafür kommt zum Altersbeitrag dazu und ist hier nicht gerechnet." },
  ],
  glosario: [
    { termino: "BPVG", definicion: "Gesetz über die betriebliche Personalvorsorge, die zweite Säule in Liechtenstein." },
  ],
});
