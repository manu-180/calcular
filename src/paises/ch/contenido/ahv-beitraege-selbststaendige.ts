import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.ahv-beitraege-selbststaendige",
  h1: "AHV-Beiträge für Selbstständige berechnen",
  title: "AHV-Rechner Selbstständige 2026: sinkende Beitragsskala",
  description:
    "AHV/IV/EO-Beiträge für Selbstständigerwerbende 2026: sinkende Beitragsskala bis 60 500 Franken, voller Satz darüber und Mindestbeitrag von {{ch.ahv-mindestbeitrag-selbststaendige}}.",
  intro: [
    "Selbstständigerwerbende zahlen ihre AHV-, IV- und EO-Beiträge allein. Bei tieferen Einkommen gilt ein reduzierter Satz, die sogenannte sinkende Beitragsskala.",
    "Wer sehr wenig verdient, zahlt den Mindestbeitrag von {{ch.ahv-mindestbeitrag-selbststaendige}} im Jahr.",
  ],
  comoSeCalcula: [
    "Der Rechner sucht die Stufe der Beitragsskala, in die Ihr Jahreseinkommen fällt, und wendet ihren Satz auf das ganze Einkommen an.",
    "Ab 60 500 Franken gilt der volle Satz von 10 %: AHV 8.1 %, IV 1.4 % und EO 0.5 %.",
    "Liegt das Einkommen unter der untersten Stufe, ist der Mindestbeitrag geschuldet.",
  ],
  ejemplo: ["Bei 50 000 Franken Erwerbseinkommen beträgt der Satz 7.84 %. Der Jahresbeitrag liegt bei 3920 Franken, rund 327 Franken im Monat."],
  faq: [
    {
      pregunta: "Welches Einkommen zählt?",
      respuesta: "Die definitiven Beiträge setzt die Ausgleichskasse auf Basis der Steuerveranlagung fest. Zum Nettoeinkommen rechnet sie die persönlichen AHV/IV/EO-Beiträge wieder hinzu und zieht einen Zins auf dem im Betrieb investierten Eigenkapital ab.",
    },
    {
      pregunta: "Kommen noch Kosten dazu?",
      respuesta: "Ja. Die Ausgleichskassen erheben Verwaltungskostenbeiträge von höchstens 5 % der Beiträge.",
    },
    {
      pregunta: "Muss ich auch in die Arbeitslosenversicherung einzahlen?",
      respuesta: "Nein. Beitragspflichtig für die ALV sind Arbeitnehmende und Arbeitgeber, nicht das Einkommen aus selbstständiger Tätigkeit.",
    },
  ],
});
