import { GRAMATICA } from "../../../i18n/gramatica";
import { formaCs } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "míli" : "kilometr";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const millasMaraton = DISTANCIAS_KM.maraton / KM_POR_MILLA;
  return {
    h1: "Kalkulačka tempa běhu",
    title: tituloQueEntre(
      `Kalkulačka tempa běhu ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      `Kalkulačka tempa běhu: tempo na ${corto}`,
      "Kalkulačka tempa běhu",
    ),
    description: `Spočítejte tempo na ${u}, čas v cíli nebo vzdálenost pro závod na 5 km, 10 km, půlmaraton nebo maraton.`,
    intro: [
      "Ze dvou ze tří údajů (vzdálenost, čas a tempo) získáte třetí. Hodí se k plánování závodu nebo ke kontrole tréninku.",
      "Vzdálenosti 5 km, 10 km, půlmaratonu a maratonu jsou už v nabídce.",
    ],
    comoSeCalcula: [
      `Tempo = čas ÷ vzdálenost, v minutách a sekundách na ${u}.`,
      "Čas = tempo × vzdálenost.",
      "Vzdálenost = čas ÷ tempo. Průměrná rychlost je vzdálenost vydělená počtem hodin.",
    ],
    ejemplo: imperial
      ? [
          `3 míle za 27 minut znamenají tempo 9:00 na míli, tedy ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Půlmaraton (${formatearNumero(ctx, media, 2)} mi) v tempu ${ritmoTexto(ritmoMedia)} na míli doběhnete za ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 km za 50 minut znamená tempo 5:00 na km, tedy 12 km/h.",
          `Půlmaraton (${formatearNumero(ctx, media, 1)} ${corto}) v tempu ${ritmoTexto(ritmoMedia)} na km doběhnete za ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Jak spočítat tempo na ${u}?`,
        respuesta: imperial
          ? `Převeďte čas na minuty a vydělte ho počtem mil. 3 míle za 28 minut a 30 sekund jsou ${formatearNumero(ctx, 9.5, 1)} minuty na míli, tedy 9:30.`
          : `Převeďte čas na minuty a vydělte ho počtem kilometrů. 10 km za 55 minut je ${formatearNumero(ctx, 5.5, 1)} minuty na km, tedy 5:30.`,
      },
      {
        pregunta: "Jaké tempo je vhodné pro začátečníka?",
        respuesta: "Takové, při kterém můžete během běhu mluvit. Jak se vaše kondice zlepšuje, tempo se postupně zrychluje.",
      },
      {
        pregunta: "Jak dlouhý je maraton?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, millasMaraton, 1)} ${formaCs(millasMaraton, "míle", "míle", "mil", "míle")}). Půlmaraton je poloviční.`,
      },
    ],
    glosario: [
      { termino: "Tempo", definicion: "Za jak dlouho uběhnete jeden kilometr nebo jednu míli." },
      { termino: "Průměrná rychlost", definicion: "Vzdálenost uběhnutá za hodinu." },
    ],
  };
};
