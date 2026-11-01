import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.irpef",
  h1: "Calcolo IRPEF {{anio}}",
  title: "Calcolo IRPEF {{anio}}: scaglioni, detrazioni e imposta netta",
  description:
    "Calcola l'IRPEF lorda e netta con gli scaglioni {{anio}}, le detrazioni per lavoro dipendente o pensione e l'ulteriore detrazione del taglio del cuneo.",
  intro: [
    "Inserisci il tuo reddito complessivo e scopri quanta IRPEF paghi davvero: l'imposta lorda, le detrazioni e quello che resta da versare.",
    "Vedi anche l'aliquota media (quanto pesa l'IRPEF sul totale) e l'aliquota marginale (quanto paghi sull'ultimo euro guadagnato).",
  ],
  comoSeCalcula: [
    "Il reddito si divide in tre scaglioni e ogni parte paga la sua aliquota. Solo la parte che supera una soglia paga l'aliquota più alta.",
    "Dall'imposta lorda si tolgono le detrazioni. Per chi lavora come dipendente la detrazione vale fino a {{it.detrazione-lavoro[importo1]}} e si azzera a {{it.detrazione-lavoro[soglia3]}} di reddito.",
    "Per chi ha una pensione la detrazione arriva a {{it.detrazione-pensione[importo1]}} e si riduce allo stesso modo.",
    "I dipendenti con un reddito tra {{it.cuneo-fiscale[soglia-somma]}} e {{it.cuneo-fiscale[soglia-massima]}} hanno anche un'ulteriore detrazione fino a {{it.cuneo-fiscale[detrazione]}}.",
    "Se le detrazioni superano l'imposta lorda, l'IRPEF netta è zero.",
  ],
  ejemplo: [
    "Un dipendente con 30.000 euro di reddito nel 2026 ha un'IRPEF lorda di 7.100 euro. Le detrazioni valgono 2.801,36 euro, quindi l'IRPEF netta è 4.298,64 euro: circa il 14,3% del reddito.",
  ],
  faq: [
    {
      pregunta: "Quali sono gli scaglioni IRPEF 2026?",
      respuesta: "23% fino a 28.000 euro, 33% da 28.000 a 50.000 euro e 43% oltre i 50.000 euro. Il secondo scaglione è sceso dal 35% al 33% con la legge di bilancio 2026.",
    },
    {
      pregunta: "Che differenza c'è tra aliquota media e marginale?",
      respuesta: "La marginale è l'aliquota dello scaglione più alto che raggiungi. La media è l'IRPEF netta divisa per il reddito: è sempre più bassa, perché i primi euro pagano meno.",
    },
    {
      pregunta: "Le addizionali regionale e comunale sono comprese?",
      respuesta: "No. Si calcolano a parte con le aliquote della tua regione e del tuo comune. Le trovi nel calcolo dello stipendio netto.",
    },
    {
      pregunta: "Posso usarla per il 730 sui redditi 2025?",
      respuesta: "Usa i valori in vigore oggi, quindi quelli del 2026. Per i redditi 2025 il secondo scaglione era al 35%: l'imposta risulta un po' più alta.",
    },
  ],
  glosario: [
    { termino: "Imposta lorda", definicion: "L'IRPEF calcolata con gli scaglioni, prima di togliere le detrazioni." },
    { termino: "Detrazione", definicion: "Sconto che si sottrae direttamente dall'imposta, non dal reddito." },
    { termino: "No tax area", definicion: "Fascia di reddito in cui le detrazioni annullano tutta l'imposta." },
  ],
});
