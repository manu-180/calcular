import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Kalkulator povrata ulaganja (ROI)",
    title: tituloQueEntre(
      `Povrat ulaganja ROI i CAGR: kalkulator ${GRAMATICA.bs.para(ctx.nombrePais)}`,
      "Povrat ulaganja: kalkulator ROI i CAGR",
      "Kalkulator ROI i CAGR",
    ),
    description: "Izračunajte ukupni povrat ulaganja (ROI) i godišnji prinos (CAGR) iz uloženog iznosa, sadašnje vrijednosti i broja godina.",
    intro: [
      "Dobit od 50 % zvuči dobro, ali za 2 godine to je nešto sasvim drugo nego za 10 godina. Da biste uporedili ulaganja, potreban vam je prinos na godišnjem nivou.",
      "Unesite koliko ste uložili, koliko ulaganje vrijedi danas i koliko je godina prošlo. Pokazat ćemo ukupni povrat i prosječni godišnji prinos sa složenom kamatom.",
    ],
    comoSeCalcula: [
      "ROI = (konačna vrijednost + isplaćeni prinosi − uloženi iznos) ÷ uloženi iznos × 100.",
      "CAGR = ((konačna vrijednost + isplaćeni prinosi) ÷ uloženi iznos) na potenciju (1 ÷ broj godina), minus 1.",
      "CAGR je složena godišnja stopa rasta: ona koja daje isti rezultat kada se ponavlja svake godine.",
    ],
    ejemplo: [
      `Ako uložite ${m(inicial)} i na kraju imate ${m(final)}, dobit je ${m(final - inicial)}: ROI iznosi ${p(roi(inicial, final))}.`,
      `Ako je to trajalo 5 godina, godišnji prinos je ${p(cagr(inicial, final, 5))}. Ako je trajalo 2 godine, iznosi ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Koja je razlika između ROI-ja i CAGR-a?",
        respuesta: "ROI je ukupna dobit u odnosu na uloženi iznos, bez obzira na vrijeme. CAGR je raspoređuje po godinama, pa možete uporediti ulaganja različitog trajanja.",
      },
      {
        pregunta: "Zašto godišnji prinos nije samo ukupni prinos podijeljen brojem godina?",
        respuesta: `Zato što se dobit svake godine pripisuje stanju i dalje donosi prinos. Dobit od 50 % za 5 godina odgovara godišnjem prinosu od ${p(cagr(1, 1.5, 5))} sa složenom kamatom, a ne 10 %.`,
      },
      {
        pregunta: "Kako uračunati isplaćene dividende ili kamate?",
        respuesta: "Ako su podignute, unesite ih u isplaćene prinose. Ako su ponovno uložene, već su sadržane u konačnoj vrijednosti.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Povrat ulaganja: ukupna dobit u procentu od uloženog iznosa." },
      { termino: "CAGR", definicion: "Složena godišnja stopa rasta: prosječni godišnji prinos uz uračunatu složenu kamatu." },
    ],
  };
};
