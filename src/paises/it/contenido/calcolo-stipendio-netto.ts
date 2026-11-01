import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.stipendio-netto",
  h1: "Calcolo stipendio netto dalla RAL",
  title: "Calcolo stipendio netto {{anio}}: dalla RAL al netto in busta",
  description:
    "Dalla RAL allo stipendio netto mensile con gli scaglioni IRPEF {{anio}}, i contributi INPS del {{it.contributi-dipendente}} e il taglio del cuneo fiscale.",
  intro: [
    "Inserisci la tua RAL e scopri quanto ti arriva in busta paga ogni mese. Il calcolo segue le regole del 2026: contributi INPS, IRPEF a scaglioni, detrazioni per lavoro dipendente e taglio del cuneo fiscale.",
    "Se conosci le addizionali della tua regione e del tuo comune, aggiungile: così il risultato si avvicina ancora di più alla busta paga vera.",
  ],
  comoSeCalcula: [
    "Dalla RAL si tolgono i contributi INPS a tuo carico: il {{it.contributi-dipendente}}, più un contributo aggiuntivo pari a {{it.aliquota-aggiuntiva}} sulla parte che supera {{it.fascia-pensionabile}}.",
    "Su quello che resta (il reddito imponibile) si calcola l'IRPEF con i tre scaglioni in vigore.",
    "Dall'IRPEF si sottrae la detrazione per lavoro dipendente, che diminuisce man mano che il reddito sale e si azzera a {{it.detrazione-lavoro[soglia3]}}.",
    "Con un reddito tra {{it.cuneo-fiscale[soglia-somma]}} e {{it.cuneo-fiscale[soglia-massima]}} c'è un'ulteriore detrazione fino a {{it.cuneo-fiscale[detrazione]}}. Sotto {{it.cuneo-fiscale[soglia-somma]}}, invece, ricevi una somma esente calcolata in percentuale sul reddito da lavoro.",
    "Fino a {{it.trattamento-integrativo[soglia]}} di reddito spetta anche il trattamento integrativo di {{it.trattamento-integrativo[importo]}} l'anno, se l'IRPEF supera la detrazione.",
    "Il netto annuo diviso per il numero di mensilità dà lo stipendio netto mensile.",
  ],
  ejemplo: [
    "Con una RAL di 30.000 euro paghi 2.757 euro di contributi e resta un imponibile di 27.243 euro. L'IRPEF lorda è 6.265,89 euro, le detrazioni valgono 3.044,29 euro e l'IRPEF netta scende a 3.221,60 euro. Il netto annuo è 24.021,40 euro: su 13 mensilità sono circa 1.848 euro al mese.",
  ],
  faq: [
    {
      pregunta: "Quanto prendo netto con una RAL di 30.000 euro?",
      respuesta: "Circa 1.848 euro al mese su 13 mensilità, prima delle addizionali regionale e comunale. Con le addizionali il netto scende di qualche decina di euro al mese.",
    },
    {
      pregunta: "Perché il netto di dicembre è più alto?",
      respuesta: "Perché a dicembre arriva la tredicesima. Questo calcolo divide il netto annuo in parti uguali: in busta paga, invece, la tredicesima arriva tutta insieme a dicembre.",
    },
    {
      pregunta: "Cos'è il taglio del cuneo fiscale?",
      respuesta:
        "È uno sconto per chi lavora come dipendente. Fino a {{it.cuneo-fiscale[soglia-somma]}} di reddito ricevi una somma che non paga tasse; più su, fino a {{it.cuneo-fiscale[soglia-massima]}}, hai un'ulteriore detrazione che arriva a {{it.cuneo-fiscale[detrazione]}}.",
    },
    {
      pregunta: "Le detrazioni per figli e coniuge sono incluse?",
      respuesta: "No. Il calcolo considera solo le detrazioni da lavoro e il taglio del cuneo. Per i figli oggi c'è l'assegno unico, che l'INPS paga a parte.",
    },
    {
      pregunta: "Da quando vale il 33% sul secondo scaglione?",
      respuesta: "Dal 1° gennaio 2026. Per i redditi del 2025 l'aliquota era del 35%.",
    },
  ],
  glosario: [
    { termino: "RAL", definicion: "Retribuzione annua lorda: tutto quello che guadagni in un anno prima di contributi e tasse." },
    { termino: "IRPEF", definicion: "Imposta sul reddito delle persone fisiche, calcolata a scaglioni." },
    { termino: "Addizionali", definicion: "Piccole imposte regionali e comunali che si aggiungono all'IRPEF e cambiano a seconda di dove abiti." },
    { termino: "Trattamento integrativo", definicion: "Somma in busta paga per i redditi più bassi, chiamata anche ex bonus Renzi." },
  ],
});
