import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.kinderzulagen-rechner",
  h1: "Calcolo degli assegni familiari: figli e formazione",
  title: "Assegni familiari Svizzera {{anio}}: calcolo",
  description: "Assegni familiari in Svizzera: assegno per i figli di almeno {{ch.kinderzulage}}, assegno di formazione di almeno {{ch.ausbildungszulage}} al mese. Con le aliquote del tuo cantone.",
  intro: [
    "Per i figli in Svizzera esistono gli assegni familiari. La legge federale fissa importi minimi: {{ch.kinderzulage}} di assegno per i figli e {{ch.ausbildungszulage}} di assegno di formazione al mese.",
    "I cantoni possono prevedere aliquote più alte. Inserisci le aliquote del tuo cantone se le conosci. Altrimenti il calcolatore usa il minimo.",
  ],
  comoSeCalcula: [
    "Assegno per i figli: dal mese di nascita fino alla fine del mese in cui il figlio compie 16 anni.",
    "Assegno di formazione: dall'inizio di una formazione postobbligatoria, al più presto dal mese in cui il figlio compie 15 anni, fino alla fine della formazione, al più tardi fino alla fine del mese in cui compie 25 anni.",
    "Assegni al mese: numero di figli × assegno per i figli più numero di figli in formazione × assegno di formazione.",
  ],
  ejemplo: [
    "Due figli sotto i 16 anni e uno in apprendistato danno almeno 698 franchi al mese, 8376 franchi all'anno.",
  ],
  faq: [
    { pregunta: "A quanto ammonta l'assegno per i figli nel 2026?", respuesta: "Almeno {{ch.kinderzulage}} per figlio al mese, l'assegno di formazione almeno {{ch.ausbildungszulage}}. I cantoni possono prevedere aliquote minime più alte e assegni di nascita e di adozione." },
    { pregunta: "Fino a quando c'è l'assegno di formazione?", respuesta: "Fino alla fine della formazione, al più tardi fino alla fine del mese in cui il figlio compie 25 anni." },
    { pregunta: "C'è l'assegno anche per un figlio incapace di esercitare un'attività lucrativa?", respuesta: "Sì. Per un figlio incapace di esercitare un'attività lucrativa l'assegno per i figli è versato fino alla fine del mese in cui compie 20 anni." },
  ],
  glosario: [
    { termino: "Assegno per i figli", definicion: "Assegno familiare per i figli fino alla fine del mese in cui compiono 16 anni." },
    { termino: "Assegno di formazione", definicion: "Assegno familiare per i figli in formazione postobbligatoria, al massimo fino ai 25 anni." },
  ],
});
