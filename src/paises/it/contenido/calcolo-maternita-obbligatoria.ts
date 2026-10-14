import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.maternita",
  h1: "Calcolo indennità di maternità obbligatoria",
  title: "Calcolo maternità obbligatoria: quanto prendi in congedo",
  description:
    "Stima l'indennità di maternità INPS: {{it.maternita-indennita}} della retribuzione media giornaliera per i {{it.congedo-maternita}} di congedo obbligatorio, con l'integrazione del contratto.",
  intro: [
    "Durante il congedo di maternità obbligatorio non lavori ma ricevi un'indennità pagata dall'INPS, di solito anticipata in busta paga dal datore di lavoro.",
    "Con questo calcolo stimi quanto ricevi al giorno e per tutto il congedo, anche se il tuo contratto collettivo integra l'indennità fino allo stipendio pieno.",
  ],
  comoSeCalcula: [
    "Si parte dalla retribuzione del mese prima del congedo, con i ratei di tredicesima e quattordicesima, e si divide per 30: è la retribuzione media giornaliera.",
    "L'indennità è pari all'{{it.maternita-indennita}} della retribuzione giornaliera, per ogni giorno di congedo.",
    "Il congedo obbligatorio dura {{it.congedo-maternita}}: di solito due prima del parto e tre dopo, oppure tutti dopo il parto se il medico lo consente.",
    "Se il contratto collettivo lo prevede, il datore di lavoro paga la differenza fino al 100%.",
  ],
  ejemplo: ["Con 1.800 euro lordi al mese e 13 mensilità la retribuzione giornaliera è 65 euro. L'indennità è 52 euro al giorno: per 150 giorni fanno 7.800 euro lordi."],
  faq: [
    {
      pregunta: "Quanto si prende in maternità obbligatoria?",
      respuesta: "L'{{it.maternita-indennita}} della retribuzione media giornaliera. Molti contratti collettivi aggiungono il resto e così arrivi allo stipendio pieno.",
    },
    {
      pregunta: "Quanto dura il congedo di maternità?",
      respuesta: "In tutto {{it.congedo-maternita}}. Se il parto arriva prima della data presunta, i giorni non goduti prima si aggiungono dopo.",
    },
    {
      pregunta: "La maternità conta per tredicesima e ferie?",
      respuesta: "Sì. Per legge il periodo di congedo vale come lavorato per l'anzianità, la tredicesima e le ferie.",
    },
    {
      pregunta: "Chi paga l'indennità?",
      respuesta: "L'INPS. Per le dipendenti di solito la anticipa il datore di lavoro in busta paga e poi la recupera dall'INPS.",
    },
  ],
  glosario: [
    { termino: "Congedo di maternità", definicion: "Il periodo in cui la lavoratrice non può lavorare, prima e dopo il parto." },
    { termino: "Integrazione", definicion: "La parte che il datore di lavoro aggiunge all'indennità INPS, se il contratto lo prevede." },
  ],
});
