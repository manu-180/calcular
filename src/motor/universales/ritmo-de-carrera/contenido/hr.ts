import { GRAMATICA } from "../../../i18n/gramatica";
import { formaHr } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "milji" : "kilometru";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const millasMaraton = DISTANCIAS_KM.maraton / KM_POR_MILLA;
  return {
    h1: "Kalkulator tempa trčanja",
    title: tituloQueEntre(
      `Kalkulator tempa trčanja ${GRAMATICA.hr.para(ctx.nombrePais)}`,
      `Kalkulator tempa trčanja: tempo po ${corto}`,
      "Kalkulator tempa trčanja",
    ),
    description: `Izračunajte tempo po ${u}, vrijeme na cilju ili udaljenost za utrku na 5 km, 10 km, polumaraton ili maraton.`,
    intro: [
      "Iz dva od tri podatka (udaljenost, vrijeme i tempo) dobivate treći. Korisno je za planiranje utrke ili provjeru treninga.",
      "Udaljenosti od 5 km, 10 km, polumaratona i maratona već su ponuđene.",
    ],
    comoSeCalcula: [
      `Tempo = vrijeme ÷ udaljenost, u minutama i sekundama po ${u}.`,
      "Vrijeme = tempo × udaljenost.",
      "Udaljenost = vrijeme ÷ tempo. Prosječna brzina je udaljenost podijeljena brojem sati.",
    ],
    ejemplo: imperial
      ? [
          `3 milje za 27 minuta daju tempo 9:00 po milji, odnosno ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Polumaraton (${formatearNumero(ctx, media, 2)} mi) tempom od ${ritmoTexto(ritmoMedia)} po milji istrčat ćete za ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 km za 50 minuta daje tempo 5:00 po km, odnosno 12 km/h.",
          `Polumaraton (${formatearNumero(ctx, media, 1)} ${corto}) tempom od ${ritmoTexto(ritmoMedia)} po km istrčat ćete za ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Kako izračunati tempo po ${u}?`,
        respuesta: imperial
          ? `Pretvorite vrijeme u minute i podijelite ga brojem milja. 3 milje za 28 minuta i 30 sekundi daju ${formatearNumero(ctx, 9.5, 1)} minuta po milji, odnosno 9:30.`
          : `Pretvorite vrijeme u minute i podijelite ga brojem kilometara. 10 km za 55 minuta daje ${formatearNumero(ctx, 5.5, 1)} minuta po km, odnosno 5:30.`,
      },
      {
        pregunta: "Koji je tempo dobar za početnike?",
        respuesta: "Onaj pri kojem možete razgovarati dok trčite. Kako kondicija raste, tempo se postupno ubrzava.",
      },
      {
        pregunta: "Koliko je dug maraton?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, millasMaraton, 1)} ${formaHr(millasMaraton, "milja", "milje", "milja")}). Polumaraton je upola kraći.`,
      },
    ],
    glosario: [
      { termino: "Tempo", definicion: "Vrijeme za koje se istrči jedan kilometar ili jedna milja." },
      { termino: "Prosječna brzina", definicion: "Udaljenost istrčana za jedan sat." },
    ],
  };
};
