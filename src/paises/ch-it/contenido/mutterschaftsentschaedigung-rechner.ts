import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.mutterschaftsentschaedigung-rechner",
  h1: "Calcolo dell'indennità di maternità",
  title: "Indennità di maternità: calcolo dell'indennità IPG 2026",
  description: "Indennità di maternità IPG: l'{{ch.eo-taggeld-satz}} del reddito, al massimo {{ch.eo-hoechstbetrag-taggeld}} al giorno, per {{ch.mutterschaft-tage}} giorni. Indennità e importo totale.",
  intro: [
    "Dopo il parto le madri che esercitano un'attività lucrativa ricevono un'indennità di maternità dalle indennità di perdita di guadagno (IPG). Ammonta all'{{ch.eo-taggeld-satz}} del reddito medio prima del parto, al massimo {{ch.eo-hoechstbetrag-taggeld}} al giorno.",
    "L'indennità è versata per {{ch.mutterschaft-tage}} giorni consecutivi, dal giorno del parto.",
  ],
  comoSeCalcula: [
    "Dipendenti: salario mensile prima del parto diviso per 30, che dà il reddito al giorno.",
    "Indipendenti: reddito annuo soggetto all'AVS diviso per 360.",
    "Indennità: l'{{ch.eo-taggeld-satz}} di questo importo, al massimo {{ch.eo-hoechstbetrag-taggeld}}. Importo totale: indennità × {{ch.mutterschaft-tage}} giorni.",
  ],
  ejemplo: [
    "Con un salario mensile di 5250 franchi l'indennità giornaliera è di 140 franchi. Per 98 giorni sono 13’720 franchi. Da un salario mensile di 8250 franchi si raggiunge l'indennità massima.",
  ],
  faq: [
    { pregunta: "A quanto ammonta l'indennità di maternità?", respuesta: "All'{{ch.eo-taggeld-satz}} del reddito medio da attività lucrativa prima del parto, al massimo {{ch.eo-hoechstbetrag-taggeld}} al giorno." },
    { pregunta: "Quanto dura il congedo di maternità?", respuesta: "Secondo il Codice delle obbligazioni almeno 14 settimane. L'indennità è versata per {{ch.mutterschaft-tage}} giorni dal giorno del parto." },
    { pregunta: "Che cosa succede se il neonato deve restare in ospedale?", respuesta: "Se il bambino resta in ospedale almeno due settimane subito dopo la nascita, l'indennità si prolunga della durata del ricovero, al massimo di 56 giorni. La madre deve dimostrare che intendeva riprendere un'attività dopo il congedo." },
    { pregunta: "Si deducono contributi?", respuesta: "Sì. Sull'indennità sono riscossi contributi AVS/AI/IPG e, per le lavoratrici dipendenti, anche il contributo all'assicurazione contro la disoccupazione." },
  ],
  glosario: [
    { termino: "IPG", definicion: "Indennità di perdita di guadagno. Versano le indennità in caso di maternità, paternità e servizio." },
  ],
});
