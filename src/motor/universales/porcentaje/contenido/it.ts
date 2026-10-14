import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  return {
    h1: "Calcolo percentuale",
    title: tituloQueEntre(`Calcolo percentuale online | ${ctx.nombrePais}`, "Calcolo percentuale online"),
    description: "Calcola la percentuale di un numero, che percentuale è un numero rispetto a un altro e quanto fa un valore aumentato o ridotto.",
    intro: [
      "Scegli cosa vuoi sapere, inserisci i due numeri e hai subito il risultato.",
      "Copre i quattro calcoli con le percentuali che servono ogni giorno: una parte, una proporzione, un aumento e una riduzione.",
    ],
    comoSeCalcula: [
      "X% di Y = X × Y ÷ 100.",
      "Che percentuale di Y è X = X ÷ Y × 100.",
      "Y più X% = Y × (1 + X ÷ 100). Y meno X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `Il 15% di ${n(200)} fa ${n(30)}.`,
      `${n(30)} è il 25% di ${n(120)}.`,
      `Un prezzo di ${m(precio)} che aumenta del 10% diventa ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Come si calcola la percentuale di un numero?",
        respuesta: `Moltiplica il numero per la percentuale e dividi per 100. Il 20% di ${n(350)} fa ${n(350)} × 20 ÷ 100 = ${n(70)}.`,
      },
      {
        pregunta: "Come si calcola che percentuale è un numero rispetto a un altro?",
        respuesta: "Dividi la parte per il totale e moltiplica per 100. Se rispondi bene a 45 domande su 60, fa 45 ÷ 60 × 100 = 75%.",
      },
      {
        pregunta: "Come si aggiunge una percentuale a un prezzo?",
        respuesta: `Moltiplicalo per 1 più la percentuale in forma decimale. Per aggiungere il 10%, moltiplica per ${n(1.1, 2)}.`,
      },
      {
        pregunta: "Se un prezzo sale del 10% e poi scende del 10%, torna quello di prima?",
        respuesta: `No. 100 più il 10% fa 110, e 110 meno il 10% fa ${n(99)}. La riduzione si calcola su un numero più grande.`,
      },
    ],
    glosario: [
      { termino: "Percentuale", definicion: "Una quantità espressa in parti su 100." },
      { termino: "Base", definicion: "Il numero su cui si calcola la percentuale (Y in questa calcolatrice)." },
    ],
  };
};
