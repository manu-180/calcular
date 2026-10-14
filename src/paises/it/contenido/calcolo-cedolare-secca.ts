import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.cedolare-secca",
  h1: "Calcolo cedolare secca",
  title: "Calcolo cedolare secca: conviene rispetto all'IRPEF?",
  description:
    "Calcola la cedolare secca sul tuo affitto ({{it.cedolare-secca[libero]}} canone libero, {{it.cedolare-secca[concordato]}} concordato) e confrontala con l'IRPEF che pagheresti con la tassazione ordinaria.",
  intro: [
    "Se affitti una casa puoi scegliere come tassare il canone: con l'IRPEF, insieme agli altri redditi, oppure con la cedolare secca, un'imposta fissa sul canone.",
    "Inserisci il canone e i tuoi altri redditi: vedi quanto paghi con la cedolare e quanto pagheresti di IRPEF in più.",
  ],
  comoSeCalcula: [
    "La cedolare secca è il {{it.cedolare-secca[libero]}} del canone annuo con il contratto libero, il {{it.cedolare-secca[concordato]}} con il canone concordato nei comuni previsti dalla legge.",
    "Con la tassazione ordinaria il canone si riduce del {{it.riduzione-canone}} e si somma agli altri redditi. Con il canone concordato c'è un'ulteriore riduzione del {{it.riduzione-concordato}}.",
    "L'IRPEF in più è la differenza tra l'imposta su tutti i redditi e quella sugli altri redditi da soli, con gli scaglioni in vigore.",
    "Il risparmio è l'IRPEF in più meno la cedolare. Non comprende addizionali, imposta di registro e bollo, che con la cedolare non paghi.",
  ],
  ejemplo: [
    "Con un canone libero di 9.600 euro l'anno e 30.000 euro di altri redditi, la cedolare costa 2.016 euro. Con l'IRPEF pagheresti 3.009,60 euro in più: la cedolare fa risparmiare 993,60 euro, più le addizionali.",
  ],
  faq: [
    {
      pregunta: "Quando conviene la cedolare secca?",
      respuesta: "Quasi sempre, e di più se il tuo reddito arriva al secondo scaglione IRPEF. Fai il conto se hai un reddito molto basso: le detrazioni possono già azzerare la tua IRPEF e allora la cedolare non fa risparmiare.",
    },
    {
      pregunta: "Quali tasse sostituisce la cedolare?",
      respuesta: "L'IRPEF e le addizionali sul canone, e l'imposta di registro e di bollo sul contratto, sulle proroghe e sulla risoluzione.",
    },
    {
      pregunta: "Quando si applica l'aliquota ridotta?",
      respuesta: "L'aliquota del {{it.cedolare-secca[concordato]}} vale per i contratti a canone concordato per abitazioni nei comuni ad alta tensione abitativa e negli altri comuni indicati dalla legge.",
    },
    {
      pregunta: "Vale anche per i negozi?",
      respuesta: "No. La cedolare secca riguarda le abitazioni affittate a uso abitativo e le loro pertinenze.",
    },
  ],
  glosario: [
    { termino: "Cedolare secca", definicion: "Imposta fissa sul canone d'affitto che sostituisce IRPEF, addizionali, registro e bollo." },
    { termino: "Canone concordato", definicion: "Affitto con importo fissato secondo gli accordi locali tra associazioni di proprietari e inquilini." },
  ],
});
