import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Vaxtareiknivél",
    title: tituloQueEntre(
      `Vaxtareiknivél: reiknaðu vexti af upphæð | ${ctx.nombrePais}`,
      `Vaxtareiknivél | ${ctx.nombrePais}`,
      "Vaxtareiknivél",
    ),
    description: "Reiknaðu einfalda vexti af upphæð með ársvöxtum í daga, mánuði eða ár. Veldu 365 eða 360 daga ár og sjáðu samtöluna.",
    intro: [
      "Einfaldir vextir reiknast alltaf af upphaflegu upphæðinni. Vextirnir leggjast ekki við stöðuna á tímabilinu.",
      "Þeir eru notaðir við stuttar fjárfestingar, lán milli einstaklinga og mörg skóladæmi.",
    ],
    comoSeCalcula: [
      "Vextir = upphæð × ársvextir × tími í árum.",
      "Fyrir mánuði deilirðu með 12. Fyrir daga deilirðu með 365 eða 360, eftir því við hvaða ár bankinn miðar.",
      "Samtala = upphæð + vextir.",
    ],
    ejemplo: [
      `${m(capital)} með 10% ársvöxtum í 6 mánuði gefa ${m(capital * 0.1 * 0.5)} í vexti.`,
      `Sama upphæð í 90 daga gefur ${m((capital * 0.1 * 90) / 365)} miðað við 365 daga á ári og ${m((capital * 0.1 * 90) / 360)} miðað við 360 daga á ári.`,
    ],
    faq: [
      {
        pregunta: "Hvernig eru vextir af upphæð reiknaðir?",
        respuesta: `Vextir = K × r × t. K er upphæðin, r eru ársvextirnir sem tugabrot (10% er ${formatearNumero(ctx, 0.1, 2)}) og t er tíminn í árum.`,
      },
      {
        pregunta: "Hver er munurinn á þessu og vaxtavöxtum?",
        respuesta: "Einfaldir vextir reiknast alltaf af sömu upphæð. Með vaxtavöxtum leggjast vextirnir við stöðuna og bera sjálfir vexti.",
      },
      {
        pregunta: "Af hverju reikna sumir bankar með 360 dögum?",
        respuesta: "Það er venja í bankaheiminum sem einfaldar útreikninginn. Með 360 dögum verða vextirnir örlítið hærri. Athugaðu hvað bankinn þinn notar.",
      },
    ],
    glosario: [
      { termino: "Höfuðstóll", definicion: "Upphæðin sem er lánuð eða lögð í fjárfestingu." },
      { termino: "Bankaár", definicion: "Ár sem er reiknað sem 360 dagar, með 30 daga í hverjum mánuði." },
    ],
  };
};
