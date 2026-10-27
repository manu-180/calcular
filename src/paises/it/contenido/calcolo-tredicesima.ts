import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.tredicesima",
  h1: "Calcolo tredicesima",
  title: "Calcolo tredicesima {{anio}}: quanto ti spetta a dicembre",
  description: "Calcola la tredicesima lorda in base alla retribuzione mensile e ai mesi lavorati nell'anno. Vale anche se hai iniziato o lasciato il lavoro a metà anno.",
  intro: [
    "La tredicesima è una mensilità in più che arriva con lo stipendio di dicembre. La prevedono i contratti collettivi nazionali.",
    "Se non hai lavorato tutto l'anno ti spetta in proporzione ai mesi lavorati: questo calcolo ti dice quanto.",
  ],
  comoSeCalcula: [
    "Si parte dalla retribuzione mensile lorda.",
    "Ogni mese lavorato matura un dodicesimo: il rateo mensile.",
    "La tredicesima è il rateo per i mesi lavorati da gennaio a dicembre.",
  ],
  ejemplo: ["Con 1.850 euro lordi al mese e un'assunzione ad aprile (9 mesi lavorati), la tredicesima è 1.850 × 9 / 12 = 1.387,50 euro lordi."],
  faq: [
    {
      pregunta: "Quando si paga la tredicesima?",
      respuesta: "Di solito con lo stipendio di dicembre, entro Natale. Il giorno preciso dipende dal contratto e dal datore di lavoro.",
    },
    {
      pregunta: "La tredicesima è tassata di più?",
      respuesta: "Non ha un'aliquota speciale, ma in busta paga non si applicano le detrazioni per lavoro: per questo il netto sembra più basso di uno stipendio normale.",
    },
    {
      pregunta: "Se mi licenzio prima di dicembre perdo la tredicesima?",
      respuesta: "No. I ratei maturati fino all'ultimo giorno di lavoro ti vengono pagati con la liquidazione finale, insieme al TFR.",
    },
    {
      pregunta: "La maternità e la malattia contano per la tredicesima?",
      respuesta: "Il congedo di maternità sì, lo dice la legge. Per la malattia e gli altri periodi conta il tuo contratto collettivo.",
    },
  ],
  glosario: [
    { termino: "Rateo", definicion: "La parte di tredicesima che matura ogni mese: un dodicesimo della retribuzione mensile." },
    { termino: "Gratifica natalizia", definicion: "Altro nome della tredicesima." },
  ],
});
