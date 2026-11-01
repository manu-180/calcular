import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Kalkulačka návratnosti investície (ROI)",
    title: tituloQueEntre(
      `Návratnosť investície ROI a CAGR: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      "Návratnosť investície: kalkulačka ROI a CAGR",
      "Kalkulačka ROI a CAGR",
    ),
    description: "Vypočítajte celkovú návratnosť investície (ROI) a ročný výnos (CAGR) z vloženej sumy, súčasnej hodnoty a počtu rokov.",
    intro: [
      "Zisk 50 % znie dobre, ale za 2 roky je to niečo iné ako za 10 rokov. Na porovnanie investícií potrebujete výnos za rok.",
      "Zadajte, koľko ste investovali, akú hodnotu má investícia dnes a koľko rokov uplynulo. Ukážeme celkovú návratnosť aj priemerný ročný výnos so zloženým úročením.",
    ],
    comoSeCalcula: [
      "ROI = (konečná hodnota + vyplatené výnosy − investovaná suma) ÷ investovaná suma × 100.",
      "CAGR = ((konečná hodnota + vyplatené výnosy) ÷ investovaná suma) na (1 ÷ počet rokov), mínus 1.",
      "CAGR je zložená ročná miera rastu: tá, ktorá dá rovnaký výsledok, keď sa opakuje každý rok.",
    ],
    ejemplo: [
      `Keď investujete ${m(inicial)} a na konci máte ${m(final)}, zarobíte ${m(final - inicial)}: ROI je ${p(roi(inicial, final))}.`,
      `Ak to trvalo 5 rokov, ročný výnos je ${p(cagr(inicial, final, 5))}. Ak 2 roky, je to ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Aký je rozdiel medzi ROI a CAGR?",
        respuesta: "ROI je celkový zisk z vloženej sumy bez ohľadu na čas. CAGR ho rozpočíta na rok, takže môžete porovnať investície s rôznou dĺžkou.",
      },
      {
        pregunta: "Prečo ročný výnos nie je len celkový výnos vydelený počtom rokov?",
        respuesta: `Pretože zisky každého roka sa pripisujú k zostatku a ďalej zarábajú. Zisk 50 % za 5 rokov zodpovedá ročnému výnosu ${p(cagr(1, 1.5, 5))} so zloženým úročením, nie 10 %.`,
      },
      {
        pregunta: "Ako započítať vyplatené dividendy alebo úroky?",
        respuesta: "Ak ste ich vybrali, zadajte ich do vyplatených výnosov. Ak ste ich znova investovali, sú už v konečnej hodnote.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Návratnosť investície: celkový zisk v percentách z vloženej sumy." },
      { termino: "CAGR", definicion: "Zložená ročná miera rastu: priemerný ročný výnos so započítaním zloženého úročenia." },
    ],
  };
};
