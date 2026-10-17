import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.saron-hypothek-rechner",
  h1: "Calcolo di un'ipoteca SARON con il SARON attuale",
  title: "Ipoteca SARON: costo degli interessi con il SARON attuale",
  description: "Costo di un'ipoteca SARON: SARON attuale pubblicato dalla BNS più il tuo margine, al mese, al trimestre e all'anno. Con il tasso guida della BNS.",
  intro: [
    "In un'ipoteca SARON il tasso è composto dal SARON e da un margine fisso della banca. Il SARON è un tasso overnight garantito in franchi.",
    "Il calcolatore usa l'ultimo SARON pubblicato nel portale dei dati della BNS e mostra quanto costa la tua ipoteca con questo tasso.",
  ],
  comoSeCalcula: [
    "Tasso = SARON + margine. Se il SARON è negativo, calcoli secondo il tuo contratto con 0 % o con il valore pubblicato.",
    "Interesse annuo = importo dell'ipoteca × tasso. Al mese un dodicesimo, al trimestre un quarto.",
  ],
  ejemplo: [
    "Un'ipoteca di 600’000 franchi con un margine dello 0.8 % costa circa 400 franchi al mese con un SARON vicino a zero.",
  ],
  faq: [
    { pregunta: "Che cos'è il SARON?", respuesta: "Lo Swiss Average Rate Overnight, un tasso di riferimento per il denaro overnight in franchi. È fissato ogni giorno." },
    { pregunta: "Che legame c'è tra SARON e tasso guida?", respuesta: "La Banca nazionale vuole mantenere i tassi a breve termine garantiti del mercato monetario in franchi vicini al tasso guida della BNS. Il calcolatore mostra i due valori uno accanto all'altro, così vedi la differenza." },
    { pregunta: "Il mio tasso vale per tutta la durata?", respuesta: "No. Solo il margine è fisso. La parte SARON cambia con ogni nuovo valore." },
  ],
  glosario: [
    { termino: "Margine", definicion: "Supplemento fisso della banca sul SARON, pattuito nel contratto ipotecario." },
    { termino: "Tasso guida", definicion: "Tasso con cui la Banca nazionale svizzera attua la sua politica monetaria." },
  ],
});
