import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  // Ocene kao u školi: petica 20%, četvorka 30%, trojka 50%.
  const ponderado = (5 * 20 + 4 * 30 + 3 * 50) / (20 + 30 + 50);
  const simple = (5 + 4 + 3) / 3;
  return {
    h1: "Kalkulator proseka ocena",
    title: tituloQueEntre(
      `Kalkulator proseka ocena ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      "Kalkulator proseka ocena: ponderisani prosek",
      "Kalkulator proseka",
    ),
    description: "Izračunajte prosek ocena, običan i ponderisani, za najviše 10 vrednosti i sa težinom svake od njih: u procentima, bodovima ili broju ponavljanja.",
    intro: [
      "Unesite svaku ocenu i njenu težinu. Dobijate ponderisani prosek, a pored njega i običan prosek.",
      "Korisno za ocene u osnovnoj i srednjoj školi i na fakultetu, kao i za svaki prosek u kojem neke vrednosti vrede više od drugih.",
    ],
    comoSeCalcula: [
      "Običan prosek = zbir vrednosti ÷ broj vrednosti.",
      "Ponderisani prosek = zbir (vrednost × težina) ÷ zbir težina.",
      "Težine ne moraju da daju 100 u zbiru: račun deli njihovim zbirom.",
    ],
    ejemplo: [
      `Petica sa težinom od 20%, četvorka sa težinom od 30% i trojka sa težinom od 50% daju ponderisani prosek ${n(ponderado)}.`,
      `Običan prosek te tri ocene je ${n(simple, 0)}: trojka ima najveću težinu i zato spušta ponderisani prosek.`,
    ],
    faq: [
      {
        pregunta: "Kako se računa ponderisani prosek?",
        respuesta: "Svaku vrednost pomnožite njenom težinom, rezultate saberite i zbir podelite zbirom težina.",
      },
      {
        pregunta: "Šta ako težine u zbiru ne daju 100%?",
        respuesta: "To nije problem. Ako jedan predmet nosi 6 bodova, a drugi 4, unesite 6 i 4. Račun deli ukupnom težinom.",
      },
      {
        pregunta: "Koja je razlika između običnog i ponderisanog proseka?",
        respuesta: "U običnom proseku svaka vrednost vredi isto. U ponderisanom se svaka vrednost računa prema svojoj težini.",
      },
    ],
    glosario: [
      { termino: "Težina", definicion: "Koliki uticaj vrednost ima na konačan prosek." },
      { termino: "Ponderisani prosek", definicion: "Prosek u kojem se svaka vrednost množi svojom težinom." },
    ],
  };
};
