import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Kalkulator povrata investicije (ROI)",
    title: tituloQueEntre(
      `Povrat investicije ROI i CAGR: kalkulator ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      "Povrat investicije: kalkulator ROI i CAGR",
      "Kalkulator ROI i CAGR",
    ),
    description: "Izračunajte ukupni povrat investicije (ROI) i godišnji prinos (CAGR) iz uloženog iznosa, sadašnje vrednosti i broja godina.",
    intro: [
      "Zarada od 50% zvuči dobro, ali za 2 godine to je nešto sasvim drugo nego za 10 godina. Da biste uporedili ulaganja, potreban vam je prinos na godišnjem nivou.",
      "Unesite koliko ste uložili, koliko investicija vredi danas i koliko je godina prošlo. Pokazaćemo ukupni povrat i prosečan godišnji prinos sa složenom kamatom.",
    ],
    comoSeCalcula: [
      "ROI = (konačna vrednost + isplaćeni prinosi − uloženi iznos) ÷ uloženi iznos × 100.",
      "CAGR = ((konačna vrednost + isplaćeni prinosi) ÷ uloženi iznos) na stepen (1 ÷ broj godina), minus 1.",
      "CAGR je složena godišnja stopa rasta: ona koja daje isti rezultat kada se ponavlja svake godine.",
    ],
    ejemplo: [
      `Ako uložite ${m(inicial)} i na kraju imate ${m(final)}, zarada je ${m(final - inicial)}: ROI iznosi ${p(roi(inicial, final))}.`,
      `Ako je to trajalo 5 godina, godišnji prinos je ${p(cagr(inicial, final, 5))}. Ako je trajalo 2 godine, iznosi ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Koja je razlika između ROI i CAGR?",
        respuesta: "ROI je ukupna zarada u odnosu na uloženi iznos, bez obzira na vreme. CAGR je raspoređuje po godinama, pa možete da uporedite ulaganja različitog trajanja.",
      },
      {
        pregunta: "Zašto godišnji prinos nije samo ukupni prinos podeljen brojem godina?",
        respuesta: `Zato što se zarada svake godine pripisuje stanju i dalje zarađuje. Zarada od 50% za 5 godina odgovara godišnjem prinosu od ${p(cagr(1, 1.5, 5))} sa složenom kamatom, a ne 10%.`,
      },
      {
        pregunta: "Kako uračunati isplaćene dividende ili kamate?",
        respuesta: "Ako su podignute, unesite ih u isplaćene prinose. Ako su ponovo uložene, već su sadržane u konačnoj vrednosti.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Povrat investicije: ukupna zarada u procentima od uloženog iznosa." },
      { termino: "CAGR", definicion: "Složena godišnja stopa rasta: prosečan godišnji prinos uz uračunatu složenu kamatu." },
    ],
  };
};
