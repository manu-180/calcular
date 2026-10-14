import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.regime-forfettario",
  h1: "Calcolo tasse regime forfettario",
  title: "Calcolo regime forfettario 2026: tasse e netto",
  description:
    "Calcola l'imposta del regime forfettario con il coefficiente di redditività del tuo codice ATECO, l'aliquota del {{it.forfettario-aliquote[ordinaria]}} o del {{it.forfettario-aliquote[avvio]}} e i contributi versati.",
  intro: [
    "Il regime forfettario è il regime fiscale agevolato per chi ha la partita IVA con ricavi fino a {{it.forfettario-soglie[accesso]}} l'anno. Non si paga l'IVA e le tasse si calcolano su una parte dei ricavi.",
    "Scegli la tua attività, inserisci quanto hai incassato e i contributi versati: vedi subito quanto paghi e quanto ti resta.",
  ],
  comoSeCalcula: [
    "Il reddito non si calcola togliendo le spese vere: si applica ai ricavi un coefficiente di redditività fisso, diverso per ogni gruppo di codici ATECO.",
    "Dal reddito ottenuto si sottraggono i contributi previdenziali versati nell'anno.",
    "Sul reddito imponibile si paga un'imposta sostitutiva del {{it.forfettario-aliquote[ordinaria]}}, che sostituisce IRPEF, addizionali e IRAP.",
    "Per i primi cinque anni di una nuova attività, se ne hai i requisiti, l'imposta scende al {{it.forfettario-aliquote[avvio]}}.",
  ],
  ejemplo: [
    "Un professionista che incassa 50.000 euro applica il coefficiente del 78%: il reddito è 39.000 euro. Tolti 9.000 euro di contributi, l'imponibile è 30.000 euro e l'imposta al 15% è 4.500 euro.",
  ],
  faq: [
    {
      pregunta: "Qual è il limite di ricavi del forfettario?",
      respuesta:
        "Puoi entrare o restare nel regime se l'anno prima hai incassato fino a {{it.forfettario-soglie[accesso]}}. Se superi {{it.forfettario-soglie[uscita-immediata]}} durante l'anno esci subito; se resti tra le due soglie esci dall'anno successivo.",
    },
    {
      pregunta: "Chi può usare l'aliquota ridotta?",
      respuesta:
        "Chi apre una nuova attività, per l'anno di inizio e i quattro successivi. Non devi aver avuto un'attività d'impresa o professionale nei tre anni prima e la nuova attività non deve essere la continuazione di un lavoro precedente.",
    },
    {
      pregunta: "Quali contributi posso sottrarre?",
      respuesta: "I contributi previdenziali obbligatori versati nell'anno, per esempio alla Gestione separata INPS, alla gestione artigiani e commercianti o alla tua cassa professionale.",
    },
    {
      pregunta: "Nel forfettario si applica la ritenuta d'acconto?",
      respuesta: "No. Le fatture del forfettario non hanno IVA né ritenuta d'acconto.",
    },
  ],
  glosario: [
    { termino: "Coefficiente di redditività", definicion: "La percentuale dei ricavi che la legge considera reddito, diversa per ogni gruppo di attività." },
    { termino: "Codice ATECO", definicion: "Il codice che identifica la tua attività economica, scelto all'apertura della partita IVA." },
    { termino: "Imposta sostitutiva", definicion: "Un'unica imposta che sostituisce IRPEF, addizionali regionali e comunali e IRAP." },
  ],
});
