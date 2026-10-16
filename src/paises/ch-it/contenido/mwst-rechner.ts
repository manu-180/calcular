import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.mwst-rechner",
  h1: "Calcolo dell'IVA in Svizzera: {{ch.mwst-normalsatz}}, {{ch.mwst-reduziert}} e {{ch.mwst-beherbergung}}",
  title: "Calcolo IVA Svizzera: aggiungi o scorpora il {{ch.mwst-normalsatz}}",
  description: "IVA svizzera con aliquota del {{ch.mwst-normalsatz}}, {{ch.mwst-reduziert}} o {{ch.mwst-beherbergung}}: importo senza IVA e IVA inclusa, al centesimo.",
  intro: [
    "In Svizzera l'IVA ammonta al {{ch.mwst-normalsatz}}. Alimenti, medicamenti, libri e giornali sono soggetti all'aliquota ridotta del {{ch.mwst-reduziert}}. Per l'alloggio con colazione vale l'aliquota speciale del {{ch.mwst-beherbergung}}.",
    "Con il calcolatore aggiungi l'IVA a un importo oppure la scorpori da un prezzo IVA inclusa.",
  ],
  comoSeCalcula: [
    "Aggiungere: l'importo moltiplicato per l'aliquota dà l'IVA. Importo più IVA dà il prezzo IVA inclusa.",
    "Scorporare: il prezzo IVA inclusa diviso per 1.081 (o 1.026 e 1.038) dà l'importo senza IVA. La differenza è l'imposta.",
    "Non togliere semplicemente il {{ch.mwst-normalsatz}} dal prezzo finale: otterresti troppa imposta.",
  ],
  ejemplo: [
    "Un'offerta di 2000 franchi senza IVA costa 2162 franchi con l'aliquota normale. Contiene 162 franchi di IVA.",
  ],
  faq: [
    { pregunta: "Come scorporo l'IVA da un importo lordo?", respuesta: "Dividi l'importo IVA inclusa per 1.081. Da 108.10 franchi restano 100 franchi senza IVA, l'imposta ammonta a 8.10 franchi." },
    { pregunta: "Che cosa è soggetto all'aliquota ridotta?", respuesta: "Tra l'altro l'acqua erogata in condotte, gli alimenti tranne le bevande alcoliche, i medicamenti, i giornali, le riviste e i libri. L'elenco completo è all'art. 25 cpv. 2 della legge sull'IVA." },
    { pregunta: "Al ristorante vale l'aliquota ridotta?", respuesta: "No. Per cibi e bevande serviti al ristorante vale l'aliquota normale. Gli alimenti da asporto sono soggetti all'aliquota ridotta, tranne le bevande alcoliche." },
    { pregunta: "Fino a quando vale l'aliquota speciale per l'alloggio?", respuesta: "La legge la prevede al più tardi fino al 31 dicembre 2027. Si applica ai pernottamenti con colazione, anche se la colazione è fatturata a parte." },
  ],
  glosario: [
    { termino: "IVA", definicion: "Imposta sul valore aggiunto, riscossa dall'Amministrazione federale delle contribuzioni." },
    { termino: "Imposta precedente", definicion: "L'IVA che un'impresa paga sugli acquisti e che può dedurre nel suo rendiconto." },
  ],
});
