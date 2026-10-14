import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperiale = ctx.unidades === "imperial";
  const ejemplo = imperiale
    ? (() => {
        const pezzi = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Per 150 ft² con piastrelle da 12 × 12 in (1 ft² l'una) e il 10% di sfrido, servono ${pezzi} piastrelle.`,
          `Se una scatola ne contiene 10, sono ${Math.ceil(pezzi / 10)} scatole.`,
        ];
      })()
    : (() => {
        const pezzo = 0.6 * 0.6;
        const pezzi = Math.ceil((20 * 1.1) / pezzo - 1e-9);
        return [
          `Per 20 m² con piastrelle da 60 × 60 cm (${n(pezzo)} m² l'una) e il 10% di sfrido, servono ${pezzi} piastrelle.`,
          `Se una scatola ne contiene 4, sono ${Math.ceil(pezzi / 4)} scatole.`,
        ];
      })();
  return {
    h1: "Calcolo piastrelle",
    title: tituloQueEntre(`Calcolo piastrelle e scatole da comprare | ${ctx.nombrePais}`, `Calcolo piastrelle | ${ctx.nombrePais}`, "Calcolo piastrelle"),
    description: "Calcola quante piastrelle servono per un pavimento o un rivestimento, sfrido compreso, e quante scatole devi comprare.",
    intro: [
      "Inserisci la superficie, le misure di ogni piastrella e quante ce ne sono in una scatola. Vedi quante piastrelle e quante scatole comprare.",
      "Lo sfrido copre i tagli lungo i bordi e qualche piastrella che si rompe.",
    ],
    comoSeCalcula: [
      `Superficie di una piastrella = lunghezza × larghezza, in ${imperiale ? "piedi quadrati" : "metri quadri"}.`,
      "Piastrelle = superficie × (1 + sfrido ÷ 100) ÷ superficie di una piastrella, arrotondato per eccesso.",
      "Scatole = piastrelle ÷ piastrelle per scatola, arrotondato per eccesso.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Quanto sfrido devo calcolare?",
        respuesta: "Il 10% per la posa dritta. Per la posa in diagonale o a spina di pesce, o per stanze con molti tagli, dal 15% al 20%.",
      },
      {
        pregunta: "Devo tenere conto delle fughe?",
        respuesta: "No. Le fughe sono larghe pochi millimetri e lo sfrido copre già la differenza.",
      },
      {
        pregunta: "Conviene comprarne qualcuna in più?",
        respuesta: "Sì, qualche piastrella di scorta dello stesso lotto. Se una si rompe più avanti, può essere difficile trovare la stessa tonalità.",
      },
    ],
    glosario: [
      { termino: "Sfrido", definicion: "La percentuale in più che compri per tagli e rotture." },
      { termino: "Lotto", definicion: "La partita di produzione. Piastrelle di lotti diversi possono avere tonalità leggermente diverse." },
    ],
  };
};
