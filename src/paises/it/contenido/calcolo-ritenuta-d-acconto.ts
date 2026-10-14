import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.ritenuta-acconto",
  h1: "Calcolo ritenuta d'acconto",
  title: "Calcolo ritenuta d'acconto: fattura e netto a pagare",
  description:
    "Calcola ritenuta d'acconto del {{it.ritenuta-acconto}}, rivalsa INPS, IVA e netto a pagare per una fattura da professionista o una prestazione occasionale.",
  intro: [
    "Quando un professionista fattura a un'azienda o a un altro professionista, il cliente trattiene una parte del compenso e la versa al Fisco: è la ritenuta d'acconto.",
    "Inserisci il compenso e scopri come si compone la fattura e quanto ti arriva davvero.",
  ],
  comoSeCalcula: [
    "Se sei iscritto alla Gestione separata puoi aggiungere la rivalsa INPS del {{it.rivalsa-inps}} sul compenso.",
    "Compenso e rivalsa formano l'imponibile, su cui si calcola l'IVA del {{it.aliquote-iva[ordinaria]}}.",
    "La ritenuta d'acconto è il {{it.ritenuta-acconto}} dell'imponibile, senza contare l'IVA.",
    "Il cliente paga il totale della fattura meno la ritenuta, che versa lui al Fisco con l'F24.",
  ],
  ejemplo: [
    "Su un compenso di 1.000 euro con rivalsa, l'imponibile è 1.040 euro e l'IVA 228,80 euro. La fattura è di 1.268,80 euro, la ritenuta di 208 euro: il cliente ti paga 1.060,80 euro.",
  ],
  faq: [
    {
      pregunta: "Quanto è la ritenuta d'acconto?",
      respuesta: "Il {{it.ritenuta-acconto}} del compenso per i lavoratori autonomi e le prestazioni occasionali. La trattiene e la versa il cliente, se è un sostituto d'imposta.",
    },
    {
      pregunta: "La ritenuta d'acconto si perde?",
      respuesta: "No. È un anticipo dell'IRPEF: nella dichiarazione dei redditi la sottrai dall'imposta dovuta e, se hai versato troppo, ti viene rimborsata o la usi in compensazione.",
    },
    {
      pregunta: "La rivalsa INPS è soggetta a ritenuta?",
      respuesta: "In questo calcolo sì: la rivalsa entra nell'imponibile su cui si calcolano IVA e ritenuta, come avviene di solito in fattura.",
    },
    {
      pregunta: "Chi non applica la ritenuta d'acconto?",
      respuesta: "Chi è nel regime forfettario, e chi fattura a privati che non sono sostituti d'imposta, per esempio un cliente persona fisica senza partita IVA.",
    },
  ],
  glosario: [
    { termino: "Ritenuta d'acconto", definicion: "La parte del compenso che il cliente trattiene e versa al Fisco come anticipo dell'IRPEF." },
    { termino: "Rivalsa INPS", definicion: "La maggiorazione che il professionista in Gestione separata può addebitare al cliente." },
    { termino: "Sostituto d'imposta", definicion: "Chi è tenuto a trattenere e versare le imposte per conto di un altro, come un'azienda con i suoi fornitori." },
  ],
});
