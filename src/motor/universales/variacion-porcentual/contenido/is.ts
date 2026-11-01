import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  const subida = ((despues - antes) / antes) * 100;
  const vuelta = ((despues - antes) / despues) * 100;
  return {
    h1: "Reiknaðu prósentubreytingu",
    title: tituloQueEntre(
      `Prósentubreyting: reiknaðu hækkun í prósentum | ${ctx.nombrePais}`,
      `Prósentubreyting | ${ctx.nombrePais}`,
      "Prósentubreyting",
    ),
    description: "Reiknaðu hve mörg prósent gildi hefur hækkað eða lækkað. Virkar fyrir verð, laun, sölu og allar tölur sem hafa breyst.",
    intro: [
      "Sláðu inn gamla og nýja gildið. Þú sérð hækkunina eða lækkunina í prósentum og mismuninn.",
      "Þú sérð líka hve mikið gildið þarf að breytast til að komast aftur á sama stað. Það er nánast aldrei sama prósentan.",
    ],
    comoSeCalcula: [
      "Prósentubreyting = (nýtt gildi − gamalt gildi) ÷ gamalt gildi × 100.",
      "Jákvæð niðurstaða þýðir hækkun. Neikvæð þýðir lækkun.",
      "Ef gamla gildið er neikvætt deilum við með tölugildi þess, svo formerkið sýni áfram hvort staðan batnaði.",
    ],
    ejemplo: [
      `Eitthvað sem kostaði ${m(antes)} og kostar nú ${m(despues)} er orðið ${c(subida)}% dýrara.`,
      `Til að komast aftur í gamla verðið þarf það að lækka um ${c(vuelta)}%, ekki ${c(subida)}%.`,
    ],
    faq: [
      {
        pregunta: "Hvernig reikna ég hækkun í prósentum?",
        respuesta: `Dragðu gamla gildið frá því nýja, deildu með því gamla og margfaldaðu með 100. Frá 80 í 100 er það 20 ÷ 80 × 100 = ${c((20 / 80) * 100)}%.`,
      },
      {
        pregunta: "Hvernig reikna ég lækkun í prósentum?",
        respuesta: `Það er sami útreikningur. Frá 100 í 80 er það −20 ÷ 100 × 100 = −${c(20)}%, það er lækkun um ${c(20)}%.`,
      },
      {
        pregunta: "Af hverju jafnast 25% hækkun og 25% lækkun ekki út?",
        respuesta: `Prósenturnar reiknast af ólíkum grunni. 80 plús 25% er ${c(80 * 1.25)}, en 100 mínus 25% er ${c(100 * 0.75)}.`,
      },
      {
        pregunta: "Hver er munurinn á prósentum og prósentustigum?",
        respuesta: `Ef vextir fara úr 10% í 12% hafa þeir hækkað um ${c(12 - 10)} prósentustig. Sem prósentubreyting hafa þeir hækkað um ${c(((12 - 10) / 10) * 100)}%.`,
      },
    ],
    glosario: [
      { termino: "Prósentubreyting", definicion: "Hve mikið gildi hefur breyst, sem hlutfall af upphafsgildinu." },
      { termino: "Prósentustig", definicion: "Beinn munur á tveimur prósentutölum." },
    ],
  };
};
