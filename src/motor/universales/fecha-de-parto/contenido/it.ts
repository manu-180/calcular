import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const um = "2026-01-10";
  const dpp = aFecha(aDia(um) + DURACION);
  const dpp32 = aFecha(aDia(um) + DURACION + 4);
  return {
    h1: "Calcolo data presunta del parto",
    title: tituloQueEntre(`Calcolo data presunta del parto | ${ctx.nombrePais}`, "Calcolo data presunta del parto"),
    description: "Calcola la data presunta del parto partendo dall'ultima mestruazione o dal concepimento, e scopri a che settimana di gravidanza sei oggi.",
    intro: [
      "Inserisci il primo giorno dell'ultima mestruazione (o la data del concepimento, se la conosci). Vedi la data presunta del parto, la settimana di gravidanza e il trimestre.",
      "È una stima. Le visite con il ginecologo o l'ostetrica e l'ecografia danno la data più precisa.",
    ],
    comoSeCalcula: [
      "Si usa la regola di Naegele: la data presunta del parto è l'ultima mestruazione più 280 giorni (40 settimane).",
      "Se il tuo ciclo è più lungo o più corto di 28 giorni, la data si sposta della stessa differenza.",
      "Partendo dal concepimento, si aggiungono 266 giorni (38 settimane).",
      "Le settimane di gravidanza si contano dall'ultima mestruazione, non dal concepimento.",
    ],
    ejemplo: [
      `Con l'ultima mestruazione il ${f(um)} e un ciclo di 28 giorni, la data presunta del parto è il ${f(dpp)}.`,
      `Con un ciclo di 32 giorni, si sposta di 4 giorni: diventa il ${f(dpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Come si calcola la data presunta del parto?",
        respuesta: "Si aggiungono 280 giorni al primo giorno dell'ultima mestruazione. Una regola veloce che dà quasi la stessa data: aggiungi 7 giorni, togli 3 mesi e aggiungi un anno.",
      },
      {
        pregunta: "Perché le settimane si contano dall'ultima mestruazione?",
        respuesta: "Perché è una data che quasi tutte conoscono. Per questo, alla seconda settimana, il concepimento non è ancora avvenuto.",
      },
      {
        pregunta: "Quanti bambini nascono nella data prevista?",
        respuesta: "Pochi. La maggior parte nasce tra la 37ª e la 42ª settimana, quindi la data è un riferimento più che un giorno esatto.",
      },
    ],
    glosario: [
      { termino: "UM", definicion: "Ultima mestruazione: il primo giorno dell'ultimo flusso." },
      { termino: "DPP", definicion: "Data presunta del parto." },
      { termino: "Regola di Naegele", definicion: "Un modo per stimare la data del parto aggiungendo 280 giorni all'ultima mestruazione." },
    ],
  };
};
