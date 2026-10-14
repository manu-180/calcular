import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperiale = ctx.unidades === "imperial";
  const ejemplo = imperiale
    ? (() => {
        const netta = 48 * 8 - 40;
        const gal = (netta * 2) / 350;
        return [
          `Una stanza con 48 ft di pareti, alte 8 ft, e 40 ft² tra porte e finestre ha ${n(netta, 0)} ft² da pitturare.`,
          `Con 2 mani e una pittura che rende 350 ft² al gallone, servono ${n(gal, 2)} galloni. Con il margine, ${n(gal * (1 + MARGEN), 2)} galloni.`,
        ];
      })()
    : (() => {
        const netta = 14 * 2.6 - 4;
        const litri = (netta * 2) / 10;
        return [
          `Una stanza con 14 m di pareti, alte ${n(2.6)} m, e 4 m² tra porte e finestre ha ${n(netta)} m² da pitturare.`,
          `Con 2 mani e una pittura che rende 10 m² al litro, servono ${n(litri, 2)} litri. Con il margine, ${n(litri * (1 + MARGEN), 2)} litri.`,
        ];
      })();
  return {
    h1: "Calcolo pittura per pareti",
    title: tituloQueEntre(`Calcolo pittura: quanti litri servono | ${ctx.nombrePais}`, `Calcolo pittura | ${ctx.nombrePais}`, "Calcolo pittura"),
    description: "Calcola quanta pittura serve per le tue pareti in base alle misure, a porte e finestre, al numero di mani e alla resa indicata sulla latta.",
    intro: [
      "Inserisci lunghezza e altezza delle pareti (o direttamente la superficie), quanto occupano porte e finestre e quante mani darai.",
      "Il calcolo aggiunge un 10% in più, così non resti senza pittura a metà lavoro.",
    ],
    comoSeCalcula: [
      "Superficie = lunghezza totale delle pareti × altezza, meno porte e finestre.",
      "Pittura = superficie × numero di mani ÷ resa.",
      `Poi si aggiunge un margine del ${MARGEN * 100}%.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Quanti metri quadri si pitturano con un litro?",
        respuesta: "Un'idropittura per interni rende di solito da 8 a 12 m² al litro per ogni mano. Il dato preciso è sulla latta.",
      },
      {
        pregunta: "Quante mani di pittura servono?",
        respuesta: "Di solito due. Un intonaco nuovo, pareti molto assorbenti o un grande cambio di colore possono richiederne una terza.",
      },
      {
        pregunta: "Devo togliere porte e finestre dal calcolo?",
        respuesta: "Sì, se sono grandi. Le piccole è meglio non toglierle: la pittura in più serve per bordi e angoli.",
      },
    ],
    glosario: [
      { termino: "Resa", definicion: "Quanta superficie copre un litro di pittura con una mano." },
      { termino: "Mano", definicion: "Ogni strato di pittura che stendi sulla parete." },
    ],
  };
};
