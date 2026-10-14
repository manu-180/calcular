import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperiale = ctx.unidades === "imperial";
  const u = imperiale ? "ft" : "m";
  const us = imperiale ? "ft²" : "m²";
  const aL = imperiale ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: "Calcolo metri quadri",
    title: tituloQueEntre(`Calcolo metri quadri di stanze e terreni | ${ctx.nombrePais}`, `Calcolo metri quadri | ${ctx.nombrePais}`, "Calcolo metri quadri"),
    description: "Calcola i metri quadri di una stanza, di un pavimento o di un terreno: rettangoli, triangoli e cerchi, sommando fino a cinque forme.",
    intro: [
      "Scegli una forma e inserisci le misure. Se lo spazio non è un semplice rettangolo, dividilo in parti e la calcolatrice le somma.",
      imperiale ? "Ti mostra il risultato anche in metri quadri." : "Ti mostra il risultato anche in piedi quadrati.",
    ],
    comoSeCalcula: [
      "Rettangolo: lunghezza × larghezza.",
      "Triangolo: base × altezza ÷ 2.",
      `Cerchio: π × raggio × raggio, dove il raggio è metà del diametro. 1 m² equivale a ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperiale
        ? `Un soggiorno a L si può dividere in un rettangolo da 16 × 12 ft e uno da 10 × 6 ft. In tutto sono ${n(aL, 0)} ft².`
        : `Un soggiorno a L si può dividere in un rettangolo da 5 × 4 m e uno da 3 × 2 m. In tutto sono ${n(aL, 0)} m².`,
      `Un tavolo rotondo con un diametro di 2 ${u} occupa ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: "Come si calcolano i metri quadri di una stanza?",
        respuesta: imperiale
          ? "Misura lunghezza e larghezza in piedi e moltiplicale. Una stanza di 12 × 10 ft misura 120 ft²."
          : "Misura lunghezza e larghezza in metri e moltiplicale. Una stanza di 4 × 3 m misura 12 m².",
      },
      {
        pregunta: "E se ho le misure in centimetri?",
        respuesta: `Trasformale prima in metri dividendo per 100. 350 cm sono ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Che differenza c'è tra superficie calpestabile e commerciale?",
        respuesta: "La calpestabile è quella che si può effettivamente calpestare, senza muri. La commerciale comprende anche i muri e una parte di balconi e pertinenze, quindi è più grande.",
      },
    ],
    glosario: [
      { termino: "Metro quadro (m²)", definicion: "La superficie di un quadrato con il lato di 1 metro." },
      { termino: "Piede quadrato (ft²)", definicion: "La superficie di un quadrato con il lato di 1 piede, usato nei paesi anglosassoni." },
    ],
  };
};
