import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "Reiknaðu nafnvexti yfir í virka vexti",
    title: tituloQueEntre(
      `Virkir vextir: reiknaðu út frá nafnvöxtum | ${ctx.nombrePais}`,
      `Virkir vextir | ${ctx.nombrePais}`,
      "Virkir vextir",
    ),
    description: "Reiknaðu nafnvexti yfir í virka ársvexti og til baka, með vaxtareikningi mánaðarlega, ársfjórðungslega, á hálfs árs fresti eða daglega.",
    intro: [
      "Tvö tilboð með sömu vöxtum geta kostað misjafnlega mikið. Munurinn liggur í því hve oft vextirnir eru reiknaðir.",
      "Virkir ársvextir gera tilboðin sambærileg. Þeir sýna hvað þú borgar eða færð í raun á einu ári. Veldu hvaða vexti þú ert með og við reiknum hina.",
    ],
    comoSeCalcula: [
      "Virkir vextir = (1 + nafnvextir ÷ m) í veldinu m, mínus 1. Hér er m fjöldi vaxtatímabila á ári, 12 við mánaðarlegan og 4 við ársfjórðungslegan útreikning.",
      "Nafnvextir = m × ((1 + virkir vextir) í veldinu 1 ÷ m, mínus 1).",
      "Vextir á tímabil eru nafnvextirnir deilt með m.",
    ],
    ejemplo: [
      `12% nafnvextir með mánaðarlegum vaxtareikningi samsvara ${p(aEfectiva(12, 12))} í virkum vöxtum.`,
      `10% virkir vextir samsvara ${p(aNominal(10, 12))} í nafnvöxtum þegar vextir eru reiknaðir mánaðarlega.`,
    ],
    faq: [
      {
        pregunta: "Hver er munurinn á nafnvöxtum og virkum vöxtum?",
        respuesta:
          "Nafnvextir eru ársvextirnir áður en vaxtavextir eru reiknaðir með. Virkir vextir taka með að vextirnir bera líka vexti. Þess vegna eru virkir vextir alltaf jafnháir nafnvöxtum eða hærri.",
      },
      {
        pregunta: "Við hvaða vexti á ég að miða þegar ég ber saman lán?",
        respuesta:
          "Virka vexti. Í lánatilboðum eru lántöku- og greiðslugjöld oft reiknuð með, svo talan getur orðið hærri en það sem þú sérð hér. Berðu líka saman heildarkostnaðinn.",
      },
      {
        pregunta: "Af hverju hækka virkir vextir þegar vextir eru reiknaðir oftar?",
        respuesta:
          "Vextirnir bætast fyrr við og fara sjálfir að bera vexti. Ef vextir eru aðeins reiknaðir einu sinni á ári eru nafnvextir og virkir vextir jafnháir.",
      },
    ],
    glosario: [
      { termino: "Nafnvextir", definicion: "Ársvextirnir án áhrifa vaxtavaxta." },
      { termino: "Virkir vextir", definicion: "Ársvextirnir að meðtöldum vaxtavöxtum." },
      { termino: "Vaxtatímabil", definicion: "Hve oft vextir bætast við skuldina eða innstæðuna." },
    ],
  };
};
