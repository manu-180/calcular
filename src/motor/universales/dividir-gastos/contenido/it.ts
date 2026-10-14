import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const quota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Dividere le spese",
    title: tituloQueEntre(`Dividere le spese tra amici | ${ctx.nombrePais}`, `Dividere le spese | ${ctx.nombrePais}`, "Dividere le spese"),
    description: "Dividi una spesa comune fino a 8 persone: vedi la quota di ciascuno e chi deve dare soldi a chi, con meno pagamenti possibile.",
    intro: [
      "Serve per un viaggio, una cena, una festa o una casa in affitto per le vacanze, quando ognuno ha pagato una cifra diversa.",
      "Inserisci quanto ha pagato ciascuno. Ottieni la quota a testa e i pagamenti che servono per essere pari.",
    ],
    comoSeCalcula: [
      "Quota a testa = spesa totale ÷ numero di persone.",
      "Chi ha pagato meno della sua quota deve la differenza. Chi ha pagato di più la riceve indietro.",
      "I pagamenti vanno dal debito più grande al credito più grande, così nessuno fa passaggi di soldi inutili.",
    ],
    ejemplo: [
      `Anna ha pagato ${m(a)}, Luca ${m(b)} e Giulia niente. Il totale è ${m(a + b)}, quindi la quota a testa è ${m(quota)}.`,
      `Giulia dà ${m(quota)} ad Anna e Luca le dà ${m(quota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Come si dividono le spese se ognuno ha pagato una cifra diversa?",
        respuesta: "Somma tutto, dividi per il numero di persone e confronta il risultato con quanto ha pagato ciascuno. La differenza è quanto deve dare o ricevere.",
      },
      {
        pregunta: "E se qualcuno non ha pagato niente?",
        respuesta: "Scrivi 0 accanto al suo nome, così entra nella divisione. Se lasci la casella vuota, resta fuori dal conto.",
      },
      {
        pregunta: "Perché ci sono meno pagamenti che persone?",
        respuesta: "I debiti si raggruppano: chi deve di più paga chi ha anticipato di più, e così via. Non servono mai più pagamenti del numero di persone meno uno.",
      },
    ],
    glosario: [
      { termino: "Quota", definicion: "La parte della spesa totale che tocca a ciascuno." },
      { termino: "Saldo", definicion: "La differenza fra quanto ha pagato una persona e la sua quota." },
    ],
  };
};
