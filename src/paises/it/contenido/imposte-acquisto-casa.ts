import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.imposte-acquisto-casa",
  h1: "Calcolo imposte acquisto prima casa",
  title: "Imposte acquisto prima casa: registro, IVA e catastali",
  description:
    "Calcola imposta di registro, IVA, ipotecaria e catastale sull'acquisto della casa, con o senza agevolazioni prima casa e con il prezzo-valore.",
  intro: [
    "Quando compri casa, oltre al prezzo paghi le imposte. Quanto dipende da chi vende (un privato o un'impresa) e da se hai i requisiti per le agevolazioni prima casa.",
    "Se compri da un privato puoi chiedere al notaio il prezzo-valore: le imposte si calcolano sul valore catastale, quasi sempre più basso del prezzo.",
  ],
  comoSeCalcula: [
    "Da un privato con le agevolazioni prima casa paghi l'imposta di registro del {{it.imposte-prima-casa[registro]}} per cento, con un minimo di {{it.imposte-prima-casa[minimo-registro]}} euro, più {{it.imposte-prima-casa[ipotecaria]}} euro di ipotecaria e {{it.imposte-prima-casa[catastale]}} euro di catastale.",
    "Senza agevolazioni l'imposta di registro sale al {{it.imposte-altre-case[registro]}} per cento.",
    "Con il prezzo-valore la base è la rendita catastale rivalutata del {{it.imposte-prima-casa[rivalutazione-rendita]}} per cento e moltiplicata per {{it.imposte-prima-casa[coefficiente]}} (prima casa) o {{it.imposte-altre-case[coefficiente]}} (altre abitazioni).",
    "Da un'impresa con IVA paghi l'IVA del {{it.imposte-prima-casa[iva]}} per cento sulla prima casa o del {{it.imposte-altre-case[iva]}} per cento sulle altre, più registro, ipotecaria e catastale fisse da {{it.imposte-prima-casa[fissa-iva]}} euro ciascuna.",
  ],
  ejemplo: [
    "Prima casa da un privato a 200.000 euro con rendita catastale di 900 euro: il valore catastale è 103.950 euro e l'imposta di registro scende a 2.079 euro, invece dei 4.000 calcolati sul prezzo.",
  ],
  faq: [
    {
      pregunta: "Quali sono i requisiti per le agevolazioni prima casa?",
      respuesta:
        "In sintesi: la casa deve essere nel comune dove abiti o dove ti trasferisci entro 18 mesi, non devi avere un'altra casa nello stesso comune né un'altra comprata con le agevolazioni. Il notaio verifica tutto prima del rogito.",
    },
    {
      pregunta: "Cos'è il prezzo-valore?",
      respuesta: "È la possibilità di pagare le imposte sul valore catastale invece che sul prezzo, quando compri da un privato. Lo chiedi al notaio nell'atto, dichiarando comunque il prezzo vero.",
    },
    {
      pregunta: "Chi paga le imposte, compratore o venditore?",
      respuesta: "Il compratore. Il notaio le calcola e le versa al momento del rogito.",
    },
    {
      pregunta: "Sono comprese le spese del notaio?",
      respuesta: "No. L'onorario del notaio, l'agenzia e le spese del mutuo si aggiungono alle imposte.",
    },
  ],
  glosario: [
    { termino: "Rendita catastale", definicion: "Il valore che il catasto attribuisce a un immobile; lo trovi nella visura." },
    { termino: "Prezzo-valore", definicion: "Regola che fa pagare le imposte sul valore catastale invece che sul prezzo." },
    { termino: "Rogito", definicion: "L'atto notarile con cui si compra la casa." },
  ],
});
