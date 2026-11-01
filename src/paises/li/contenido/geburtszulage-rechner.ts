import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "li.geburtszulage-rechner",
  h1: "Geburtszulage Liechtenstein",
  title: "Geburtszulage Liechtenstein {{anio}}: Betrag pro Kind",
  description: "Geburtszulage der FAK in Liechtenstein: {{li.geburtszulage}} pro Kind, {{li.geburtszulage-mehrlinge}} pro Kind bei Mehrlingsgeburten. Auch für Adoptivkinder.",
  intro: [
    "Die Geburtszulage ist eine einmalige Leistung der FAK. Sie beträgt {{li.geburtszulage}} für jedes Kind.",
    "Bei Zwillingen oder anderen Mehrlingsgeburten beträgt sie {{li.geburtszulage-mehrlinge}} pro Kind.",
  ],
  comoSeCalcula: [
    "Einzelgeburt: {{li.geburtszulage}}.",
    "Mehrlingsgeburt: {{li.geburtszulage-mehrlinge}} x Anzahl Kinder.",
  ],
  ejemplo: [
    "Für Zwillinge beträgt die Geburtszulage 2 x 3070 = 6140 Franken.",
  ],
  faq: [
    { pregunta: "Wer hat Anspruch?", respuesta: "Wer bei der Geburt die allgemeinen Voraussetzungen für Familienzulagen erfüllt." },
    { pregunta: "Gilt sie auch bei Adoption?", respuesta: "Ja, für ein nicht mehr als fünfjähriges Kind, das zur Adoption aufgenommen wird." },
    { pregunta: "Gilt sie bei einer Totgeburt?", respuesta: "Ja, für ein Kind, das nach dem sechsten Monat der Schwangerschaft tot geboren wird." },
  ],
  glosario: [
    { termino: "Mehrlingsgeburt", definicion: "Geburt von zwei oder mehr Kindern, etwa Zwillingen." },
  ],
});
