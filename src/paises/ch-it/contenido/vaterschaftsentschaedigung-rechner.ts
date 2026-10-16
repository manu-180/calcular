import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.vaterschaftsentschaedigung-rechner",
  h1: "Calcolo dell'indennità di paternità",
  title: "Congedo di paternità: calcolo dell'indennità IPG 2026",
  description: "Indennità per il congedo dell'altro genitore: l'{{ch.eo-taggeld-satz}} del reddito, al massimo {{ch.eo-hoechstbetrag-taggeld}} al giorno, per {{ch.vaterschaft-taggelder}} indennità giornaliere.",
  intro: [
    "L'altro genitore, di solito il padre, ha diritto a due settimane di congedo dopo la nascita. Le IPG versano per questo un'indennità dell'{{ch.eo-taggeld-satz}} del reddito, al massimo {{ch.eo-hoechstbetrag-taggeld}} al giorno.",
    "In totale ci sono {{ch.vaterschaft-taggelder}} indennità giornaliere. Il congedo può essere preso entro sei mesi dalla nascita, a settimane o a giorni.",
  ],
  comoSeCalcula: [
    "Dipendenti: salario mensile diviso per 30. Indipendenti: reddito annuo diviso per 360.",
    "Indennità: l'{{ch.eo-taggeld-satz}} di questo importo, al massimo {{ch.eo-hoechstbetrag-taggeld}}.",
    "Indennità totale: indennità × {{ch.vaterschaft-taggelder}} indennità giornaliere. Se il congedo è preso a settimane, sono versate 7 indennità per settimana. A giorni, per ogni 5 giorni presi si aggiungono 2 indennità.",
  ],
  ejemplo: [
    "Con un salario mensile di 6000 franchi l'indennità giornaliera è di 160 franchi. Per 14 indennità sono 2240 franchi.",
  ],
  faq: [
    { pregunta: "A quanto ammonta l'indennità di paternità?", respuesta: "All'{{ch.eo-taggeld-satz}} del reddito medio prima della nascita, al massimo {{ch.eo-hoechstbetrag-taggeld}} al giorno, per al massimo {{ch.vaterschaft-taggelder}} indennità giornaliere." },
    { pregunta: "Entro quando devo prendere il congedo?", respuesta: "Entro sei mesi dalla nascita del figlio. Puoi prenderlo tutto insieme, a settimane o a giorni." },
    { pregunta: "Chi ne ha diritto?", respuesta: "Il padre legale al momento della nascita o nei sei mesi successivi, e la moglie della madre se al momento della nascita è l'altro genitore legale." },
  ],
  glosario: [
    { termino: "Congedo dell'altro genitore", definicion: "Due settimane di congedo pagato dopo la nascita, di solito chiamato congedo di paternità." },
  ],
});
