import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.quattordicesima",
  h1: "Calcolo quattordicesima",
  title: "Calcolo quattordicesima: quanto ti spetta a luglio",
  description: "Calcola la quattordicesima lorda in base alla retribuzione mensile e ai mesi lavorati da luglio a giugno. Spetta solo se la prevede il tuo contratto collettivo.",
  intro: [
    "La quattordicesima è una mensilità in più che arriva di solito con lo stipendio di giugno o di luglio.",
    "A differenza della tredicesima non spetta a tutti: la prevedono alcuni contratti collettivi, come quelli del commercio, del turismo e dei pubblici esercizi.",
  ],
  comoSeCalcula: [
    "Si parte dalla retribuzione mensile lorda.",
    "Il periodo di maturazione va dal 1° luglio dell'anno prima al 30 giugno.",
    "Per ogni mese lavorato in quel periodo matura un dodicesimo della retribuzione.",
  ],
  ejemplo: ["Con 1.700 euro lordi al mese e 6 mesi lavorati tra gennaio e giugno, la quattordicesima è 850 euro lordi."],
  faq: [
    {
      pregunta: "A chi spetta la quattordicesima?",
      respuesta: "Solo a chi ha un contratto collettivo che la prevede. Controlla il tuo CCNL o chiedi all'ufficio del personale.",
    },
    {
      pregunta: "Quando si paga?",
      respuesta: "Di solito con lo stipendio di giugno o di luglio. La data esatta la fissa il contratto collettivo.",
    },
    {
      pregunta: "La quattordicesima dei pensionati è la stessa cosa?",
      respuesta: "No. Quella dei pensionati è una somma aggiuntiva pagata dall'INPS a chi ha una pensione bassa, con regole diverse. Questo calcolo vale per i lavoratori dipendenti.",
    },
  ],
  glosario: [
    { termino: "CCNL", definicion: "Contratto collettivo nazionale di lavoro: fissa stipendi, mensilità aggiuntive e orari per ogni settore." },
    { termino: "Rateo", definicion: "La parte di quattordicesima che matura ogni mese: un dodicesimo della retribuzione mensile." },
  ],
});
