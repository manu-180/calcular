import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.interessi-legali",
  h1: "Calcolo interessi legali",
  title: "Calcolo interessi legali {{anio}}: saggio e importo",
  description:
    "Calcola gli interessi legali su una somma tra due date, anno per anno, con il saggio fissato ogni anno dal Ministero dell'Economia. Oggi è pari a {{it.interesse-legale}}.",
  intro: [
    "Gli interessi legali si applicano quando una somma va pagata con gli interessi e il contratto non dice quanto: per esempio un debito pagato in ritardo, un risarcimento o una restituzione.",
    "Il saggio cambia ogni anno con un decreto del Ministero dell'Economia. Oggi è pari a {{it.interesse-legale}}, in vigore dal {{it.interesse-legale#desde}}.",
  ],
  comoSeCalcula: [
    "Il periodo si divide per anni solari, perché ogni anno ha il suo saggio.",
    "Per ogni anno: somma per saggio per giorni, diviso i giorni dell'anno (365, o 366 negli anni bisestili).",
    "Gli interessi sono semplici: non si sommano alla somma dovuta per calcolare quelli successivi.",
    "Il calcolo parte dal 2023, il primo anno con il saggio verificato in Gazzetta Ufficiale in questa calcolatrice.",
  ],
  ejemplo: [
    "Su 10.000 euro dal 1° gennaio 2025 al 1° gennaio 2026 maturano 199,45 euro di interessi per il 2025 (al 2%) e 0,44 euro per l'unico giorno del 2026: in tutto 199,89 euro.",
  ],
  faq: [
    {
      pregunta: "Qual è il tasso di interesse legale nel 2026?",
      respuesta: "È pari a {{it.interesse-legale}} l'anno, dal 1° gennaio 2026. L'ha fissato il decreto del Ministero dell'Economia del 10 dicembre 2025.",
    },
    {
      pregunta: "Quando cambia il saggio degli interessi legali?",
      respuesta: "Ogni anno: il decreto va pubblicato in Gazzetta Ufficiale entro il 15 dicembre e vale dal 1° gennaio successivo. Se non esce, resta quello dell'anno prima.",
    },
    {
      pregunta: "Gli interessi legali servono anche per il ravvedimento operoso?",
      respuesta: "Sì, nel ravvedimento si pagano gli interessi al saggio legale per i giorni di ritardo, oltre alla sanzione ridotta.",
    },
    {
      pregunta: "Interessi legali e interessi di mora sono la stessa cosa?",
      respuesta: "No. Nei ritardi di pagamento tra imprese si applicano gli interessi di mora, molto più alti. Questa calcolatrice usa solo il saggio legale.",
    },
  ],
  glosario: [
    { termino: "Saggio legale", definicion: "Il tasso di interesse fissato dalla legge quando le parti non ne hanno previsto uno." },
    { termino: "Interesse semplice", definicion: "Interesse calcolato sempre sulla somma iniziale, senza capitalizzazione." },
  ],
});
