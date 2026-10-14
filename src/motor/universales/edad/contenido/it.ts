import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { durataIt } from "../../dias-entre-fechas/textos/it";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const nascita = "1990-05-15";
  const rif = "2026-10-13";
  const { meses, dias } = mesesYDias(nascita, rif);
  const totale = aDia(rif) - aDia(nascita);
  return {
    h1: "Calcolo età",
    title: tituloQueEntre(`Calcolo età esatta in anni, mesi e giorni | ${ctx.nombrePais}`, `Calcolo età | ${ctx.nombrePais}`, "Calcolo età"),
    description: "Calcola la tua età esatta in anni, mesi e giorni, quanti giorni hai vissuto e quanto manca al tuo prossimo compleanno.",
    intro: [
      "Inserisci la tua data di nascita e vedi l'età esatta di oggi, anche in mesi, settimane e giorni.",
      "Cambia la seconda data per sapere quanti anni aveva una persona in un certo giorno, o quanti ne avrà.",
    ],
    comoSeCalcula: [
      "Conta i mesi interi dalla nascita alla data scelta. Ogni 12 mesi fanno un anno.",
      "I giorni che restano dopo l'ultimo mese intero sono i giorni dell'età.",
      "Gli anni bisestili contano con i loro 366 giorni.",
    ],
    ejemplo: [
      `Chi è nato il ${fechaLarga(ctx.locale, nascita)} aveva ${durataIt(Math.floor(meses / 12), meses % 12, dias)} il ${fechaLarga(ctx.locale, rif)}.`,
      `In tutto sono ${formatearNumero(ctx, totale)} giorni.`,
    ],
    faq: [
      {
        pregunta: "Come si calcola l'età esatta?",
        respuesta: "Si contano gli anni compiuti, poi i mesi interi dall'ultimo compleanno e infine i giorni che restano.",
      },
      {
        pregunta: "E chi è nato il 29 febbraio?",
        respuesta: "Negli anni non bisestili, questa calcolatrice usa il 28 febbraio come compleanno. Alcune leggi usano invece il 1° marzo.",
      },
      {
        pregunta: "Quanti giorni ho vissuto?",
        respuesta: "Guarda la riga «In giorni». Conta tutti i giorni dalla nascita alla data scelta, senza contare l'ultimo.",
      },
    ],
    glosario: [
      { termino: "Età", definicion: "Il numero di anni compiuti dalla nascita." },
      { termino: "Anno bisestile", definicion: "Un anno di 366 giorni, con il 29 febbraio. Torna ogni quattro anni, tranne alcuni anni di fine secolo." },
    ],
  };
};
