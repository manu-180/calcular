import { percento } from "../../comun/italiano";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const del = (n: number) => {
    const r = Math.round(n * 100) / 100;
    return percento(formatearNumero(ctx, r, Number.isInteger(r) ? 0 : 2), "di");
  };
  const iniziale = montoEjemplo(ctx, 10000);
  const finale = montoEjemplo(ctx, 15000);
  return {
    h1: "Calcolo rendimento di un investimento",
    title: tituloQueEntre(`Calcolo rendimento investimento, ROI e CAGR | ${ctx.nombrePais}`, `Calcolo ROI e CAGR | ${ctx.nombrePais}`, "Calcolo ROI e CAGR"),
    description: "Calcola il rendimento totale (ROI) e quello annuo (CAGR) di un investimento da quanto hai investito, quanto vale oggi e quanti anni sono passati.",
    intro: [
      "Un guadagno del 50% sembra ottimo, ma non è la stessa cosa in 2 anni o in 10. Per confrontare investimenti serve il rendimento annuo.",
      "Inserisci quanto hai investito, quanto vale oggi e quanti anni sono passati. Ti mostriamo il rendimento totale e quello annuo composto.",
    ],
    comoSeCalcula: [
      "ROI = (valore finale + proventi incassati − capitale investito) ÷ capitale investito × 100.",
      "CAGR = ((valore finale + proventi incassati) ÷ capitale investito) elevato a (1 ÷ anni), meno 1.",
      "Il CAGR è il tasso annuo composto: quello che dà lo stesso risultato se si ripete ogni anno.",
    ],
    ejemplo: [
      `Se investi ${m(iniziale)} e arrivi a ${m(finale)}, guadagni ${m(finale - iniziale)}: un ROI ${del(roi(iniziale, finale))}.`,
      `Se ci sono voluti 5 anni, il rendimento annuo è ${del(cagr(iniziale, finale, 5))}. Se ce ne sono voluti 2, è ${del(cagr(iniziale, finale, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Che differenza c'è tra ROI e CAGR?",
        respuesta: "Il ROI è il guadagno totale su quanto hai investito, senza contare il tempo. Il CAGR lo distribuisce per anno, così puoi confrontare investimenti di durata diversa.",
      },
      {
        pregunta: "Perché il rendimento annuo non è il totale diviso per gli anni?",
        respuesta: `Perché i guadagni di ogni anno si sommano al capitale e rendono a loro volta. Un guadagno del 50% in 5 anni corrisponde a un rendimento composto ${del(cagr(1, 1.5, 5))} all'anno, non del 10%.`,
      },
      {
        pregunta: "Come conto dividendi o cedole che ho incassato?",
        respuesta: "Inseriscili nei proventi incassati se li hai ritirati. Se li hai reinvestiti, sono già compresi nel valore finale.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Il ritorno sull'investimento: il guadagno totale in percentuale su quanto hai messo." },
      { termino: "CAGR", definicion: "Il tasso di crescita annuo composto: il rendimento medio annuo, con la capitalizzazione." },
    ],
  };
};
