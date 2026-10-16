import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.ferienrechner",
  h1: "Calcolo delle vacanze in Svizzera: diritto alle vacanze",
  title: "Calcolo vacanze Svizzera: giorni e supplemento",
  description: "Quanti giorni di vacanza hai? Almeno {{ch.ferien-wochen}} settimane all'anno, fino ai 20 anni {{ch.ferien-wochen-jugendliche}}. Pro rata con tempo parziale, entrata o uscita.",
  intro: [
    "In Svizzera i dipendenti hanno diritto ad almeno {{ch.ferien-wochen}} settimane di vacanza per anno di servizio. Fino ai 20 anni compiuti sono {{ch.ferien-wochen-jugendliche}}.",
    "Il calcolatore converte le settimane in giorni di vacanza, anche a tempo parziale o se non sei impiegato per tutto l'anno di servizio.",
  ],
  comoSeCalcula: [
    "Giorni di vacanza all'anno = settimane di vacanza × giorni di lavoro alla settimana.",
    "Per un anno di servizio incompleto le vacanze sono proporzionali alla durata del rapporto: giorni di vacanza × mesi / 12.",
    "Il supplemento vacanze teorico per il salario orario corrisponde alle settimane di vacanza divise per le altre settimane dell'anno: 4 / 48 o 5 / 47.",
  ],
  ejemplo: [
    "Con una settimana di 3 giorni e mezzo anno di servizio, 4 settimane di vacanza danno 6 giorni di vacanza.",
  ],
  faq: [
    { pregunta: "Quanti giorni di vacanza ho a tempo parziale?", respuesta: "Tante settimane quanto chi lavora a tempo pieno. In giorni sono meno: 4 settimane con 3 giorni di lavoro alla settimana danno 12 giorni di vacanza." },
    { pregunta: "Il datore di lavoro può pagare le vacanze invece di concederle?", respuesta: "No, finché dura il rapporto di lavoro. In questo periodo le vacanze non possono essere compensate con denaro o altre prestazioni." },
    { pregunta: "Chi decide quando vado in vacanza?", respuesta: "Il datore di lavoro fissa la data e tiene conto dei tuoi desideri nella misura compatibile con gli interessi dell'azienda. Almeno due settimane di vacanza devono essere consecutive." },
  ],
  glosario: [
    { termino: "Anno di servizio", definicion: "L'anno che inizia con il rapporto di lavoro, non l'anno civile." },
  ],
});
