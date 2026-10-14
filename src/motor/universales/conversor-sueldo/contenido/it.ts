import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const annuo = montoEjemplo(ctx, 30000);
  const oraria = montoEjemplo(ctx, 15);
  return {
    h1: "Calcolo paga oraria e stipendio annuo",
    title: tituloQueEntre(`Da stipendio annuo a paga oraria e viceversa | ${ctx.nombrePais}`, `Calcolo paga oraria | ${ctx.nombrePais}`, "Calcolo paga oraria"),
    description: "Converti la tua retribuzione all'ora, al giorno, a settimana, al mese e all'anno, in base alle tue ore reali e alle settimane pagate.",
    intro: [
      "Quanto vale il tuo stipendio all'ora? Quanto fa all'anno un'offerta pagata a ore? Inserisci una cifra, scegli il periodo e ti mostriamo tutti gli altri.",
      "Ti serve per confrontare offerte di lavoro, dare un prezzo agli straordinari o capire quanto vale il tuo tempo.",
    ],
    comoSeCalcula: [
      "Prima tutto si trasforma in una cifra annua.",
      "All'ora = annuo ÷ (ore a settimana × settimane pagate).",
      "Al giorno = annuo ÷ (giorni a settimana × settimane pagate). A settimana = annuo ÷ settimane pagate.",
      "Al mese = annuo ÷ 12. Ogni quindici giorni = annuo ÷ 24.",
    ],
    ejemplo: [
      `Uno stipendio di ${m(annuo)} lordi all'anno con 40 ore a settimana fa ${m(annuo / 2080)} all'ora e ${m(annuo / 12)} al mese.`,
      `Un'offerta da ${m(oraria)} all'ora a tempo pieno fa ${m(oraria * 2080)} all'anno.`,
    ],
    faq: [
      {
        pregunta: "Quante ore di lavoro ci sono in un anno?",
        respuesta: `Con 40 ore a settimana e 52 settimane pagate, ${formatearNumero(ctx, 2080)} ore. Per questo una regola veloce è moltiplicare la paga oraria per circa ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Se ho la tredicesima, come leggo il mensile?",
        respuesta: "Qui il mensile è la media su 12 mesi. Se lo stipendio annuo si paga in 13 o 14 mensilità, dividi l'annuo per 13 o 14 per avere la busta paga di un mese normale.",
      },
      {
        pregunta: "Perché la paga settimanale per 4 non dà il mensile?",
        respuesta: `Perché un mese ha in media ${formatearNumero(ctx, 52 / 12, 2)} settimane, non 4. Per passare dal settimanale al mensile, moltiplica per 52 e dividi per 12.`,
      },
      {
        pregunta: "Comprende premi o tasse?",
        respuesta: "No. Converte la stessa cifra tra periodi diversi. Se ricevi premi, aggiungili a parte quando confronti le offerte.",
      },
    ],
    glosario: [
      { termino: "RAL", definicion: "Retribuzione annua lorda: lo stipendio di un anno prima di tasse e contributi." },
      { termino: "Tredicesima", definicion: "Una mensilità in più che in molti contratti si paga a dicembre." },
    ],
  };
};
