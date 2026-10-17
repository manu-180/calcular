import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.verzugszinsrechner",
  h1: "Calcolo degli interessi di mora in Svizzera: {{ch.verzugszins}} secondo il CO",
  title: "Interessi di mora Svizzera: {{ch.verzugszins}} secondo l'art. 104 CO",
  description: "Calcola gli interessi di mora di una fattura non pagata: {{ch.verzugszins}} all'anno secondo l'art. 104 CO o un interesse contrattuale più alto, al giorno.",
  intro: [
    "Il debitore che non paga in tempo un debito pecuniario deve gli interessi dalla mora. Il Codice delle obbligazioni fissa l'interesse di mora al {{ch.verzugszins}} all'anno, anche se è stato pattuito un interesse contrattuale più basso.",
    "Se è stato pattuito un interesse più alto, può essere chiesto anche durante la mora.",
  ],
  comoSeCalcula: [
    "Interessi di mora = importo × tasso × giorni di mora / giorni d'interesse all'anno.",
    "Il calcolo conta i giorni civili dall'inizio della mora fino alla data scelta.",
    "Scegli se l'anno conta 365 o 360 giorni d'interesse. Con 360 giorni l'interesse è un po' più alto.",
  ],
  ejemplo: [
    "Per 5000 franchi in mora da 213 giorni, gli interessi di mora ammontano a circa 146 franchi.",
  ],
  faq: [
    { pregunta: "Quanto sono gli interessi di mora in Svizzera?", respuesta: "Il {{ch.verzugszins}} all'anno, se non è stato pattuito nulla di più alto. Tra commercianti può valere un tasso più alto quando lo sconto bancario usuale nel luogo del pagamento supera questo valore." },
    { pregunta: "Da quando decorrono gli interessi di mora?", respuesta: "Dalla mora. Se il debito è scaduto, il debitore è messo in mora con l'interpellazione del creditore. Se è stato pattuito un giorno di scadenza, è in mora già allo spirare di quel giorno." },
    { pregunta: "Si possono chiedere interessi sugli interessi di mora?", respuesta: "No. Non si possono calcolare interessi di mora sugli interessi di mora. Il calcolatore applica gli interessi solo all'importo originale." },
  ],
  glosario: [
    { termino: "Mora", definicion: "Il debitore non paga un debito scaduto nonostante l'interpellazione o dopo il giorno di scadenza pattuito." },
    { termino: "Giorno di scadenza", definicion: "Giorno pattuito entro il quale un pagamento deve essere effettuato." },
  ],
});
