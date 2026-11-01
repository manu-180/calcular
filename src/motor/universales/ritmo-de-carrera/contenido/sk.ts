import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSk } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "míľu" : "kilometer";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const millasMaraton = DISTANCIAS_KM.maraton / KM_POR_MILLA;
  return {
    h1: "Kalkulačka tempa behu",
    title: tituloQueEntre(
      `Kalkulačka tempa behu ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      `Kalkulačka tempa behu: tempo na ${corto}`,
      "Kalkulačka tempa behu",
    ),
    description: `Vypočítajte tempo na ${u}, čas v cieli alebo vzdialenosť pre preteky na 5 km, 10 km, polmaratón alebo maratón.`,
    intro: [
      "Z dvoch z troch údajov (vzdialenosť, čas a tempo) získate tretí. Hodí sa na plánovanie pretekov alebo na kontrolu tréningu.",
      "Vzdialenosti 5 km, 10 km, polmaratónu a maratónu sú už v ponuke.",
    ],
    comoSeCalcula: [
      `Tempo = čas ÷ vzdialenosť, v minútach a sekundách na ${u}.`,
      "Čas = tempo × vzdialenosť.",
      "Vzdialenosť = čas ÷ tempo. Priemerná rýchlosť je vzdialenosť vydelená počtom hodín.",
    ],
    ejemplo: imperial
      ? [
          `3 míle za 27 minút znamenajú tempo 9:00 na míľu, teda ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Polmaratón (${formatearNumero(ctx, media, 2)} mi) v tempe ${ritmoTexto(ritmoMedia)} na míľu dobehnete za ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 km za 50 minút znamená tempo 5:00 na km, teda 12 km/h.",
          `Polmaratón (${formatearNumero(ctx, media, 1)} ${corto}) v tempe ${ritmoTexto(ritmoMedia)} na km dobehnete za ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Ako vypočítať tempo na ${u}?`,
        respuesta: imperial
          ? `Prepočítajte čas na minúty a vydeľte ho počtom míľ. 3 míle za 28 minút a 30 sekúnd sú ${formatearNumero(ctx, 9.5, 1)} minúty na míľu, teda 9:30.`
          : `Prepočítajte čas na minúty a vydeľte ho počtom kilometrov. 10 km za 55 minút je ${formatearNumero(ctx, 5.5, 1)} minúty na km, teda 5:30.`,
      },
      {
        pregunta: "Aké tempo je vhodné pre začiatočníka?",
        respuesta: "Také, pri ktorom môžete počas behu rozprávať. Ako sa vaša kondícia zlepšuje, tempo sa postupne zrýchľuje.",
      },
      {
        pregunta: "Aký dlhý je maratón?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, millasMaraton, 1)} ${formaSk(millasMaraton, "míľa", "míle", "míľ", "míle")}). Polmaratón je polovičný.`,
      },
    ],
    glosario: [
      { termino: "Tempo", definicion: "Za aký čas prebehnete jeden kilometer alebo jednu míľu." },
      { termino: "Priemerná rýchlosť", definicion: "Vzdialenosť prebehnutá za hodinu." },
    ],
  };
};
