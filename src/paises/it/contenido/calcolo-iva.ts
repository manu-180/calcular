import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.iva",
  h1: "Calcolo IVA e scorporo IVA",
  title: "Calcolo IVA online: aggiungi o scorpora l'IVA",
  description:
    "Aggiungi o scorpora l'IVA da un prezzo con l'aliquota ordinaria del {{it.aliquote-iva[ordinaria]}} o con le ridotte ({{it.aliquote-iva[ridotta-10]}}, {{it.aliquote-iva[ridotta-5]}} e {{it.aliquote-iva[minima-4]}}).",
  intro: [
    "Con questo calcolo IVA puoi fare due cose: partire da un prezzo netto e aggiungere l'imposta, oppure partire da un prezzo ivato e scorporarla.",
    "Scegli l'aliquota giusta: quella ordinaria vale per la maggior parte dei beni e servizi, le ridotte per alimentari, edilizia, farmaci e altri casi previsti dalla legge.",
  ],
  comoSeCalcula: [
    "Per aggiungere l'IVA: imponibile per aliquota diviso 100. Il prezzo finale è imponibile più IVA.",
    "Per scorporarla: prezzo ivato diviso (1 più aliquota diviso 100). Con il {{it.aliquote-iva[ordinaria]}} si divide per 1,22.",
    "L'IVA è la differenza tra prezzo ivato e imponibile. Gli importi si arrotondano al centesimo.",
  ],
  ejemplo: [
    "Un prezzo di 1.000 euro IVA inclusa, con l'aliquota ordinaria, contiene 819,67 euro di imponibile e 180,33 euro di IVA.",
  ],
  faq: [
    {
      pregunta: "Come si scorpora l'IVA ordinaria?",
      respuesta: "Con l'aliquota del {{it.aliquote-iva[ordinaria]}} dividi il prezzo ivato per 1,22: ottieni l'imponibile. La differenza tra i due importi è l'IVA.",
    },
    {
      pregunta: "Quali sono le aliquote IVA in Italia?",
      respuesta:
        "L'ordinaria è il {{it.aliquote-iva[ordinaria]}}. Le ridotte sono {{it.aliquote-iva[ridotta-10]}}, {{it.aliquote-iva[ridotta-5]}} e {{it.aliquote-iva[minima-4]}}, per i beni e servizi elencati nella tabella A del DPR 633/1972.",
    },
    {
      pregunta: "A cosa si applica l'aliquota minima?",
      respuesta: "L'aliquota del {{it.aliquote-iva[minima-4]}} vale per i beni della parte II della tabella A, tra cui molti alimentari di base, e per l'acquisto della prima casa da un'impresa.",
    },
    {
      pregunta: "Perché non basta togliere la percentuale dal prezzo ivato?",
      respuesta: "Perché l'aliquota si calcola sull'imponibile, non sul prezzo finale. Togliere il 22% da 122 euro dà 95,16 euro, mentre l'imponibile giusto è 100 euro.",
    },
  ],
  glosario: [
    { termino: "Imponibile", definicion: "Il prezzo senza IVA, su cui si calcola l'imposta." },
    { termino: "Scorporo", definicion: "L'operazione che separa l'IVA da un prezzo che la contiene già." },
    { termino: "Aliquota", definicion: "La percentuale di IVA che si applica a un bene o servizio." },
  ],
});
