import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

const TASSO = 3.5;

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const t = formatearNumero(ctx, TASSO, 1);
  const prezzo = montoEjemplo(ctx, 200000);
  const mutuo = prezzo * 0.8;
  const rata30 = cuotaFrancesa(mutuo, TASSO, 360);
  const rata20 = cuotaFrancesa(mutuo, TASSO, 240);
  return {
    h1: "Calcolo rata mutuo",
    title: tituloQueEntre(`Calcolo rata mutuo e piano di ammortamento | ${ctx.nombrePais}`, `Calcolo rata mutuo | ${ctx.nombrePais}`, "Calcolo rata mutuo"),
    description: "Calcola la rata mensile del mutuo da prezzo, anticipo, tasso e durata. Vedi gli interessi totali e come scende il debito anno per anno.",
    intro: [
      "Il mutuo è il debito più grande che una famiglia si prende di solito. Conviene vedere tutti i numeri prima di parlare con la banca.",
      "Inserisci il prezzo, l'anticipo, il tasso e la durata. Se insieme alla rata paghi assicurazione o altre spese, aggiungile per vedere quanto esce davvero ogni mese.",
    ],
    comoSeCalcula: [
      "Importo del mutuo = prezzo della casa − anticipo.",
      "Rata mensile costante, con il tasso annuo diviso per 12 e la durata in mesi.",
      "Per ogni anno somma gli interessi e il capitale pagati e mostra il debito che resta.",
    ],
    ejemplo: [
      `Una casa da ${m(prezzo)} con il 20% di anticipo richiede un mutuo di ${m(mutuo)}. Al ${t}% per 30 anni, la rata è di ${m(rata30)}.`,
      `In 30 anni paghi ${m(interesesTotales(mutuo, TASSO, 360))} di interessi. In 20 anni la rata sale a ${m(rata20)}, ma gli interessi scendono a ${m(interesesTotales(mutuo, TASSO, 240))}.`,
    ],
    faq: [
      {
        pregunta: "Quanto anticipo serve per un mutuo?",
        respuesta:
          "Di solito le banche finanziano fino all'80% del valore della casa, quindi serve almeno il 20%. Più anticipo versi, più bassa è la rata e meno interessi paghi. Tieni da parte anche i soldi per notaio e imposte.",
      },
      {
        pregunta: "Perché nei primi anni il debito scende così poco?",
        respuesta:
          "Gli interessi si calcolano su quello che devi ancora. All'inizio il debito è alto, quindi gran parte della rata sono interessi. Con il tempo succede il contrario.",
      },
      {
        pregunta: "Conviene una durata più breve?",
        respuesta:
          "Se puoi permetterti una rata più alta, sì: paghi molti meno interessi. Altrimenti va bene anche una durata lunga con qualche estinzione parziale quando puoi.",
      },
      {
        pregunta: "Tasso fisso o variabile: la rata può cambiare?",
        respuesta:
          "Con il tasso fisso la rata resta sempre uguale. Con il variabile può salire o scendere. Questa calcolatrice considera lo stesso tasso per tutta la durata.",
      },
    ],
    glosario: [
      { termino: "Anticipo", definicion: "La parte del prezzo che paghi con i tuoi risparmi." },
      { termino: "Capitale", definicion: "La somma che hai preso in prestito e devi restituire." },
      { termino: "Debito residuo", definicion: "Quello che devi ancora alla banca." },
    ],
  };
};
