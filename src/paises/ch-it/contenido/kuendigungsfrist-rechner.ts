import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.kuendigungsfrist-rechner",
  h1: "Calcolo del termine di disdetta in Svizzera",
  title: "Termine di disdetta Svizzera: ultimo giorno secondo il CO",
  description: "Termine di disdetta secondo il CO: 7 giorni nel periodo di prova, poi 1, 2 o 3 mesi secondo l'anno di servizio, per la fine di un mese. Calcola l'ultimo giorno.",
  intro: [
    "Senza altri accordi, in Svizzera valgono i termini di disdetta del Codice delle obbligazioni. Dipendono dall'anno di servizio e scadono alla fine di un mese.",
    "Il calcolatore conta dal giorno in cui la disdetta giunge al destinatario. La data d'invio non ha importanza per questo calcolo.",
  ],
  comoSeCalcula: [
    "Periodo di prova: disdetta possibile in ogni momento con un termine di 7 giorni. Senza accordo, il primo mese è il periodo di prova. Può essere prolungato fino a tre mesi al massimo.",
    "Dopo il periodo di prova: 1 mese nel primo anno di servizio, 2 mesi dal secondo al nono anno, poi 3 mesi.",
    "Il termine inizia il giorno dopo la ricezione. Il rapporto di lavoro termina l'ultimo giorno del mese in cui il termine scade.",
  ],
  ejemplo: [
    "Chi è impiegato da marzo 2020 e riceve la disdetta il 14 ottobre 2026 è nel 7° anno di servizio. Con 2 mesi di termine il rapporto di lavoro termina il 31 dicembre 2026.",
  ],
  faq: [
    { pregunta: "Entro quando deve giungere la disdetta?", respuesta: "Secondo il calcolo di questo calcolatore, il termine deve scadere interamente entro la fine del mese desiderata. Con un termine di un mese, la disdetta deve giungere al più tardi l'ultimo giorno del mese precedente." },
    { pregunta: "Si possono pattuire altri termini?", respuesta: "Sì, per scritto, in un contratto normale o in un contratto collettivo di lavoro. Meno di un mese è possibile solo con un contratto collettivo e solo nel primo anno di servizio." },
    { pregunta: "Che cos'è un periodo di protezione?", respuesta: "Dopo il periodo di prova il datore di lavoro non può disdire, per esempio, durante una malattia o un infortunio non colpevole, durante la gravidanza e nelle 16 settimane dopo il parto. In caso di malattia o infortunio la protezione dura 30 giorni nel primo anno di servizio, 90 giorni dal secondo al quinto anno e poi 180 giorni." },
  ],
  glosario: [
    { termino: "Periodo di prova", definicion: "Le prime settimane di un impiego, con un termine di disdetta breve. Senza accordo, è il primo mese." },
    { termino: "Periodo di protezione", definicion: "Periodo in cui il datore di lavoro non può disdire dopo il periodo di prova." },
  ],
});
