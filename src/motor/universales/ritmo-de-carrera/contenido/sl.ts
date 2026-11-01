import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSl } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "miljo" : "kilometer";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const millasMaraton = DISTANCIAS_KM.maraton / KM_POR_MILLA;
  return {
    h1: "Kalkulator tempa teka",
    title: tituloQueEntre(
      `Kalkulator tempa teka ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      `Kalkulator tempa teka: tempo na ${corto}`,
      "Kalkulator tempa teka",
    ),
    description: `Izračunajte tempo na ${u}, čas na cilju ali razdaljo za tek na 5 km, 10 km, polmaraton ali maraton.`,
    intro: [
      "Iz dveh od treh podatkov (razdalja, čas in tempo) dobite tretjega. To je uporabno pri načrtovanju teka ali preverjanju treningov.",
      "Razdalje 5 km, 10 km, polmaraton in maraton so že na voljo.",
    ],
    comoSeCalcula: [
      `Tempo = čas ÷ razdalja, v minutah in sekundah na ${u}.`,
      "Čas = tempo × razdalja.",
      "Razdalja = čas ÷ tempo. Povprečna hitrost je razdalja, deljena s številom ur.",
    ],
    ejemplo: imperial
      ? [
          `3 milje v 27 minutah pomenijo tempo 9:00 na miljo oziroma ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Polmaraton (${formatearNumero(ctx, media, 2)} mi) s tempom ${ritmoTexto(ritmoMedia)} na miljo pretečete v času ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 km v 50 minutah pomeni tempo 5:00 na km oziroma 12 km/h.",
          `Polmaraton (${formatearNumero(ctx, media, 1)} ${corto}) s tempom ${ritmoTexto(ritmoMedia)} na km pretečete v času ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Kako izračunati tempo na ${u}?`,
        respuesta: imperial
          ? `Čas pretvorite v minute in ga delite s številom milj. 3 milje v 28 minutah in 30 sekundah dajo ${formatearNumero(ctx, 9.5, 1)} minute na miljo oziroma 9:30.`
          : `Čas pretvorite v minute in ga delite s številom kilometrov. 10 km v 55 minutah da ${formatearNumero(ctx, 5.5, 1)} minute na km oziroma 5:30.`,
      },
      {
        pregunta: "Kakšen tempo je dober za začetnike?",
        respuesta: "Tisti, pri katerem se med tekom še lahko pogovarjate. Ko se kondicija izboljšuje, tempo postopoma pospešujete.",
      },
      {
        pregunta: "Kako dolg je maraton?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, millasMaraton, 1)} ${formaSl(millasMaraton, "milja", "milji", "milje", "milj")}). Polmaraton je polovica te razdalje.`,
      },
    ],
    glosario: [
      { termino: "Tempo", definicion: "Čas, v katerem pretečete en kilometer ali eno miljo." },
      { termino: "Povprečna hitrost", definicion: "Razdalja, ki jo pretečete v eni uri." },
    ],
  };
};
