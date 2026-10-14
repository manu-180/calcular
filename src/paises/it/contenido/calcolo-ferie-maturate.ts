import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.ferie",
  h1: "Calcolo ferie maturate e residue",
  title: "Calcolo ferie maturate: quanti giorni ti restano",
  description: "Calcola i giorni di ferie maturati e quelli che ti restano da godere. La legge garantisce almeno {{it.ferie-minime}} settimane di ferie retribuite l'anno.",
  intro: [
    "Ogni mese di lavoro fa maturare una parte delle ferie dell'anno. Con questo calcolo vedi quanti giorni hai maturato finora e quanti te ne restano, anche in ore.",
    "Ti serve il numero di settimane di ferie del tuo contratto: la legge fissa un minimo di {{it.ferie-minime}} settimane, ma molti contratti collettivi ne danno di più.",
  ],
  comoSeCalcula: [
    "I giorni di ferie di un anno intero sono le settimane del contratto per i giorni lavorativi a settimana.",
    "Ogni mese lavorato matura un dodicesimo di quei giorni.",
    "Togliendo i giorni già goduti ottieni le ferie residue. Moltiplicate per le ore giornaliere diventano ore di ferie.",
  ],
  ejemplo: ["Con 4 settimane di ferie e una settimana di 5 giorni maturi 20 giorni l'anno. Dopo 9 mesi ne hai maturati 15: se ne hai già presi 6, ti restano 9 giorni, cioè 72 ore."],
  faq: [
    {
      pregunta: "Quanti giorni di ferie spettano per legge?",
      respuesta: "Almeno {{it.ferie-minime}} settimane l'anno. Con una settimana di 5 giorni sono 20 giorni lavorativi, con una di 6 giorni sono 24.",
    },
    {
      pregunta: "Entro quando vanno godute le ferie?",
      respuesta: "Almeno due settimane nell'anno in cui maturano, e consecutive se lo chiedi tu. Le altre due entro i 18 mesi successivi alla fine dell'anno.",
    },
    {
      pregunta: "Le ferie non godute si possono pagare?",
      respuesta: "Il minimo di legge no, salvo quando il rapporto di lavoro finisce: in quel caso le ferie residue si pagano con l'indennità per ferie non godute.",
    },
    {
      pregunta: "Le ferie e i permessi ROL sono la stessa cosa?",
      respuesta: "No. I permessi ROL li prevedono i contratti collettivi e si contano a parte, in ore. Questo calcolo riguarda solo le ferie.",
    },
  ],
  glosario: [
    { termino: "Ferie maturate", definicion: "I giorni di ferie accumulati in base ai mesi lavorati." },
    { termino: "Ferie residue", definicion: "I giorni maturati che non hai ancora usato." },
    { termino: "ROL", definicion: "Riduzione dell'orario di lavoro: ore di permesso retribuito previste dai contratti collettivi." },
  ],
});
