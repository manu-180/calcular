import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capitale = montoEjemplo(ctx, 1000);
  const versamento = montoEjemplo(ctx, 100);
  const a10 = proyectar(capitale, versamento, 5, 10, "mensual")[9].saldo;
  const a20 = proyectar(capitale, versamento, 5, 20, "mensual")[19].saldo;
  return {
    h1: "Calcolo interesse composto",
    title: tituloQueEntre(`Calcolo interesse composto con versamenti | ${ctx.nombrePais}`, `Calcolo interesse composto | ${ctx.nombrePais}`, "Calcolo interesse composto"),
    description: "Scopri come crescono i tuoi soldi con l'interesse composto e i versamenti mensili: capitale finale, interessi maturati e tabella anno per anno.",
    intro: [
      "Con l'interesse composto, gli interessi si aggiungono al capitale e cominciano a produrre altri interessi. Per questo i risparmi crescono sempre più in fretta.",
      "Inserisci quanto hai oggi, quanto puoi aggiungere ogni mese, il tasso e gli anni. Ti mostriamo il capitale finale e quanta parte sono interessi.",
    ],
    comoSeCalcula: [
      "Capitale finale = capitale × (1 + i) elevato alla n + versamento × ((1 + i) elevato alla n − 1) ÷ i.",
      "Qui i è il tasso mensile equivalente alla capitalizzazione che hai scelto, e n è il numero di mesi.",
      "I versamenti si aggiungono alla fine di ogni mese.",
    ],
    ejemplo: [
      `Partendo da ${m(capitale)} e aggiungendo ${m(versamento)} al mese al 5% annuo, in 10 anni arrivi a ${m(a10)}.`,
      `Se continui per altri 10 anni, il capitale arriva a ${m(a20)}. Il secondo decennio rende molto più del primo.`,
    ],
    faq: [
      {
        pregunta: "Che differenza c'è tra interesse semplice e composto?",
        respuesta:
          "L'interesse semplice si calcola sempre sul capitale iniziale. L'interesse composto si calcola sul capitale più gli interessi già maturati.",
      },
      {
        pregunta: "Cos'è la regola del 72?",
        respuesta: "Un trucco per capire in quanto tempo raddoppiano i soldi: dividi 72 per il tasso annuo. Al 6%, raddoppiano in circa 12 anni.",
      },
      {
        pregunta: "Gli interessi sono lordi o netti?",
        respuesta: "Il calcolo è al lordo delle tasse. Se sugli interessi paghi un'imposta, usa un tasso già ridotto di quella percentuale.",
      },
      {
        pregunta: "Che tasso devo usare?",
        respuesta: "Uno realistico per quello che farai con i soldi. Per vedere il risultato in soldi di oggi, usa il tasso meno l'inflazione prevista.",
      },
    ],
    glosario: [
      { termino: "Capitalizzazione", definicion: "Il momento in cui gli interessi si aggiungono al capitale." },
      { termino: "Interesse composto", definicion: "Interesse calcolato sul capitale più gli interessi già maturati." },
    ],
  };
};
