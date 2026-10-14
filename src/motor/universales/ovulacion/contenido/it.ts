import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const um = "2026-03-05";
  const v = ventana(aDia(um), 28);
  return {
    h1: "Calcolo ovulazione e giorni fertili",
    title: tituloQueEntre(`Calcolo ovulazione e giorni fertili | ${ctx.nombrePais}`, `Calcolo ovulazione | ${ctx.nombrePais}`, "Calcolo ovulazione"),
    description: "Calcola il giorno dell'ovulazione, i giorni fertili e quando arriva la prossima mestruazione, con i tre cicli successivi.",
    intro: [
      "Inserisci il primo giorno dell'ultima mestruazione e quanto dura il tuo ciclo. Vedi l'ovulazione stimata, i giorni fertili e la prossima mestruazione.",
      "È una stima pensata per cicli regolari. Non è un metodo contraccettivo e non sostituisce il parere del medico.",
    ],
    comoSeCalcula: [
      `Di solito l'ovulazione avviene ${FASE_LUTEA} giorni prima della mestruazione successiva: primo giorno dell'ultima mestruazione + durata del ciclo − ${FASE_LUTEA}.`,
      "La finestra fertile va da 5 giorni prima dell'ovulazione al giorno dopo, perché gli spermatozoi possono sopravvivere fino a 5 giorni.",
      "La prossima mestruazione arriva un ciclo dopo l'ultima.",
    ],
    ejemplo: [
      `Con l'ultima mestruazione il ${f(um)} e un ciclo di 28 giorni, l'ovulazione stimata è il ${f(aFecha(v.ovulacion))}.`,
      `I giorni fertili vanno dal ${f(aFecha(v.desde))} al ${f(aFecha(v.hasta))}, e la prossima mestruazione è prevista il ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Quali sono i giorni più fertili?",
        respuesta: "I due o tre giorni prima dell'ovulazione e il giorno stesso dell'ovulazione. In tutto la finestra fertile dura circa 6 giorni.",
      },
      {
        pregunta: "Funziona anche con un ciclo irregolare?",
        respuesta: "Ti dà un'idea, ma meno precisa. Con cicli irregolari l'ovulazione può spostarsi di diversi giorni da un mese all'altro.",
      },
      {
        pregunta: "Posso usarlo per evitare una gravidanza?",
        respuesta: "No. La stima è approssimativa e l'ovulazione può arrivare prima o dopo. Per evitare una gravidanza, usa un metodo contraccettivo.",
      },
    ],
    glosario: [
      { termino: "Ovulazione", definicion: "Il momento in cui l'ovaio rilascia un ovulo." },
      { termino: "Finestra fertile", definicion: "I giorni del ciclo in cui è possibile restare incinta." },
    ],
  };
};
