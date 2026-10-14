import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.straordinari",
  h1: "Calcolo straordinari",
  title: "Calcolo straordinari: quanto vale un'ora in più",
  description:
    "Calcola il compenso degli straordinari dalla retribuzione mensile, dal divisore orario e dalla maggiorazione del tuo contratto. Orario normale: {{it.orario-normale}}.",
  intro: [
    "Lo straordinario è il lavoro che fai oltre l'orario normale, fissato dalla legge in {{it.orario-normale}} a settimana (i contratti collettivi possono prevederne meno).",
    "Ogni ora di straordinario si paga di più di un'ora normale: con questo calcolo vedi quanto ti spetta.",
  ],
  comoSeCalcula: [
    "La paga oraria è la retribuzione mensile lorda divisa per il divisore orario del contratto.",
    "A ogni ora di straordinario si aggiunge la maggiorazione prevista dal contratto collettivo.",
    "Il compenso è la paga maggiorata per le ore di straordinario.",
  ],
  ejemplo: ["Con 2.000 euro lordi al mese e divisore 173 la paga oraria è 11,56 euro. Con il 25% in più un'ora di straordinario vale 14,45 euro: 10 ore fanno 144,50 euro lordi."],
  faq: [
    {
      pregunta: "Quante ore di straordinario si possono fare?",
      respuesta: "Le regole le fissa il contratto collettivo. Se il contratto non dice nulla, serve un accordo con il datore di lavoro e il limite è di {{it.straordinario-massimo}} l'anno.",
    },
    {
      pregunta: "Quanto è la maggiorazione per lo straordinario?",
      respuesta: "La decide il contratto collettivo e cambia per diurno, notturno e festivo. La legge dice solo che lo straordinario va pagato a parte e con una maggiorazione.",
    },
    {
      pregunta: "Cos'è il divisore orario?",
      respuesta: "Il numero di ore mensili che il contratto usa per passare dallo stipendio alla paga oraria. Lo trovi nel tuo CCNL o in busta paga.",
    },
    {
      pregunta: "Gli straordinari sono tassati?",
      respuesta: "Sì, come il resto dello stipendio: pagano contributi e IRPEF. Il risultato è lordo.",
    },
  ],
  glosario: [
    { termino: "Maggiorazione", definicion: "La percentuale in più che si aggiunge alla paga oraria per le ore di straordinario." },
    { termino: "Divisore orario", definicion: "Il numero per cui si divide la retribuzione mensile per ottenere la paga di un'ora." },
  ],
});
