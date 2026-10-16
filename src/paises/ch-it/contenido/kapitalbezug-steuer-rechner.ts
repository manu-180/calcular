import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.kapitalbezug-steuer-rechner",
  h1: "Prelievo di capitale: imposta federale su cassa pensioni e pilastro 3a",
  title: "Imposta sul prelievo di capitale: LPP e pilastro 3a",
  description: "Imposta federale diretta sul prelievo del capitale della cassa pensioni o del pilastro 3a: un quinto della tariffa secondo l'art. 38 LIFD.",
  intro: [
    "Chi preleva il capitale dalla cassa pensioni o dal pilastro 3a paga un'imposta a parte. È riscossa separatamente dagli altri redditi, per l'anno del versamento.",
    "Il calcolatore mostra la parte della Confederazione. Anche cantone e comune tassano il prelievo.",
  ],
  comoSeCalcula: [
    "L'imposta federale sulle prestazioni in capitale provenienti dalla previdenza corrisponde a un quinto dell'imposta ordinaria secondo la tariffa del reddito (art. 38 LIFD).",
    "Si applica la tariffa per persone sole o per coniugi. Chi vive con figli nella stessa economia domestica usa la tariffa per coniugi, ma senza la riduzione per figlio.",
    "Non sono concesse deduzioni sociali. Il calcolo avviene per scaglioni interi di 100 franchi.",
  ],
  ejemplo: [
    "Per un capitale di 200’000 franchi una persona sola paga circa 2581 franchi d'imposta federale diretta, circa l'1.3 % dell'importo.",
  ],
  faq: [
    { pregunta: "Il prelievo di capitale si somma al salario?", respuesta: "No. Le prestazioni in capitale provenienti dalla previdenza sono tassate separatamente. Non si sommano agli altri redditi dell'anno." },
    { pregunta: "Vale anche per il pilastro 3a?", respuesta: "Sì. Il capitale della previdenza individuale vincolata è tassato come quello della cassa pensioni." },
    { pregunta: "Perché il cantone non è compreso?", respuesta: "Ogni cantone ha tariffe e regole proprie per le prestazioni in capitale. Per l'imposta cantonale usa il calcolatore fiscale del tuo cantone." },
  ],
  glosario: [
    { termino: "Prestazione in capitale dalla previdenza", definicion: "Versamento dell'avere della cassa pensioni o del pilastro 3a in una sola volta invece di una rendita." },
  ],
});
