import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inizio = "2026-03-02";
  const piu90 = aFecha(aDia(inizio) + 90);
  let lavorativo = aDia(inizio);
  for (let n = 0; n < 15; ) if (esHabil(++lavorativo)) n++;
  return {
    h1: "Aggiungere giorni a una data",
    title: tituloQueEntre(`Aggiungere o togliere giorni a una data | ${ctx.nombrePais}`, `Aggiungere giorni a una data | ${ctx.nombrePais}`, "Aggiungere giorni a una data"),
    description: "Aggiungi o togli giorni di calendario o lavorativi a una data e scopri in che giorno cade. Utile per scadenze e termini.",
    intro: [
      "Scegli una data, un numero di giorni e se aggiungerli o toglierli. Vedi la data che ne risulta e il giorno della settimana.",
      "Con i giorni lavorativi, la calcolatrice salta sabati e domeniche.",
    ],
    comoSeCalcula: [
      "Con i giorni di calendario, si va avanti di un giorno per ogni giorno che inserisci.",
      "Con i giorni lavorativi contano solo quelli dal lunedì al venerdì. La data di partenza non conta.",
      "Le festività non vengono tolte, perché cambiano da paese a paese e da città a città.",
    ],
    ejemplo: [
      `Se al ${f(inizio)} aggiungi 90 giorni di calendario, arrivi al ${f(piu90)}.`,
      `Se invece aggiungi 15 giorni lavorativi, arrivi al ${f(aFecha(lavorativo))}.`,
    ],
    faq: [
      {
        pregunta: "La data di partenza conta come primo giorno?",
        respuesta: "No. Se aggiungi 1 giorno a un lunedì, ottieni martedì. È così che si contano quasi tutte le scadenze.",
      },
      {
        pregunta: "Come si calcola una scadenza a 30 o 60 giorni?",
        respuesta: "Inserisci la data di partenza, per esempio quella della fattura, e aggiungi 30 o 60 giorni di calendario. Se la scadenza cade di sabato o domenica, controlla le regole del caso.",
      },
      {
        pregunta: "Cosa succede se aggiungo giorni lavorativi partendo da un sabato?",
        respuesta: "Il primo giorno lavorativo è il lunedì dopo. Se aggiungi 1 giorno lavorativo a un sabato, ottieni lunedì.",
      },
      {
        pregunta: "Tiene conto degli anni bisestili?",
        respuesta: "Sì. Se il periodo passa per il 29 febbraio, quel giorno conta come uno in più.",
      },
    ],
    glosario: [
      { termino: "Giorni di calendario", definicion: "Tutti i giorni del calendario, senza saltarne nessuno." },
      { termino: "Giorni lavorativi", definicion: "In questa calcolatrice, i giorni dal lunedì al venerdì." },
    ],
  };
};
