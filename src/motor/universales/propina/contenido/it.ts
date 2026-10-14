import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const conto = montoEjemplo(ctx, 60);
  const mancia = conto * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calcolo mancia",
    title: tituloQueEntre(`Calcolo mancia e divisione del conto | ${ctx.nombrePais}`, `Calcolo mancia | ${ctx.nombrePais}`, "Calcolo mancia"),
    description: "Calcola la mancia, il totale del conto e quanto paga ciascuno quando si divide. Puoi arrotondare le quote a cifre tonde.",
    intro: [
      "Inserisci il conto, la percentuale di mancia e quante persone pagano. Vedi la mancia, il totale e la quota di ognuno.",
      "Se preferisci cifre tonde, la calcolatrice arrotonda le quote per eccesso e la differenza va in mancia.",
    ],
    comoSeCalcula: [
      "Mancia = conto × percentuale di mancia ÷ 100.",
      "Totale = conto + mancia.",
      "La quota a persona è il totale diviso per il numero di persone.",
    ],
    ejemplo: [
      `Su un conto di ${m(conto)}, una mancia del 10% è di ${m(mancia)}: in tutto ${m(conto + mancia)}.`,
      `Diviso fra 3 persone, ognuno paga ${m((conto + mancia) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Quanto si lascia di mancia?",
        respuesta: "Dipende dalle abitudini del posto. Al ristorante molti lasciano fra il 5% e il 10%, oppure arrotondano il conto. Non è un obbligo.",
      },
      {
        pregunta: "Se sul conto c'è già il servizio, devo lasciare la mancia?",
        respuesta: "No. Il servizio è già un compenso per chi ti ha servito. Se vuoi lasciare qualcosa in più, è una tua scelta.",
      },
      {
        pregunta: "Coperto e servizio sono la stessa cosa?",
        respuesta: "No. Il coperto è una cifra fissa a persona per pane e tavola. Il servizio è una percentuale sul conto. Nessuno dei due è una mancia.",
      },
      {
        pregunta: "Come calcolo al volo una mancia del 10%?",
        respuesta: "Sposta la virgola di una cifra a sinistra: su 45 la mancia è 4,50. Per il 15%, aggiungi la metà di quel numero.",
      },
    ],
    glosario: [
      { termino: "Mancia", definicion: "Una somma in più che lasci per il servizio, oltre al prezzo." },
      { termino: "Servizio", definicion: "Una percentuale che il locale aggiunge già al conto per il servizio al tavolo." },
      { termino: "Coperto", definicion: "Una cifra fissa a persona che alcuni locali mettono in conto." },
    ],
  };
};
