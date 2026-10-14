import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calcolo sconto",
    title: tituloQueEntre(`Calcolo sconto e prezzo scontato | ${ctx.nombrePais}`, `Calcolo sconto | ${ctx.nombrePais}`, "Calcolo sconto"),
    description: "Calcola il prezzo scontato e quanto risparmi, anche con due sconti di fila come il 30% più un ulteriore 10%.",
    intro: [
      "Inserisci il prezzo e la percentuale di sconto: vedi subito quanto paghi e quanto risparmi.",
      "Se l'offerta prevede un secondo sconto, aggiungi anche quello. Due sconti di fila non si sommano mai.",
    ],
    comoSeCalcula: [
      "Prezzo scontato = prezzo originale × (1 − sconto ÷ 100).",
      "Il secondo sconto si applica al prezzo già ridotto dal primo.",
      "Il risparmio è la differenza tra il prezzo originale e quello scontato.",
    ],
    ejemplo: [
      `Un articolo da ${m(precio)} con il 25% di sconto costa ${m(precio * 0.75)}.`,
      `Con il 30% e poi un ulteriore 10% scende a ${m(precio * 0.7 * 0.9)}: lo sconto totale è del 37%, non del 40%.`,
    ],
    faq: [
      {
        pregunta: "Come si calcola lo sconto?",
        respuesta: "Moltiplica il prezzo per la percentuale e dividi per 100: è quanto risparmi. Togli questa cifra dal prezzo e ottieni quanto paghi.",
      },
      {
        pregunta: "Come si calcola uno sconto del 20%?",
        respuesta: `Moltiplica il prezzo per ${formatearNumero(ctx, 0.8, 1)}. Un articolo da ${m(precio)} scontato del 20% costa ${m(precio * 0.8)}.`,
      },
      {
        pregunta: "Il 30% più il 10% fa il 40% di sconto?",
        respuesta: "No. Il secondo sconto si calcola sul prezzo già scontato, quindi lo sconto complessivo è del 37%.",
      },
      {
        pregunta: "Come risalgo al prezzo pieno partendo da quello scontato?",
        respuesta: `Dividi il prezzo scontato per (1 − sconto ÷ 100). Con il 25% di sconto, dividi per ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Sconto", definicion: "La percentuale che si toglie dal prezzo originale." },
      { termino: "Sconto effettivo", definicion: "La percentuale che risparmi in tutto quando si applicano più sconti uno dopo l'altro." },
    ],
  };
};
