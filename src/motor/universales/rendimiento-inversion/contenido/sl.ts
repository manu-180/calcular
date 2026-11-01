import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Izračun donosnosti naložbe (ROI)",
    title: tituloQueEntre(
      `Donosnost naložbe ROI in CAGR: kalkulator ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      "Donosnost naložbe: izračun ROI in CAGR",
      "Izračun ROI in CAGR",
    ),
    description: "Izračunajte skupno donosnost naložbe (ROI) in letni donos (CAGR) iz vloženega zneska, sedanje vrednosti in števila let.",
    intro: [
      "Dobiček 50 % zveni dobro, vendar je v 2 letih nekaj povsem drugega kot v 10 letih. Če želite primerjati naložbe, potrebujete donos na letni ravni.",
      "Vnesite, koliko ste vložili, koliko je naložba vredna danes in koliko let je minilo. Pokazali bomo skupno donosnost in povprečni letni donos z obrestnimi obrestmi.",
    ],
    comoSeCalcula: [
      "ROI = (končna vrednost + izplačani donosi − vloženi znesek) ÷ vloženi znesek × 100.",
      "CAGR = ((končna vrednost + izplačani donosi) ÷ vloženi znesek) na potenco (1 ÷ število let), minus 1.",
      "CAGR je sestavljena letna stopnja rasti: tista, ki da enak rezultat, če se ponavlja vsako leto.",
    ],
    ejemplo: [
      `Če vložite ${m(inicial)} in imate na koncu ${m(final)}, je dobiček ${m(final - inicial)}: ROI znaša ${p(roi(inicial, final))}.`,
      `Če je to trajalo 5 let, je letni donos ${p(cagr(inicial, final, 5))}. Če je trajalo 2 leti, znaša ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Kakšna je razlika med ROI in CAGR?",
        respuesta: "ROI je skupni dobiček glede na vloženi znesek, ne glede na čas. CAGR ga razporedi po letih, zato lahko primerjate naložbe različnega trajanja.",
      },
      {
        pregunta: "Zakaj letni donos ni preprosto skupni donos, deljen s številom let?",
        respuesta: `Ker se dobiček vsako leto pripiše stanju in prinaša nadaljnji donos. Dobiček 50 % v 5 letih ustreza letnemu donosu ${p(cagr(1, 1.5, 5))} z obrestnimi obrestmi, ne 10 %.`,
      },
      {
        pregunta: "Kako upoštevati izplačane dividende ali obresti?",
        respuesta: "Če ste jih dvignili, jih vnesite med izplačane donose. Če ste jih znova vložili, so že vključene v končno vrednost.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Donosnost naložbe: skupni dobiček v odstotkih vloženega zneska." },
      { termino: "CAGR", definicion: "Sestavljena letna stopnja rasti: povprečni letni donos z upoštevanimi obrestnimi obrestmi." },
    ],
  };
};
