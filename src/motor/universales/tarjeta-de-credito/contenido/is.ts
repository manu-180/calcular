import { formaIs } from "../../../i18n/plural";
import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Greiddu niður kreditkortið",
    title: tituloQueEntre(
      `Greiða niður kreditkort: reiknaðu tíma og vexti | ${ctx.nombrePais}`,
      `Greiða niður kreditkort | ${ctx.nombrePais}`,
      "Greiða niður kreditkort",
    ),
    description: "Reiknaðu hve marga mánuði það tekur að greiða niður kreditkortið og hve mikla vexti þú borgar, með fastri upphæð eða lágmarksgreiðslu.",
    intro: [
      "Kreditkortið er yfirleitt dýrasta skuldin þín. Ef þú borgar bara lágmarksgreiðsluna dregst þetta í mörg ár og vextirnir hlaðast upp.",
      "Sláðu inn skuldina, ársvextina og hve mikið þú getur borgað á mánuði. Þú sérð hvenær þú klárar, hve mikla vexti þú borgar og áætlunina mánuð fyrir mánuð.",
    ],
    comoSeCalcula: [
      "Í hverjum mánuði bætast vextir við: skuld × ársvextir ÷ 12.",
      "Svo dregst greiðslan frá. Með lágmarksgreiðslu er greiðslan hlutfall af því sem þú skuldar, með neðri mörkum.",
      "Þetta endurtekur sig þar til skuldin er núll. Ef greiðslan er ekki hærri en vextirnir lækkar skuldin aldrei.",
    ],
    ejemplo: [
      `Skuld upp á ${m(saldo)} með 22% ársvöxtum, þar sem þú borgar ${m(fijo)} á mánuði, er greidd eftir ${formatearCifra(ctx, conFijo.meses, 0)} ${formaIs(conFijo.meses, "mánuð", "mánuði")} og kostar ${m(conFijo.intereses)} í vexti.`,
      `Ef þú borgar bara 3% lágmarksgreiðslu tekur það ${formatearCifra(ctx, conMinimo.meses, 0)} ${formaIs(conMinimo.meses, "mánuð", "mánuði")} og vextirnir fara upp í ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Hvað gerist ef ég borga bara lágmarksgreiðsluna?",
        respuesta:
          "Lágmarksgreiðslan lækkar þegar skuldin lækkar, svo þú borgar minna í hverjum mánuði og skuldin hangir yfir þér árum saman. Borgaðu frekar hærri fasta upphæð ef þú getur, þótt það sé bara aðeins meira.",
      },
      {
        pregunta: "Á ég að flytja skuldina yfir í venjulegt lán?",
        respuesta: "Ef vextirnir á láninu eru greinilega lægri en á kortinu borgar það sig yfirleitt. Berðu saman heildarvextina af báðum kostum, að gjöldum meðtöldum.",
      },
      {
        pregunta: "Hvaða kort á ég að greiða niður fyrst?",
        respuesta: "Borgaðu lágmarksgreiðsluna af öllum og settu afganginn á kortið með hæstu vextina. Þá borgarðu minnsta vexti í heildina.",
      },
    ],
    glosario: [
      { termino: "Lágmarksgreiðsla", definicion: "Það minnsta sem þú getur borgað á mánuði án vanskilagjalds. Hún ein og sér greiðir skuldina seint niður." },
      { termino: "Nafnvextir", definicion: "Vextirnir á ári sem kortið reiknar af eftirstöðvum skuldarinnar." },
    ],
  };
};
