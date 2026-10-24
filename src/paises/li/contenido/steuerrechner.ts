import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "li.steuerrechner",
  h1: "Steuerrechner Liechtenstein: Landes- und Gemeindesteuer",
  title: "Steuerrechner Liechtenstein: Erwerbssteuer 2026",
  description: "Erwerbssteuer in Liechtenstein nach dem Steuergesetz: Landessteuer von 1 bis 8 % plus Gemeindezuschlag, für Alleinstehende, Alleinerziehende, Ehepaare.",
  intro: [
    "Der Tarif der Landessteuer steigt in Stufen von 1 bis 8 %. Dazu kommt der Zuschlag Ihrer Wohngemeinde.",
    "Es gibt drei Tarife: für Alleinstehende, für Alleinerziehende und für gemeinsam veranlagte Ehegatten.",
  ],
  comoSeCalcula: [
    "Der steuerpflichtige Erwerb wird auf 10 Franken abgerundet.",
    "Landessteuer = Satz der Stufe x Erwerb, minus Abzug der Stufe, wie im Steuergesetz festgelegt.",
    "Gemeindesteuer = Landessteuer x Gemeindezuschlag, zwischen {{li.gemeindezuschlag[min]}} und {{li.gemeindezuschlag[max]}}.",
  ],
  ejemplo: [
    "Bei 80 000 Franken Erwerb, alleinstehend, beträgt die Landessteuer 2256 Franken. Mit 150 % Gemeindezuschlag kommen 3384 Franken dazu, zusammen 5640 Franken.",
  ],
  faq: [
    { pregunta: "Wie hoch ist der Grundfreibetrag?", respuesta: "15 855 Franken für Alleinstehende, 23 783 Franken für Alleinerziehende und 31 710 Franken für Ehegatten." },
    { pregunta: "Wie hoch ist der Spitzensteuersatz?", respuesta: "Die Landessteuer erreicht 8 %. Mit dem Gemeindezuschlag ergibt das 20 bis 28 %, je nach Gemeinde." },
    { pregunta: "Wird das Vermögen auch besteuert?", respuesta: "Ja, über einen Sollertrag, der zum Erwerb gezählt wird. Tragen Sie dann den Erwerb einschliesslich dieses Betrags ein." },
  ],
  glosario: [
    { termino: "Landessteuer", definicion: "Steuer des Landes auf dem Erwerb, nach Art. 19 des Steuergesetzes." },
  ],
});
