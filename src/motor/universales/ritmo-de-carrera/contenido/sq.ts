import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "milje" : "kilometër";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Kalkulator ritmi vrapimi",
    title: tituloQueEntre(`Kalkulator ritmi vrapimi: ${ctx.nombrePais}`, "Kalkulator ritmi vrapimi (min/km)", "Kalkulator ritmi vrapimi"),
    description: `Llogaritni ritmin për ${u}, kohën përfundimtare ose distancën për një garë 5 km, 10 km, gjysmëmaratonë ose maratonë.`,
    intro: [
      "Me dy nga tri vlerat (distanca, koha dhe ritmi) gjeni të tretën. Përdoreni kalkulatorin për të planifikuar një garë ose për të kontrolluar një stërvitje.",
      "Distancat 5 km, 10 km, gjysmëmaratonë dhe maratonë janë të përfshira tashmë.",
    ],
    comoSeCalcula: [
      `Ritmi = koha ÷ distanca, në minuta dhe sekonda për ${u}.`,
      "Koha = ritmi × distanca.",
      "Distanca = koha ÷ ritmi. Shpejtësia mesatare është distanca e pjesëtuar me numrin e orëve.",
    ],
    ejemplo: imperial
      ? [
          `3 milje në 27 minuta do të thotë një ritëm 9:00 për milje, pra ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Një gjysmëmaratonë (${formatearNumero(ctx, media, 2)} mi) e vrapuar me ${ritmoTexto(ritmoMedia)} për milje përfundon në ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 km në 50 minuta do të thotë një ritëm 5:00 për kilometër, pra 12 km/h.",
          `Një gjysmëmaratonë (${formatearNumero(ctx, media, 1)} ${corto}) e vrapuar me ${ritmoTexto(ritmoMedia)} për kilometër përfundon në ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Si llogaritet ritmi për ${u}?`,
        respuesta: imperial
          ? `Ktheni kohën në minuta dhe pjesëtojeni me numrin e miljeve. 3 milje në 28 minuta e 30 sekonda do të thotë ${formatearNumero(ctx, 9.5, 1)} minuta për milje, pra 9:30.`
          : `Ktheni kohën në minuta dhe pjesëtojeni me numrin e kilometrave. 10 km në 55 minuta do të thotë ${formatearNumero(ctx, 5.5, 1)} minuta për kilometër, pra 5:30.`,
      },
      {
        pregunta: "Cili është një ritëm i mirë për fillestarët?",
        respuesta: "Ai me të cilin mund të flisni ende ndërsa vraponi. Shifra e ritmit ulet ndërsa përmirësoni formën fizike.",
      },
      {
        pregunta: "Sa kilometra ka një maratonë?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} milje). Gjysmëmaratona ka gjysmën e kësaj distance.`,
      },
    ],
    glosario: [
      { termino: "Ritëm vrapimi", definicion: "Sa kohë ju duhet për të përshkuar një kilometër ose një milje." },
      { termino: "Shpejtësi mesatare", definicion: "Distanca e përshkuar në një orë." },
    ],
  };
};
