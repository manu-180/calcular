import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.teuerungsrechner",
  h1: "Calcolo del rincaro con l'indice nazionale dei prezzi al consumo",
  title: "Calcolo del rincaro Svizzera: converti con l'IPC",
  description: "Quanto vale oggi un importo di allora? Calcola il rincaro dal 2000 con l'indice nazionale dei prezzi al consumo dell'UST, mese per mese.",
  intro: [
    "L'indice nazionale dei prezzi al consumo (IPC) misura l'evoluzione dei prezzi dei beni e servizi acquistati dalle economie domestiche in Svizzera. L'Ufficio federale di statistica lo pubblica ogni mese.",
    "Con il calcolatore converti un importo in un altro mese, per esempio per adeguare al rincaro un salario, una pigione o un contributo di mantenimento.",
  ],
  comoSeCalcula: [
    "Importo adeguato = importo × IPC del mese finale / IPC del mese iniziale.",
    "Il calcolo usa l'IPC base dicembre 2025 = 100, arrotondato a un decimale. I mesi più vecchi sono convertiti in questa base.",
    "Se il mese finale non è ancora pubblicato, il calcolatore usa l'ultimo mese disponibile.",
  ],
  ejemplo: [
    "1000 franchi di gennaio 2020 corrispondono a settembre 2026 a circa 1079 franchi. Il rincaro in questo periodo è di circa il 7.9 %.",
  ],
  faq: [
    { pregunta: "Qual è il rincaro in Svizzera?", respuesta: "Lo mostra il rincaro annuo: la variazione dell'IPC rispetto allo stesso mese dell'anno precedente. Il calcolatore lo indica per il mese finale che scegli." },
    { pregunta: "Da dove vengono i dati?", respuesta: "Dall'Ufficio federale di statistica. La serie proviene dal portale dei dati della Banca nazionale svizzera, che riprende l'IPC dell'UST, ed è aggiornata dopo ogni pubblicazione." },
    { pregunta: "Perché il risultato è un po' diverso da altri calcolatori?", respuesta: "Altri calcolatori possono usare un'altra base dell'indice o più decimali. Ne risultano piccole differenze di arrotondamento." },
  ],
  glosario: [
    { termino: "IPC", definicion: "Indice nazionale dei prezzi al consumo dell'Ufficio federale di statistica." },
    { termino: "Rincaro", definicion: "Aumento dei prezzi al consumo in un periodo." },
  ],
});
