import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  const para = GRAMATICA.is.para(ctx.nombrePais);
  return {
    h1: `VSK-reiknivél ${para}`,
    title: tituloQueEntre(
      `VSK-reiknivél (${tasa}): reiknaðu virðisaukaskatt | ${ctx.nombrePais}`,
      `VSK-reiknivél (${tasa}) | ${ctx.nombrePais}`,
      `VSK-reiknivél (${tasa})`,
    ),
    description: `Bættu ${tasa} VSK við hvaða verð sem er eða taktu hann út í einu skrefi. Þú sérð verð án VSK, VSK og verð með VSK.`,
    intro: [
      `Almenna VSK-hlutfallið sem er notað hér ${para} er ${tasa}.`,
      "Veldu hvort þú vilt bæta VSK við verð án VSK eða taka hann út úr verði þar sem hann er þegar innifalinn. Sláðu svo inn upphæðina.",
    ],
    comoSeCalcula: [
      "Bæta við VSK: VSK = verð án VSK × VSK-hlutfall ÷ 100. Verð með VSK = verð án VSK + VSK.",
      "Taka út VSK: verð án VSK = verð með VSK ÷ (1 + VSK-hlutfall ÷ 100). VSK er mismunurinn.",
      "Ef varan ber lægra VSK-hlutfall geturðu slegið það inn undir „Annað VSK-hlutfall“.",
    ],
    ejemplo: [
      `Til að bæta VSK við ${precio} margfaldarðu upphæðina með ${tasa} og bætir niðurstöðunni við verðið.`,
      `Til að sjá hve mikill VSK er innifalinn í ${precio} deilirðu upphæðinni með 1 plús VSK-hlutfallinu og dregur niðurstöðuna frá ${precio}.`,
    ],
    faq: [
      {
        pregunta: "Hvernig tek ég VSK út úr verði?",
        respuesta: "Deildu verðinu með 1 plús VSK-hlutfallinu sem tugabroti. Það sem eftir stendur er verðið án VSK og mismunurinn er VSK.",
      },
      {
        pregunta: "Af hverju get ég ekki bara dregið prósentuna frá heildarverðinu?",
        respuesta: "Af því að VSK var reiknaður af lægra verðinu án VSK. Ef þú dregur prósentuna frá heildarverðinu tekurðu of mikið út.",
      },
      {
        pregunta: `Gildir ${tasa} VSK um allt?`,
        respuesta: "Ekki alltaf. Matvæli, bækur, fólksflutningar og sum þjónusta geta borið lægri VSK eða verið undanþegin honum. Notaðu þá „Annað VSK-hlutfall“.",
      },
    ],
    glosario: [
      { termino: "VSK", definicion: "Virðisaukaskattur, skattur sem leggst á verð vöru og þjónustu." },
      { termino: "Verð án VSK", definicion: "Verðið áður en VSK er bætt við." },
    ],
  };
};
