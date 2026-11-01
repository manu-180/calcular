import { pluralSq } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const pllaka = (k: number) => pluralSq(k, "pllakë", "pllaka");
  const kuti = (k: number) => pluralSq(k, "kuti", "kuti");
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Për 150 ft² me pllaka 12 × 12 in (1 ft² secila) dhe 10% humbje, ju duhen ${pllaka(piezas)}.`,
          `Nëse një kuti ka 10 pllaka, kjo do të thotë ${kuti(Math.ceil(piezas / 10))}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Për 20 m² me pllaka 60 × 60 cm (${n(pieza)} m² secila) dhe 10% humbje, ju duhen ${pllaka(piezas)}.`,
          `Nëse një kuti ka 4 pllaka, kjo do të thotë ${kuti(Math.ceil(piezas / 4))}.`,
        ];
      })();
  return {
    h1: "Kalkulator pllakash qeramike",
    title: tituloQueEntre(`Kalkulator pllakash: ${ctx.nombrePais}`, "Kalkulator pllakash qeramike", "Kalkulator pllakash"),
    description: "Llogaritni sa pllaka qeramike ju duhen për një dysheme ose një mur, me humbjet të përfshira, dhe sa kuti të blini.",
    intro: [
      "Vendosni sipërfaqen, përmasat e një pllake dhe sa pllaka ka një kuti. Shikoni sa pllaka dhe sa kuti duhen blerë.",
      "Përqindja e humbjeve mbulon prerjet në skaje dhe pllakat që thyhen.",
    ],
    comoSeCalcula: [
      `Sipërfaqja e një pllake = gjatësia × gjerësia, e kthyer në ${imperial ? "këmbë katrore" : "metra katrorë"}.`,
      "Pllaka = sipërfaqja × (1 + humbjet ÷ 100) ÷ sipërfaqja e një pllake, e rrumbullakosur lart.",
      "Kuti = pllaka ÷ pllaka në një kuti, e rrumbullakosur lart.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Sa përqind humbje duhet të llogaris?",
        respuesta: "10% për shtrim të drejtë. Për shtrim diagonal ose në formë kurrizi peshku, ose në dhoma me shumë prerje, nga 15% deri në 20%.",
      },
      {
        pregunta: "A duhet të llogaris fugat?",
        respuesta: "Jo. Fugat janë disa milimetra dhe përqindja e humbjeve e mbulon tashmë diferencën.",
      },
      {
        pregunta: "A ia vlen të blej pllaka shtesë?",
        respuesta: "Po, disa pllaka rezervë nga e njëjta seri prodhimi. Nëse një pllakë thyhet më vonë, mund të jetë e vështirë të gjeni të njëjtën nuancë.",
      },
    ],
    glosario: [
      { termino: "Humbje", definicion: "Përqindja shtesë që blihet për prerje dhe thyerje." },
      { termino: "Seri prodhimi", definicion: "Partia e prodhimit. Pllakat nga seri të ndryshme mund të kenë nuanca pak të ndryshme." },
    ],
  };
};
