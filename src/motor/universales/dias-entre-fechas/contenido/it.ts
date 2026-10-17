import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const giorni = aDia(hasta) - aDia(desde);
  const lavorativi = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "Calcolo giorni tra due date",
    title: tituloQueEntre(`Calcolo giorni tra due date | ${ctx.nombrePais}`, "Calcolo giorni tra due date"),
    description: "Conta i giorni tra due date: giorni di calendario, settimane, mesi e giorni lavorativi dal lunedì al venerdì.",
    intro: [
      "Scegli una data di inizio e una di fine. Vedi i giorni di calendario, lo stesso periodo in settimane e mesi, e i giorni lavorativi.",
      "Ti serve per scadenze, termini di pagamento, ferie, gravidanze o un conto alla rovescia.",
    ],
    comoSeCalcula: [
      "I giorni di calendario sono tutti i giorni tra le due date. Il primo giorno conta e l'ultimo no, a meno che tu non selezioni l'opzione.",
      "I giorni lavorativi sono i giorni dal lunedì al venerdì nello stesso periodo. Le festività non vengono tolte.",
      "Gli anni bisestili contano con il loro 29 febbraio.",
    ],
    ejemplo: [`Dal ${f(desde)} al ${f(hasta)} ci sono ${giorni} giorni di calendario.`, `Di questi, ${lavorativi} cadono dal lunedì al venerdì.`],
    faq: [
      {
        pregunta: "Conta il primo giorno o l'ultimo?",
        respuesta: "Di base conta il primo e non l'ultimo, come quando sottrai due date. Se ti servono tutti e due, seleziona «Conta anche il giorno finale».",
      },
      {
        pregunta: "I giorni lavorativi escludono le festività?",
        respuesta: "No. Contano dal lunedì al venerdì. Le festività cambiano in base al paese, alla città (il santo patrono) e all'anno, quindi vanno tolte a parte.",
      },
      {
        pregunta: "Quanti giorni ha un anno?",
        respuesta: "365, oppure 366 negli anni bisestili. Per questo le stesse due date in anni diversi possono essere distanti un numero diverso di giorni.",
      },
    ],
    glosario: [
      { termino: "Giorni di calendario", definicion: "Tutti i giorni del calendario, compresi weekend e festivi." },
      { termino: "Giorni lavorativi", definicion: "In questa calcolatrice, i giorni dal lunedì al venerdì." },
    ],
  };
};
