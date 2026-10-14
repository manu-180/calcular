import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const prima = montoEjemplo(ctx, 40);
  const dopo = prima * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calcolo variazione percentuale",
    title: tituloQueEntre(`Calcolo variazione percentuale | ${ctx.nombrePais}`, "Calcolo variazione percentuale"),
    description: "Calcola di quanto è aumentato o diminuito un valore in percentuale: prezzi, stipendi, vendite o qualsiasi numero cambiato nel tempo.",
    intro: [
      "Inserisci il valore di prima e quello di adesso. Vedi l'aumento o la diminuzione in percentuale e la differenza.",
      "Ti mostra anche di quanto dovrebbe cambiare per tornare al punto di partenza, che quasi mai è la stessa percentuale.",
    ],
    comoSeCalcula: [
      "Variazione percentuale = (valore finale − valore iniziale) ÷ valore iniziale × 100.",
      "Se il risultato è positivo, il valore è aumentato. Se è negativo, è diminuito.",
      "Se il valore iniziale è negativo, si divide per il suo valore assoluto, così il segno dice ancora se c'è stato un miglioramento.",
    ],
    ejemplo: [
      `Un prodotto che costava ${m(prima)} e ora costa ${m(dopo)} è aumentato del 25%.`,
      "Per tornare al prezzo di prima dovrebbe scendere del 20%, non del 25%.",
    ],
    faq: [
      {
        pregunta: "Come si calcola un aumento percentuale?",
        respuesta: "Togli il valore iniziale da quello finale, dividi per il valore iniziale e moltiplica per 100. Da 80 a 100: 20 ÷ 80 × 100 = 25%.",
      },
      {
        pregunta: "Come si calcola una diminuzione percentuale?",
        respuesta: "Il calcolo è lo stesso. Da 100 a 80: −20 ÷ 100 × 100 = −20%, quindi è diminuito del 20%.",
      },
      {
        pregunta: "Perché un aumento del 25% e un calo del 25% non si annullano?",
        respuesta: "Ogni percentuale si calcola su una base diversa. 80 più il 25% fa 100, ma 100 meno il 25% fa 75.",
      },
      {
        pregunta: "Che differenza c'è tra percentuale e punti percentuali?",
        respuesta: "Se un tasso passa dal 10% al 12%, è salito di 2 punti percentuali. Come variazione percentuale, è salito del 20%.",
      },
    ],
    glosario: [
      { termino: "Variazione percentuale", definicion: "Quanto è cambiato un valore, in percentuale rispetto al punto di partenza." },
      { termino: "Punto percentuale", definicion: "La semplice differenza tra due percentuali." },
    ],
  };
};
