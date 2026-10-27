import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.bundessteuer-rechner",
  h1: "Calcolo dell'imposta federale diretta",
  title: "Imposta federale diretta {{anio}}: calcola l'IFD",
  description: "Imposta federale diretta {{anio}} per persone sole, coniugi e famiglie: tariffa dell'art. 36 LIFD, riduzione di {{ch.dbst-kinderermaessigung}} per figlio, aliquota marginale.",
  intro: [
    "L'imposta federale diretta è la parte dell'imposta sul reddito che spetta alla Confederazione. Cantone e comune riscuotono in aggiunta le proprie imposte, che qui non sono comprese.",
    "La tariffa è uguale in tutto il Paese. Il Dipartimento federale delle finanze adegua gli scaglioni a causa della progressione a freddo, da ultimo per il 2026 e il 2027. Il calcolatore usa la tariffa dell'anno in cui calcoli.",
  ],
  comoSeCalcula: [
    "La base è il reddito imponibile dopo tutte le deduzioni. Il calcolo avviene per scaglioni interi di 100 franchi.",
    "Le persone sole senza figli pagano secondo la tariffa dell'art. 36 cpv. 1 LIFD. I coniugi e chi vive con figli nella stessa economia domestica provvedendo in modo preponderante al loro mantenimento pagano secondo la tariffa più bassa del cpv. 2.",
    "Con figli l'imposta diminuisce di {{ch.dbst-kinderermaessigung}} per figlio. Gli importi inferiori a {{ch.dbst-mindestbetrag}} non sono riscossi.",
    "A partire da un reddito elevato si applica un'aliquota fissa dell'11.5 % su tutto il reddito.",
  ],
  ejemplo: [
    "Una persona sola con 80’000 franchi di reddito imponibile paga circa 1378 franchi d'imposta federale diretta, cioè circa l'1.7 % del reddito. Ogni 100 franchi in più costano 5.94 franchi in più.",
  ],
  faq: [
    { pregunta: "Che cos'è il reddito imponibile?", respuesta: "Il reddito dopo tutte le deduzioni, per esempio le spese professionali, i versamenti nel pilastro 3a e i premi assicurativi. Lo trovi nella tassazione dell'imposta federale diretta. Può differire dal reddito imponibile cantonale." },
    { pregunta: "Perché con un figlio sono tassato secondo la tariffa per coniugi?", respuesta: "La legge applica questa tariffa anche a celibi, nubili, divorziati e vedovi che vivono con figli nella stessa economia domestica e provvedono in modo preponderante al loro mantenimento. Inoltre l'imposta diminuisce di {{ch.dbst-kinderermaessigung}} per figlio." },
    { pregunta: "Che cos'è l'aliquota marginale?", respuesta: "La quota d'imposta federale che paghi su 100 franchi di reddito in più. Mostra quanto ti fa risparmiare una deduzione, per esempio un versamento nel pilastro 3a." },
    { pregunta: "Qual è l'aliquota massima dell'imposta federale diretta?", respuesta: "L'11.5 % del reddito imponibile. Da un limite fissato nella tariffa, nel 2026 794’000 franchi per le persone sole e 941’400 franchi per i coniugi, questa aliquota vale su tutto il reddito." },
  ],
  glosario: [
    { termino: "LIFD", definicion: "Legge federale sull'imposta federale diretta." },
    { termino: "Progressione a freddo", definicion: "Aggravio quando i salari aumentano solo per effetto del rincaro. La Confederazione la compensa adeguando gli scaglioni della tariffa." },
  ],
});
