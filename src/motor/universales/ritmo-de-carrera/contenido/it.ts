import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const imperiale = ctx.unidades === "imperial";
  const u = imperiale ? "miglio" : "km";
  const mezza = imperiale ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const passoMezza = imperiale ? 9 * 60 : 5 * 60 + 30;
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  return {
    h1: "Calcolo passo corsa",
    title: tituloQueEntre(`Calcolo passo corsa e tempo gara | ${ctx.nombrePais}`, `Calcolo passo corsa | ${ctx.nombrePais}`, "Calcolo passo corsa"),
    description: `Calcola il tuo passo al ${u}, il tempo finale o la distanza per una 5 km, una 10 km, una mezza maratona o una maratona.`,
    intro: [
      "Con due dei tre dati (distanza, tempo e passo) ottieni il terzo. Ti serve per preparare una gara o controllare un allenamento.",
      "Le distanze di 5 km, 10 km, mezza maratona e maratona sono già impostate.",
    ],
    comoSeCalcula: [
      `Passo = tempo ÷ distanza, in minuti e secondi al ${u}.`,
      "Tempo = passo × distanza.",
      "Distanza = tempo ÷ passo. La velocità media è la distanza divisa per le ore.",
    ],
    ejemplo: imperiale
      ? [
          `3 miglia in 27 minuti sono un passo di 9:00 al miglio, a ${n(20 / 3, 2)} mph.`,
          `Una mezza maratona (${n(mezza, 2)} mi) a ${ritmoTexto(passoMezza)} al miglio si chiude in ${reloj(passoMezza * mezza)}.`,
        ]
      : [
          `10 km in 50 minuti sono un passo di 5:00 al km, a ${n(12)} km/h.`,
          `Una mezza maratona (${n(mezza, 1)} km) a ${ritmoTexto(passoMezza)} al km si chiude in ${reloj(passoMezza * mezza)}.`,
        ],
    faq: [
      {
        pregunta: `Come si calcola il passo al ${u}?`,
        respuesta: imperiale
          ? `Trasforma il tempo in minuti e dividilo per le miglia. 3 miglia in 28 minuti e 30 secondi fanno ${n(9.5, 1)} minuti al miglio, cioè 9:30.`
          : `Trasforma il tempo in minuti e dividilo per i chilometri. 10 km in 55 minuti fanno ${n(5.5, 1)} minuti al km, cioè 5:30.`,
      },
      {
        pregunta: "Qual è un buon passo per chi inizia a correre?",
        respuesta: "Quello che ti permette ancora di parlare mentre corri. Con l'allenamento, il passo scende da solo.",
      },
      {
        pregunta: "Quanto è lunga una maratona?",
        respuesta: `${n(DISTANCIAS_KM.maraton, 3)} km (${n(DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} miglia). La mezza maratona è la metà.`,
      },
    ],
    glosario: [
      { termino: "Passo", definicion: "Il tempo che impieghi a percorrere un chilometro o un miglio." },
      { termino: "Velocità media", definicion: "La distanza percorsa in un'ora." },
    ],
  };
};
