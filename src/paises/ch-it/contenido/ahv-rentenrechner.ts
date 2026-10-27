import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.ahv-rentenrechner",
  h1: "Calcolo della rendita AVS con la scala 44",
  title: "Calcolo rendita AVS {{anio}}: rendita di vecchiaia e 13a",
  description: "Calcola la rendita di vecchiaia AVS: rendita completa secondo la scala 44 tra {{ch.ahv-minimalrente}} e il doppio, plafonamento per le coppie e 13a rendita.",
  intro: [
    "La rendita di vecchiaia AVS dipende dal reddito annuo medio determinante. Con una durata di contribuzione completa ammonta almeno a {{ch.ahv-minimalrente}} e al massimo al doppio al mese.",
    "Dal 2026 chi riceve una rendita di vecchiaia a dicembre ottiene in più una 13a rendita di vecchiaia. Il calcolatore mostra la rendita mensile, la 13a rendita e l'importo annuo.",
  ],
  comoSeCalcula: [
    "Il reddito è arrotondato al valore superiore della tabella delle rendite.",
    "Fino a 36 volte la rendita minima: 74 % della rendita minima più 13/600 del reddito. Oltre: 104 % della rendita minima più 8/600 del reddito. Il risultato è sempre compreso tra la rendita minima e quella massima.",
    "Coppie: le due rendite insieme non possono superare il 150 % della rendita massima. Altrimenti sono ridotte proporzionalmente.",
    "La 13a rendita di vecchiaia corrisponde a un dodicesimo della rendita ricevuta nell'anno ed è versata a dicembre.",
  ],
  ejemplo: [
    "Un reddito determinante di 46’268 franchi è arrotondato a 46’872 franchi e dà una rendita di 1935 franchi al mese. Se anche la moglie riceve una rendita di 1915 franchi, le due rendite sono plafonate a 3780 franchi insieme: 1900 e 1880 franchi.",
  ],
  faq: [
    { pregunta: "A quanto ammonta la rendita AVS nel 2026?", respuesta: "Con una durata di contribuzione completa tra {{ch.ahv-minimalrente}} e il doppio al mese. Dal 1° gennaio 2027 la rendita minima sale a 1280 franchi e quella massima a 2560 franchi." },
    { pregunta: "Che cos'è il reddito annuo medio determinante?", respuesta: "La media dei tuoi redditi da attività lucrativa, rivalutati con un fattore che tiene conto dell'evoluzione dei salari, più eventuali accrediti per compiti educativi e assistenziali. La tua cassa di compensazione può indicartelo in un calcolo anticipato della rendita." },
    { pregunta: "Quando ho diritto a una rendita completa?", respuesta: "Se hai tanti anni di contribuzione quanti la tua classe d'età. Se mancano anni, ricevi una rendita parziale, più bassa dell'importo di questo calcolatore." },
    { pregunta: "A quanto ammonta la 13a rendita AVS?", respuesta: "Un dodicesimo della rendita di vecchiaia ricevuta nell'anno civile, arrotondato al franco. È versata a dicembre insieme alla rendita di dicembre." },
  ],
  glosario: [
    { termino: "Scala 44", definicion: "Tabella delle rendite complete con durata di contribuzione completa." },
    { termino: "Plafonamento", definicion: "Limitazione delle due rendite di vecchiaia di una coppia al 150 % della rendita massima." },
  ],
});
