import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fissi = montoEjemplo(ctx, 5000);
  const prezzo = montoEjemplo(ctx, 50);
  const variabile = montoEjemplo(ctx, 30);
  const obiettivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fissi, prezzo, variabile);
  const meta = equilibrio(fissi + obiettivo, prezzo, variabile);
  return {
    h1: "Calcolo punto di pareggio",
    title: tituloQueEntre(`Calcolo punto di pareggio (break even) | ${ctx.nombrePais}`, `Calcolo punto di pareggio | ${ctx.nombrePais}`, "Calcolo punto di pareggio"),
    description: "Scopri quante unità devi vendere e quanto devi fatturare ogni mese per coprire i costi, e per arrivare all'utile che vuoi.",
    intro: [
      "Il punto di pareggio (break even point) è il livello di vendite in cui un'attività non guadagna e non perde. Sotto ci perdi, sopra cominci a guadagnare.",
      "Inserisci i costi fissi, il prezzo e il costo di ogni unità. Ti diciamo quanto vendere per coprire i costi e per raggiungere il tuo obiettivo.",
    ],
    comoSeCalcula: [
      "Margine di contribuzione = prezzo − costo variabile unitario.",
      "Unità di pareggio = costi fissi ÷ margine di contribuzione, arrotondato per eccesso.",
      "Fatturato di pareggio = costi fissi ÷ (margine di contribuzione ÷ prezzo).",
      "Per un utile obiettivo, lo si somma ai costi fissi e si rifà lo stesso calcolo.",
    ],
    ejemplo: [
      `Con ${m(fissi)} di costi fissi, un prezzo di ${m(prezzo)} e un costo variabile di ${m(variabile)}, ogni vendita lascia ${m(prezzo - variabile)}.`,
      `Devi vendere ${formatearNumero(ctx, base.unidades)} unità (${m(base.facturacion)}) per coprire i costi, e ${formatearNumero(ctx, meta.unidades)} per guadagnare ${m(obiettivo)} al mese.`,
    ],
    faq: [
      {
        pregunta: "Cosa sono i costi fissi e i costi variabili?",
        respuesta: "I costi fissi restano uguali anche se non vendi niente: affitto, stipendi fissi, utenze. I costi variabili crescono con ogni vendita: merce, materiali, provvigioni, spedizioni.",
      },
      {
        pregunta: "Come abbasso il punto di pareggio?",
        respuesta: "Ci sono tre leve: alzare il prezzo, ridurre il costo variabile unitario o tagliare i costi fissi. Di solito è il prezzo a fare la differenza più grande.",
      },
      {
        pregunta: "Funziona anche per chi vende servizi?",
        respuesta: "Sì. L'unità può essere un'ora, una seduta o un cliente al mese. Come costo variabile usa quanto ti costa erogare ciascuna.",
      },
    ],
    glosario: [
      { termino: "Punto di pareggio", definicion: "Il livello di vendite in cui i ricavi sono uguali ai costi." },
      { termino: "Margine di contribuzione", definicion: "Quello che ogni vendita lascia per pagare i costi fissi." },
    ],
  };
};
