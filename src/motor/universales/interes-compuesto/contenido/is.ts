import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Reiknivél fyrir vaxtavexti",
    title: tituloQueEntre(
      `Vaxtavextir: reiknaðu hvernig sparnaðurinn vex | ${ctx.nombrePais}`,
      `Vaxtavextir | ${ctx.nombrePais}`,
      "Vaxtavextir",
    ),
    description: "Sjáðu hvernig peningarnir þínir vaxa með vaxtavöxtum og mánaðarlegum sparnaði. Þú færð lokaupphæðina, hve mikið er ávöxtun og töflu ár fyrir ár.",
    intro: [
      "Með vaxtavöxtum leggjast vextirnir við stöðuna og fara sjálfir að bera vexti. Þess vegna vex sparnaðurinn sífellt hraðar eftir því sem hann fær lengri tíma.",
      "Sláðu inn það sem þú átt í dag, hve mikið þú getur lagt fyrir á mánuði, vextina og fjölda ára. Þú sérð lokaupphæðina og hve stór hluti hennar er ávöxtun.",
    ],
    comoSeCalcula: [
      "Lokaupphæð = upphafsupphæð × (1 + i) í veldinu n + mánaðarlegur sparnaður × ((1 + i) í veldinu n − 1) ÷ i.",
      "Hér er i mánaðarvextirnir sem samsvara því hve oft vextir leggjast við og n er fjöldi mánaða.",
      "Mánaðarlegi sparnaðurinn er lagður inn í lok hvers mánaðar.",
    ],
    ejemplo: [
      `Ef þú byrjar með ${m(capital)} og sparar ${m(aporte)} á mánuði með 7% á ári áttu ${m(a10)} eftir 10 ár.`,
      `Ef þú heldur áfram í 10 ár í viðbót vex staðan í ${m(a20)}. Seinni tíu árin gefa mun meira en þau fyrri.`,
    ],
    faq: [
      {
        pregunta: "Hver er munurinn á einföldum vöxtum og vaxtavöxtum?",
        respuesta:
          "Einfaldir vextir reiknast alltaf af upphaflegu upphæðinni. Vaxtavextir reiknast af upphæðinni að viðbættum þeim vöxtum sem þú hefur þegar fengið.",
      },
      {
        pregunta: "Hvað er 72-reglan?",
        respuesta: `Fljótleg leið til að sjá hve langan tíma tekur að tvöfalda peningana. Deildu í 72 með ársvöxtunum. Með 6% vöxtum tvöfaldast þeir á um það bil ${formatearCifra(ctx, 72 / 6, 0)} árum.`,
      },
      {
        pregunta: "Með hvaða vöxtum á ég að reikna?",
        respuesta:
          "Vöxtum sem eru raunhæfir miðað við það sem þú ætlar að gera við peningana. Ef þú vilt sjá niðurstöðuna á verðlagi dagsins skaltu nota vextina að frádreginni þeirri verðbólgu sem þú gerir ráð fyrir.",
      },
    ],
    glosario: [
      { termino: "Vaxtatímabil", definicion: "Hve oft vextirnir leggjast við stöðuna." },
      { termino: "Vaxtavextir", definicion: "Vextir sem reiknast af stöðunni að viðbættum þeim vöxtum sem þegar hafa lagst við." },
    ],
  };
};
