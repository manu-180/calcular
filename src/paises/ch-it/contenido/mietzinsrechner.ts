import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.mietzinsrechner",
  h1: "Calcolo della pigione: tasso di riferimento e rincaro",
  title: "Calcolo pigione Svizzera: tasso di riferimento {{ch.referenzzinssatz}}",
  description: "Calcola l'adeguamento della pigione: tasso di riferimento {{ch.referenzzinssatz}}, {{ch.mietzins-hypothekarzins}} per quarto di punto e {{ch.mietzins-teuerungsanteil}} del rincaro secondo l'OLAL.",
  intro: [
    "In Svizzera la pigione dipende dal tasso d'interesse di riferimento ipotecario, che l'Ufficio federale delle abitazioni pubblica ogni trimestre. Attualmente è dell'{{ch.referenzzinssatz}}.",
    "Se il tasso è sceso dall'ultimo adeguamento della tua pigione, puoi chiedere una riduzione. Se sale, il locatore può aumentare la pigione. Il calcolatore mostra di quanto.",
  ],
  comoSeCalcula: [
    "Tasso di riferimento: per ogni quarto di punto di aumento la pigione cresce al massimo del {{ch.mietzins-hypothekarzins}} con tassi sotto il 5 %. In caso di riduzione il calcolatore fa l'inverso: pigione divisa per 1.03 per quarto di punto, cioè circa il 2.91 % in meno.",
    "Rincaro: il locatore può trasferire il {{ch.mietzins-teuerungsanteil}} dell'aumento dell'indice nazionale dei prezzi al consumo dall'ultimo adeguamento.",
    "Gli aumenti generali dei costi, per esempio per la manutenzione, si aggiungono solo se sono fatti valere. Il calcolatore somma le tre parti.",
  ],
  ejemplo: [
    "Una pigione di 2000 franchi, adeguata l'ultima volta all'1.75 % e con l'indice di dicembre 2023, scende di circa 97 franchi a circa 1903 franchi con un tasso di riferimento dell'1.25 %.",
  ],
  faq: [
    { pregunta: "Quando è pubblicato il tasso di riferimento?", respuesta: "L'Ufficio federale delle abitazioni lo pubblica ogni trimestre, all'inizio di marzo, giugno, settembre e dicembre." },
    { pregunta: "Posso chiedere una riduzione della pigione?", respuesta: "Sì, per scritto al locatore e per il prossimo termine di disdetta. Il locatore deve prendere posizione entro 30 giorni. Altrimenti puoi rivolgerti all'autorità di conciliazione entro 30 giorni. Il locatore può compensare il risparmio con aumenti dei costi intervenuti nel frattempo." },
    { pregunta: "Quanta parte del rincaro può essere trasferita sulla pigione?", respuesta: "Al massimo il {{ch.mietzins-teuerungsanteil}} dell'aumento dell'indice nazionale dei prezzi al consumo." },
  ],
  glosario: [
    { termino: "Tasso di riferimento", definicion: "Tasso d'interesse medio delle ipoteche in Svizzera, arrotondato al quarto di punto. Serve da base per gli adeguamenti della pigione." },
    { termino: "Pigione netta", definicion: "Pigione senza le spese accessorie." },
  ],
});
