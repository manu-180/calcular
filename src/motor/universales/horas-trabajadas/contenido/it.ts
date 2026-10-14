import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimali = 0) => formatearNumero(ctx, x, decimali);
  const ora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const paga = montoEjemplo(ctx, 12);
  const giornata = minutosTrabajados("09:00", "17:30", 30) / 60;
  const lunga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = lunga * 5 - 40;
  return {
    h1: "Calcolo ore lavorate",
    title: tituloQueEntre(`Calcolo ore lavorate e straordinari | ${ctx.nombrePais}`, `Calcolo ore lavorate | ${ctx.nombrePais}`, "Calcolo ore lavorate"),
    description: "Somma le ore lavorate nella settimana da entrata, uscita e pause, e calcola la paga con gli straordinari compresi.",
    intro: [
      "Scegli l'orario di entrata e di uscita di ogni giorno, la pausa non pagata e la paga oraria. Ti mostriamo le ore totali, gli straordinari e la paga della settimana.",
      "Ti serve per controllare la busta paga, compilare un foglio ore o fatturare un lavoro a ore.",
    ],
    comoSeCalcula: [
      "Ore al giorno = uscita − entrata − pausa. Se l'uscita è prima dell'entrata, il turno finisce il giorno dopo.",
      "Straordinari = totale settimanale − ore ordinarie, quando il totale le supera.",
      "Paga = ore ordinarie × paga oraria + ore di straordinario × paga oraria × (1 + maggiorazione).",
    ],
    ejemplo: [
      `Dalle ${ora("09:00")} alle ${ora("17:30")} con 30 minuti di pausa fanno ${n(giornata)} ore al giorno. Dal lunedì al venerdì, ${n(giornata * 5)} ore: a ${m(paga)} l'ora, ${m(giornata * 5 * paga)}.`,
      `Dalle ${ora("08:00")} alle ${ora("18:00")} con un'ora di pausa fanno ${n(lunga * 5)} ore nella settimana: ${n(extra)} sono straordinari. Con una maggiorazione del 25%, la paga è di ${m(40 * paga + extra * paga * 1.25)}.`,
    ],
    faq: [
      {
        pregunta: "Come si calcolano le ore lavorate?",
        respuesta: "Togli l'orario di entrata da quello di uscita e sottrai la pausa. Poi somma tutti i giorni della settimana.",
      },
      {
        pregunta: "Come trasformo i minuti in ore decimali?",
        respuesta: `Dividi i minuti per 60. Mezz'ora è ${n(0.5, 1)}; 15 minuti, ${n(0.25, 2)}; 45 minuti, ${n(0.75, 2)}. Quindi 7 ore e 45 minuti sono ${n(7.75, 2)} ore.`,
      },
      {
        pregunta: "Quanti straordinari posso fare e come si pagano?",
        respuesta: "Dipende dalla legge del paese in cui lavori e dal contratto collettivo. Questa calcolatrice usa la maggiorazione e le ore ordinarie che inserisci, senza applicare regole specifiche.",
      },
    ],
    glosario: [
      { termino: "Straordinario", definicion: "Le ore lavorate oltre l'orario ordinario, pagate di più." },
      { termino: "Maggiorazione", definicion: "La percentuale in più con cui si paga un'ora di straordinario, notturno o festivo." },
    ],
  };
};
